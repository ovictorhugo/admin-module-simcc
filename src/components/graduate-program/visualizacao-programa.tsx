import { ArrowRight, Book, ChevronDown, ChevronLeft, ChevronUp, Copyright, File, Globe, SlidersHorizontal, Ticket, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Books, Quotes } from "phosphor-react";
import { Alert } from "../ui/alert";
import { Search } from "../search/search";
import { useModalResult } from "../hooks/use-modal-result";
import { useModal } from "../hooks/use-modal-store";

interface GraduateProgram {
    area?: string;
    code?: string;
    graduate_program_id?: string;
    modality?: string;
    name?: string;
    rating?: string;
    type?: string;
    city?: string
    state?: string
    instituicao?: string
    url_image?: string
    region?: string
    sigla?: string
    latitude?: string
    longitude?: string
    visible?:string
    qtd_discente?:string
    qtd_colaborador?:string
    qtd_permanente?:string
  }

  interface Total {
    article:string
    book:string
    book_chapter:string
    brand:string 
    patent:string 
    researcher:string 
    software:string 
    work_in_event:string
  }

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }


export function VisualizacaoPrograma() {
  const {urlGeral, itemsSelecionados, searchType} = useContext(UserContext)
  const { onOpen: onOpenModal } = useModal();
    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const queryUrl = useQuery();
  const type_search = queryUrl.get('graduate_program_id');

  const [graduatePrograms, setGraduatePrograms] = useState<GraduateProgram[]>([]);

  const urlGraduateProgram = `${urlGeral}graduate_program_profnit?id=${type_search}`;

  console.log(urlGraduateProgram)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlGraduateProgram, {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
            "Content-Type": "text/plain",
          },
        });
        const data = await response.json();
        if (data) {
          setGraduatePrograms(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlGraduateProgram]);

  const [total, setTotal] = useState<Total[]>([]);
  const currentYear = new Date().getFullYear();
const year = currentYear - 4;

  const urlTotalProgram = `${urlGeral}graduate_program_production?graduate_program_id=${type_search}&year=${year}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlTotalProgram, {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
            "Content-Type": "text/plain",
          },
        });
        const data = await response.json();
        if (data) {
          setTotal(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlTotalProgram]);

  const [isOn, setIsOn] = useState(true);

  const { onOpen, type: typeResult } = useModalResult();

    return(
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Tabs defaultValue={'all'} className="h-full" >
            <div className="w-full  gap-4">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pós-graduação
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
              <TabsTrigger value="doc" className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Indicadores</TabsTrigger>

              
                </TabsList>
               
          
                <Button size="sm">Button</Button>
              </div>
            </div>

            </div>

            <TabsContent value="all" className="h-auto flex flex-col gap-4 md:gap-8  mt-2">
            <div>
                  <Link to={'http://www.bi.cnpq.br/painel/mapa-fomento-cti/'} target="_blank"  className="inline-flex items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2 mb-3 px-3 py-1 text-sm font-medium"><Globe size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Visitar página do programa<ArrowRight size={12}/></Link>
        
        <h1 className=" max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
        {graduatePrograms.map((props) => (
          <>{props.name}</>
        ))}
        </h1>
        <p className="max-w-[750px]  text-lg font-light text-foreground">Atualize os dados importando o arquivo .xls na plataforma </p>
                  <div className="flex gap-3 mt-3">
                    <Button size={'sm'} 
                   >Importar dados dos docentes</Button>
                    <Button size={'sm'} variant={'ghost'} >Importar bolsistas CNPq</Button>
                  </div>

                  </div>

                  {itemsSelecionados.length > 0 ? (
                     <div>
                     <div className={`w-full ${isOn ? 'px-8' : 'px-4'} border-b border-b-neutral-200 dark:border-b-neutral-800`}>
                       {isOn && (
                         <div className="w-full pt-4  flex justify-between items-center">
                           <Search />
                         </div>
                       )}
                       <div className={`flex py-2 justify-between items-center ${isOn ? 'pb-8' : ''} `}>
                         <div className="flex items-center gap-2">
                           <Button variant={typeResult == 'researchers-home' ? ('outline'):('ghost')}  className={`${typeResult}`} onClick={() => onOpen('researchers-home')}>
                             <Users className="h-4 w-4" />
                             Pesquisadores
                           </Button>
                           {searchType === 'article' && (
                             <Button variant={typeResult == 'articles-home' ? ('outline'):('ghost')}  className="m-0" onClick={() => onOpen('articles-home')}>
                               <Quotes className="h-4 w-4" />
                               Artigos
                             </Button>
                           )}
                           {searchType === 'book' && (
                             <Button variant="ghost"  className="m-0" onClick={() => onOpen('researchers-home')}>
                               <File className="h-4 w-4" />
                               Livros e capítulos
                             </Button>
                           )}
                           {searchType === 'patent' && (
                             <Button variant="ghost" className="m-0" onClick={() => onOpen('researchers-home')}>
                               <Copyright className="h-4 w-4" />
                               Patentes
                             </Button>
                           )}
                           {searchType === 'speaker' && (
                             <Button variant="ghost" className="m-0" onClick={() => onOpen('researchers-home')}>
                               <Ticket className="h-4 w-4" />
                               Participação em eventos
                             </Button>
                           )}
                           <div onClick={() => onOpen('articles-home')}></div>
                           <div onClick={() => onOpen('institutions-home')}></div>
                         </div>
                         <div>
                           <Button onClick={() => onOpenModal('filters')} variant="ghost"  className="">
                             <SlidersHorizontal size={16} className="" />
                             Filtros
                           </Button>
                           <Button variant="ghost"  size="icon" onClick={() => setIsOn(!isOn)}>
                             {isOn ? (
                               <ChevronUp className="h-4 w-4" />
                             ) : (
                               <ChevronDown className="h-4 w-4" />
                             )}
                           </Button>
                         </div>
                       </div>
                     </div>
                   
                   </div>
                  ) : (
                      <div>
                      <Alert className="grid gap-3 lg:grid-cols-4 grid-cols-2">
                      <div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                               <div>
                               <CardTitle className="text-sm font-medium">
                                 Total de artigos
                               </CardTitle>
                           
                               
                               </div>
           
                               <Quotes className="h-4 w-4 text-muted-foreground" />
                              
                             </CardHeader>
           
                            <CardContent>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total.map((props) => (<>{props.article}</>))}
                           </span>
                            </CardContent>
                      </div>
                      <div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                               <div>
                               <CardTitle className="text-sm font-medium">
                                 Total de livros
                               </CardTitle>
                              
                               
                               </div>
           
                               <Book className="h-4 w-4 text-muted-foreground" />
                              
                             </CardHeader>
           
                            <CardContent>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total.map((props) => (<>{props.book}</>))}
                           </span>
                            </CardContent>
                      </div>
                       <div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                               <div>
                               <CardTitle className="text-sm font-medium">
                                 Total de capítulos
                               </CardTitle>
                             
                               
                               </div>
           
                               <Books className="h-4 w-4 text-muted-foreground" />
                              
                             </CardHeader>
           
                            <CardContent>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total.map((props) => (<>{props.book_chapter}</>))}
                           </span>
                            </CardContent>
                      </div>
          
                      <div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                               <div>
                               <CardTitle className="text-sm font-medium">
                                 Total de patentes
                               </CardTitle>
                              
                               </div>
           
                               <Copyright className="h-4 w-4 text-muted-foreground" />
                              
                             </CardHeader>
           
                            <CardContent>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total.map((props) => (<>{props.patent}</>))}
                           </span>
                            </CardContent>
          
                      </div>
          
                     
          
                     
                     </Alert>
                      
                      </div>

                  )}

                 
            </TabsContent>
            </Tabs>
        </main>
    )
}
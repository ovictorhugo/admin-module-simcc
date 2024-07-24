import { ArrowRight, ChevronLeft, Hash, Info, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { File, Graph, LinkBreak, MagnifyingGlass } from "phosphor-react";
import { Input } from "../ui/input";
import { UserContext } from "../../context/context";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Alert } from "../ui/alert";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { ArticleItem } from "../homepage/components/article-item";

type Magazine = {
  id: string,
  issn: string,
  jcr_link: string,
  jif: string,
  magazine: string,
  qualis: string
}

type Publicacao = {
  id: string,
  doi: string,
  name_periodical: string,
  qualis: "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "SQ" | "NP",
  title: string,
  year: string,
  color: string,
  researcher: string,
  lattes_id: string,
  magazine: string,
  lattes_10_id: string,
  jcr_link: string,
  jif: string
  researcher_id: string
}

export function NewsArticles() {
    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const [tab, setTab] = useState('all')

    const {urlGeral} = useContext(UserContext)

    const [pesquisaInput, setPesquisaInput] = useState('');

    let urlMagazine = `${urlGeral}magazine?initials=nat&issn=`
  
 
    if (pesquisaInput == "") {
      urlMagazine = `${urlGeral}magazine?initials=nat&issn=`
    }

else if (/^\d+$/.test(pesquisaInput)) {
// Se filterValue contiver apenas números
urlMagazine = `${urlGeral}magazine?initials=&issn=${pesquisaInput}`;
} else {
// Se filterValue contiver uma string
urlMagazine = `${urlGeral}magazine?initials=${pesquisaInput}&issn=`;
}

const [magazine, setMagazine] = useState<Magazine[]>([]);

useEffect(() => {
    const fetchData = async () => {
 
      try {
        const response = await fetch(urlMagazine, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'text/plain'
          }
        });
        const data = await response.json();
        if (data) {
          setMagazine(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
 
      }
    };
    fetchData();
  }, [urlMagazine]);

  let qualisColor = {
'A1': 'bg-[#006837]',
'A2': 'bg-[#8FC53E]',
'A3': 'bg-[#ACC483]',
'A4': 'bg-[#BDC4B1]',
'B1': 'bg-[#F15A24]',
'B2': 'bg-[#F5831F]',
'B3': 'bg-[#F4AD78]',
'B4': 'bg-[#F4A992]',
'B5': 'bg-[#F2D3BB]',
'C': 'bg-[#EC1C22]',
'None': 'bg-[#560B11]',
'SQ': 'bg-[#560B11]'
}

const [count, setCount] = useState(12)

//

const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);

const urlTermPublicacoes = urlGeral + 'recently_updated?year=2024&university='

useMemo(() => {
    const fetchData = async () => {
        try {

          const response = await fetch( urlTermPublicacoes, {
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
            setPublicacoes(data);
          
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [ urlTermPublicacoes]);


    return(
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Tabs defaultValue={tab}  value={tab} className="h-full" >
          <div className="w-full  gap-4">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {tab == 'all' ? ('Produções mais recentes'):('Todas as revistas')}
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger onClick={() => setTab('all')} value="all" className="text-zinc-600 dark:text-zinc-200">Produções mais recentes</TabsTrigger>
             
                <TabsTrigger value="unread" onClick={() => setTab('unread')}  className="text-zinc-600 dark:text-zinc-200">Todas as revistas</TabsTrigger>
               
                </TabsList>
               
          
                <Button size="sm">Button</Button>
              </div>
            </div>

            </div>

            <TabsContent value="all" className="max-h-[calc(100vh-135px)] h-full">
           
 <div className="flex  flex-col  h-full ">
 <div className="lg:max-w-[500px]  mt-2">
            

                        <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block mb-3">
                           Pesquise{" "}
                            <strong className="bg-[#709CB6] rounded-md px-3 pb-2 text-white font-medium">
                            o nome ou ISSN
                            </strong>{" "}
                            da revista para ver as informações
                        </h1>
                        <p className="max-w-[750px] text-lg font-light text-foreground">
                        Para ajudar a sua pesquisa, fornecemos uma lista extensa de revistas e suas classificações.
                        </p>
                        
                    </div>

                    
           <div className="flex flex-1  max-w-[calc(100vw-120px)]">
           <Carousel className="w-full flex gap-3 items-center "
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
           >
                <CarouselPrevious />
      <CarouselContent className="-ml-1 flex w-full flex-1">
        {publicacoes.slice(0,10).map((props, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
            <ArticleItem
    id={props.id}
            doi={props.doi}
            name_periodical={props.name_periodical}
            qualis={props.qualis}
            title={props.title.toUpperCase()}
            year={props.year}
            color={props.color}
            researcher={props.researcher}
            lattes_id={props.lattes_id}
            magazine={props.magazine}
            lattes_10_id={props.lattes_10_id}
            jcr_link={props.jcr_link}
            jif={props.jif}
            researcher_id={props.researcher_id}
            distinct={props.distinct}
    />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
     
      <CarouselNext />
      
    </Carousel>
           </div>
 </div>

                  
            </TabsContent>

            <TabsContent value="unread">
            <div className="mt-4 ">
         

                        <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block mb-3">
                           Pesquise{" "}
                            <strong className="bg-[#709CB6] rounded-md px-3 pb-2 text-white font-medium">
                            o nome ou ISSN
                            </strong>{" "}
                            da revista para ver as informações
                        </h1>
                        <p className="max-w-[750px] text-lg font-light text-foreground">
                        Para ajudar a sua pesquisa, fornecemos uma lista extensa de revistas e suas classificações.
                        </p>
                        <div className="flex gap-3 mt-3">
                            <div className="flex gap-3 items-center w-full max-w-[550px] rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-400">
                                <MagnifyingGlass size={16} className="whitespace-nowrap w-10" />

                                <Input className="border-0 p-0 h-9 flex flex-1" value={pesquisaInput} onChange={(e) => setPesquisaInput(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                    {pesquisaInput.length === 0 ? (
   <h3 className="text-2xl font-medium mb-8 ">
    Mostrando todas as revistas, digite para aparecer mais
  </h3>
) : /^\d+$/.test(pesquisaInput) ? (
  <h3 className="text-2xl font-medium mb-8">
    Mostrando a revista pelo ISSN #{pesquisaInput}
  </h3>
) : (
  <h3 className="text-2xl font-medium mb-8">
    Mostrando todas as revistas com "{pesquisaInput}" contido no título
  </h3>
)}


                {magazine.length == 0 ? (
                  <p>Nenhuma revista encontrada</p>
                ):(
                     <div>
                       <ResponsiveMasonry
                      columnsCountBreakPoints={{
                          350: 1,
                          750: 2,
                          900: 3,
                          1200: 3
                      }}
                  >
                                   <Masonry gutter="16px">
                                      {magazine.slice(0, count).map((props) => (
                                        <div className="flex">
                                         <div className={`h-full w-2 min-w-[8px] rounded-l-lg border border-r-0 border-neutral-200 dark:border-neutral-800 ${qualisColor[props.qualis as keyof typeof qualisColor]}` }></div>
                                        
                                         <Alert className="flex items-center rounded-l-none">
                                          <div className="flex items-center flex-1">
                                           
      
                                              <div >
                                              <div className="flex items-center gap-2">
                                                  <Hash size={16} className="text-gray-400" />
                                                  <p className="text-[13px]  text-gray-500">ISSN {props.issn}</p>
                                              </div>
                                              <h4 className="text-base font-medium ">{props.magazine}</h4>
                                             
                                             <div className="mt-2 flex items-center gap-4">

                                             <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
                                                <div className={`w-4 h-4 rounded-md ${qualisColor[props.qualis as keyof typeof qualisColor]}`}></div>Qualis {props.qualis}
                                              </div>

                                              {props.jif != "None" && (
              <Link to={props.jcr_link} className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
                <LinkBreak size={16} />JCR
              </Link>
            )}
                                             </div>
                                          </div>
                                          </div>
      
                                         
      
                      </Alert>
                                      </div>
                                      ))}
                                    </Masonry>
                                    </ResponsiveMasonry>

                                    {magazine.length >= count && (
            <div className="w-full flex justify-center my-8"><Button onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
        )}
                     </div>
                )}
                    </div>
            </TabsContent>
          </Tabs>
        </main>
    )
}
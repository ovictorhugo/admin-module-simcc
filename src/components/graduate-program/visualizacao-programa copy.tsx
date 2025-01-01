import {  ArrowLeftFromLine, ArrowRightFromLine, Book, ChevronDown, ChevronLeft, ChevronUp, Copyright, File,  Globe,  Info, LayoutDashboard, MapPinIcon, SlidersHorizontal, Star, Ticket, Users, X } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {  Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/context";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Books, Quotes } from "phosphor-react";
import { Alert } from "../ui/alert";
import { Search } from "../search/search";
import { useModalResult } from "../hooks/use-modal-result";
import { useModal } from "../hooks/use-modal-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_wordcloud from 'highcharts/modules/wordcloud';
import bg_popup from '../../assets/bg_home.png';
import { BarChart, Bar, XAxis, LabelList, CartesianGrid,   } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "../../components/ui/chart"
import { GraficoArtigosPorQualis } from "../dashboard/graficos/grafico-qualis";
import { DocentesPrograma } from "./docentes-programa";
import { IndicatorsGraduate } from "./indicators-graduate";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DialogHeader } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

import { DocentesGraduate } from "../dashboard/components/docentes-graduate";
import { DiscentesGraduate } from "../dashboard/components/discentes-graduate";

import { GraficoIndiceProdBibli } from "./grafico-indice-producao-bibliografica";
import { useTheme } from "next-themes";
import { LogoConecteeWhite } from "../svg/LogoConecteeWhite";
import { LogoConectee } from "../svg/LogoConectee";
import { GraduateProgram } from "./graduate-program";
import { Badge } from "../ui/badge";

interface PalavrasChaves {
  term: string;
  among: number;
}

interface GraduateProgram {
    area: string;
    code: string;
    graduate_program_id: string;
    modality: string;
    name: string;
    rating: string;
    type: string;
    city: string
    state: string
    instituicao: string
    url_image: string
    region: string
    sigla: string
    latitude: string
    longitude: string
    visible:string
    qtd_discente:string
    qtd_colaborador:string
    qtd_permanente:string
    site:string 
    acronym:string
    description?: string
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

  type Research = {
    count_article:number
    count_book:number
    count_book_chapter:number,
    count_guidance:number
    count_patent:number
    count_report:number
    count_software:number
    count_guidance_complete:number
    count_guidance_in_progress:number
    count_patent_granted:number
    count_patent_not_granted:number
    count_brand:number
    graduantion:string
    year:number

    A1:number
  A2:number
  A3:number 
  A4:number
  B1:number 
  B2:number
  B3:number
  B4:number 
  C:number
  SQ:number
  }

  type PesosProducao = {
    a1: string;
    a2: string;
    a3: string;
    a4: string;
    b1: string;
    b2: string;
    b3: string;
    b4: string;
    c: string;
    sq: string;
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    f5: string;
    livro: string;
    cap_livro: string;
    software: string;
    patent_granted: string;
    patent_not_granted: string;
    report: string;
    book: string;
  book_chapter: string;
  };
  
  
  HC_wordcloud(Highcharts);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  
  
  const chartConfig = {
    views: {
      label: "Page Views",
    },
    producao_bibliografica: {
      label: "Produção bibliográfica",
      color: "hsl(var(--chart-1))",
    },
    producao_tecnica: {
      label: "Produção técnica",
      color: "hsl(var(--chart-2))",
    },
    count_article: {
      label: "Artigos",
      color: "hsl(var(--chart-2))",
    },
    count_book: {
      label: "Livros",
      color: "hsl(var(--chart-2))",
    },
    count_book_chapter: {
      label: "Capítulos de livros",
      color: "hsl(var(--chart-2))",
    },
    count_patent: {
      label: "Patentes",
      color: "hsl(var(--chart-2))",
    },
    count_brand: {
      label: "Marcas",
      color: "hsl(var(--chart-2))",
    },
    count_software: {
      label: "Softwares",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  


export function VisualizacaoPrograma() {
  const {urlGeral, itemsSelecionados, searchType, permission, urlGeralAdm} = useContext(UserContext)
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

  console.log(graduatePrograms)

  const [totalProducao, setTotalProducao] = useState<Total[]>([]);

  const urlTotalProgram = `${urlGeral}graduate_program_production?graduate_program_id=${type_search}&year=1900`;

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
          setTotalProducao(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlTotalProgram]);

  const [isOn, setIsOn] = useState(true);

  const { onOpen, type: typeResult } = useModalResult();

  /////////////////////////

  
  const [dados, setDados] = useState<Research[]>([]);
  const [year, setYear] = useState(new Date().getFullYear()-4);

  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYear; i > currentYear - 30; i--) {
      years.push(i);
  }


  let urlDados = `${urlGeral}ResearcherData/DadosGerais?year=${year}&graduate_program_id=${type_search}`

  useEffect(() => {
    const fetchData = async () => {
        try {
     
          const response = await fetch(urlDados, {
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
            setDados(data);
    
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [urlDados]);

   


  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>('producao_bibliografica')

  const total = useMemo(
    () => ({
      producao_bibliografica: dados.reduce(
        (acc, curr) => acc + curr.count_article + curr.count_book + curr.count_book_chapter,
        0
      ),
      producao_tecnica: dados.reduce((acc, curr) => acc + curr.count_patent + curr.count_software + curr.count_brand, 0),
    }),
    [dados]
  );
  

  /////////
 
  
    const [visibleChart, setVisibleChart] = useState(0);
    const chartKeys = ['count_article', 'count_patent', 'count_guidance_in_progress'];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setVisibleChart((prev) => (prev + 1) % chartKeys.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, [chartKeys.length]);
  

    ///
    const qualisColor = {
      'MESTRADO': 'bg-blue-200',
      'DOUTORADO': 'bg-blue-800',
    };
  

    //palavars
const [words, setWords] = useState<PalavrasChaves[]>([]);
let urlPalavrasChaves = `${urlGeral}lists_word_researcher?graduate_program_id=${type_search}&researcher_id=`

  useEffect(() => {
    const fetchData = async () => {
 
      try {
        const response = await fetch(urlPalavrasChaves, {
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
          setWords(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
   
      }
    };
    fetchData();
  }, []);

 

  
  const has_visualizar_indicadores_pos_graduacao = permission.some(
    (perm) => perm.permission === 'visualizar_indicadores_pos_graduacao'
  );

  const [tab, setTab] = useState('all')
  const [tab2, setTab2] = useState('all')

  useEffect(() => {
    if(!has_visualizar_indicadores_pos_graduacao) {
      setTab('all')
    } 
}, [permission]);

const [isOpenSheet, setIsOpenSheet] = useState(false); 
const [expand, setExpand] = useState(false)

const has_editar_informacoes_programa = permission.some(
  (perm) => perm.permission === 'editar_informacoes_programa'
);

const graduate_program_id = graduatePrograms && graduatePrograms[0] ? graduatePrograms[0].graduate_program_id : null;

//pesos prod

const [a1, seta1] = useState('');
const [a2, seta2] = useState('');
const [a3, seta3] = useState('');
const [a4, seta4] = useState('');
const [b1, setb1] = useState('');
const [b2, setb2] = useState('');
const [b3, setb3] = useState('');
const [b4, setb4] = useState('');
const [c, setc] = useState('');
const [sq, setsq] = useState('');

const [livro, setLivro] = useState('');
const [capLivro, setCapLivro] = useState('');

const [t1, setT1] = useState('');
const [t2, setT2] = useState('');
const [t3, setT3] = useState('');
const [t4, setT4] = useState('');
const [t5, setT5] = useState('');

const [software, setSoftware] = useState('');
const [patenteCondecida, setPatenteConcedida] = useState('');
const [patenteNaoConcedida, setPatenteNaoConcedida] = useState('');
const [relTec, setRelTec] = useState('');

const [pesosProducao, setPesosProducao] = useState<PesosProducao>({
    a1: a1,
    a2: a2,
    a3: a3,
    a4: a4,
    b1: b1,
    b2: b2,
    b3: b3,
    b4: b4,
    c: c,
    sq: sq,
    f1: t1,
    f2: t2,
    f3: t3,
    f4: t4,
    f5: t5,
    livro: livro,
    cap_livro: capLivro,
    software: software,
    patent_granted: patenteCondecida,
    patent_not_granted: patenteNaoConcedida,
    report: relTec,
    book: livro,
  book_chapter: capLivro
  })


  const urlGet = urlGeralAdm + `indprod/query?institution_id=083a16f0-cccf-47d2-a676-d10b8931f66b`;

  console.log(urlGet)
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(urlGet, {
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
      if (data.length != 0) {
        const newData = data[0] // Assumindo que data é um array e tem apenas um elemento
        seta1(newData.a1);
        seta2(newData.a2);
        seta3(newData.a3);
        seta4(newData.a4);
        setb1(newData.b1);
        setb2(newData.b2);
        setb3(newData.b3);
        setb4(newData.b4);
        setc(newData.c);
        setsq(newData.sq);
        setT1(newData.f1);
        setT2(newData.f2);
        setT3(newData.f3);
        setT4(newData.f4);
        setT5(newData.f5);
        setLivro(newData.book);
        setCapLivro(newData.book_chapter);
        setSoftware(newData.software);
        setPatenteConcedida(newData.patent_granted);
        setPatenteNaoConcedida(newData.patent_not_granted);
        setRelTec(newData.report);

        setPesosProducao(newData)

      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, []);

const { theme } = useTheme()

const [clientId, setClientId] = useState<string | null>(null);
const [provider, setProvider] = useState<string | null>(null);

useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname.split('/');
    
    // Supondo que o ID do cliente seja o segundo segmento do caminho da URL
    const id = pathname[1] || null;
    setClientId(id);

    // Supondo que o provedor seja o hostname do URL
    const providerName = url.hostname;
    setProvider(providerName);
}, []);


    return(
       <>
         {graduatePrograms.slice(0,1).map((props) => (
      props.visible === 'false' ? (
        <div style={{ backgroundImage: `url(${bg_popup})` }} className="h-screen bg-cover bg-no-repeat bg-center w-full flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                        <Link to={'/'} className='h-10 mb-24 absolute top-16 '>
            {theme == 'dark' ? (<LogoConecteeWhite/>):(<LogoConectee/>)}
        </Link>
        <div className="w-full flex flex-col items-center justify-center">
                <p className="text-9xl text-[#719CB8] font-bold mb-16 animate-pulse">{`(⊙﹏⊙)`}</p>
                <h1 className=" text-4xl text-neutral-400 font-medium leading-tight tracking-tighter lg:leading-[1.1] ">Parece que não é possível acessar as informações desse programa</h1>
               
                <p className="font-medium text-sm mt-2">
                  Código do erro: 404
                </p>

                <p className="font-medium text-sm">
                  Servidor: {provider}
                </p>

                <p className="font-medium text-sm ">
                  Caminho da URL: {clientId}
                </p>

              </div>
     
        </div>
      ) : (
        <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
            <Tabs defaultValue={'all'} className="h-full" >
            <div className="w-full  gap-4 md:p-8 p-4 pb-0 md:pb-0">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pós-graduação
              </h1>
             <Badge variant={'outline'} className="max-w-[500px] truncate">
             {graduatePrograms.map((props) => (
          <>{props.name}</>
        ))}
             </Badge>

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" onClick={() =>setTab('all')} className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
              <TabsTrigger value="doc" onClick={() =>setTab('doc')}className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
              <TabsTrigger disabled={!has_visualizar_indicadores_pos_graduacao} value="ind" onClick={() =>setTab('ind')}className="text-zinc-600 dark:text-zinc-200">Indicadores</TabsTrigger>
           

　　 　 　 　
                </TabsList>
               {has_editar_informacoes_programa && (
                 <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
                 <SheetTrigger>
   <Button onClick={() => setExpand(false)} className="h-8" size={'sm'}><LayoutDashboard size={16}/>Painel administrativo</Button>
   </SheetTrigger>
 
   <SheetContent className={`p-0 dark:bg-neutral-900 dark:border-gray-600 ${expand ? ('min-w-[80vw]'):('min-w-[50vw]')}`}>
   <Tabs defaultValue={tab2} value={tab2} className="h-full" >
   <DialogHeader className="h-[50px] justify-center px-4 border-b">
 
  <div className="flex items-center gap-3">
  <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          <Button className="h-8 w-8" onClick={() => setExpand(!expand)} variant={'outline'} size={'icon'}>{expand ? (<ArrowRightFromLine size={16}/>):(<ArrowLeftFromLine size={16}/>)}</Button>
          </TooltipTrigger>
          <TooltipContent> {expand ? ('Recolher'):('Expandir')}</TooltipContent>
        </Tooltip>
        </TooltipProvider>
 
       
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          <Button className="h-8 w-8" variant={'outline'}  onClick={() => setIsOpenSheet(false)} size={'icon'}><X size={16}/></Button>
          </TooltipTrigger>
          <TooltipContent> Fechar</TooltipContent>
        </Tooltip>
        </TooltipProvider>
           <div className="flex items-center flex-1  w-full justify-between">
 
           <div className="flex items-center gap-3 ml-auto"> 
           <TabsList >
              <TabsTrigger value="all" onClick={() => setTab2('all')} className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
                <TabsTrigger value="unread" onClick={() => setTab2('unread')} className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                <TabsTrigger value="movimentacao-bens" onClick={() => setTab2('movimentacao-bens')} className="text-zinc-600 dark:text-zinc-200">Discentes</TabsTrigger>
                </TabsList>
           
            
           </div>
           </div>
  </div>
          
 
         
         </DialogHeader>

         <ScrollArea className="relative whitespace-nowrap h-[calc(100vh-50px)] ">
         <TabsContent value="all" className="">
             
               </TabsContent>

               <TabsContent value="unread" className="">
               <DocentesGraduate graduate_program_id={graduate_program_id || ''}/>
               </TabsContent>

               <TabsContent value="movimentacao-bens" className="">
               <DiscentesGraduate graduate_program_id={graduate_program_id || ''}/>
               </TabsContent>
         </ScrollArea>
 </Tabs>
         </SheetContent>
                 </Sheet>
               )}
          
　　 　 　 　
              </div>
            </div>

            </div>

            <TabsContent value="all" className="h-auto flex flex-col gap-4 md:gap-8  ">
            <div className="md:p-8 p-4 py-0 md:py-0 mt-2">
                 
        
        <h1 className=" max-w-[700px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
        {graduatePrograms.map((props) => (
          <>{props.name}</>
        ))}
        </h1>
      
        {graduatePrograms.map((props) => (
                  <div className="flex flex-wrap gap-4 ">
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12}/>{props.type}</div>
          <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center capitalize"><MapPinIcon size={12}/>{props.city}</div>
          {props.rating != '' && (
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12}/>{props.rating}</div>
                      )}
            </div>
              ))}
                  </div>

                  {itemsSelecionados.length > 0 ? (
                     <div className="">
                     <div className={`w-full ${isOn ? 'px-8' : 'px-4'} border-b border-b-neutral-200 dark:border-b-neutral-800`}>
                       {isOn && (
                         <div className="w-full pt-4  flex justify-between items-center">
                           <Search />
                         </div>
                       )}
                       <div className={`flex py-2 justify-between items-center ${isOn ? 'pb-8' : ''} `}>
                         <div className="flex items-center gap-2">
                         <div className={`pb-2 border-b-2 transition-all ${typeResult == 'researchers-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                   <Button variant={typeResult == 'researchers-home' ? ('ghost'):('ghost')}  className={`${typeResult}`} onClick={() => onOpen('researchers-home')}>
                      <Users className="h-4 w-4" />
                      Pesquisadores
                    </Button>
                   </div>
                   {searchType === 'article' && (
                       <div className={`pb-2 border-b-2  transition-all ${typeResult == 'articles-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'articles-home' ? ('ghost'):('ghost')}  className="m-0" onClick={() => onOpen('articles-home')}>
                        <Quotes className="h-4 w-4" />
                        Artigos
                      </Button>
                      </div>
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
                      <div className="md:p-8 p-4 py-0 md:py-0">
                       <div className="mb-6">
                       <Search />
                       </div>

                      {graduatePrograms.slice(0,1).map((props) => (
                         <div className="mb-4 md:mb-8">
                         <div
                                 className={`h-3 w-full rounded-t-md dark:border-neutral-800 border border-neutral-200 border-b-0 ${qualisColor[props.type.trim() as keyof typeof qualisColor]}  `}
                               ></div>
               
                           <Alert
                                     className="p-0 rounded-t-none"  x-chunk="dashboard-05-chunk-4"
                                   >
               
               <CardHeader className="flex flex-row items-start bg-neutral-100 dark:bg-neutral-800">
                           <div className="flex items-center justify-between w-full">
                             <CardTitle className="group flex items-center w-fit gap-2 text-lg">
                               <div className="w-fit">Informações</div>
                           
                             </CardTitle>
             <div className="flex gap-4 items-center justify-end flex-wrap ">
             
             
             
             <Link to={props.site} target="_blank"><div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Globe size={16}/> {props.site}</div></Link>
             
             
             </div>
                           </div>
                           <div className="ml-auto flex items-center gap-1">
                            
                            
                           </div>
                           
                         </CardHeader>
             
                         <CardContent className="p-6 text-sm">
                           {props.description}
                         </CardContent>
                       </Alert>
                         </div>
                      ))}

                      <Alert className="grid gap-3 lg:grid-cols-4 grid-cols-2 mb-4 md:mb-8">
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
                            {totalProducao.map((props) => (<>{props.article}</>))}
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
                            {totalProducao.map((props) => (<>{props.book}</>))}
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
                            {totalProducao.map((props) => (<>{props.book_chapter}</>))}
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
                            {totalProducao.map((props) => (<>{props.patent}</>))}
                           </span>
                            </CardContent>
　　　 　
                      </div>
　　　 　
　　　　　　　　　　

　　　　　　　　　　

                     </Alert>


                    
                      
                      </div>

                  )}
  
            </TabsContent>
            <TabsContent value="doc" className="h-auto flex flex-col gap-4 md:gap-8  ">
                    <DocentesPrograma/>
            </TabsContent>

            <TabsContent value="ind" className="h-auto flex flex-col gap-4 md:gap-8  ">
                    <IndicatorsGraduate/>
            </TabsContent>


            <TabsContent value="unread" className="h-auto flex flex-col gap-4 md:gap-8  ">
               
            </TabsContent>
            </Tabs>
        </main>
      )
    ))}
       </>
    )
}
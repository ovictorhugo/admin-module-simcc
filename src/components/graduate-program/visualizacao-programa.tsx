import {  Book, ChevronDown, ChevronLeft, ChevronUp, Copyright, File,  Info, MapPinIcon, SlidersHorizontal, Star, Ticket, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {  useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/context";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Books, Quotes } from "phosphor-react";
import { Alert } from "../ui/alert";
import { Search } from "../search/search";
import { useModalResult } from "../hooks/use-modal-result";
import { useModal } from "../hooks/use-modal-store";
import { DisplayItem } from "../dashboard/components/display-item";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_wordcloud from 'highcharts/modules/wordcloud';

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
  const {urlGeral, itemsSelecionados, searchType, user} = useContext(UserContext)
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
  const years = [];
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

  const options = {
    chart: {
      backgroundColor: 'transparent',
      height: '300px',
      display: 'flex',
      position: 'relative'
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false, // Remove a opção de menu para baixar o gráfico
    },
    series: [
      {
        type: 'wordcloud',
        data: words.map((word) => ({
          name: word.term,
          weight: word.among,
        })),

        style: {
          fontFamily: 'Ubuntu, sans-serif',
        },
      },
    ],
    title: {
      text: '',
    },
    plotOptions: {
      wordcloud: {
        borderRadius: 3,
        borderWidth: "1px",
        borderColor: 'blue',
        BackgroundColor: 'red',
        colors: ['#9CBCCE', '#284B5D', '#709CB6'],

      },
    },
  };

    return(
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
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
              <TabsTrigger value="doc" className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
              <TabsTrigger value="ind" className="text-zinc-600 dark:text-zinc-200">Indicadores</TabsTrigger>
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Administrativo</TabsTrigger>

              
                </TabsList>
               
          
                <Button size="sm">Button</Button>
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


                     <div className="flex flex-col md:gap-8 gap-4">
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <div className="h-full gap-8 grid">
                    <Alert className="p-0 ">
                    <CardHeader className="flex p-10 flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Total de   docentes
                    </CardTitle>
                    <CardDescription>no programa</CardDescription>
                   
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                    <p>Fonte: Escola de Engenharia</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>

                <div className="flex flex-1 px-6">
           
                </div>

                    </Alert>

                    <Alert className="p-0 ">
                    <CardHeader className="flex flex-row p-10 items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                     Total de técnicos
                    </CardTitle>
                    <CardDescription>na Escola de Engenharia</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Fonte: Escola de Engenharia</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>

                  <div className="flex flex-1 px-6">
             
                </div>

                    </Alert>
                    </div>

                 

                    <Alert className="lg:col-span-2 h-[450px] p-0 ">
                    <CardHeader className="flex p-0 flex-col items-stretch space-y-0 border-b dark:border-b-neutral-800  sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
        <CardHeader className="flex p-0 flex-row items-center justify-between space-y-0 ">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Produção geral
                    </CardTitle>
                    <CardDescription>Dados desde o ano {year}</CardDescription>
                    </div>

                    <div className="flex items-center gap-3">
                   <Select defaultValue={String(year)} value={String(year)} onValueChange={(value) => setYear(Number(value))}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Essas informações não representam a produção total da Escola desde a sua fundação, é um recorte a partir de {year}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   </div>
                   
                  </CardHeader>
        </div>
        <div className="flex">
          {["producao_bibliografica", "producao_tecnica"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className={`relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 dark:border-l-neutral-800 sm:px-8 sm:py-6 ${activeChart === chart && ('bg-neutral-100 dark:bg-neutral-800')} ${activeChart ===  'producao_tecnica' && ('rounded-tr-md')}`}
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
  <BarChart accessibilityLayer data={dados} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
  <CartesianGrid vertical={false}  horizontal={false}/>
  <ChartLegend content={<ChartLegendContent />} />
  
  <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            
            />

<ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

{activeChart == 'producao_bibliografica' && (
  <>
  <Bar dataKey="count_article" fill="#5F82ED" radius={4} >
  <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />


  </Bar>
<Bar dataKey="count_book" fill="#792F4C" radius={4} >
<LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
</Bar>
<Bar dataKey="count_book_chapter" fill="#DBAFD0" radius={4} >
<LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
  </Bar></>
)}

{activeChart == 'producao_tecnica' && (
  <>
  <Bar dataKey="count_patent" fill="#66B4D0" radius={4} >
  <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
  </Bar>
<Bar dataKey="count_brand" fill="#1B1464" radius={4} >
<LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
</Bar>
<Bar dataKey="count_software" fill="#096670" radius={4} >
<LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
              </Bar></>
)}

  </BarChart>
          </ChartContainer>
        </CardContent>
                    </Alert>
                  </div>

                  <div className="grid  gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">

                    <Alert className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                    Artigos qualificados
                    </CardTitle>
                    <CardDescription>Avaliação Qualis Sucupira </CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Fonte: Plataforma Lattes e Sucupira Qualis</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                      <GraficoArtigosPorQualis dados={dados}/>
                  </CardContent>

                  
                    </Alert>

                    <Alert className=" h-full ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                    Nuvem de palavras
                    </CardTitle>
                    <CardDescription>Termos mais presentes nos artigos</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Fonte: Plataforma Lattes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>
                  <div id="nuveeeem" className="flex w-full justify-center items-center">
              <HighchartsReact highcharts={Highcharts} options={options}  className={'h-full'} />
              </div>
                    </Alert>
                  </div>
                  </div>
                      
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
                 <div className="px-">
                 {graduatePrograms.map((total) => (
                     <DisplayItem
                     graduate_program_id={total.graduate_program_id}
                     code={total.code}
                     name={total.name}
                     area={total.area}
                     modality={total.modality}
                     type={total.type}
                     rating={total.rating}
                     institution_id={user?.institution_id || ''}
                     url_image={total.url_image}
                     city={total.city}
                     visible={Boolean(total.visible)}
                     qtd_discente={total.qtd_discente}
                     qtd_colaborador={total.qtd_colaborador}
                     qtd_permanente={total.qtd_permanente}
                     />
                  ))}
                 </div>
            </TabsContent>
            </Tabs>
        </main>
    )
}
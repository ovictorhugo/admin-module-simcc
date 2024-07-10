
import { Circle } from "../svg/Circle";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/context";
import { ItemHome } from "./item-home";

import bg_home from '../../assets/bg_home.png'

import {
  Book,
  Books,
  CaretRight,
  Chats,
  Code,
  Copyright,
  Funnel,
  MagnifyingGlass,
  Quotes,
  StripeLogo,
} from "phosphor-react";
import { ArrowRight, Info, User, User2, Users } from "lucide-react";
import { Alert } from "../ui/alert";
import { GraficoHome } from "./grafico-home";
import { useModalHomepage } from "../hooks/use-modal-homepage";

interface VisaoPrograma {
  article: number;
  book: number;
  book_chapter: number;
  brand: number;
  patent: number;
  researcher: string;
  software: number;
  work_in_event: number;

}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "../hooks/use-modal-store";
import { Switch } from "../ui/switch";
import { SelectTypeSearch } from "../search/select-type-search";
import { Badge } from "../ui/badge";
import { Link, useLocation } from "react-router-dom";

import { AreaChart, Area,LineChart, Line, BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid,  Legend, ResponsiveContainer } from 'recharts';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
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
}

interface PalavrasChaves {
  term: string;
  among: number;
}

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_wordcloud from 'highcharts/modules/wordcloud';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { Label } from "../ui/label";


HC_wordcloud(Highcharts);

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
} satisfies ChartConfig


export function InitialHome() {
  const [VisaoPrograma, setVisaoPrograma] = useState<VisaoPrograma[]>([]);
  const { urlGeral, maria, setMaria,  searchType } = useContext(UserContext);

  let urlVisaoPrograma = `${urlGeral}/graduate_program_production?graduate_program_id=0&year=1900`;
  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlVisaoPrograma, {
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
          setVisaoPrograma(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlVisaoPrograma]);

  const [loading, isLoading] = useState(false)
  
  const [dados, setDados] = useState<Research[]>([]);
  const yearAtualMenosQuatro = new Date().getFullYear() - 4;
  let urlDados = `${urlGeral}ResearcherData/DadosGerais?year=${yearAtualMenosQuatro}`

  useEffect(() => {
    const fetchData = async () => {
        try {
          isLoading(true)
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
            isLoading(false)
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [urlDados]);

  const [enable, setEnable] = useState(false);

  const { isOpen, type } = useModalHomepage();
  const {onOpen } = useModal()

  const isModalOpen = isOpen && type === "initial-home";
  const [input, setInput] = useState("");

  const posGrad = location.pathname == '/pos-graduacao'

  console.log(urlDados)

//palavars
const [words, setWords] = useState<PalavrasChaves[]>([]);
let urlPalavrasChaves = `${urlGeral}lists_word_researcher?graduate_program_id=&researcher_id=`

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
      height: '200px',
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

  /////////////////////////

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
  

  return (
    <>
      {isModalOpen && (
        <div className=" items-center w-full flex flex-col   ">

         


          <div className="bg-cover  bg-no-repeat bg-center w-full" >
            
          <div className="justify-center w-full mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20" >
        <Link to={''}  className="inline-flex items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2 mb-3 px-3 py-1 text-sm font-medium"><Info size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Saiba como utilizar a plataforma<ArrowRight size={12}/></Link>
        
            <h1 className="z-[2] text-center max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
              Experimente{" "}
              <strong className="bg-[#709CB6]  rounded-md px-3 pb-2 text-white font-medium">
                {" "}
                pesquisar um tema
              </strong>{" "}
              e veja o que a plataforma pode filtrar para você. 
            </h1>
            <p className="max-w-[750px] text-center text-lg font-light text-foreground"></p>


            <Alert  className="h-14 p-2 flex items-center justify-between max-w-[60vw]">
            <div className="flex items-center gap-2 w-full flex-1">
            <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
            <div className="flex gap-3  items-center">
                <div className="flex items-center gap-2">
                <Switch
                     checked={maria}
                     onCheckedChange={(value) => setMaria(value)}

                />
                     <Label className="flex gap-2 items-center">MarIA<Chats size={16} className="" /></Label>
                </div>

                {!maria && (
                    <SelectTypeSearch/>
                )}
                </div>
              
            <Input onClick={() => {
              if(maria) {

              }else {
                onOpen('search')
              }
            }}  onChange={(e) => setInput(e.target.value)} value={input}  type="text" className="border-0 w-full flex flex-1 "/>
                </div>

                <div className="w-fit">
                <Button  variant="outline" className={`${searchType == 'article'  && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract'  && ('bg-yellow-500 dark:bg-yellow-500')} ${maria && searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} ${searchType == 'speaker'  && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book'  && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent'  && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name'  && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area'  && ('bg-green-500 dark:bg-green-500')} ${searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} size={'icon'}>
       <Funnel size={16} className="" /> 
       
        </Button>
            </div>
                </Alert>

             
          </div>
          </div>

          <div className=" w-full md:px-8 md:gap-8 flex flex-col px-4">

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <div className="h-full gap-8 grid">
                    <Alert className=" ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Total de docentes
                    </CardTitle>
                    <CardDescription>da Escola de Engenharia</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>

                    </Alert>

                    <Alert className=" ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Produção bibliográfica
                    </CardTitle>
                    <CardDescription>Artigos, livros e capítulos</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>

                    </Alert>
                    </div>

                 

                    <Alert className="lg:col-span-2 h-[400px] p-0 ">
                    <CardHeader className="flex p-0 flex-col items-stretch space-y-0 border-b  sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
        <CardHeader className="flex p-0 flex-row items-center justify-between space-y-0 ">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Produção geral
                    </CardTitle>
                    <CardDescription>Dados da quadrienal</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>
        </div>
        <div className="flex">
          {["producao_bibliografica", "producao_tecnica"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6`}
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
          className="aspect-auto h-[250px] w-full"
        >
  <BarChart accessibilityLayer data={dados}>
  <CartesianGrid vertical={false}  horizontal={false}/>

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
  <Bar dataKey="count_article" fill="#719CB8" radius={4} >
  <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
  </Bar>
<Bar dataKey="count_book" fill="#274B5E" radius={4} >
<LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
</Bar>
<Bar dataKey="count_book_chapter" fill="#9CBDCF" radius={4} >
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
  <Bar dataKey="count_patent" fill="#719CB8" radius={4} >
  <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
  </Bar>
<Bar dataKey="count_brand" fill="#274B5E" radius={4} >
<LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
</Bar>
<Bar dataKey="count_software" fill="#9CBDCF" radius={4} >
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

                  <div className="grid md:mb-8 mb-4 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <Alert className=" h-[350px] lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Produção bibliográfica
                    </CardTitle>
                    <CardDescription>Artigos, livros e capítulos</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>

                    </Alert>


                    <Alert className="">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Produção anual
                    </CardTitle>
                    <CardDescription>Visão por quadrienal </CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>
                    </Alert>
                  </div>

          </div>
        </div>
      )}
    </>
  );
}

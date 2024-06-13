import { Label } from "@radix-ui/react-dropdown-menu";
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
import { ArrowRight, Info, User, Users } from "lucide-react";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { AreaChart, Area,LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
  year:number
}

interface PalavrasChaves {
  term: string;
  among: number;
}

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_wordcloud from 'highcharts/modules/wordcloud';

HC_wordcloud(Highcharts);

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


  return (
    <>
      {isModalOpen && (
        <div className=" items-center w-full flex flex-col   max-sm:ml-4">


          <div className="bg-cover bg-no-repeat bg-center w-full" style={{ backgroundImage: `url(${bg_home})` }}>
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

          <div className=" w-full px-8 md:px-8 grid md:grid-cols-2 gap-4">
          <ResponsiveMasonry
    columnsCountBreakPoints={{
        350: 1,
        750: 1,
        900: 1,
        1200: 2
    }}
>
                 <Masonry gutter="16px">
            <Alert className="p-0">
                <CardHeader className="flex flex-row m-0  justify-between">
           <div>
           {VisaoPrograma.map((props) => (
                  <CardTitle>{props.researcher} docentes</CardTitle>
                ))}
                
                  <CardDescription className="m-0 p-0">na Escola de Engenharia</CardDescription>

           </div>
                  <Users size={20}/>
                </CardHeader>
                <CardContent>
               
                </CardContent>

              </Alert>

              <Alert className="p-0">
                <CardHeader>
                
                  <CardTitle>Artigos por ano</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={100}>
                <LineChart  data={dados}>
                <XAxis dataKey="year" />
                
                <Tooltip />
                <Line type="monotone" dataKey="count_article" stroke="#9CBCCE" strokeWidth={2} />
              </LineChart>
                </ResponsiveContainer>
                </CardContent>

              </Alert>
              <Alert className="p-0 ">
                <CardHeader>
                  <CardTitle>Orientações</CardTitle>
                  <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-green-500 rounded-sm"></div>Concluídas</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-yellow-500 rounded-sm"></div>Em andamento</div>
          
        </div>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={dados}>
          
          <XAxis dataKey="year" />
          <Tooltip />
          <Area dataKey="count_guidance_complete" stackId="a" fill={`#6BC26B`} />
          <Area dataKey="count_guidance_in_progress" stackId="a" fill="#DBB540" />
        </AreaChart>
      </ResponsiveContainer>
                </CardContent>

              </Alert>

              <Alert className="p-0">
                <CardHeader>
                  <CardTitle>Nuvem de palavras</CardTitle>
                  <CardDescription>Termos mais utilizados</CardDescription>
                </CardHeader>
                <CardContent>
                <div id="nuveeeem" className="flex w-full h-[200px] justify-center items-center">
              <HighchartsReact highcharts={Highcharts} options={options}  className={'h-full'} />
              </div>
                </CardContent>

              </Alert>

              <Alert className="p-0 h-fit">
                <CardHeader className="flex flex-row m-0  justify-between">
           <div>
           {VisaoPrograma.map((props) => (
                  <CardTitle>{props.researcher} docentes</CardTitle>
                ))}
                
                  <CardDescription className="m-0 p-0">na Escola de Engenharia</CardDescription>

           </div>
                  <Users size={20}/>
                </CardHeader>
                <CardContent>
               
                </CardContent>

              </Alert>
          
          
              </Masonry>
        </ResponsiveMasonry>

              <div className="gap-4 flex flex-col">
              <Alert className="p-0">
                <CardHeader>
                  <CardTitle>Produção bibliográfica</CardTitle>
                  <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-[#709CB6] rounded-sm"></div>Artigos</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-[#9CBCCE] rounded-sm"></div>Livros</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-[#284B5D] rounded-sm"></div>Capítulos de livro</div>
        </div>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={200}>
        <BarChart data={dados}>
        
          <XAxis dataKey="year" />
          <Tooltip />
          <Bar dataKey="count_article" stackId="a" fill="#709CB6" />
          <Bar dataKey="count_book" stackId="a" fill="#9CBCCE" />
          <Bar dataKey="count_book_chapter" stackId="a" fill="#284B5D" />
        </BarChart>
      </ResponsiveContainer>
                </CardContent>

              </Alert>

              <div className=" w-full grid  grid-cols-1 lg:grid-cols-2 gap-4">
            <Alert className="p-0">
                <CardHeader>
                  <CardTitle>Produção técnica</CardTitle>

                  <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-[#709CB6] rounded-sm"></div>Patentes</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-[#9CBCCE] rounded-sm"></div>Softwares</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-[#284B5D] rounded-sm"></div>Marcas</div>
        </div>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={150}>
        <BarChart data={dados}>
          
          <XAxis dataKey="year" />
          <Tooltip />
          <Bar dataKey="count_patent" stackId="a" fill="#709CB6" />
          <Bar dataKey="count_software" stackId="a" fill="#9CBCCE" />
          <Bar dataKey="count_brand" stackId="a" fill="#284B5D" />
        </BarChart>
      </ResponsiveContainer>
                </CardContent>

              </Alert>

              <Alert className="p-0 h-fit">
                <CardHeader className="flex flex-row m-0  justify-between">
           <div>
           {VisaoPrograma.map((props) => (
                  <CardTitle>{props.researcher} docentes</CardTitle>
                ))}
                
                  <CardDescription className="m-0 p-0">na Escola de Engenharia</CardDescription>

           </div>
                  <Users size={20}/>
                </CardHeader>
                <CardContent>
               
                </CardContent>

              </Alert>
          
              </div>
              </div>

              <div className=" w-full grid md:grid-cols-1">
              
          
          </div>
          
          </div>
        </div>
      )}
    </>
  );
}

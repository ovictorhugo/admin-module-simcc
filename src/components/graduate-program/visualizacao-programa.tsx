import { ArrowLeftFromLine, ArrowRightFromLine, Book, BookOpen, ChevronDown, ChevronLeft, ChevronUp, Copyright, File, Globe, GraduationCap, Home, Info, LayoutDashboard, MapPinIcon, SlidersHorizontal, Star, Ticket, Users, Users2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { BarChart, Bar, XAxis, LabelList, CartesianGrid, } from 'recharts';


import { GraficoArtigosPorQualis } from "../dashboard/graficos/grafico-qualis";
import { DocentesPrograma } from "./docentes-programa";
import { IndicatorsGraduate } from "./indicators-graduate";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DialogHeader } from "../ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { DocentesGraduate } from "../dashboard/components/docentes-graduate";
import { DiscentesGraduate } from "../dashboard/components/discentes-graduate";

import { GraficoIndiceProdBibli } from "./grafico-indice-producao-bibliografica";
import { useTheme } from "next-themes";
import { LogoConecteeWhite } from "../svg/LogoConecteeWhite";
import { LogoConectee } from "../svg/LogoConectee";

import { Badge } from "../ui/badge";
import { HomepageProgram } from "./homepage-program";
import { PainelAdminGraduate } from "./painel-admin-graduate";
import { Helmet } from "react-helmet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
  visible: string
  qtd_discente: string
  qtd_colaborador: string
  qtd_permanente: string
  site: string
  acronym: string
  description?: string
}

interface Total {
  article: string
  book: string
  book_chapter: string
  brand: string
  patent: string
  researcher: string
  software: string
  work_in_event: string
}

type Research = {
  count_article: number
  count_book: number
  count_book_chapter: number,
  count_guidance: number
  count_patent: number
  count_report: number
  count_software: number
  count_guidance_complete: number
  count_guidance_in_progress: number
  count_patent_granted: number
  count_patent_not_granted: number
  count_brand: number
  graduantion: string
  year: number

  A1: number
  A2: number
  A3: number
  A4: number
  B1: number
  B2: number
  B3: number
  B4: number
  C: number
  SQ: number
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

export function VisualizacaoPrograma() {
  const { urlGeral, itemsSelecionados, searchType, permission, urlGeralAdm } = useContext(UserContext)
  const { onOpen: onOpenModal } = useModal();
  const history = useNavigate();

  const handleVoltar = () => {
    history(-1);
  }

  const queryUrl = useQuery();
  const type_search = queryUrl.get('graduate_program_id');

  const [graduatePrograms, setGraduatePrograms] = useState<GraduateProgram>();

  const urlGraduateProgram = `${urlGeral}graduate_program_profnit?id=${type_search}`;
  const [loading, setLoading] = useState(true);
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
          setGraduatePrograms(data[0]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [urlGraduateProgram]);


  const { version } = useContext(UserContext)
  const { theme } = useTheme()

  const siteTitle = graduatePrograms?.name
  ? `${graduatePrograms.name} | ${version ? "Conectee" : "Simcc"}`
  : `${version ? "Conectee" : "Simcc"} | ${version ? "Escola de Engenharia UFMG" : "SECTI-BA"}`;

const siteDescription = graduatePrograms?.name
  ? `${graduatePrograms.name} | Conectee`
  : `${version ? "Conectee" : "Simcc"} | ${version ? "Escola de Engenharia UFMG" : "SECTI-BA"}`;


    const tabs = [
      { id: "visao_geral", label: "Visão geral", icon: Home },
      { id: "producoes", label: "Produções", icon: Users2 },
      { id: "linhas_pesquisa", label: "Linhas de pesquisa", icon: Users2 },
      { id: "docentes", label: "Docentes", icon: Users2 },
      { id: "indicadores", label: "Indicadores", icon: Users2 },

    ];

    const [value, setValue] = useState(tabs[0].id)

if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground">Carregando dados...</p>
    </div>
  );
}

if (!graduatePrograms || graduatePrograms.visible === "false") {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900"
      style={{ backgroundImage: `url(${bg_popup})` }}
    >
      <Link to="/" className="absolute top-16">
        {theme === "dark" ? <LogoConecteeWhite /> : <LogoConectee />}
      </Link>

      <div className="text-center px-4">
        <p className="text-9xl text-[#719CB8] font-bold mb-6 animate-pulse">
          (⊙﹏⊙)
        </p>
        <h1 className="text-3xl md:text-4xl text-neutral-400 font-medium leading-tight">
          Não foi possível acessar as informações deste programa.
        </h1>
        <p className="mt-2 text-sm text-neutral-500">Erro 404</p>
      </div>
    </div>
  );
}

return(
  <>
  <Helmet>
    <title>{siteTitle}</title>
    <meta name="description" content={siteDescription} />
    <meta name="robots" content="index, follow" />
  </Helmet>

  <main className="grid grid-cols-1 ">
  <Tabs defaultValue={tabs[0].id} value={value} className="">
  <div className="bg-eng-blue pb-0 md:pb-0 p-4 md:p-8 flex-col flex justify-end items-end w-full absolute top-0 left-0 h-[300px]">
  <div className="w-fit gap-8 max-w-[900px]">
<ScrollArea className="relative overflow-x-auto">
<TabsList className="p-0 justify-start flex gap-2 h-auto bg-transparent dark:bg-transparent">
{tabs.map(
({ id, label, icon: Icon }) =>
 
    <div
      key={id}
      className={`pb-2 border-b-2 text-black dark:text-white transition-all ${
        value === id ? "border-b-white" : "border-b-transparent"
      }`}
      onClick={() => setValue(id)}
    >
      <Button variant="ghost" className={`m-0 text-white hover:text-eng-blue ${ value === id ? "bg-white text-eng-blue" : ""}`}>
        <Icon size={16} />
        {label}
      </Button>
    </div>
  
)}
</TabsList>
<ScrollBar orientation="horizontal" />
</ScrollArea>

<div>

</div>
</div>
  </div>
 
 <div className="grid grid-cols-1 gap-4 md:gap-8 p-4 md:p-8 z-[2]">
 <div
                  className="
                    flex flex-col items-center gap-4 justify-between

                    md:flex-row
                  "
                >
                  <div className="flex gap-2">
                    <Button onClick={handleVoltar} variant="outline" size="icon" className="h-7 w-7 text-eng-blue hover:text-eng-blue">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Voltar</span>
                    </Button>
                    <div
                      className="
                        flex flex-col gap-2

                        md:flex-col

                        lg:flex-row
                      "
                    >
                      <h1 className="flex-1 shrink-0 text-white whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Pós-graduação
        
      </h1>
                    </div>
                  </div>

                  <div
                    className="
                      flex items-center gap-2 flex-wrap
                    "
                  >
     
    <Link to={''}>
    <Button  className="h-8 text-eng-blue hover:text-eng-blue" size={'sm'} variant={'outline'}><LayoutDashboard size={16} />Painel administrativo</Button>
    </Link>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-12">
        <div className="flex flex-col  gap-6 mt-8">
          <Avatar className="cursor-pointer rounded-lg  h-24 w-24">
            <AvatarImage className={'rounded-md h-24 w-24'} src={``} />
            <AvatarFallback className="flex items-center justify-center"><GraduationCap size={24} /></AvatarFallback>
          </Avatar>

          <div>
          <h1 className="text-2xl mb-2 max-w-[800px] font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
              {graduatePrograms.name}
            </h1>

            <p className="max-w-[750px] text-lg font-light text-foreground">
              <div className="flex flex-wrap gap-4 ">
                <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12} />{graduatePrograms.type}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center capitalize"><MapPinIcon size={12} />{graduatePrograms.city}</div>
                {graduatePrograms.rating != '' && (
                  <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12} />CONCEITO CAPES: {graduatePrograms.rating}</div>
                )}
              </div>
            </p>

           
          </div>
        </div>
      </div>

              
               

<TabsContent value="visao_geral" className="m-0">
<HomepageProgram program={graduatePrograms} />
</TabsContent>

               
 </div>
 </Tabs>
  </main>
  
</>
)

}
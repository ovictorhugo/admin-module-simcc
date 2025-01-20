import { ArrowLeftFromLine, ArrowRightFromLine, Book, ChevronDown, ChevronLeft, ChevronUp, Copyright, File, Globe, Info, LayoutDashboard, MapPinIcon, SlidersHorizontal, Star, Ticket, Users, X } from "lucide-react";
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
import { ScrollArea } from "../ui/scroll-area";

import { DocentesGraduate } from "../dashboard/components/docentes-graduate";
import { DiscentesGraduate } from "../dashboard/components/discentes-graduate";

import { GraficoIndiceProdBibli } from "./grafico-indice-producao-bibliografica";
import { useTheme } from "next-themes";
import { LogoConecteeWhite } from "../svg/LogoConecteeWhite";
import { LogoConectee } from "../svg/LogoConectee";
import { GraduateProgram } from "./graduate-program";
import { Badge } from "../ui/badge";
import { HomepageProgram } from "./homepage-program";
import { PainelAdminGraduate } from "./painel-admin-graduate";

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

  const [isOn, setIsOn] = useState(true);

  const { onOpen, type: typeResult } = useModalResult();


  const qualisColor = {
    'MESTRADO': 'bg-blue-200',
    'DOUTORADO': 'bg-blue-800',
  };

  const has_visualizar_indicadores_pos_graduacao = permission.some(
    (perm) => perm.permission === 'visualizar_indicadores_pos_graduacao'
  );

  const [tab, setTab] = useState('all')

  useEffect(() => {
    if (!has_visualizar_indicadores_pos_graduacao) {
      setTab('all')
    }
  }, [permission]);

  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [expand, setExpand] = useState(false)

  const has_editar_informacoes_programa = permission.some(
    (perm) => perm.permission === 'editar_informacoes_programa'
  );

  const graduate_program_id = graduatePrograms && graduatePrograms[0] ? graduatePrograms[0].graduate_program_id : null;

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


  return (
    <>
      {graduatePrograms.slice(0, 1).map((props) => (
        props.visible === 'false' ? (
          <div style={{ backgroundImage: `url(${bg_popup})` }} className="h-screen bg-cover bg-no-repeat bg-center w-full flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900">
            <Link to={'/'} className='h-10 mb-24 absolute top-16 '>
              {theme == 'dark' ? (<LogoConecteeWhite />) : (<LogoConectee />)}
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
          <main className="grid grid-cols-1 gap-4 md:gap-8 ">
            <Tabs defaultValue={'all'} className="h-full" >
              <div className="w-full gap-4 md:p-8 p-4 pb-0 md:pb-0">
                <div
                  className="
                    flex flex-col items-center gap-4

                    md:flex-row

                    lg:flex-row
                  "
                >
                  <div className="flex gap-2">
                    <Button onClick={handleVoltar} variant="outline" size="icon" className="h-7 w-7">
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
                      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Pós-graduação
                      </h1>
                      <Badge
                        variant={'outline'}
                        className="
                          w-[300px] flex flew-wrap truncate
                          md:max-w-[500px] md:flex-nowrap
                          lg:max-w-[500px] lg:flex-nowrap
                        "
                      >
                        {graduatePrograms.map((props) => (
                          <>{props.name}</>
                        ))}
                      </Badge>
                    </div>
                  </div>

                  <div
                    className="
                      items-center gap-2 md:ml-auto md:flex
                    "
                  >
                    <TabsList>

                      <TabsTrigger value="all" onClick={() => setTab('all')} className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
                      <TabsTrigger value="doc" onClick={() => setTab('doc')} className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                      <TabsTrigger disabled={!has_visualizar_indicadores_pos_graduacao} value="ind" onClick={() => setTab('ind')} className="text-zinc-600 dark:text-zinc-200">Indicadores</TabsTrigger>



                    </TabsList>
                    {has_editar_informacoes_programa && (
                      <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
                        <SheetTrigger>
                          <Button onClick={() => setExpand(false)} className="h-8" size={'sm'}><LayoutDashboard size={16} />Painel administrativo</Button>
                        </SheetTrigger>

                        <SheetContent className={`p-0 dark:bg-neutral-900 dark:border-gray-600 ${expand ? ('min-w-[80vw]') : ('min-w-[50vw]')}`}>
                          <PainelAdminGraduate graduate_program_id={props.graduate_program_id} />
                        </SheetContent>

                      </Sheet>
                    )}


                  </div>
                </div>

              </div>

              <TabsContent value="all" className="h-auto flex flex-col gap-4 md:gap-8  ">
                <div className="md:p-8 p-4 py-0 md:py-0 mt-2">


                  <div>
                    {graduatePrograms.map((props) => (
                      <HomepageProgram program={props} />
                    ))}
                  </div>

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
                          <div className={`pb-2 border-b-2 transition-all ${typeResult == 'researchers-home' ? ('border-b-[#719CB8]') : (' border-b-transparent ')}`}>
                            <Button variant={typeResult == 'researchers-home' ? ('ghost') : ('ghost')} className={`${typeResult}`} onClick={() => onOpen('researchers-home')}>
                              <Users className="h-4 w-4" />
                              Pesquisadores
                            </Button>
                          </div>
                          {searchType === 'article' && (
                            <div className={`pb-2 border-b-2  transition-all ${typeResult == 'articles-home' ? ('border-b-[#719CB8]') : (' border-b-transparent ')}`}>
                              <Button variant={typeResult == 'articles-home' ? ('ghost') : ('ghost')} className="m-0" onClick={() => onOpen('articles-home')}>
                                <Quotes className="h-4 w-4" />
                                Artigos
                              </Button>
                            </div>
                          )}
                          {searchType === 'book' && (
                            <Button variant="ghost" className="m-0" onClick={() => onOpen('researchers-home')}>
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
                          <Button onClick={() => onOpenModal('filters')} variant="ghost" className="">
                            <SlidersHorizontal size={16} className="" />
                            Filtros
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setIsOn(!isOn)}>
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

                    {graduatePrograms.slice(0, 1).map((props) => (
                      <div className="mb-4 md:mb-8">
                        <div
                          className={`h-3 w-full rounded-t-md dark:border-neutral-800 border border-neutral-200 border-b-0 ${qualisColor[props.type.trim() as keyof typeof qualisColor]}  `}
                        ></div>

                        <Alert
                          className="p-0 rounded-t-none" x-chunk="dashboard-05-chunk-4"
                        >

                          <CardHeader className="flex flex-row items-start bg-neutral-100 dark:bg-neutral-800">
                            <div className="flex items-center justify-between w-full">
                              <CardTitle className="group flex items-center w-fit gap-2 text-lg">
                                <div className="w-fit">Informações</div>

                              </CardTitle>
                              <div className="flex gap-4 items-center justify-end flex-wrap ">
                                <Link to={props.site} target="_blank"><div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Globe size={16} /> {props.site}</div></Link>

                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="p-6 text-sm">
                            {props.description}
                          </CardContent>
                        </Alert>
                      </div>
                    ))}
                  </div>
                )}

              </TabsContent>
              <TabsContent value="doc" className="h-auto flex flex-col gap-4 md:gap-8  ">
                <DocentesPrograma />
              </TabsContent>

              <TabsContent value="ind" className="h-auto flex flex-col gap-4 md:gap-8  ">
                <IndicatorsGraduate />
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
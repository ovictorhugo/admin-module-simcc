import { ArrowLeftFromLine, ArrowRightFromLine, Boxes, ChevronLeft, Download, OctagonAlert, TrendingUp } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../hooks/use-modal-store";
import ReactDOMServer from 'react-dom/server';
import html2canvas from 'html2canvas';

  import {

    DrawerFooter,
    DrawerHeader,

  } from "../../components/ui/drawer"
import { Button } from "../ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../components/ui/sheet"


import { InformationResearcher } from "../popup/information-researcher";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import QRCode from "react-qr-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import {  BracketsCurly, Buildings,  File, FileCsv, Files, Quotes, ShareNetwork, Stamp, Student, Ticket, X } from "phosphor-react";
import { NuvemPalavras } from "../popup/nuvem-palavras";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { TotalViewResearcher } from "../popup/total-view-researcher";
import { InformacoesGeraisResearcher } from "../popup/informacoes-gerais-researcher";
import { ArticlesResearcherPopUp } from "../popup/articles-researcher";
import { BooksResearcherPopUp } from "../popup/book-researcher";
import { ProducaoTecnicaResearcherPopUp } from "../popup/producao-tecnica-researcher";
import { OrientacoesResearcherPopUp } from "../popup/orientacoes-researcher";
import { RelatorioTecnicoResearcherPopUp } from "../popup/relatorio-tecnico-researcher";
import { SpeakerResearcherPopUp } from "../popup/speaker-researcher";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Copy, MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { TimeLineResearcher } from "./timeline-researcher";
import { DialogHeader } from "../ui/dialog";
import { FilterYearTimeLine } from "../popup/filters-year-timeline";
import { Skeleton } from "../ui/skeleton";

import jsPDF from "jspdf";
import { ResearcherIndicators } from "./researcher-indicators";
import { AlertDescription, AlertTitle } from "../ui/alert";

type Research = {
  among: number,
  articles: number,
  book: number,
  book_chapters: number,
  id: string,
  name: string,
  university: string,
  lattes_id: string,
  area: string,
  lattes_10_id: string,
  abstract: string,
  city: string,
  orcid: string,
  image: string
  graduation: string,
  patent: string,
  software: string,
  brand: string,
  lattes_update: Date,
  entradanaufmg:Date
 
  h_index:string,
  relevance_score:string,
  works_count:string,
  cited_by_count:string,
  i10_index:string,
  scopus:string,
  openalex:string,

  subsidy:Bolsistas[]
  graduate_programs:GraduatePrograms[]
  departments:Departments[]
  research_groups:ResearchGroups[]

  cargo:string
  clas:string
  classe:string
  rt:string
  situacao:string
}

interface Bolsistas {
  aid_quantity:string
  call_title:string
  funding_program_name:string
  modality_code:string
  category_level_code:string
  institute_name:string
  modality_name:string
  scholarship_quantity:string
  }

  interface  GraduatePrograms {
    graduate_program_id:string
    name:string
  }

  interface Departments {
    dep_des:string
    dep_email:string
    dep_nom:string
    dep_id:string
    dep_sigla:string
    dep_site:string
    dep_tel:string
    img_data:string
  }

  interface ResearchGroups {
    area:string
    group_id:string
    name:string
  }




      const useQuery = () => {
        return new URLSearchParams(useLocation().search);
      };


export function ResearcherPage() {

    const { urlGeral, user, itemsSelecionados, setSearchType, setValoresSelecionadosExport,  setItensSelecionadosPopUp, searchType, valoresSelecionadosExport, setPesquisadoresSelecionados, pesquisadoresSelecionados, setItensSelecionados, permission } = useContext(UserContext);

    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const queryUrl = useQuery();

    const type_search = queryUrl.get('type_search');
    const terms = queryUrl.get('terms');

    const researcher_name = queryUrl.get('researcher_name');

    useEffect(() => {
        if (terms) {
          const parsedTerms = parseTerms(String(terms));
          setItensSelecionados(parsedTerms);
        }
      }, []);

      useEffect(() => {
        setSearchType(String(type_search || ''));
        setValoresSelecionadosExport(terms || '')
      }, []);

    function parseTerms(formatted: string): { term: string }[] {
        let result: { term: string }[] = [];
        let temp = '';
        let inGroup = false;
    
        for (let i = 0; i < formatted.length; i++) {
          const char = formatted[i];
    
          if (char === '(') {
            inGroup = true;
            if (temp.trim()) {
              result.push({ term: temp.trim() + '|' });
              temp = '';
            }
          } else if (char === ')') {
            inGroup = false;
            if (temp.trim()) {
              result.push({ term: temp.trim() + ';' });
              temp = '';
            }
          } else if (char === '|' && !inGroup) {
            if (temp.trim()) {
              result.push({ term: temp.trim() + '|' });
              temp = '';
            }
          } else {
            temp += char;
          }
        }
    
        if (temp.trim()) {
          result.push({ term: temp.trim() });
        }
    
        return result.map(item => {
          if (item.term.endsWith('|') || item.term.endsWith(';')) {
            item.term = item.term.slice(0, -1);
          }
          return item;
        });
      }
    

      
    const { onClose, isOpen} = useModal();
  
    const [researcher, setResearcher] = useState<Research[]>([]); 
    const [loading, isLoading] = useState(false)
   

  
    type Filter = {
      year: number[]
      qualis: string[]
    }

    const [filters, setFilters] = useState<Filter[]>([]);

    // Função para lidar com a atualização de researcherData
    const handleResearcherUpdate = (newResearcherData: Filter[]) => {
      setFilters(newResearcherData);


    };


    let urlTermPesquisadores = urlGeral + `researcherName?name=${researcher_name}`;
    

    console.log(urlTermPesquisadores)

    useMemo(() => {
setItensSelecionadosPopUp(itemsSelecionados)
    }, [itemsSelecionados]);

    const [open, setOpen] = useState(false);  
    const [variations, setVariations] = useState<string[]>([]);

    useMemo(() => {
     setOpen(false)
     setItensSelecionadosPopUp(itemsSelecionados)
     
     if(researcher_name != undefined) {
      setVariations( generateNameVariations(researcher_name))
     }
          }, [isOpen]);

    useMemo(() => {
        const fetchData = async () => {
            try {
              isLoading(true)
              const response = await fetch(urlTermPesquisadores, {
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
                setResearcher(data);
                isLoading(false)
              } 
              if (data.length == 0 && isOpen) {
                onClose()
                toast("Pesquisador(a) ainda não cerregado na base", {
                  description: "Tente novamente mais tarde",
                  action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo"),
                  },
                });
              } 

            } catch (err) {
              console.log(err);
            }
          };
          fetchData();
        }, [urlTermPesquisadores]);

        const [value, setValue] = useState('articles')

       

        useEffect(() => {
          if(searchType == 'article' || searchType == 'name' || searchType == 'abstract' || searchType == 'area') {
            setValue('article')
          } else if(searchType == 'book') {
            setValue('book')
          } else if(searchType == 'patent') {
            setValue('producao-tecnica')
          } else if(searchType == 'patente') {
            setValue('producao-tecnica')
          } else if(searchType == 'speaker') {
            setValue('speaker')
          }
        }, [isOpen]);

        /////

        //csv
        const [jsonData, setJsonData] = useState<any[]>([]);


        let urlPublicacoesPorPesquisador = `${urlGeral}bibliographic_production_researcher?terms=${terms}&researcher_id=${(researcher.slice(0,1).map((props) => (props.id)))}&type=ARTICLE&qualis=&year=1900`;
console.log(urlPublicacoesPorPesquisador)
        useEffect(() => {
          const fetchData = async () => {
       
            try {
              const response = await fetch(urlPublicacoesPorPesquisador, {
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
                setJsonData(data)
              }
            } catch (err) {
              console.log(err);
            } finally {
       
            }
          };
          fetchData();
        }, [urlPublicacoesPorPesquisador]);


        const has_visualizar_indices_pesquisador = permission.some(
          (perm) => perm.permission === 'visualizar_indices_pesquisador'
        );
      

const convertJsonToCsv = (json: any[]): string => {
  const items = json;
  const replacer = (_: string, value: any) => (value === null ? '' : value); // Handle null values
  const header = Object.keys(items[0]);
  const csv = [
    '\uFEFF' + header.join(';'), // Add BOM and CSV header
    ...items.map((item) =>
      header.map((fieldName) => JSON.stringify(item[fieldName], replacer)).join(';')
    ) // CSV data
  ].join('\r\n');

  return csv;
};

const handleDownloadJson = async () => {
  try {
    const csvData = convertJsonToCsv(jsonData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=windows-1252;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `dados.csv`;
    link.href = url;
    link.click();
  } catch (error) {
    console.error(error);
  }
};



const currentUrl = window.location.origin

function generateNameVariations(name: string): string[] {
  const parts = name.toUpperCase().split(' ');
  const lastName = parts[parts.length - 1];
  const initials = parts.map(part => part[0]).join('. ');
  const initialsWithDots = initials.replace(/ /g, '.');
  const firstAndMiddleNames = parts.slice(0, -1).join(' ');
  const variations = [
      `${lastName.toUpperCase()}, ${initials.toUpperCase()}`,
      `${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${initials.toUpperCase()}`,
      `${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${initialsWithDots.toUpperCase()}`,
      `${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase() + firstAndMiddleNames.slice(1).toLowerCase()} ${initials.toUpperCase()}`,
      `${lastName.toUpperCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase()}`,
      `${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase() + firstAndMiddleNames.slice(1).toLowerCase()}`,
      `${lastName.toUpperCase()}, ${firstAndMiddleNames.toUpperCase()}`,
      `${lastName.toUpperCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase() + firstAndMiddleNames.slice(1).toLowerCase()} ${initialsWithDots.toUpperCase()}`,
      `${parts[parts.length - 2].toUpperCase()} ${lastName.toUpperCase()}, ${firstAndMiddleNames.toUpperCase()}`,
      `${lastName.toUpperCase()}, ${initials.charAt(0).toUpperCase()}`,
      `${lastName.toUpperCase()}, ${name.toUpperCase()}`,
      `${lastName.toUpperCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase() + firstAndMiddleNames.slice(1).toLowerCase()} ${initials.toUpperCase()}`,
      `${initials.charAt(0).toUpperCase()}. ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${initials.toUpperCase()}`,
      `${initialsWithDots.toUpperCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`,
      `${initialsWithDots.toUpperCase()} ${lastName.toUpperCase()}`
  ];

  return variations;
}

const researcherName = researcher.length > 0 ? researcher[0].name : "Desconhecido";
const [tab, setTab] = useState('all')
    

const [expand, setExpand] = useState(false)

const yearString = filters.length > 0 ? filters[0].year.join(';') : '';
    const [isOpenSheet, setIsOpenSheet] = useState(false); 


    /////////////
    const DownloadButton = ({ user }:any) => {
      const [isReady, setIsReady] = useState(false);
    
      // Função para lidar com o download
      const handleDownload = async () => {
        // Selecione o elemento que você deseja capturar
        const element = document.getElementById(`timeline-researcher-${user.id}`);
        
        if (element) {
          // Espere um pouco para garantir que o fetch e o componente estejam totalmente carregados
          setTimeout(async () => {
            // Capture o elemento como um canvas
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
    
            // Crie um novo PDF
            const pdf = new jsPDF();
            // Adicione a imagem ao PDF
            pdf.addImage(imgData, 'PNG', 0, 0);
            // Salve o PDF
            pdf.save('timeline_researcher.pdf');
          }, 5000); // Ajuste o tempo de espera conforme necessário
        }
      };
    
      // Use um efeito para determinar quando o componente está pronto
      useEffect(() => {
        setIsReady(true);
      }, []);
    
      return (
        <>
          <button onClick={handleDownload} disabled={!isReady}>
            Baixar PDF do Componente
          </button>
          <div id={`timeline-researcher-${user.id}`}>
            <TimeLineResearcher
              among={user.among}
              articles={user.articles}
              book={user.book}
              book_chapters={user.book_chapters}
              id={user.id}
              name={user.name}
              university={user.university}
              lattes_id={user.lattes_id}
              area={user.area}
              abstract={user.abstract}
              lattes_10_id={user.lattes_10_id}
              city={user.city}
              orcid={user.orcid}
              image={user.image}
              graduation={user.graduation}
              patent={user.patent}
              software={user.software}
              brand={user.brand}
              lattes_update={user.lattes_update}
              h_index={user.h_index}
              relevance_score={user.relevance_score}
              works_count={user.works_count}
              cited_by_count={user.cited_by_count}
              i10_index={user.i10_index}
              scopus={user.scopus}
              openalex={user.openalex}
              subsidy={user.subsidy}
              graduate_programs={user.graduate_programs}
              departments={user.departments}
              research_groups={user.research_groups}
              cargo={user.cargo}
              clas={user.clas}
              classe={user.classe}
              rt={user.rt}
              situacao={user.situacao}
              year_filter={user.year_filter}
              entradanaufmg={user.entradanaufmg}
            />
          </div>
        </>
      );
    };
    
    ////////////PERMISSÕES

    const hasBaremaAvaliacao = permission.some(
      (perm) => perm.permission === 'criar_barema_avaliacao'
    );

    return(
        <html className="w-full">
       
       
          <main className="flex flex-1 flex-col  p-4 md:p-8 ">
          <Tabs defaultValue={tab} value={tab} className="h-full" >
             <div className="w-full  gap-4 m pb-0 md:pb-0">
             <div className="flex items-center gap-4">

             <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
             <div className="flex gap-3  items-center">
             <TabsList>
                  <TabsTrigger value="all" onClick={() => setTab('all')}>Visão geral</TabsTrigger>
                  <TabsTrigger disabled={!has_visualizar_indices_pesquisador} value="indicators" onClick={() => setTab('indicators')}>Indicadores de produção</TabsTrigger>
                </TabsList>
              

              </div>

              <div className="flex gap-2 items-center md:ml-auto">


</div>

             {researcher.slice(0, 1).map((props) => {

              
   let urlShare = `${currentUrl}/researcher?researcher_name=${props.name}&search_type=${searchType}&terms=${valoresSelecionadosExport}`

   if(searchType == 'name') {
     urlShare = `${currentUrl}/researcher?researcher_name=${props.name}&search_type=${searchType}&terms=`
   }
   const payment = props.lattes_id

   const currentDate = new Date();
   const lattesUpdate = String(props.lattes_update).split('/');
   const lattesMonth = parseInt(lattesUpdate[1]);
   const lattesYear = parseInt(lattesUpdate[2]);

   const monthDifference = (currentDate.getFullYear() - lattesYear) * 12 + (currentDate.getMonth() + 1 - lattesMonth);

   const isOutdated = monthDifference > 3;



   return(

            
              <div className="hidden items-center gap-2  md:flex">
              
               
              <div className={`border dark:border-neutral-800 w-fit py-2 px-4 text-gray-400 rounded-md text-xs font-bold flex gap-1 items-center ${isOutdated ? ('bg-red-500 text-white border-none') : ('')}`}>Atualização do Lattes: {String(props.lattes_update)}</div>

              <div className="flex gap-3 items-center">

               

              <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
  <SheetTrigger>
  <Button onClick={() => setExpand(false)} className="h-8" size={'sm'}><TrendingUp size={16}/>Linha do tempo</Button>
  </SheetTrigger>
  <SheetContent className={`p-0 dark:bg-neutral-900 dark:border-gray-600 ${expand ? ('min-w-[80vw]'):('min-w-[50vw]')}`}>
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
        
          {researcher.slice(0, 1).map((user) => (
            <DownloadButton user={user}/>
      ))}
           
          </div>
          </div>
 </div>
         

        
        </DialogHeader>

        <div className="p-8 pb-0">
                      <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                      Trajetória do(a) pesquisador(a)
                        </p>

                        <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                           Linha do tempo
                        </h1>

                        <div className="my-6 border-b dark:border-b-neutral-800"></div>

                        <FilterYearTimeLine
                onFilterUpdate={handleResearcherUpdate}/>
                      </div>

                    

      
  {researcher.slice(0, 1).map((user) => {
                return(
                  <div >
                    <TimeLineResearcher
                  among={user.among}
                    articles={user.articles}
                    book={user.book}
                    book_chapters={user.book_chapters}
                    id={user.id}
                    name={user.name}
                    university={user.university}
                    lattes_id={user.lattes_id}
                    area={user.area}
                    abstract={user.abstract}
                    lattes_10_id={user.lattes_10_id}
                    city={user.city}
                    orcid={user.orcid}
                    image={user.image}
                    graduation={user.graduation}
                    patent={user.patent}
                    software={user.software}
                    brand={user.brand}
                    lattes_update={user.lattes_update}

                    h_index={user.h_index}
                    relevance_score={user.relevance_score}
                    works_count={user.works_count}
                    cited_by_count={user.cited_by_count}
                    i10_index={user.i10_index}
                    scopus={user.scopus}
                    openalex={user.openalex}

                    subsidy={user.subsidy}
                    graduate_programs={user.graduate_programs}
                    departments={user.departments}
                    research_groups={user.research_groups}
                
                    cargo={user.cargo}
                    clas={user.clas}
                    classe={user.classe}
                    rt={user.rt}
                    situacao={user.situacao}

                    year_filter={yearString}
                    entradanaufmg={user.entradanaufmg}
                  />
                  </div>
                  )
                })}
  </SheetContent>
</Sheet>

         {hasBaremaAvaliacao && (
 <TooltipProvider>
 <Tooltip>
   <TooltipTrigger asChild>
   <Button
   variant={'default'}
   onClick={() => {
     // Verifica se o pesquisador já está selecionado pelo nome
     if (pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name)) {
       // Remove o pesquisador selecionado com o nome correspondente
       setPesquisadoresSelecionados(prev => prev.filter(pesquisador => pesquisador.name !== props.name));
     } else {
       // Adiciona o novo pesquisador selecionado
       setPesquisadoresSelecionados(prev => [
         ...prev,
         {
           id: props.id,
           name: props.name,
           university: props.university,
           lattes_id: props.lattes_id,
           city: props.city,
           area: props.area,
           graduation: props.graduation,
         }
       ]);
     }
   }}
   className={`h-8 w-8 p-0 text-white dark:text-white ${
     pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) && 'bg-red-500 hover:bg-red-600 text-white'
   }`}
 >
   {pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) ? (
     <X size={16} className="" />
   ) : (
     <Plus size={16} className="" />
   )}
 </Button>
   </TooltipTrigger>
   <TooltipContent> {pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) ? (
    'Remover pesquisador(a)'
   ) : (
    'Adicionar pesquisador(a)'
   )}</TooltipContent>
 </Tooltip>
 </TooltipProvider>
         )} 

             
       


              <DropdownMenu>
       <DropdownMenuTrigger asChild>
         <Button variant="ghost" className="h-8 w-8 p-0">
           <span className="sr-only">Open menu</span>
           <MoreHorizontal className="h-4 w-4" />
         </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end">
         <DropdownMenuLabel>Ações</DropdownMenuLabel>
         <DropdownMenuItem className="flex items-center gap-3"
           onClick={() => {
            navigator.clipboard.writeText(payment)
            toast("Operação realizada", {
              description: "Lattes ID copiado para área de transferência",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
           }}
         ><Copy className="h-4 w-4" />
           Copiar Lattes ID
         </DropdownMenuItem>

         <DropdownMenuItem className="flex items-center gap-3" onClick={() => handleDownloadJson()}><FileCsv className="h-4 w-4" />Baixar CSV das publicações</DropdownMenuItem>

         <DropdownMenuItem className="flex items-center gap-3" onClick={() => setOpen(!open)} ><BracketsCurly className="h-4 w-4" />API da consulta</DropdownMenuItem>

         <DropdownMenuItem className="flex items-center gap-3"
           onClick={() => {
            navigator.clipboard.writeText(urlShare)
            toast("Operação realizada", {
              description: "Link copiado para área de transferência",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
           }}
         ><ShareNetwork className="h-4 w-4" />
           Copiar link para compartilhar
          
         </DropdownMenuItem>
         <DropdownMenuSeparator />
         <DropdownMenuItem className="flex justify-center py-4">
         
         <QRCode size={200} className={'bg-transparent'} value={urlShare} />
         
         
         </DropdownMenuItem>
   
       </DropdownMenuContent>
     </DropdownMenu>

              </div>
              </div>
           

)
})}
 </div>
            </div>

            <TabsContent value="all" className="">

            {researcher.slice(0, 1).map((user) => {
                return(
                  <div className="w-full flex justify-center ">
            <div className="bg-cover bg-center bg-no-repeat h-28 w-28  rounded-2xl mb-3 border-4 border-white dark:border-neutral-950    " style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${user.id}) ` }}></div>
          </div>
                  )
                })}

            {researcher.slice(0, 1).map((props) => {
                return(
                    <div className="flex items-center flex-col  relative">
                    <h4 className="text-3xl font-medium px-8 text-center mb-2">{props.name}</h4>
                       <div className="flex text-gray-500 items-center gap-2 mb-2">
                           {props.image == "None" ? (
                             <Buildings size={16} className="" />
                           ) : (
                             <img src={props.image} alt="" className="h-6" />
                           )}
                           <p className="text-md  ">{props.university}</p>
                         </div>
                    </div>
                )
                })}
            <div className=" ">
      
      {researcher.length == 0 ? (
        <div>

          <div className=" w-full flex-col flex items-center justify-center">
          <Skeleton className="w-28 h-28 rounded-md mb-4 md:mb-4"></Skeleton>
          <Skeleton className="w-full max-w-[400px] h-8 rounded-md mb-4 md:mb-8"></Skeleton>
          </div>
            <Skeleton className="w-full h-[150px] rounded-md"></Skeleton>

            <div className="flex md:gap-8 gap-4 md:flex-row flex-col md:mt-8 mt-4">
            <Skeleton className="w-full flex flex-1 h-[600px] rounded-md "></Skeleton>
            <Skeleton className="md:w-[350px] h-[600px] rounded-md"></Skeleton>
            </div>
        </div>
      ):(
        <div className="   " >
        <DrawerHeader className="p-0 ">
            {researcher.slice(0, 1).map((user) => {
                return(
                   <div className="w-fit">
  
                     <InformationResearcher
                    among={user.among}
                    articles={user.articles}
                    book={user.book}
                    book_chapters={user.book_chapters}
                    id={user.id}
                    name={user.name}
                    university={user.university}
                    lattes_id={user.lattes_id}
                    area={user.area}
                    abstract={user.abstract}
                    lattes_10_id={user.lattes_10_id}
                    city={user.city}
                    orcid={user.orcid}
                    image={user.image}
                    graduation={user.graduation}
                    patent={user.patent}
                    software={user.software}
                    brand={user.brand}
                    lattes_update={user.lattes_update}
                  
  
                    h_index={user.h_index}
                    relevance_score={user.relevance_score}
                    works_count={user.works_count}
                    cited_by_count={user.cited_by_count}
                    i10_index={user.i10_index}
                    scopus={user.scopus}
                    openalex={user.openalex}
                  
  
                    openAPI={open}
                    />
  
                   </div>
                )
            })}

            {user?.lattes_id == researcher[0].lattes_id && (
              <div className="bg-red-50 mb-6 flex gap-3 dark:bg-red-200/20 w-full p-8 rounded-md">
              <div>  <OctagonAlert size={24}/></div>
<div>
<AlertTitle className="whitespace-normal">Dados da publicações</AlertTitle>
<AlertDescription className="whitespace-normal">
A plataforma gerencia publicações extraídas do currículo Lattes, associando o Qualis da revista conforme registrado na Plataforma Sucupira, além de integrar dados da base Journal Citation Reports (JCR) e do banco de dados Open Alex. Caso o artigo seja classificado como Qualis "Sem Qualificação" (SQ), recomendamos verificar o cadastro do nome da revista na plataforma Lattes.
</AlertDescription>

</div></div>
            )}
  
  <div className="flex gap-6 xl:flex-row flex-col-reverse">
  <div className="w-full flex-1">
        <Tabs defaultValue="articles" value={value} className="">
        {researcher.slice(0, 1).map(() => (
              <div className=" grid grid-cols-1 mb-6">
                <ScrollArea className="">
    <TabsList className="mb-4 flex h-auto">
  
      <TabsTrigger
        value="article"
        onClick={() => setValue('article')}
        className="flex gap-2 items-center"
      >
        <Quotes size={16} className="" />
        Artigos
      </TabsTrigger>
      <TabsTrigger
        value="book"
        onClick={() => setValue('book')}
        className="flex gap-2 items-center"
      >
        <File size={16} className="" />
        Livros e capítulos
      </TabsTrigger>
      <TabsTrigger
        value="producao-tecnica"
        onClick={() => setValue('producao-tecnica')}
        className="flex gap-2 items-center"
      >
        <Stamp size={16} className="" />
        Produção técnica
      </TabsTrigger>
      <TabsTrigger
        value="relatorio-tecnico"
        onClick={() => setValue('relatorio-tecnico')}
        className="flex gap-2 items-center"
      >
        <Files size={16} className="" />
        Relatório técnico
      </TabsTrigger>
      <TabsTrigger
        value="orientacoes"
        onClick={() => setValue('orientacoes')}
        className="flex gap-2 items-center"
      >
        <Student size={16} className="" />
        Orientações
      </TabsTrigger>
      <TabsTrigger
        value="speaker"
        onClick={() => setValue('speaker')}
        className="flex gap-2 items-center"
      >
        <Ticket size={16} className="" />
        Participação em eventos
      </TabsTrigger>
      <TabsTrigger
        value="research-project"
        onClick={() => setValue('research-project')}
        className="flex gap-2 items-center"
      >
        <Boxes size={16} className="" />
        Projetos de pesquisa
      </TabsTrigger>
   
  </TabsList>
  
  <ScrollBar orientation="horizontal"/>
  </ScrollArea>
              </div>
    ))}
  <TabsContent value="article">
  {researcher.slice(0, 1).map((user) => {
                return(
                  <ArticlesResearcherPopUp name={String(user.id)}/>
                  )
                })}
  </TabsContent>
  <TabsContent value="book">
  {researcher.slice(0, 1).map((user) => {
                return(
                  <BooksResearcherPopUp name={String(user.id)}/>
                  )
                })}
  </TabsContent>
  
  <TabsContent value="producao-tecnica">
  {researcher.slice(0, 1).map((user) => {
                return(
                  <ProducaoTecnicaResearcherPopUp name={String(user.id)}/>
                  )
                })}
  </TabsContent>
  
  <TabsContent value="relatorio-tecnico">
  {researcher.slice(0, 1).map((user) => {
                return(
                  <RelatorioTecnicoResearcherPopUp name={String(user.id)}/>
                  )
                })}
  </TabsContent>
  
  <TabsContent value="orientacoes">
  {researcher.slice(0, 1).map((user) => {
                return(
                  <OrientacoesResearcherPopUp name={String(user.id)}/>
                  )
                })}
  </TabsContent>
  
  <TabsContent value="speaker">
  {researcher.slice(0, 1).map((user) => {
                return(
                  <SpeakerResearcherPopUp name={String(user.id)}/>
                  )
                })}
  </TabsContent>
  
  <TabsContent value="research-project">
    {researcher.slice(0, 1).map((user) => {
                  return(
                   <div></div>
                    )
                  })}
    </TabsContent>
  </Tabs>
        </div>
  
        <div className="xl:w-[350px]  w-full grid grid-cols-1"> 
          <ResponsiveMasonry
      columnsCountBreakPoints={{
          350: 1,
          750: 1,
          900: 1,
          1200: 1
      }}
  >
                   <Masonry gutter="24px">
  
        {researcher.slice(0, 1).map((user) => {
                  
                      return(
                        <InformacoesGeraisResearcher
                        h_index={user.h_index}
                        relevance_score={user.relevance_score}
                        works_count={user.works_count}
                        cited_by_count={user.cited_by_count}
                        i10_index={user.i10_index}
                        scopus={user.scopus}
                        orcid={user.orcid}
                        openalex={user.openalex}
                        subsidy={user.subsidy}
                        graduate_programs={user.graduate_programs}
                        departments={user.departments}
  
                        cargo={user.cargo}
                        clas={user.clas}
                        classe={user.classe}
                        rt={user.rt}
                        situacao={user.situacao}
  
                        research_groups={user.research_groups}
                        
                        />
                      )
                     
            })}
  
        {researcher.slice(0, 1).map((user) => {
                      return(
                        <TotalViewResearcher
                        among={user.among}
                        articles={user.articles}
                        book={user.book}
                        book_chapters={user.book_chapters}
                        patent={user.patent}
                        software={user.software}
                        brand={user.brand}
                        />
                      )
            })}
  
      {researcher.slice(0, 1).map((user) => {
                      return(
                        <NuvemPalavras
                        id={user.id}
                        />
                      )
            })}
  
  
        {researcher.slice(0, 1).map(() => {
                      return(
                        <div>
            <div className="mb-6 font-medium text-2xl">Nomes de citação</div>
            <div className="flex flex-wrap gap-1">
            {variations.map((variation, index) => (
                    <p className="text-xs " key={index}>{variation} /</p>
                ))}
            </div>
        </div>
                      )
            })}
  
  </Masonry>
  </ResponsiveMasonry>
        </div>
  </div>
        </DrawerHeader>
  
       
  
  
        <DrawerFooter>
          
        </DrawerFooter>
        </div>
      )}
     </div>
     </TabsContent>

     <TabsContent value="indicators">
      {researcher.slice(0,1).map((user) => (
        <ResearcherIndicators
        among={user.among}
        articles={user.articles}
        book={user.book}
        book_chapters={user.book_chapters}
        id={user.id}
        name={user.name}
        university={user.university}
        lattes_id={user.lattes_id}
        area={user.area}
        abstract={user.abstract}
        lattes_10_id={user.lattes_10_id}
        city={user.city}
        orcid={user.orcid}
        image={user.image}
        graduation={user.graduation}
        patent={user.patent}
        software={user.software}
        brand={user.brand}
        lattes_update={user.lattes_update}
  
        h_index={user.h_index}
        relevance_score={user.relevance_score}
        works_count={user.works_count}
        cited_by_count={user.cited_by_count}
        i10_index={user.i10_index}
        scopus={user.scopus}
        openalex={user.openalex}
  
        subsidy={user.subsidy}
        graduate_programs={user.graduate_programs}
        departments={user.departments}
        research_groups={user.research_groups}
    
        cargo={user.cargo}
        clas={user.clas}
        classe={user.classe}
        rt={user.rt}
        situacao={user.situacao}
  
        year_filter={yearString}
        entradanaufmg={user.entradanaufmg}
        />
      ))}
     </TabsContent>

    
     </Tabs>
        </main>
        </html>
    )
}
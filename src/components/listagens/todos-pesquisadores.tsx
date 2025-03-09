import { useContext, useEffect, useMemo, useState } from "react"
import { UserContext } from "../../context/context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { Button } from "../ui/button";

import { MagnifyingGlass, Quotes, Rows, SquaresFour, Student, UserList } from "phosphor-react";

import { ResearchersBloco } from "../homepage/categorias/researchers-home/researchers-bloco";
import { TableReseracherhome } from "../homepage/categorias/researchers-home/table-reseracher-home";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp, Copyright, Download, File, Files, FolderKanban, Info, MoreHorizontal, Ticket, Users } from "lucide-react";
import { InfiniteMovingResearchers } from "../ui/infinite-moving-researcher";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { Input } from "../ui/input";
import { Alert } from "../ui/alert";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ArticlesResearcherPopUp } from "../popup/articles-researcher";
import { ResearchersHome } from "../homepage/categorias/researchers-home";
import { ArticlesHome } from "../homepage/categorias/articles-home";
import { Helmet } from "react-helmet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
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
    h_index: string,
    relevance_score: string,
    works_count: string,
    cited_by_count: string,
    i10_index: string,
    scopus: string,
    openalex: string,
    subsidy:Bolsistas[]
    graduate_programs:GraduatePrograms[]
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
  
    

export function TodosPesquisadores() {
    
    const {urlGeral , version, searchType} = useContext(UserContext)
    
    const [search, setSearch] = useState('')
        const [researcher, setResearcher] = useState<Research[]>([]);

        let urlTermPesquisadores = `${urlGeral}researcherName?name=`
        const [typeVisu, setTypeVisu] = useState('block');
      
        useMemo(() => {
            const fetchData = async () => {
                try {
               
                  const response = await fetch(  urlTermPesquisadores, {
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
                 
                  }
                } catch (err) {
                  console.log(err);
                }
              };
              fetchData();
            }, [urlTermPesquisadores]);


            const [isOn, setIsOn] = useState(true);
 
            const [value, setValue] = useState('pesquisadores')

            const randomResearchers = researcher.sort(() => Math.random() - 0.5).slice(0, 40);

            const [jsonData, setJsonData] = useState<any[]>([]);

            let urlPublicacoesPorPesquisador = ''
            if (value == 'articles-home') {
              urlPublicacoesPorPesquisador = `${urlGeral}bibliographic_production_researcher?terms=&researcher_id=&type=ARTICLE&qualis=&qualis=&year=1900`;
            } else if (value == 'researchers-home') {
              if (searchType === 'name') {
                urlPublicacoesPorPesquisador = `${urlGeral}researcherName?name=`;
              } else if (searchType === 'article') {
                urlPublicacoesPorPesquisador = `${urlGeral}researcher?terms=&university=&type=ARTICLE&graduate_program_id=`;
              } else if (searchType === 'book') {
                urlPublicacoesPorPesquisador = `${urlGeral}researcherBook?term=&university=&type=BOOK&graduate_program_id=`; //
              } else if (searchType === 'area') {
                urlPublicacoesPorPesquisador = `${urlGeral}researcherArea_specialty?area_specialty=&university=&graduate_program_id=`;
              } else if (searchType === 'speaker') {
                urlPublicacoesPorPesquisador = `${urlGeral}researcherParticipationEvent?term=&university=&graduate_program_id=`; //
              } else if (searchType === 'patent') {
                urlPublicacoesPorPesquisador = `${urlGeral}researcherPatent?term=&graduate_program_id=&university=`;
              } else if (searchType === 'abstract') {
                urlPublicacoesPorPesquisador = `${urlGeral}researcher?terms=&university=&type=ABSTRACT&graduate_program_id=`;
              }
            } else if (value == 'speaker-home') {
              urlPublicacoesPorPesquisador = `${urlGeral}pevent_researcher?researcher_id=&year=1900&term=&nature=`
            } else if (value == 'institutions-home') {
              if (searchType == 'article') {
                urlPublicacoesPorPesquisador = `${urlGeral}institutionFrequenci?terms=&university=&type=ARTICLE`
              } else if (searchType == 'speaker') {
                urlPublicacoesPorPesquisador = `${urlGeral}institutionFrequenci?terms=&university=&type=SPEAKER`
              } else if (searchType == 'patent') {
                urlPublicacoesPorPesquisador = `${urlGeral}institutionFrequenci?terms=&university=&type=PATENT`
              } else if (searchType == 'book') {
                urlPublicacoesPorPesquisador = `${urlGeral}institutionFrequenci?terms=&university=&type=BOOK`
              } else if (searchType == 'abstract') {
                urlPublicacoesPorPesquisador = `${urlGeral}institutionFrequenci?terms=&university=&type=ABSTRACT`
              } else if (searchType == 'area') {
                urlPublicacoesPorPesquisador = `${urlGeral}institutionFrequenci?terms=&university=&type=AREA`
              } 
            } else if (value == 'patent-home') {
              urlPublicacoesPorPesquisador = `${urlGeral}patent_production_researcher?researcher_id=&year=1900&term=&distinct=`
            } else if (value == 'book-home') {
              urlPublicacoesPorPesquisador = `${urlGeral}book_production_researcher?researcher_id=&year=1900&term=&distinct=0`
          
              urlPublicacoesPorPesquisador = `${urlGeral}book_chapter_production_researcher?researcher_id=&year=1900&term=&distinct=0`
            }


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

    return(
        <main className=" w-full grid grid-cols-1 ">
 <Helmet>
          <title>Listagens | {version ? ('Conectee'):('Iapós')}</title>
          <meta name="description" content={`Listagens | ${version ? ('Conectee'):('Iapós')}`} />
          <meta name="robots" content="index, follow" />
        </Helmet>
<div className="justify-center px-4 md:px-8 w-full mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20" >
        <Link to={'/informacoes'}  className="inline-flex z-[2] items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2 mb-3 px-3 py-1 text-sm font-medium"><Info size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Saiba como utilizar a plataforma<ArrowRight size={12}/></Link>
        
      
              <h1 className="z-[2] text-center max-w-[800px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
              Todas as {" "}
              <strong className="bg-eng-blue  rounded-md px-3 pb-2 text-white font-medium">
                {" "}
                listagens
              </strong>{" "}
              que a plataforma pode filtrar para você. 
            </h1>
   
            <p className="max-w-[750px] text-center text-lg font-light text-foreground"></p>



              

             
          </div>


          <InfiniteMovingResearchers
        items={randomResearchers} // Formata cada item como um objeto
        direction="right"
        speed='slow'
        pauseOnHover={true}
        className="custom-class"
      />

<main className="h-full w-full flex flex-col">
           <Tabs defaultValue="articles" value={value} className="">
             <div>
              <div className={`w-full ${isOn ? 'px-8' : 'px-4'} border-b border-b-neutral-200 dark:border-b-neutral-800`}>
                {isOn && (
                  <div className="w-full pt-4  flex justify-between items-center">
                   
                  </div>
                )}
                <div className={`flex pt-2 gap-8 justify-between  ${isOn ? '' : ''} `}>
                  <div className="flex items-center gap-2">
                  <div className=" grid grid-cols-1 ">
                  <ScrollArea className="">
                  <TabsList className="p-0 flex h-auto bg-transparent dark:bg-transparent">
                 
                  <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'pesquisadores' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('pesquisadores')}>
                      <Button variant={value == 'pesquisadores' ? ('ghost'):('ghost')}  className="m-0" >
                      <Users size={16} className="" />
                      Pesquisadores
                      </Button>
                      </div>

                      {version && (
                          <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'tecnicos' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('tecnicos')}>
                          <Button variant={value == 'tecnicos' ? ('ghost'):('ghost')}  className="m-0" >
                          <Users size={16} className="" />
                          Técnicos
                          </Button>
                          </div>
                      )}

                      <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'bolsistas' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('bolsistas')}>
                      <Button variant={value == 'bolsistas' ? ('ghost'):('ghost')}  className="m-0" >
                      <Copyright size={16} className="" />
                      Bolsistas CNPq
                      </Button>
                      </div>


                  <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'article' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('article')}>
                      <Button variant={value == 'article' ? ('ghost'):('ghost')}  className="m-0" >
                      <Quotes size={16} className="" />
                      Artigos
                      </Button>
                      </div>

                      <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'book' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('book')}>
                      <Button variant={value == 'book' ? ('ghost'):('ghost')}  className="m-0" >
                      <File size={16} className="" />
                      Livros e capítulos
                      </Button>
                      </div>

                      <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'producao-tecnica' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('producao-tecnica')}>
                      <Button variant={value == 'producao-tecnica' ? ('ghost'):('ghost')}  className="m-0" >
                      <Copyright size={16} className="" />
                      Patentes
                      </Button>
                      </div>

                      <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'relatorio-tecnico' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('relatorio-tecnico')}>
                      <Button variant={value == 'relatorio-tecnico' ? ('ghost'):('ghost')}  className="m-0" >
                      <Files size={16} className="" />
                      Relatório técnico
                      </Button>
                      </div>

                      <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'orientacoes' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('orientacoes')}>
                      <Button variant={value == 'orientacoes' ? ('ghost'):('ghost')}  className="m-0" >
                      <Student size={16} className="" />
                      Orientações
                      </Button>
                      </div>

                      <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'speaker' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('speaker')}>
                      <Button variant={value == 'speaker' ? ('ghost'):('ghost')}  className="m-0" >
                      <Ticket size={16} className="" />
                      Participação em eventos
                      </Button>
                      </div>

                      <div className={`pb-2 border-b-2 text-black dark:text-white  transition-all ${value == 'research-project' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`} onClick={() => setValue('research-project')}>
                      <Button variant={value == 'research-project' ? ('ghost'):('ghost')}  className="m-0" >
                      <FolderKanban size={16} className="" />
                    Projetos de pesquisa
                      </Button>
                      </div>
                  </TabsList>

                  <ScrollBar orientation="horizontal"/>
                  </ScrollArea>
                  </div>
       
                   
                  </div>
                  <div className="hidden xl:flex xl:flex-nowrap gap-2">
                <div className="md:flex md:flex-nowrap gap-2">
                  <Link to={`${urlGeral}dictionary.pdf`} target="_blank">
                  <Button variant="ghost" className="">
                    <File size={16} className="" />
                    Dicionário de dados
                  </Button>
                  </Link>
                  <Button onClick={() => handleDownloadJson()} variant="ghost" className="">
                    <Download size={16} className="" />
                    Baixar resultado
                  </Button>
                </div>

               
              </div>

              <div className="block xl:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" className="h-8 w-8 p-0 xl:block">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Mais opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={`${urlGeral}dictionary.pdf`} target="_blank">
                    <DropdownMenuItem className="p-0">
                      <Button  variant="ghost" className="">
                        <File size={16} className="" />
                        Dicionário de dados
                      </Button>
                    </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem className="p-0">
                      <Button onClick={() => handleDownloadJson()} variant="ghost" className="">
                        <Download size={16} className="" />
                        Baixar resultado
                      </Button>
                    </DropdownMenuItem>

                   
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

                </div>
              </div>
            
            </div>

            <ScrollArea className="h-full">
            <div className="px-8">
            <TabsContent value="pesquisadores">
  {researcher.slice(0, 1).map((user) => {
                return(
                 <ResearchersHome/>
                  )
                })}
  </TabsContent>

            <TabsContent value="article">
            <ArticlesHome />
  </TabsContent>
              </div>
           
          </ScrollArea>
          </Tabs>
        </main>
        </main>
    )
}
import { useContext, useMemo, useState } from "react";
import { useModalResult } from "../../hooks/use-modal-result";
import { UserContext } from "../../../context/context";
import { CloudWordResearcherHome } from "./researchers-home/clould-word-researcher-home";
import { HeaderResultTypeHome } from "./header-result-type-home";
import {  ListNumbers, MapTrifold, Rows, SquaresFour, UserList } from "phosphor-react";
import { Button } from "../../ui/button";
import { ResearchersBloco } from "./researchers-home/researchers-bloco";
import { ResearcherMap } from "./researchers-home/researcher-map";
import { TableReseracherhome } from "./researchers-home/table-reseracher-home";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../components/ui/accordion"
import { Skeleton } from "../../ui/skeleton";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { useModalSidebar } from "../../hooks/use-modal-sidebar";

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
  }
  

export function ResearchersHome() {
    const { isOpen, type} = useModalResult();
    const {isOpen:isOpenSidebar} = useModalSidebar()
    const [loading, isLoading] = useState(false)
    const [researcher, setResearcher] = useState<Research[]>([]); 
    const [typeVisu, setTypeVisu] = useState('block')

    const { mapModal, setMapModal} = useContext(UserContext)
    
  
    const isModalOpen = isOpen && type === "researchers-home";

    const { urlGeral, searchType, valoresSelecionadosExport, valorDigitadoPesquisaDireta, navbar} = useContext(UserContext);

    let urlTermPesquisadores = ``

    if (searchType == 'name') {
        urlTermPesquisadores = `${urlGeral}/researcherName?name=${valoresSelecionadosExport.split(" ").join(";")}${valorDigitadoPesquisaDireta.split(" ").join(";")}`;
    } else if (searchType == 'article') {
        urlTermPesquisadores = `${urlGeral}researcher?terms=${valoresSelecionadosExport}${valorDigitadoPesquisaDireta}&university=&type=ARTICLE&graduate_program_id=`
    } else if (searchType == 'book') {
        urlTermPesquisadores = `${urlGeral}researcherBook?term=${valoresSelecionadosExport}${valorDigitadoPesquisaDireta}&university=&type=BOOK`
    } else if (searchType == 'area') {
        urlTermPesquisadores = `${urlGeral}/researcherArea_specialty?area_specialty=${valoresSelecionadosExport}${valorDigitadoPesquisaDireta}&university=&graduate_program_id=`;
    } else if (searchType == 'speaker') {
        urlTermPesquisadores = `${urlGeral}researcherParticipationEvent?term=${valoresSelecionadosExport}${valorDigitadoPesquisaDireta}&university=`
    } else if (searchType == 'patent') {
        urlTermPesquisadores = `${urlGeral}/researcherPatent?term=${valoresSelecionadosExport}${valorDigitadoPesquisaDireta}&graduate_program_id=&university=`;
    } else if (searchType == 'abstract') {
        urlTermPesquisadores = `${urlGeral}researcher?terms=${valoresSelecionadosExport}${valorDigitadoPesquisaDireta}&university=&type=ABSTRACT&graduate_program_id=`
      }

      console.log(urlTermPesquisadores)

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
            } catch (err) {
              console.log(err);
            }
          };
          fetchData();
        }, [urlTermPesquisadores]);

        const items = Array.from({ length: 12 }, (_, index) => (
          <Skeleton key={index} className="w-full rounded-md h-[170px]" />
        ));

    return(
        <>
        {isModalOpen && (
            <div className="w-full flex gap-6 mb-[150px]  justify-center">
                <div className="flex-1 flex flex-col">

                   {searchType != 'abstract' && searchType != 'name' && searchType != 'area' && (
                  
                        <Accordion defaultValue="item-1"  type="single" collapsible >
                <AccordionItem value="item-1" >
                    <AccordionTrigger>
                    <HeaderResultTypeHome title="Pesquisadores mais relevantes por ordem de ocorrências" icon={<ListNumbers size={24} className="text-gray-400" />}>
                        </HeaderResultTypeHome>
                    </AccordionTrigger>
                    <AccordionContent >
                    {loading ? (
                      <Skeleton className="w-full rounded-md h-[300px]"/>
                    ):(
                      <CloudWordResearcherHome
                      researcher={researcher}
                      />
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>

                   )}


                <div>
                <Accordion defaultValue="item-1"  type="single" collapsible >
                <AccordionItem value="item-1" >
                    <AccordionTrigger className="flex items-center">
                    <HeaderResultTypeHome title="Pesquisadores por detalhamento" icon={<UserList size={24} className="text-gray-400" />}>
                        <Button onClick={() => setTypeVisu('rows')}  variant="outline" className={`bg-transparent border-0 ${typeVisu == 'rows' && ('bg-white dark:bg-neutral-800')}`} size={'icon'}>
                            <Rows size={16} className=" whitespace-nowrap" />
                        </Button>

                        <Button  onClick={() => setTypeVisu('block')} variant="outline" className={`bg-transparent border-0 ${typeVisu == 'block' && ('bg-white dark:bg-neutral-800')} `} size={'icon'}>
                            <SquaresFour size={16} className=" whitespace-nowrap" />
                        </Button>
                        </HeaderResultTypeHome>
                    </AccordionTrigger>
                    <AccordionContent >
                    {typeVisu == 'block' ? (
                    loading ? (
                      <ResponsiveMasonry
                        columnsCountBreakPoints={{
                            350: 1,
                            750: 2,
                            900: 3,
                            1200: navbar || isOpenSidebar || mapModal ? 3 : 4
                        }}
                    >
                                     <Masonry gutter="16px">
                        {items.map((item, index) => (
                                <div key={index}>{item}</div>
                              ))}
                        </Masonry>
        </ResponsiveMasonry>
                      ):(
                        <ResearchersBloco
                       researcher={researcher}
                       />
                      )
                    ):(
                      loading ? (
                        
                        <Skeleton className="w-full rounded-md h-[400px]"/>
                      ):(
                        <TableReseracherhome
                     researcher={researcher}
                     />
                      )
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
                       
                     
                 </div>
                </div>

                {mapModal && (
                  <div className="flex w-[450px] top-20 sticky">

                    <div className="w-[450px]">

                    </div>
                    
                    <div  className="flex w-[450px]  h-screen pb-[230px] top-20 fixed">
                  {loading ? (
                        <Skeleton className="w-full rounded-md h-screen pb-[230px] top-20 fixed"/>
                      ):(
                        <ResearcherMap
                        researcher={researcher}
                        />
                      )}
                  </div>
                  </div>
                )}


                <div onClick={() => setMapModal(!mapModal)} className={`fixed dark:text-white text-sm bottom-[150px] rounded-full px-6 py-2 flex gap-3 transition-all cursor-pointer items-center ${
            (searchType=== 'article') && 'bg-blue-500 dark:bg-blue-500 text-white' ||
            (searchType === 'abstract') && 'bg-yellow-500 dark:bg-yellow-500 text-white' ||
            (searchType === 'speaker') && 'bg-orange-500 dark:bg-orange-500 text-white' ||
            (searchType === 'book') && 'bg-pink-500 dark:bg-pink-500 text-white' ||
            (searchType === 'patent') && 'bg-cyan-500 dark:bg-cyan-500 text-white' ||
            (searchType === 'name') && 'bg-red-500 dark:bg-red-500 text-white' ||
            (searchType === 'area') && 'bg-green-500 dark:bg-green-500 text-white' ||
            (!searchType && 'hover:bg-gray-200 dark:hover:bg-black')
        }`}>
           <MapTrifold size={16} className=" whitespace-nowrap" /> Mostrar no mapa
        </div>
            </div>
        )}
        </>
    )
}
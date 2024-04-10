import { useContext, useMemo, useState } from "react";
import { useModalResult } from "../../hooks/use-modal-result";
import { UserContext } from "../../../context/context";
import { CloudWordResearcherHome } from "./researchers-home/clould-word-researcher-home";
import { HeaderResultTypeHome } from "./header-result-type-home";
import { CaretDown, ListNumbers, UserList } from "phosphor-react";
import { Button } from "../../ui/button";
import { ResearchersBloco } from "./researchers-home/researchers-bloco";
import { ResearcherMap } from "./researchers-home/researcher-map";

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
    const [researcher, setResearcher] = useState<Research[]>([]); 
  
    const isModalOpen = isOpen && type === "researchers-home";

    const { urlGeral, searchType, valoresSelecionadosExport, valorDigitadoPesquisaDireta} = useContext(UserContext);

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
              }
            } catch (err) {
              console.log(err);
            }
          };
          fetchData();
        }, [urlTermPesquisadores]);

    return(
        <>
        {isModalOpen && (
            <div className="w-full flex flex-col mb-[150px]">
                <div>

                   {searchType != 'abstract' && searchType != 'name' && searchType != 'area' && (
                     <div className="mb-8">
                        <HeaderResultTypeHome title="Pesquisadores mais relevantes por ordem de ocorrências" icon={<ListNumbers size={24} className="text-gray-400" />}>
                        <Button  variant="outline" className={`bg-transparent border-0 `} size={'icon'}>
                            <CaretDown size={16} className=" whitespace-nowrap" />
                        </Button>
                        </HeaderResultTypeHome>
                     <CloudWordResearcherHome
                     researcher={researcher}
                     />
                 </div>
                   )}

                

                <div>
                        <HeaderResultTypeHome title="Pesquisadores por detalhamento" icon={<UserList size={24} className="text-gray-400" />}>
                        <Button  variant="outline" className={`bg-transparent border-0 `} size={'icon'}>
                            <CaretDown size={16} className=" whitespace-nowrap" />
                        </Button>
                        </HeaderResultTypeHome>
                     <ResearchersBloco
                     researcher={researcher}
                     />
                 </div>
                </div>
            </div>
        )}
        </>
    )
}
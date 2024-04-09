import { useContext, useMemo, useState } from "react";
import { useModalResult } from "../../hooks/use-modal-result";
import { UserContext } from "../../../context/context";
import { CloudWordResearcherHome } from "./researchers-home/clould-word-researcher-home";

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
        urlTermPesquisadores = `${urlGeral}researcher?terms=${valoresSelecionadosExport}${valorDigitadoPesquisaDireta}&university=&type=ARTICLE&graduate_program_id=4`
    }

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
            <div className="w-full flex flex-col">
                <div>

                    <div>
                        <CloudWordResearcherHome
                        researcher={researcher}
                        />
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
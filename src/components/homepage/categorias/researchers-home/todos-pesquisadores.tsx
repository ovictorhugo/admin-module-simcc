import { useContext, useMemo, useState } from "react"
import { UserContext } from "../../../../context/context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../components/ui/accordion";

import { HeaderResultTypeHome } from "../header-result-type-home";
import { Button } from "../../../ui/button";

import { Rows, SquaresFour, UserList } from "phosphor-react";

import { ResearchersBloco } from "./researchers-bloco";
import { TableReseracherhome } from "./table-reseracher-home";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { InfiniteMovingResearchers } from "../../../ui/infinite-moving-researcher";
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
    
    const {urlGeral , version} = useContext(UserContext)
    
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

    return(
        <main className=" w-full ">

<div className="justify-center px-4 md:px-8 w-full mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20" >
        <Link to={'/informacoes'}  className="inline-flex z-[2] items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2 mb-3 px-3 py-1 text-sm font-medium"><Info size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Saiba como utilizar a plataforma<ArrowRight size={12}/></Link>
        
          {version ? (
              <h1 className="z-[2] text-center max-w-[800px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
              Todas as {" "}
              <strong className="bg-[#82AAC0]  rounded-md px-3 pb-2 text-white font-medium">
                {" "}
                listagens
              </strong>{" "}
              que a plataforma pode filtrar para você. 
            </h1>
          ):(
            <h1 className="z-[2] text-center max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
            Todos os{" "}
            <strong className="bg-[#82AAC0]  rounded-md px-3 pb-2 text-white font-medium">
              {" "}
              docentes e técnicos
            </strong>{" "}
           do SENAI CIMATEC
          </h1>
          )}
            <p className="max-w-[750px] text-center text-lg font-light text-foreground"></p>



              

             
          </div>


          <InfiniteMovingResearchers
        items={researcher} // Formata cada item como um objeto
        direction="right"
        speed='slow'
        pauseOnHover={true}
        className="custom-class"
      />

<TableReseracherhome researcher={researcher} />
        </main>
    )
}
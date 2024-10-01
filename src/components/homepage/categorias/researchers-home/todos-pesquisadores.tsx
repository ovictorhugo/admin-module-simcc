import { useContext, useMemo, useState } from "react"
import { UserContext } from "../../../../context/context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../components/ui/accordion";

import { HeaderResultTypeHome } from "../header-result-type-home";
import { Button } from "../../../ui/button";
import { Rows } from "lucide-react";
import { SquaresFour, UserList } from "phosphor-react";

import { ResearchersBloco } from "./researchers-bloco";
import { TableReseracherhome } from "./table-reseracher-home";
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
    
    const {urlGeral} = useContext(UserContext)
    
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
        <main className="px-4 md:px-8 ">
            <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                <div className="flex mb-2">
                <HeaderResultTypeHome title="Pesquisadores por detalhamento" icon={<UserList size={24} className="text-gray-400" />}>
                      <div className="flex gap-3 mr-3">
                      <Button onClick={() => setTypeVisu('rows')}  variant={typeVisu === 'block' ? 'ghost' : 'outline'} size={'icon'}>
                        <Rows size={16} className="whitespace-nowrap" />
                      </Button>
                      <Button onClick={() => setTypeVisu('block')} variant={typeVisu === 'block' ? 'outline' : 'ghost'}  size={'icon'}>
                        <SquaresFour size={16} className="whitespace-nowrap" />
                      </Button>
                      </div>
                    </HeaderResultTypeHome>
                  <AccordionTrigger>
                 
                  </AccordionTrigger>
                  </div>

                  <AccordionContent>
                   {typeVisu == 'block' ? (
  <ResearchersBloco researcher={researcher} />
                   ):(
                    <TableReseracherhome researcher={researcher} />
                   )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
        </main>
    )
}
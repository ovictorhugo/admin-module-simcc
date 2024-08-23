import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { Building, ChevronLeft, Rows, Shapes, SquareArrowOutUpRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

import { SquaresFour } from "phosphor-react";
import { ResearchersBloco } from "../homepage/categorias/researchers-home/researchers-bloco";
import { Skeleton } from "../ui/skeleton";
import { TableReseracherhome } from "../homepage/categorias/researchers-home/table-reseracher-home";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

interface Patrimonio {
  area: string,
  institution: string,
  first_leader: string,
  first_leader_id: string,
  second_leader:string,
  second_leader_id: string,
  name: string,
  id:string
  }

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
  


export function VisualizacaoGrupo() {
    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const queryUrl = useQuery();
    const type_search = queryUrl.get('group_id');
    const {urlGeral} = useContext(UserContext)

    const [graduatePrograms, setGraduatePrograms] = useState<Patrimonio[]>([]);

    const urlGraduateProgram = `${urlGeral}research_group?group_id=${type_search}`;
  
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


    console.log(urlGraduateProgram)

    //
    const [researcher, setResearcher] = useState<Research[]>([]);
    const [loading, setLoading] = useState(false);
    const [typeVisu, setTypeVisu] = useState('block');


    useEffect(() => {
      const fetchResearchers = async () => {
        if (graduatePrograms.length === 0) return;
    
        const { first_leader, second_leader } = graduatePrograms[0];
        setLoading(true);
    
        try {
          // Fetch data for first_leader
          const firstResponse = await fetch(`${urlGeral}/researcherName?name=${first_leader}`, {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Max-Age": "3600",
              "Content-Type": "text/plain",
            },
          });
    
          const firstData = await firstResponse.json();
    
          // Fetch data for second_leader if exists
          let secondData = [];
          if (second_leader) {
            const secondResponse = await fetch(`${urlGeral}/researcherName?name=${second_leader}`, {
              mode: "cors",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "3600",
                "Content-Type": "text/plain",
              },
            });
    
            secondData = await secondResponse.json();
          }
    
          // Combine results
          setResearcher([...firstData, ...secondData]);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchResearchers();
    }, [graduatePrograms]);

    const items = Array.from({ length: 12 }, (_, index) => (
      <Skeleton key={index} className="w-full rounded-md h-[170px]" />
    ));
  

    return(
        <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
<div className="w-full  gap-4 md:p-8 p-4 pb-0 md:pb-0">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Grupo de pesquisa
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
            
               
          
                <Button size="sm"><SquareArrowOutUpRight size={16}/>Visitar página do grupo no DGP CNPq</Button>
              </div>
            </div>

            </div>

            <div className="md:p-8 p-4 py-0 md:py-0 mt-2">
                 
        
                 <h1 className=" max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
                 {graduatePrograms.map((props) => (
                   <>{props.name}</>
                 ))}
                 </h1>

                 {graduatePrograms.map((props) => (
                  <div className="flex flex-wrap gap-4 ">
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Shapes size={12}/>{props.area}</div>
          <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center capitalize"><Building size={12}/>{props.institution}</div>
          
            </div>
              ))}
                 
                          
         
                           </div>

                          <div className="px-4 md:px-8">
                         
                          <div>
              <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                <div className="flex mb-2">
                <div className="w-full flex items-center justify-between">
                <h3 className="text-2xl font-medium ">Líderes</h3>
                      <div className="flex gap-3 mr-3">
                      <Button onClick={() => setTypeVisu('rows')}  variant={typeVisu === 'block' ? 'ghost' : 'outline'} size={'icon'}>
                        <Rows size={16} className="whitespace-nowrap" />
                      </Button>
                      <Button onClick={() => setTypeVisu('block')} variant={typeVisu === 'block' ? 'outline' : 'ghost'}  size={'icon'}>
                        <SquaresFour size={16} className="whitespace-nowrap" />
                      </Button>
                      </div>
                    </div>
                  <AccordionTrigger>
                 
                  </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    {typeVisu === 'block' ? (
                      loading ? (
                        <ResponsiveMasonry
                          columnsCountBreakPoints={{
                            350: 1,
                            750: 2,
                            900: 3,
                            1200: 4
                          }}
                        >
                          <Masonry gutter="16px">
                            {items.map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                          </Masonry>
                        </ResponsiveMasonry>
                      ) : (
                        <ResearchersBloco researcher={researcher} />
                      )
                    ) : (
                      loading ? (
                        <Skeleton className="w-full rounded-md h-[400px]" />
                      ) : (
                        <TableReseracherhome researcher={researcher} />
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

                          </div>

        </main>
    )
}
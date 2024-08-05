import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";

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
            
               
          
                <Button size="sm">Exporta informações do grupo</Button>
              </div>
            </div>

            </div>

            <div className="md:p-8 p-4 py-0 md:py-0 mt-2">
                 
        
                 <h1 className=" max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
                 {graduatePrograms.map((props) => (
                   <>{props.name}</>
                 ))}
                 </h1>
                 <p className="max-w-[750px]  text-lg font-light text-foreground">Pesquise temas e veja os indicadores de produção nesse programa </p>
                           <div className="flex gap-3 mt-3">
                             <Button size={'sm'} 
                            >Ir para o DGP CNPq</Button>
                           
                           </div>
         
                           </div>

        </main>
    )
}
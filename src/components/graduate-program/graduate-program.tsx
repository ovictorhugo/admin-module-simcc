import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/context";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { Label } from "@radix-ui/react-dropdown-menu";

import { ProgramItem } from "./program-item";
import { VisualizacaoPrograma } from "./visualizacao-programa";
import { useLocation, useNavigate } from "react-router-dom";

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
    visible:string
    qtd_discente:string
    qtd_colaborador:string
    qtd_permanente:string
    create_at:string
  }

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

export function GraduateProgram() {
    const { urlGeral } = useContext(UserContext);
    const { isOpen, type} = useModalHomepage();

    const queryUrl = useQuery();

const type_search = queryUrl.get('graduate_program_id');
  
    const isModalOpen = isOpen && type === "graduation-home";
  
  const [graduatePrograms, setGraduatePrograms] = useState<GraduateProgram[]>([]);
  let programSelecionado = type_search || ''
    const urlGraduateProgram = `${urlGeral}graduate_program_profnit?id=`;

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

    return(
       <>
       {isModalOpen && (
         <>
         {programSelecionado.length == 0 ? (
          <div className="h-full   flex justify-center flex-col w-full px-4 md:px-8">

        

          <div className="flex flex-col justify-center">
 
           <h1 className="z-[2] text-left max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 "> <strong className="bg-[#709CB6]  rounded-md px-3 pb-2 text-white font-medium"> Escolha um programa</strong>{" "}e veja o que a plataforma pode filtrar para você.</h1>
           <Label className="max-w-[750px] text-left text-lg font-light text-gray-500 ">Arraste ou clique em um dos pontos no gráfico para selecionar o programa de pós-graduação. Você também pode escolher pela lista abaixo</Label>
 
           
           </div>
 
           <div className="fixed h-full right-16 top-20 pb-[120px] flex flex-col justify-center items-center  ">
           <div className="gap-3 max-h-[470px] overflow-y-auto flex flex-col items-center justify-center ">
             {graduatePrograms.map((props) => {
               if(props.visible == 'True') {
                 return(
                 <ProgramItem
                 area={props.area}
                 code={props.code}
                 graduate_program_id={props.graduate_program_id}
                 modality={props.modality}
                 name={props.name}
                 rating={props.rating}
                 type={props.type}
                 city={props.city}
                 state={props.state}
                 instituicao={props.instituicao}
                 url_image={props.url_image}
                 region={props.region}
                 sigla={props.sigla}
                 visible={props.visible}
                 qtd_discente={props.qtd_discente}
                 qtd_colaborador={props.qtd_colaborador}
                 qtd_permanente={props.qtd_permanente}
                 create_at={props.create_at}
                 />
                 )
               }
             })}
           </div>
           </div>
         
 
      </div>

         ):(

            <VisualizacaoPrograma

                 />
     
         )}
         </>
       )}
       </>
    )
}
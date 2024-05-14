import { useContext, useEffect, useState } from "react";
import BahiaMap from "./BahiaMap";
import { UserContext } from "../../context/context";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Circle } from "../svg/Circle";
import { ProgramItem } from "./program-item";

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
  }

export function GraduateProgram() {
    const { urlGeral } = useContext(UserContext);
    const { isOpen, type} = useModalHomepage();
  
    const isModalOpen = isOpen && type === "graduation-home";
  
  const [graduatePrograms, setGraduatePrograms] = useState<GraduateProgram[]>([]);

    const urlGraduateProgram = `${urlGeral}/graduate_program_profnit?id=`;

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
         <div className="  overflow-hidden flex justify-center flex-col h-full w-full mr-[72px]">

        

         <div className="flex flex-col justify-center">
          <div className="h-[350px] absolute  ml-16 "><Circle/></div>
          <h1 className=" text-3xl z-[2] mb-2 font-medium max-w-[500px] "><strong className="bg-red-700 text-white font-medium"> Escolha um programa</strong>{" "}e veja o que a plataforma pode filtrar para você.</h1>
          <Label className="z[2]  max-w-[550px] mb-8 ">Arraste ou clique em um dos pontos no gráfico para selecionar o programa de pós-graduação. Você também pode escolher pela lista abaixo</Label>

          
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
                />
                )
              }
            })}
          </div>
          </div>
        

     </div>
       )}
       </>
    )
}
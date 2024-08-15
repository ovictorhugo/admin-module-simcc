import {  Star } from "phosphor-react";

import { GraduationCapIcon, MapPinIcon, Users } from "lucide-react";
import { useModal } from "../hooks/use-modal-store";
import { cn } from "../../lib"

import {  differenceInDays } from 'date-fns';
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
    visible:string
    qtd_discente:string
    qtd_colaborador:string
    qtd_permanente:string
    create_at:string
  }

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  

export function ProgramItem(props:GraduateProgram) {
  const { onOpen } = useModal()

  const qualisColor = {
    'MESTRADO': 'bg-blue-200',
    'DOUTORADO': 'bg-blue-800',
  };

  const queryUrl = useQuery();
  const navigate = useNavigate();

  const currentDate = new Date();
  const itemDate = new Date(props.created_at);

  // Calcula a diferença em dias entre a data atual e a data do item
  const daysDifference = differenceInDays(currentDate, itemDate);

  const handlePesquisaFinal = () => {
    queryUrl.set('graduate_program_id', props.graduate_program_id);
      navigate({
        pathname: '/pos-graduacao',
        search: queryUrl.toString(),
      });
  }

    return(
        <div className="flex items-center relative w-full" onClick={() => handlePesquisaFinal()} >
                   <div className="flex w-full" >
            {props.type != undefined && ( <div className={`w-2 min-w-2 rounded-l-md dark:border-neutral-800 border min-h-[120px]  border-neutral-200 border-r-0 ${qualisColor[props.type.toUpperCase() as keyof typeof qualisColor]} min-h-full relative `}></div>)}
  
            <button
       
            className={cn(
              "flex flex-col rounded-lg w-full rounded-l-none bg-white dark:bg-neutral-800 dark:border-neutral-700 items-start gap-2  border p-3 text-left text-sm transition-all hover:bg-accent",
            
            )}
           
          >
            <div className="flex w-full flex-col gap-1">
           <div className="flex justify-between items-center">
           <div className="text-xs font-medium mb-2 flex items-center gap-2">{props.code != '' ? (props.code):('Sem código')}
           {daysDifference <= 5 && (
        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
      )}</div>
           <GraduationCapIcon size={16}/>
           </div>
              <div className="flex items-center">
                
                <div className="flex items-center gap-2">
                    
                  <div className="font-semibold text-lg">{props.name}</div>
                  
                 
                </div>
                <div
                  
                >
                  
                </div>
              </div>
              
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground flex gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12}/>{props.type}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><MapPinIcon size={12}/>{props.city}</div>
            {props.rating != '' && (
                          <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12}/>{props.rating}</div>
                        )}

            </div>
           
          </button>
          </div>
          </div>
          
    )
}
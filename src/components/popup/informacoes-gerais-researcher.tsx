import { ChartLine, IdentificationBadge, Quotes } from "phosphor-react";

type Research = {

    orcid:string
  

    h_index:string,
    relevance_score:string,
    works_count:string,
    cited_by_count:string,
    i10_index:string,
    scopus:string,
    openalex:string,
    departament:string
    subsidy:Bolsistas
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


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../components/ui/tooltip"
import { Building2, GraduationCap } from "lucide-react";
import { Alert } from "../ui/alert";
import { Link } from "react-router-dom";
  

export function InformacoesGeraisResearcher(props:Research) {
    return (
        <div>
            {(props.h_index.length != 0 && props.cited_by_count.length != 0 && props.i10_index.length != 0) && (
              <div className=" font-medium text-2xl mb-6 pr-12">Informações gerais</div>
            )}

            <div className="flex gap-3 mb-6 items-center flex-wrap">
            {props.h_index.length != 0 && (
                  <TooltipProvider>
  <Tooltip>
    <TooltipTrigger className="outline-none"><div  className=" py-2 px-4 border border-neutral-200 dark:border-neutral-800  rounded-md text-xs flex gap-2 items-center"><ChartLine size={12} className="textwhite" /> índice H: {props.h_index}</div></TooltipTrigger>
    <TooltipContent>
      <p>Dados do OpenAlex</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                )}

{props.cited_by_count.length != 0 && (
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="outline-none"> <div  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><Quotes size={12} className="textwhite" /> Citações: {props.cited_by_count}</div></TooltipTrigger>
        <TooltipContent>
          <p>Dados do OpenAlex</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
                 
                )}

{props.i10_index.length != 0 && (
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="outline-none"> <div  className=" py-2 px-4 border  border-neutral-200 dark:border-neutral-800 rounded-md text-xs  flex gap-2 items-center"><ChartLine size={12} className="textwhite" />índice i10: {props.i10_index}</div></TooltipTrigger>
        <TooltipContent>
          <p>Dados do OpenAlex</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
                 
                )}


            </div>

           {(Array(props.subsidy).length != 0) && (
             <div>
              <div className="font-medium text-2xl mb-6 pr-12">
            Bolsa de proatividade
          </div>
              <div className="flex mt-6">
              
              <div className={`h-full w-2 min-w-[8px] min-h-[100px] rounded-l-lg border border-r-0 border-neutral-200 dark:border-neutral-800 ` }></div>
             
              <Alert className="flex items-center rounded-l-none">
 
 </Alert>
 </div>
             </div>
           )}

            {props.graduate_programs.length !== 0 && (
        <div >
          <div className="font-medium text-2xl my-6 ">
            Programas de pós-graduação
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            {props.graduate_programs.map((item) => (
              <Link
                key={item.graduate_program_id}
                to={`/pos-graduacao?graduate_program_id=${item.graduate_program_id}`}
                target="_blank"
              >
                <div className="border-neutral-200 border dark:border-neutral-800 py-2 px-4 rounded-md text-xs flex gap-2 items-center">
                  <GraduationCap size={12} className="" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
        </div>
    )
}
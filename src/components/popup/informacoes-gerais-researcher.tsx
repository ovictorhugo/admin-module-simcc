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
    
}

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../components/ui/tooltip"
  

export function InformacoesGeraisResearcher(props:Research) {
    return (
        <div>
            <div className=" font-medium text-2xl mb-6 pr-12">Informações gerais</div>

            <div className="flex gap-3 items-center flex-wrap">
            {props.h_index != null && (
                  <TooltipProvider>
  <Tooltip>
    <TooltipTrigger className="outline-none"><div  className=" py-2 px-4 border border-neutral-200 dark:border-neutral-800  rounded-md text-xs flex gap-2 items-center"><ChartLine size={12} className="textwhite" /> índice H: {props.h_index}</div></TooltipTrigger>
    <TooltipContent>
      <p>Dados do OpenAlex</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                )}

{props.cited_by_count != null && (
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="outline-none"> <div  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><Quotes size={12} className="textwhite" /> Citações: {props.cited_by_count}</div></TooltipTrigger>
        <TooltipContent>
          <p>Dados do OpenAlex</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
                 
                )}

{props.i10_index != null && (
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
        </div>
    )
}
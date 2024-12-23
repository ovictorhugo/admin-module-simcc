import { useContext } from "react";
import { useModal } from "../hooks/use-modal-store";
import { UserContext } from "../../context/context";

import { Buildings, CalendarBlank, DownloadSimple, File, Globe,  LinkBreak, Quotes } from "phosphor-react";
import { Link } from "react-router-dom";

import { ScrollArea } from "../ui/scroll-area";

import { Button } from "../ui/button";
import { Asterisk, User, X } from "lucide-react";



  interface ItemsSelecionados {
    term: string;
  }

  import {

    DialogHeader
  } from "../../components/ui/dialog"
import { Sheet, SheetContent } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  // Remove acentos
    .replace(/[|();]/g, '')           // Remove caracteres especiais
    .toLowerCase();
};

const highlightText = (text: string, terms: ItemsSelecionados[]): React.ReactNode => {
  if (!text || terms.length === 0) return text;

  // Cria uma lista com os termos normalizados
  const normalizedTerms = terms.map(term => normalizeText(term.term));

  // Função para verificar se um trecho do texto contém algum dos termos
  const containsTerm = (substring: string): boolean => {
    const normalizedSubstring = normalizeText(substring);
    return normalizedTerms.some(term => normalizedSubstring.includes(term));
  };

  // Divide o texto em palavras e processa cada uma
  const parts = text.split(/(\s+)/); // Divide por espaços para preservar as palavras e espaços
  const result: React.ReactNode[] = [];

  let i = 0;
  while (i < parts.length) {
    const part = parts[i];

    if (containsTerm(part)) {
      const normalizedPart = normalizeText(part);
      let j = 0;
      let highlightStart = 0;

      // Verifica a presença de cada termo na parte do texto
      while (j < normalizedPart.length) {
        let matchedTerm = false;

        for (const term of normalizedTerms) {
          if (normalizedPart.slice(j, j + term.length) === term) {
            // Adiciona o texto não destacado antes do termo
            if (j > highlightStart) {
              result.push(part.slice(highlightStart, j));
            }

            // Adiciona o termo destacado
            result.push(
              <span key={`${i}-${j}`} className="text-blue-500 capitalize font-semibold">
                {part.slice(j, j + term.length)}
              </span>
            );

            j += term.length;
            highlightStart = j;
            matchedTerm = true;
            break;
          }
        }

        if (!matchedTerm) {
          j++;
        }
      }

      // Adiciona qualquer parte restante do texto
      if (highlightStart < part.length) {
        result.push(part.slice(highlightStart));
      }
    } else {
      result.push(part);
    }

    i++;
  }

  return result;
};

export function ArticlesModal() {

    const {urlGeral, itemsSelecionados} = useContext(UserContext)

    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = isOpen && typeModal === "articles-modal";


  let qualisColor = {
    'A1': 'bg-[#006837]',
    'A2': 'bg-[#8FC53E]',
    'A3': 'bg-[#ACC483]',
    'A4': 'bg-[#BDC4B1]',
    'B1': 'bg-[#F15A24]',
    'B2': 'bg-[#F5831F]',
    'B3': 'bg-[#F4AD78]',
    'B4': 'bg-[#F4A992]',
    'B5': 'bg-[#F2D3BB]',
    'C': 'bg-[#EC1C22]',
    'None': 'bg-[#560B11]',
    'SQ': 'bg-[#560B11]'
}


    const teste = highlightText(data.title || '', itemsSelecionados)

    return(
      <Sheet open={isModalOpen} onOpenChange={onClose}>
      <SheetContent
        className={`p-0 gap-0 dark:bg-neutral-900  dark:border-gray-600 min-w-[50vw]`}
      >
           <div
                      className={`h-full w-2 absolute  ${qualisColor[data.qualis as keyof typeof qualisColor]} `}
                    > 
                    </div>

        <div className="ml-2">
         <DialogHeader className="h-[50px] px-4 justify-center border-b dark:border-b-neutral-600">
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-8 w-8"
                    variant={"outline"}
                    onClick={() => onClose()}
                    size={"icon"}
                  >
                    <X size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Fechar</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex ml-auto items-center w-full justify-between">
              <div className="flex ml-auto items-center gap-3">
              <Link target="_blank" to={data.pdf || data.landing_page_url || `https://doi.org/${data.doi || 'default-doi'}`}>
           <Button variant={'default'} className="h-8  text-white dark:text-white">
           Download do arquivo
           <DownloadSimple size={8} className="h-4 w-4" />
           </Button></Link>
              </div>
            </div>
          </div>
        </DialogHeader>
       
     
        <ScrollArea className=" pb-4  h-[calc(100vh-50px)] p-8 flex-1">
        <div className="mb-8 flex gap-8 justify-between ">
            <div >
              <p className=" mb-2 text-lg font-light text-foreground">
              {data.magazine}
              </p>


              <h1 className=" relative  text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]  capitalize">
              {teste}
              </h1>
        

            <div className="flex items-center flex-wrap gap-4 mt-6">
           {data.article_institution != '' && ( <p className="text-gray-500 dark:text-gray-300 text-sm text-justify  flex items-center gap-1"> <Buildings size={16}/>{data.article_institution}</p>)}
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><CalendarBlank size={12}/>{data.year}</div>
            {data.language != '' && (<div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Globe size={12}/>{data.language}</div>)}
            
            <Link to={`/researcher?researcher_name=${data.researcher}&search_type=&terms=`} target="_blank" className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-2 items-center"><Avatar className="cursor-pointer rounded-md  h-6 w-6">
      <AvatarImage  className={'rounded-md h-6 w-6'} src={`${urlGeral}ResearcherData/Image?name=${data.researcher}`} />
      <AvatarFallback className="flex items-center justify-center"><User size={16}/></AvatarFallback>
  </Avatar>Encontrado no Lattes de {data.researcher}</Link>
            </div>
            </div>

            <div>
            <div>
                            <div id="mudarCorDiv" className={` h-16 w-16 rounded-md relative  whitespace-nowrap flex items-center justify-center  ${qualisColor[data.qualis as keyof typeof qualisColor]}`}>
                            <File size={36} className="text-white whitespace-nowrap  w-10" />
                            <p className="text-[8px] text-white absolute font-bold mt-[6px]">{data.qualis}</p>

                        </div>

                            </div>
            </div>
            </div>
                    
              <div>
                
                </div>    
                   

                <div>
                     <div className="my-6 border-b dark:border-b-neutral-800"></div>
                      {((data.jif != "None" && data.jif != "") || data.citations_count != '' || data.issn != '' || data.doi != '') && (<h4 className="font-medium text-xl mb-4">Informações gerais</h4>)}

                      <div className="flex gap-3 flex-wrap">
                      {data?.jcr_link && (
                                <Link target="_blank" to={data.jcr_link} className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center">
                                <LinkBreak size={16} /> JCR {data.jif}
                                </Link>
                                )}

{data.citations_count != '' && (<div  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><Quotes size={16}/>Citações {data.citations_count}</div>)}


{data.issn != '' && data.issn?.split(',').map((author, index) => (
                        <div 
                          key={index} 
                          className="border-neutral-200 border dark:border-neutral-800 py-2 px-4 rounded-md text-xs flex gap-2 items-center">
                          <Asterisk size={16}/>ISSN {author.trim()}
                        </div>
                      ))}


{data.doi != '' && (<Link to={`https://doi.org/${data.doi}`} target="_blank"  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><LinkBreak size={16}/>DOI {data.doi}</Link>)}



                      </div>
                      </div>  


                    {data.abstract != '' && (
                       <div>
                      

                       <div className="my-6 border-b dark:border-b-neutral-800"></div>
                        <h4 className="font-medium text-xl mb-4">Resumo</h4>
                       <p className="text-sm text-gray-500 flex flex-wrap text-justify">{data.abstract}</p>
                        </div>  
                    )}


                     {data.authors != '' && (
                       <div>
                       <div className="my-6 border-b dark:border-b-neutral-800"></div>
                       <h4 className="font-medium text-xl mb-4">Autores</h4>

                       <div className="flex flex-wrap gap-3">
                       {data.authors?.split(';').map((author, index) => (
                        <div 
                          key={index} 
                          className="border-neutral-200 border dark:border-neutral-800 py-2 px-2 rounded-md text-xs flex gap-2 items-center">
                          <Avatar className="cursor-pointer rounded-md  h-6 w-6">
      <AvatarImage  className={'rounded-md h-6 w-6'} src={`${urlGeral}ResearcherData/Image?name=${author.trim()}`} />
      <AvatarFallback className="flex items-center justify-center"><User size={16}/></AvatarFallback>
  </Avatar> {author.trim()}
                        </div>
                      ))}

                       </div>
                       </div> 
                     )} 


                     {data.keywords != '' && (
                       <div>
                       <div className="my-6 border-b dark:border-b-neutral-800"></div>
                       <h4 className="font-medium text-xl mb-4">Palavras-chaves</h4>

                       <div className="flex flex-wrap gap-3">
                        {data.keywords?.split(';').map((props, index) => (
                          <div key={index} className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center">{props.trim()}</div>
                        ))}
                       </div>
                       </div>  
                     )}

        
         </ScrollArea>
         </div>
      
            </SheetContent>
            </Sheet>
    )
}
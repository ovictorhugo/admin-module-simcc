import { useContext, useEffect, useRef, useState } from "react";

import { UserContext } from "../../context/context";

import { Buildings, CalendarBlank, DownloadSimple, EyeClosed, File, Globe,  LinkBreak, Quotes } from "phosphor-react";
import { Link } from "react-router-dom";

import { ScrollArea } from "../ui/scroll-area";

import { Button } from "../ui/button";
import { Asterisk, Eye, Plus, SquareArrowOutUpRight, Star, User, X } from "lucide-react";



  interface ItemsSelecionados {
    term: string;
  }

  import {

    DialogHeader
  } from "../../components/ui/dialog"
import { Sheet, SheetContent } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useModalSecundary } from "../hooks/use-modal-store-secundary";

const decodeHtmlEntities = (text: string): string => {
  const entities = {
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&apos;': "'",
    '&QUOT;': '"',
    '&LT;': '<',
    '&GT;': '>',
    '&AMP;': '&'
  };
  return text.replace(/&(?:quot|lt|gt|amp|apos|QUOT|LT|GT|AMP);/g, entity => entities[entity.toLowerCase() as keyof typeof entities]);
};

const stripHtmlTags = (text: string): string => {
  // Remove HTML tags but preserve their text content
  const div = document.createElement('div');
  div.innerHTML = text;
  return div.textContent || div.innerText || '';
};

const normalizeText = (text: string): string => {
  // Remove HTML tags and normalize for comparison
  const textWithoutTags = stripHtmlTags(text);
  return textWithoutTags
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  // Remove acentos
    .replace(/[|();]/g, '')           // Remove caracteres especiais
    .toLowerCase();
};

const highlightText = (text: string, terms: ItemsSelecionados[]): React.ReactNode => {
  if (!text || terms.length === 0) {
    // Just strip HTML and decode entities for display
    return stripHtmlTags(decodeHtmlEntities(text));
  }

  // First decode HTML entities and strip tags
  const cleanText = stripHtmlTags(decodeHtmlEntities(text));

  // Normalize terms for comparison
  const normalizedTerms = terms.map(term => normalizeText(term.term));

  // Split text into words while preserving spaces
  const words = cleanText.split(/(\s+)/);
  const result: React.ReactNode[] = []

  words.forEach((word, index) => {
    const normalizedWord = normalizeText(word);
    const shouldHighlight = normalizedTerms.some(term => normalizedWord.includes(term));

    if (shouldHighlight) {
      result.push(
        <span key={index} className="text-blue-500 capitalize font-semibold">
          {word}
        </span>
      );
    } else {
      result.push(word);
    }
  });

  return result;
};

export function ArticlesModal() {

    const {urlGeral, itemsSelecionados} = useContext(UserContext)

    const { onClose, isOpen, type: typeModal, data } = useModalSecundary();
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

const imgRef = useRef<HTMLImageElement>(null);
const [showOverlay, setShowOverlay] = useState(false);

useEffect(() => {
  const checkImageHeight = () => {
    if (imgRef.current && imgRef.current.clientHeight > 300) {
      setShowOverlay(true);
    }
  };

  // Check image height after the image has loaded
  const img = imgRef.current;
  if (img) {
    img.onload = checkImageHeight;
    if (img.complete) {
      checkImageHeight();
    }
  }
}, []);

const [isExpanded, setIsExpanded] = useState(false);

const toggleExpand = () => {
  setIsExpanded(!isExpanded);
};


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
             <div>
             {data.relevance && (
                <div className="relative  py-2 px-4 bg-yellow-600 w-fit rounded-md text-white"><Star size={16}/></div>
            )}

             <p className=" mb-2 text-lg font-light text-foreground">
              {data.magazine}
              </p>
             </div>


              <h1 className=" relative  text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]  capitalize">
              {teste}
              </h1>
        

            <div className="flex items-center flex-wrap gap-4 mt-6">
           {data.article_institution != '' && ( <p className="text-gray-500 dark:text-gray-300 text-sm text-justify  flex items-center gap-1"> <Buildings size={16}/>{data.article_institution}</p>)}
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><CalendarBlank size={12}/>{data.year}</div>
            {data.language != '' && (<div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Globe size={12}/>{data.language}</div>)}
            
          
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

          <div className="flex justify-between items-center">
          <div className="text-sm w-fit text-gray-500 dark:text-gray-300 font-normal flex gap-2 items-center"><Avatar className="cursor-pointer rounded-md  h-16 w-16">
      <AvatarImage  className={'rounded-md h-16 w-16'} src={`${urlGeral}ResearcherData/Image?name=${data.researcher}`} />
      <AvatarFallback className="flex items-center justify-center"><User size={16}/></AvatarFallback>
  </Avatar>
 <div>
 <p>Encontrado no Lattes de </p>
 <p className="text-black dark:text-white font-medium text-lg">{data.researcher}</p></div></div>

 <Link to={`/researcher?researcher_name=${data.researcher}&search_type=&terms=`} target="_blank" ><Button size={'icon'}><SquareArrowOutUpRight size={16}/></Button></Link>
          </div>

                     <div className="my-6 border-b dark:border-b-neutral-800"></div>
                      {((data.jif != "None" && data.jif != "") || data.citations_count != '' || data.issn != '' || data.doi != '') && (<h4 className="font-medium text-xl mb-4">Informações gerais</h4>)}

                      <div className="flex gap-3 flex-wrap">
                      {data?.jcr_link && (
                                <Link target="_blank" to={data.jcr_link} className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center">
                                <LinkBreak size={16} /> JCR {data.jif}
                                </Link>
                                )}

{data.citations_count != '' && (<div  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><Quotes size={16}/>Citações {data.citations_count}</div>)}


{typeof data.issn === 'string' && data.issn.trim() !== '' &&
  data.issn.split(',').map((author, index) => (
    <div 
      key={index} 
      className="border-neutral-200 border dark:border-neutral-800 py-2 px-4 rounded-md text-xs flex gap-2 items-center">
      <Asterisk size={16}/>ISSN {author.trim()}
    </div>
  ))
}



{data.doi != '' && (<Link to={`https://doi.org/${data.doi}`} target="_blank"  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><LinkBreak size={16}/>DOI {data.doi}</Link>)}

                      </div>
                      </div>  

                      {data.has_image  && (
                       <div>
                      

                       <div className="my-6 border-b dark:border-b-neutral-800"></div>
  

    <div className="relative">
      <div
        className={`overflow-hidden rounded-md ${
          isExpanded ? "h-auto" : "h-[300px]"
        }`}
      >
        <img
           src={`${urlGeral}image/${data.id}`}
          className="w-full"
          alt="Dynamic content"
        />
      </div>
      {!isExpanded && (
        <div className="absolute h-[300px] inset-0 flex justify-center w-full bg-gradient-to-t from-white dark:from-neutral-900 to-transparent items-end">
          <Button
            onClick={toggleExpand}
            
          >
            <Eye size={16} />
            Ver mais
          </Button>
        </div>
      )}
      {isExpanded && (
        <div className="flex justify-center mt-2">
          <Button
            onClick={toggleExpand}
            
          >
            <EyeClosed size={16} />
            Mostrar menos
          </Button>
        </div>
      )}
    </div>
                        </div>  
                    )}


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
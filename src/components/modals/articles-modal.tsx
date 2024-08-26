import { useContext, useMemo, useState } from "react";
import { useModal } from "../hooks/use-modal-store";
import { UserContext } from "../../context/context";
import unorm from 'unorm';
import { Buildings, CalendarBlank, DownloadSimple, File, Globe, Hash, LinkBreak, LinkSimple, Quotes } from "phosphor-react";
import { Link } from "react-router-dom";
import { AvatarResearcher } from "../homepage/categorias/researchers-home/avatar-researcher";
import { ScrollArea } from "../ui/scroll-area";
import { BracketsCurly,  Copy, FileCsv,  Plus,  ShareNetwork } from "phosphor-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button";
import { MoreHorizontal, X } from "lucide-react";
import QRCode from "react-qr-code";

type OpenAlex = {
    pdf_url:string
    issn: string
    landing_page_url: string
    abstract: string
    cited_by_count:string, 
    language:string, 
    keywords: any[], 
    authorships: any[]
    host_organization_name: string
    doi: string
  
  }  

  interface ItemsSelecionados {
    term: string;
  }

  import {

    DialogHeader
  } from "../../components/ui/dialog"
import { Sheet, SheetContent } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

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

    const [article, setArticle] = useState<OpenAlex[]>([])
    /////////////////


    const urlTerm =`https://api.openalex.org/works/https://doi.org/${data.doi}`;
    const urlTermTitle =`https://api.openalex.org/works?filter=title.search:${data.title}`;
    
    useMemo(() => {
      const fetchData = async () => {
          if(data && data.doi != 'None') {
            console.log(data.doi)
              try {
                const response = await fetch(urlTerm, {
                    mode: "cors",
                    headers: {
                    
                    },
                });
                const data = await response.json();
                console.log('data',data)
                if (data ) {
                  console.log('doi')
                  console.log(urlTerm)
                  const firstResult = data;
                  const { pdf_url, landing_page_url } = firstResult.primary_location;
                  const { abstract_inverted_index, cited_by_count, language, keywords, authorships, doi} = firstResult
                  const { issn, host_organization_name } = firstResult.primary_location.source;

                   // Montando o resumo combinando as palavras com base nos índices
                // Montando o resumo combinando as palavras com base nos índices
                const abstractArray = Object.entries(abstract_inverted_index)
    .reduce((accumulatedAbstract, [word, indices]) => {
        if (Array.isArray(indices)) {
            indices.forEach(index => {
                if (!accumulatedAbstract[index]) {
                    accumulatedAbstract[index] = [];
                }
                accumulatedAbstract[index].push(word);
            });
        }
        return accumulatedAbstract;
    }, [])
    .map(words => words.join(''))
    .join(' ');

                  const extractedData = {pdf_url, issn, landing_page_url, abstract: abstractArray, cited_by_count:cited_by_count, language:language, keywords:keywords, authorships:authorships, host_organization_name:host_organization_name, doi };
                  setArticle([extractedData]);
                  console.log(article)
                  
              }
            } catch (err) {
                console.log(err);
            }
          } else {
            const response = await fetch(urlTermTitle, {
                mode: "cors",
                headers: {
                
                },
            });
            const data = await response.json();
            if (data) {
                console.log('name')
                console.log(urlTermTitle)
                const firstResult = data.result[0];
                const { pdf_url, landing_page_url } = firstResult.primary_location;
                  const {  cited_by_count, language, keywords, authorships} = firstResult
              

                  

                  const extractedData = {pdf_url, issn:'', landing_page_url, doi:'',  abstract: '', cited_by_count:cited_by_count, language:language, keywords:keywords, authorships:authorships, host_organization_name:'' };
                  setArticle([extractedData]);
                console.log(article)
            }
          }
      };
      fetchData();
  }, [urlTerm, urlTermTitle]);

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

const normalizedTitle = data.title ? 
    data.title
        .replace(/&quot;/g, '"')
        .replace(/&#10;/g, '\n')
        .toLowerCase() 
    : '';

    const [isVisible, setIsVisible] = useState(false);
    const [apiVisible, setApiVisible] = useState(false);
    const urlApi = `${urlGeral}researcherName?name=`


    const teste = highlightText(data.title || '', itemsSelecionados)

    return(
      <Sheet open={isModalOpen} onOpenChange={onClose}>
      <SheetContent
        className={`p-0 gap-0 dark:bg-neutral-900 flex dark:border-gray-600 min-w-[50vw]`}
      >
           <div
                      className={`h-full w-2  ${qualisColor[data.qualis as keyof typeof qualisColor]} `}
                    > 
                    </div>

         <div className="flex-1">
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
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                <Link to={''}>
           <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
            
           <DownloadSimple size={8} className="h-4 w-4" />
           </Button></Link>
                </TooltipTrigger>
                <TooltipContent> Download do arquivo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
              </div>
            </div>
          </div>
        </DialogHeader>
       
     
        <ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-50px)] p-8 flex-1">
        <div className="mb-8 flex gap-8 justify-between items-center">
            <div >
              <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
              {data.magazine}
              </p>


              <h1 className="flex flex-wrap relative max-w-[400px] w-[400px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  capitalize">
              {teste}
              </h1>
        

            <div className="flex items-center gap-4 mt-6">
            <p className="text-gray-500 dark:text-gray-300 text-sm text-justify  flex items-center gap-1"> <Buildings size={16}/></p>
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><CalendarBlank size={12}/>{data.year}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Globe size={12}/></div>
            </div>
            </div>

            <div>
            <div>
                            <div id="mudarCorDiv" className={` h-16 w-16 rounded-md  whitespace-nowrap flex items-center justify-center  ${qualisColor[data.qualis as keyof typeof qualisColor]}`}>
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
                      <h4 className="font-medium text-xl mb-4">Informações gerais</h4>

                      <div className="flex gap-4 flex-wrap">
                      {data.jif != "None" && (
                                <Link to={data ? (data?.jcr_link):('')} className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><LinkBreak size={16}/>JCR</Link>
                                )}

<div  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><Quotes size={16}/>Citações {data.cited_by_count}</div>
                      </div>
                      </div>  


                     <div>
                     <div className="my-6 border-b dark:border-b-neutral-800"></div>
                      <h4 className="font-medium text-xl mb-4">Resumo</h4>
                     <p className="text-sm text-gray-500">{data.abstract}</p>
                      </div>  


                      <div>
                      <div className="my-6 border-b dark:border-b-neutral-800"></div>
                      <h4 className="font-medium text-xl mb-4">Autores</h4>
                      </div>  


                      <div>
                      <div className="my-6 border-b dark:border-b-neutral-800"></div>
                      <h4 className="font-medium text-xl mb-4">Palavras-chaves</h4>
                      </div>  

        
         </ScrollArea>
         </div>
            </SheetContent>
            </Sheet>
    )
}
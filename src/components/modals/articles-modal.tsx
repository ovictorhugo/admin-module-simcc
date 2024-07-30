import { useContext, useMemo, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader } from "../ui/drawer";
import { useModal } from "../hooks/use-modal-store";
import { UserContext } from "../../context/context";
import unorm from 'unorm';
import { Buildings, CalendarBlank, DownloadSimple, File, Globe, Graph, Hash, LinkBreak, LinkSimple, Quotes } from "phosphor-react";
import { Link } from "react-router-dom";
import { AvatarResearcher } from "../homepage/categorias/researchers-home/avatar-researcher";
import { ScrollArea } from "../ui/scroll-area";
import { BracketsCurly, CaretDown, Copy, Export, FileCsv, GraduationCap, IdentificationBadge, LinkedinLogo, MapPin, Plus, PuzzlePiece, QrCode, ShareNetwork } from "phosphor-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
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

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"

export function ArticlesModal() {

    const {urlGeral, valorDigitadoPesquisaDireta, valoresSelecionadosExport} = useContext(UserContext)

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
    return(
        <Drawer open={isModalOpen} onClose={onClose}>
        <DrawerContent onInteractOutside={onClose}  className="">
        <div
                      className={`h-full w-2 rounded-tl-3xl  absolute  ${qualisColor[data.qualis as keyof typeof qualisColor]} `}
                    > 
                    </div>

                    <div className="flex justify-between items-center w-full px-4"> 
                    <div></div>

                    <div className="flex gap-3">

                    <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
             
             <Plus size={8} className="h-4 w-4" />
           </Button>

           <Link to={''}>
           <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
            
           <DownloadSimple size={8} className="h-4 w-4" />
           </Button></Link>

         <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button variant="ghost" className="h-8 w-8 p-0">
             <span className="sr-only">Open menu</span>
             <MoreHorizontal className="h-4 w-4" />
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
           <DropdownMenuLabel>Ações</DropdownMenuLabel>
           <DropdownMenuItem className="flex items-center gap-3"
            
           ><Copy className="h-4 w-4" />
             Copiar Lattes ID
           </DropdownMenuItem>

           <DropdownMenuItem className="flex items-center gap-3" ><FileCsv className="h-4 w-4" />Baixar CSV das publicações</DropdownMenuItem>

           <DropdownMenuItem className="flex items-center gap-3" onClick={() => setApiVisible(!apiVisible)}><BracketsCurly className="h-4 w-4" />API da consulta</DropdownMenuItem>

           <DropdownMenuItem className="flex items-center gap-3"
            
           ><ShareNetwork className="h-4 w-4" />
             Copiar link para compartilhar
            
           </DropdownMenuItem>
           <DropdownMenuSeparator />
           <DropdownMenuItem className="flex justify-center py-4">
           
           <QRCode size={200} className={'bg-transparent'} value={urlApi} />
           
           
           </DropdownMenuItem>
     
         </DropdownMenuContent>
       </DropdownMenu>

                    </div>
                    </div>

            <DrawerHeader className="flex mb-8">
                
                {article.map((props) => {
                    return(
                       <div className="flex gap-6">

                         <div className="ml-2 flex flex-1 flex-col">
                           <div>
                          <div className="flex gap-6">
                            <div>
                            <div id="mudarCorDiv" className={` h-16 w-16 rounded-md  whitespace-nowrap flex items-center justify-center  ${qualisColor[data.qualis as keyof typeof qualisColor]}`}>
                            <File size={36} className="text-white whitespace-nowrap  w-10" />
                            <p className="text-[8px] text-white absolute font-bold mt-[6px]">{data.qualis}</p>

                        </div>
                            </div>
                            <div>
                            <h4 className="text-3xl font-medium mb-1">{data.magazine}</h4>
                           <div className="flex items-center gap-4 mb-6 mt-2">
                            {props.host_organization_name && (
                                <p className="text-gray-500 dark:text-gray-300 text-sm text-justify  flex items-center gap-1"> <Buildings size={16}/>{props.host_organization_name}</p>
                            )}
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><CalendarBlank size={12}/>{data.year}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Globe size={12}/>{props.language}</div>
                           </div>
                            </div>
                          </div>
                           <h4 className="text-xl font-medium mb-2 capitalize text-gray-500">
                           {normalizedTitle
      .split(/[\s.,;?!]+/)
      .map((word, index) => {
        const formattedWord = unorm.nfkd(word).replace(/[^\w\s]/gi, '').toLowerCase();
        const formattedValoresSelecionadosExport = unorm.nfkd(valoresSelecionadosExport).replace(/[^\w\s]/gi, '').toLowerCase();
        const formattedValorDigitadoPesquisaDireta = unorm.nfkd(valorDigitadoPesquisaDireta).replace(/[^\w\s]/gi, '').toLowerCase();
        const alphabet = Array.from({ length: 26 }, (_, index) => String.fromCharCode('a'.charCodeAt(0) + index));
        const ignoredWords = [...alphabet, 'do', 'da', `on`, `com`, 'o', 'os', 'as', 'de', 'e', 'i', 'na', 'du', 'em', ')', '(', 'na', 'a'];
        let formattedSpan;
        
     
        if (
         
          (formattedValoresSelecionadosExport.includes(formattedWord) ||
          formattedValorDigitadoPesquisaDireta.includes(formattedWord)) &&
          !ignoredWords.includes(formattedWord)
        ) {
          formattedSpan = (
            <span key={index} className="text-blue-700 font-bold">
              {word.toUpperCase()}{' '}
            </span>
          );
        } else {
          formattedSpan = <span key={index}>{word} </span>;
        }

        return formattedSpan;
      })}
                           </h4>

                           
                           </div>
                            <div  className={isVisible ? "h-auto transition-all" : "max-h-[220px] overflow-hidden transition-all"}>
                            <p className="text-gray-400 font-medium text-justify ">Resumo</p>
                            <p className="text-gray-400 text-sm text-justify ">{props.abstract}</p>
                            </div>

                            {apiVisible && (
              <div className="w-full bg-slate-100 px-4 py-2 rounded-md text-xs mt-4 flex gap-3 items-center justify-between">
                <div className="flex items-center gap-3"><BracketsCurly className="h-4 w-4" />{urlApi}</div>
                <Button onClick={() => navigator.clipboard.writeText(urlApi)} variant="ghost" className="h-8 w-8 p-0">
              <Copy className="h-4 w-4" />
            </Button>
              </div>
            )}

                            <div className="flex gap-3 mt-8 flex-wrap">
                             {Array.isArray(props.authorships) && props.authorships.map((item) => {
                                     return(
                                        <AvatarResearcher
                                        raw_affiliation_string={item.raw_affiliation_string}
                                        display_name={item.raw_author_name}

                                        />
                                     );
                                 })}
                             </div>
                        </div>

                        <ScrollArea className="h-[400px]">
                        <div className="max-w-[350px] w-[350px] flex flex-col gap-12">
                       <div>
                       <div className=" font-medium text-2xl mb-6 pr-12">Informações gerais</div>
                            <div className="flex items-center gap-3 flex-wrap ">
                            
                            <div  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><div className={`w-4 h-4 rounded-md ${qualisColor[data.qualis as keyof typeof qualisColor]}`}></div> Qualis {data.qualis}</div>

                            {data.jif != "None" && (
                                <Link to={data ? (data.jcr_link):('')} className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><LinkBreak size={16}/>JCR</Link>
                                )}

                            <div  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><Quotes size={16}/>Citações {props.cited_by_count}</div>
                            {Array.isArray(props.issn) && props.issn.map((item) => {
                                     return(
                                        <div  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><Hash size={16}/>ISSN {item}</div>
                                     );
                                 })}

{props.doi && (
    <Link to={props.doi} target="_blank"  className=" border-neutral-200 border dark:border-neutral-800 py-2 px-4  rounded-md text-xs  flex gap-2 items-center"><LinkSimple size={16}/>Link DOI</Link>
)}
                            
                            </div>

                           
                       </div>

                           {props.keywords.length != 0 && (
                             <div>
                             <div className=" font-medium text-2xl mb-4 pr-12">Palavras-chaves</div>
 
                             <div className="flex gap-3 flex-wrap">
                             {Array.isArray(props.keywords) && props.keywords.map((item) => {
                                     return(
                                         <div className="flex gap-2 items-center p-2 px-3 rounded-md text-white text-xs bg-blue-500 hover:bg-blue-500">{item.display_name}</div>
                                     );
                                 })}
                             </div>
                             </div>
                           )}

                          
                        </div>
                        </ScrollArea>
                       </div>
                    )
                })}
            </DrawerHeader>
        </DrawerContent>
        </Drawer>
    )
}
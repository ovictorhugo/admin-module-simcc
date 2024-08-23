import { CalendarBlank, DotsThree,  LinkBreak, LinkSimple } from "phosphor-react";
import { Alert } from "../../ui/alert";
import { useContext } from "react";
import { UserContext } from "../../../context/context";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/use-modal-store";
import { Eye } from "lucide-react";

type Articles = {
    id: string,
    doi: string,
    name_periodical: string,
    qualis: "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "None" | "NP" | "SQ",
    title: string,
    year: string,
    color: string,
    researcher: string,
    lattes_id: string,
    magazine: string,
    lattes_10_id: string,
    jif: string,
    jcr_link: string
    researcher_id: string
    distinct: boolean
}


interface ItemsSelecionados {
  term: string;
}

export function ArticleItem(props:Articles) {

    const {urlGeral,  itemsSelecionados} = useContext(UserContext)

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

   
    const doi = props.doi.replace('http://dx.doi.org/', '');



  const { onOpen } = useModal();

  const normalizeText = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const highlightText = (text: string, terms: ItemsSelecionados[]): React.ReactNode => {
    if (terms.length === 0) {
      return text;
    }
  
    const normalizedTerms = terms.map(term => normalizeText(term.term));
    const regexPattern = normalizedTerms.join('|');
    const regex = new RegExp(`(${regexPattern})`, 'gi');
    const normalizedText = normalizeText(text);
    const parts = normalizedText.split(regex);
  
    let originalIndex = 0;
    const highlightedParts = parts.map((part, index) => {
      const originalPart = text.substr(originalIndex, part.length);
      originalIndex += part.length;
  
      return regex.test(part)
        ? <span key={index} className="text-blue-500 font-semibold">{originalPart}</span>
        : originalPart;
    });
  
    return highlightedParts;
  };

  const highlightedTitleEvent = highlightText(props.title || '', itemsSelecionados);
    return(
        <div className="flex  h-full w-full" >
            
                    <div
                      className={` w-2 min-h-[200px] h-full rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 ${qualisColor[props.qualis as keyof typeof qualisColor]} `}
                    > 
                    </div>
                

                <Alert className="rounded-l-none h-full flex flex-col justify-between">
                    <div>
                        <div>
                           <h3 className="font-semibold mb-4 ">{props.name_periodical}{props.magazine}</h3>
                            <p className="text-sm capitalize text-gray-500 dark:text-gray-300 font-normal">
                              {highlightedTitleEvent}
                            </p>
                        </div>
                        <div>
                           
                        </div>
                    </div>

                    <div className="flex items-center mt-4 gap-4">
                        <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><CalendarBlank size={12}/>{props.year}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><div className={`w-4 h-4 rounded-md ${qualisColor[props.qualis as keyof typeof qualisColor]}`}></div>Qualis {props.qualis}</div>

                        {props.jif != "None" && (
                               <Link to={props.jcr_link} className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><LinkBreak size={16}/>JCR</Link>
                            )}
                        </div>

                      <div className=" ml-auto flex items-center gap-2">
                      <Button variant="outline" size={'icon'} className="ml-auto text-sm h-8 w-8 text-gray-500 dark:text-gray-300">
            <Eye onClick={() => onOpen('articles-modal', {doi:doi, qualis:props.qualis, title:props.title, year:props.year, jif:props.jif, lattes_10_id:props.lattes_10_id, researcher_id:props.researcher_id, magazine:props.name_periodical})} size={16}/>
            </Button>
                        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={'icon'} className="ml-auto text-sm h-8 w-8 text-gray-500 dark:text-gray-300">
            <DotsThree size={16}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto">
          {props.doi != 'None' && (
            <Link target="_blank" to={`http://dx.doi.org/${props.doi}`}>
        
            <DropdownMenuItem className="flex items-center gap-3"><LinkSimple className="h-4 w-4" />Link DOI</DropdownMenuItem>
          </Link>
          )}
          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-3 flex items-center">
          <div className={`border-[1px] border-gray-300 rounded-sm h-6 w-6 bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.researcher_id}) ` }}></div>
          {props.researcher}
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
                      </div>
                        
                    </div>
                </Alert>
        </div>
    )
}
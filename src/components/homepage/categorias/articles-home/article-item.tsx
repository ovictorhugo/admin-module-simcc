import { CalendarBlank, DotsThree, Graph, LinkBreak, LinkSimple } from "phosphor-react";
import { Alert } from "../../../ui/alert";
import { useContext } from "react";
import { UserContext } from "../../../../context/context";
import unorm from 'unorm';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { Link } from "react-router-dom";

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


export function ArticleItem(props:Articles) {

    const {urlGeral, valoresSelecionadosExport, valorDigitadoPesquisaDireta} = useContext(UserContext)

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

    const normalizedTitle = props.title
    .replace(/&quot;/g, '"')
    .replace(/&#10;/g, '\n')
    .toLowerCase();

    return(
        <div className="flex  w-full">
            
                    <div
                      className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 ${qualisColor[props.qualis as keyof typeof qualisColor]} `}
                    > 
                    </div>
                

                <Alert className="rounded-l-none flex flex-col justify-between">
                    <div>
                        <div>
                           <h3 className="font-semibold mb-4 ">{props.name_periodical}</h3>
                            <p className="text-sm capitalize text-gray-500 dark:text-gray-300 font-normal">
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
                            </p>
                        </div>
                        <div>
                           
                        </div>
                    </div>

                    <div className="flex items-center mt-4 gap-4">
                        <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><CalendarBlank size={12}/>{props.year}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Graph size={16}/>Qualis {props.qualis}</div>

                        {props.jif != "None" && (
                               <Link to={props.jcr_link} className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><LinkBreak size={16}/>JCR</Link>
                            )}
                        </div>
                        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={'icon'} className="ml-auto text-sm text-gray-500 dark:text-gray-300">
            <DotsThree size={16}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto">
          <Link target="_blank" to={`http://dx.doi.org/${props.doi}`}>
        
            <DropdownMenuItem className="flex items-center gap-3"><LinkSimple className="h-4 w-4" />Link DOI</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-3 flex items-center">
          <div className={`border-[1px] border-gray-300 rounded-sm h-6 w-6 bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.researcher_id}) ` }}></div>
          {props.researcher}
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
                        
                    </div>
                </Alert>
        </div>
    )
}
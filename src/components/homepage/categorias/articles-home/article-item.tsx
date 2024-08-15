import { CalendarBlank, DotsThree,  LinkBreak, LinkSimple } from "phosphor-react";
import { Alert } from "../../../ui/alert";
import { useContext } from "react";
import { UserContext } from "../../../../context/context";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { Link } from "react-router-dom";
import { useModal } from "../../../hooks/use-modal-store";
import { Eye, Maximize, Maximize2 } from "lucide-react";

type Articles = {
    id: string,
    doi: string,
    name_periodical: string,
    qualis: "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "None" | "SQ",
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
              <span key={`${i}-${j}`} className="text-blue-500 font-semibold">
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

export function ArticleItem(props: Articles) {
  const { urlGeral, itemsSelecionados } = useContext(UserContext);

  const qualisColor = {
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
  };

  const doi = props.doi.replace('http://dx.doi.org/', '');

  const { onOpen } = useModal();


  const highlightedTitleEvent = highlightText(props.title , itemsSelecionados);
  
  return (
    <div className="flex w-full group" >
      <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 ${qualisColor[props.qualis as keyof typeof qualisColor]}`}></div>
      <Alert className="rounded-l-none flex flex-col justify-between">
        <div>
          <div>
           <div className="flex mb-1 justify-between">
           <h3 className="font-semibold mb-4 ">{props.name_periodical}{props.magazine}</h3>

           <div className="h-8 w-8">
           <Button variant="outline" size={'icon'} className="ml-auto hidden group-hover:flex text-sm h-8 w-8 text-gray-500 dark:text-gray-300">
            <Maximize2 onClick={() => onOpen('articles-modal', {doi:doi, qualis:props.qualis, title:props.title, year:props.year, jif:props.jif, lattes_10_id:props.lattes_10_id, researcher_id:props.researcher_id, magazine:props.name_periodical})} size={16}/>
            </Button>
           </div>
           </div>
           <div>
    {highlightedTitleEvent}
  </div>
          </div>
          <div></div>
        </div>
        <div className="flex items-center mt-4 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
              <CalendarBlank size={12} />{props.year}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
              <div className={`w-4 h-4 rounded-md ${qualisColor[props.qualis as keyof typeof qualisColor]}`}></div>Qualis {props.qualis}
            </div>
            {props.jif != "None" && (
              <Link to={props.jcr_link} target="_blank" className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
                <LinkBreak size={16} />JCR {props.jif}
              </Link>
            )}
          </div>

       <div className="flex gap-2 items-center ml-auto">
      
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={'icon'} className="ml-auto text-sm w-8 h-8 text-gray-500 dark:text-gray-300">
                <DotsThree size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto">
              {props.doi != 'None' && (
                <div>
                  <Link target="_blank" to={`http://dx.doi.org/${props.doi}`}>
                  <DropdownMenuItem className="flex items-center gap-3">
                    <LinkSimple className="h-4 w-4" />Link DOI da publicação
                  </DropdownMenuItem>
                </Link>

<DropdownMenuSeparator />
                </div>
              )}
              
              <DropdownMenuItem className="gap-3 flex items-center" onClick={() => onOpen('researcher-modal', {name:props.researcher})}>
                <div className={`border-[1px] border-gray-300 rounded-md h-6 w-6 bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.researcher_id}) ` }}></div>
                {props.researcher}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
       </div>
        </div>
      </Alert>
    </div>
  );
}

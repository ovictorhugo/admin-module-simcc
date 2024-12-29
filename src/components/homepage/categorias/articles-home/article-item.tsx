import { CalendarBlank, DotsThree, LinkBreak, LinkSimple } from "phosphor-react";
import { Alert } from "../../../ui/alert";
import { useContext } from "react";
import { UserContext } from "../../../../context/context";

import { Button } from "../../../ui/button";
import { Link } from "react-router-dom";
import { useModal } from "../../../hooks/use-modal-store";
import { Maximize2, Star } from "lucide-react";
import { useModalSecundary } from "../../../hooks/use-modal-store-secundary";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";


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

  abstract: string,
  article_institution: string,
  authors: string
  authors_institution: string
  citations_count: string
  issn: string
  keywords: string
  landing_page_url: string
  language: string
  pdf: string
}

interface ItemsSelecionados {
  term: string;
}

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
  const result: React.ReactNode[] = [];

  words.forEach((word, index) => {
    const normalizedWord = normalizeText(word);
    const shouldHighlight = normalizedTerms.some(term => normalizedWord.includes(term));

    if (shouldHighlight) {
      result.push(
        <span key={index} className="text-blue-500 font-semibold">
          {word}
        </span>
      );
    } else {
      result.push(word);
    }
  });

  return result;
};

export function ArticleItem(props: Articles) {
  const { urlGeral, itemsSelecionados, user } = useContext(UserContext);

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

  const { onOpen } = useModalSecundary()

  const highlightedTitleEvent = highlightText(props.title, itemsSelecionados);

  return (
    <div className="flex w-full group">
      <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 ${qualisColor[props.qualis as keyof typeof qualisColor]}`}></div>
      <Alert className="rounded-l-none flex flex-col justify-between">
        <div>
          <div>
            <div className="flex mb-1 gap-3 justify-between">
              <h3 className="font-semibold mb-4">{props.name_periodical}{props.magazine}</h3>

              <div className="h-8 w-8">

                <Button
                  onClick={() =>
                    onOpen('articles-modal', {
                      doi: doi,
                      qualis: props.qualis,
                      title: props.title,
                      year: props.year,
                      jif: props.jif,
                      lattes_10_id: props.lattes_10_id,
                      researcher_id: props.researcher_id,
                      magazine: props.name_periodical,
                      abstract: props.abstract,
                      article_institution: props.article_institution,
                      authors: props.authors,
                      authors_institution: props.authors_institution,
                      citations_count: props.citations_count,
                      issn: props.issn,
                      keywords: props.keywords,
                      landing_page_url: props.landing_page_url,
                      language: props.language,
                      pdf: props.pdf,
                      researcher: props.researcher
                    })
                  }
                  variant="outline"
                  size={'icon'}
                  className="ml-auto hidden group-hover:flex text-sm h-8 w-8 text-gray-500 dark:text-gray-300"
                >
                  <Maximize2 size={16} />
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
            {(props.jif != "None" && props.jif != "") && (
              <Link to={props.jcr_link} target="_blank" className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
                <LinkBreak size={16} />JCR {props.jif}
              </Link>
            )}
          </div>

          <div className="flex gap-2 items-center ml-auto">

              {user?.lattes_id == props.lattes_id && (
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <Button variant={'outline'} className="h-8 w-8 text-gray-500" size={'icon'}><Star size={16}/></Button></TooltipTrigger>
                  <TooltipContent>
                    <p>Adiconar como produção relevante</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              )}
          </div>
        </div>
      </Alert>
    </div>
  );
}

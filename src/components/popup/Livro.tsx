import { AppWindow, Book, BookOpen, CalendarBlank, Check, Copyright, CurrencyCircleDollar, File, Graph, LinkBreak, Paperclip, PenNib, Quotes, SpinnerGap } from "phosphor-react";
import { useEffect, useState, useContext } from "react";
import unorm from 'unorm';
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { Link } from "react-router-dom";

type Publicacao = {
    id?: string,
    title?: string | '',
    year?: string,
    isbn?: string,
    publishing_company?: string

    type?:string

  
  grant_date?: string,

  financing?: string,
  project_name?: string


  nature?: string,
  oriented?: string,
  status?: string,

}

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
    'NP': 'bg-[#560B11]'
}

export function BookItem(props: Publicacao) {
const {searchType, valoresSelecionadosExport, valorDigitadoPesquisaDireta} = useContext(UserContext)

    const normalizedTitle = props.title
    .replace(/&quot;/g, '"')
    .replace(/&#10;/g, '\n')
    .toLowerCase();

    const ignoredWords = ['a', 'do', 'da', 'o', 'os', 'as', 'de', "e", "i", 'na', 'du', 'em']; // Adicionar outras palavras que devem ser ignoradas

    return (
        <div className="flex  w-full" >
            
                    <div
                      className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0  ${props.type == 'livro' && ('bg-pink-800')} ${props.type == 'software' && ('bg-cyan-400')} ${props.type == 'marca' && ('bg-cyan-600')} ${(props.status == "Em andamento" ) && ('bg-yellow-500') } ${(props.status == "Concluída" ) && 'bg-green-500' } ${(props.grant_date == "NaT"  || props.grant_date == "None") ? ('bg-red-500') : ('bg-green-500')} ${props.type == 'capLivro' && ('bg-pink-300')}`}
                    > 
                    </div>
                

                <Alert className="rounded-l-none flex flex-col justify-between">
                    <div>
                        <div>
                          {props.publishing_company != undefined && (
                             <h3 className="font-semibold mb-4 ">{props.publishing_company}</h3>
                          )}

{props.type == 'orientacoes' && (
                             <h3 className="font-semibold mb-4 ">{props.oriented}</h3>
                          )}

{props.type == 'relatorio-tecnico' && (
                             <h3 className="font-semibold mb-4 ">{props.project_name}</h3>
                          )}

{props.type == 'patente' && (
                             <h3 className="font-semibold mb-4 ">{props.title}</h3>
                          )}


{props.type == 'patente' && (
                           <p className="text-sm capitalize text-gray-500 dark:text-gray-300 font-normal">{props.id}</p>
                        )}

{props.type != 'patente' && (
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
                        )}

                            
                        </div>
                        <div>
                           
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap mt-4 gap-4">
                        <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><CalendarBlank size={12}/>{props.year}</div>
                        

                        {(props.isbn != undefined) && (
                               <Link to={`https://www.cblservicos.org.br/isbn/pesquisa/?page=1&q=${props.isbn}&filtrar_por%5B0%5D=todos&ord%5B0%5D=relevancia&dir%5B0%5D=asc`} target="_blank"  className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><LinkBreak size={16} className="" />ISBN {props.isbn}</Link>
                            )}
                        </div>

                        {props.type == 'software' && (
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><AppWindow size={12}/>Software</div>
                        )}

{props.type == 'marca' && (
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><PenNib size={12}/>Marca</div>
                        )}

{props.type == 'patente' && (
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Copyright size={12}/>Patente</div>
                        )}

{props.type == 'orientacoes' && (
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Paperclip size={12} className={'whitespace-nowrap min-w-4'}/>{props.nature}</div>
                        )}

{props.type == 'relatorio-tecnico' && (
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center truncate max-w-[200px]" ><CurrencyCircleDollar size={12}/>{props.financing}</div>
                        )}

{props.type == 'orientacoes' && (
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-2 items-center">
                                 <div className={`w-4 h-4 rounded-md ${(props.status == "Em andamento") ? "bg-yellow-500" : 'bg-green-500'}`}></div>
                                 
                                   {props.status == "Em andamento" ? "Em andamento" : 'Concluída'}</div>
                        )}

{props.type == 'patente' && (
                            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-2 items-center">
                                 <div className={`w-4 h-4 rounded-md ${(props.grant_date == 'NaT' || props.grant_date == "None") ? "bg-red-500" : 'bg-green-500'}`}></div>
                                 
                                   {props.grant_date == 'NaT' || props.grant_date == "None" ? "Sem concessão" : props.grant_date}</div>
                        )}
                       
                        
                    </div>
                </Alert>
        </div>


    )
};
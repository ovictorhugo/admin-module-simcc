import { useContext, useEffect, useMemo, useState } from "react"
import { UserContext } from "../../context/context"
import { ArrowSquareOut, BracketsCurly, Buildings, CaretDown, Copy, Export, FileCsv, GraduationCap, IdentificationBadge, LinkSimple, LinkedinLogo, MapPin, Plus, PuzzlePiece, QrCode, ShareNetwork, X } from "phosphor-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { Separator } from "../ui/separator"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import QRCode from "react-qr-code";

interface Props {
    among: number,
    articles: number,
    book: number,
    book_chapters: number,
    id: string,
    name: string,
    university: string,
    lattes_id: string,
    area: string,
    lattes_10_id: string,
    abstract: string,
    city: string,
    orcid: string,
    image: string
    graduation: string,
    patent: string,
    software: string,
    brand: string,
    lattes_update: Date,
    onResearcherUpdate: (newResearcher: Research[]) => void;

    h_index:string,
    relevance_score:string,
    works_count:string,
    cited_by_count:string,
    i10_index:string,
    scopus:string,
    openalex:string,
  }

  type Research = {
    h_index: number;
    relevance_score: number;
    works_count: number;
    cited_by_count: number;
    i10_index: number;
    scopus: string;
    orcid:string
    openalex: string
    
}


 export function InformationResearcher(props:Props) {
    const {urlGeral, searchType, valoresSelecionadosExport, setPesquisadoresSelecionados, pesquisadoresSelecionados} = useContext(UserContext)
    const [isVisible, setIsVisible] = useState(false);
    const [apiVisible, setApiVisible] = useState(false);
    const payment = props.lattes_id

    //data atualização
  const currentDate = new Date();
  const lattesUpdate = String(props.lattes_update).split('/');
  const lattesMonth = parseInt(lattesUpdate[1]);
  const lattesYear = parseInt(lattesUpdate[2]);

  const monthDifference = (currentDate.getFullYear() - lattesYear) * 12 + (currentDate.getMonth() + 1 - lattesMonth);
const [researcher, setResearcher] = useState<Research[]>([]); 
  const isOutdated = monthDifference > 3;

    // Atualize essa função para chamar a propriedade `onResearcherUpdate`
    const updateResearcher = (newResearcher: Research[]) => {
      if (props.onResearcherUpdate) {
        props.onResearcherUpdate(newResearcher);
      }
    };
  


  //openalex
  //https://orcid.org/
  const urlTermPesquisadores =`https://api.openalex.org/authors?filter=display_name.search:${props.name}`;
  const urlTermPesquisadoresOrcid =`https://api.openalex.org/authors/https://orcid.org/${props.orcid}`;
  const urlShare = `${urlGeral}researcher/${props.id}/${searchType}/${valoresSelecionadosExport}`
  const urlApi = `${urlGeral}researcherName?name=${props.name.split(' ').join(';')}`
  const [orcid, setOrcid] = useState(props.orcid);



//csv

const [jsonData, setJsonData] = useState<any[]>([]);

const convertJsonToCsv = (json: any[]): string => {
  const items = json;
  const replacer = (key: string, value: any) => (value === null ? '' : value); // Handle null values
  const header = Object.keys(items[0]);
  const csv = [
    '\uFEFF' + header.join(';'), // Add BOM and CSV header
    ...items.map((item) =>
      header.map((fieldName) => JSON.stringify(item[fieldName], replacer)).join(';')
    ) // CSV data
  ].join('\r\n');

  return csv;
};

const handleDownloadJson = async () => {
  try {
    const csvData = convertJsonToCsv(jsonData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=windows-1252;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${props.name}.csv`;
    link.href = url;
    link.click();
  } catch (error) {
    console.error(error);
  }
};



    return (
        <div className="flex flex-col">

          <div className="flex justify-between items-center w-full"> 
       
          <div className={`border-[1px] border-gray-300 w-fit py-2 px-4 text-gray-400 rounded-md text-xs font-bold flex gap-1 items-center ${isOutdated ? ('bg-red-500 text-white border-none') : ('')}`}>Atualização do Lattes: {String(props.lattes_update)}</div>
        

          <div className="flex gap-3">
         

          <Button
            variant={'default'}
            onClick={() => {
              // Verifica se o pesquisador já está selecionado pelo nome
              if (pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name)) {
                // Remove o pesquisador selecionado com o nome correspondente
                setPesquisadoresSelecionados(prev => prev.filter(pesquisador => pesquisador.name !== props.name));
              } else {
                // Adiciona o novo pesquisador selecionado
                setPesquisadoresSelecionados(prev => [
                  ...prev,
                  {
                    id: props.id,
                    name: props.name,
                    university: props.university,
                    lattes_id: props.lattes_id,
                    city: props.city,
                    area: props.area,
                    graduation: props.graduation,
                  }
                ]);
              }
            }}
            className={`h-8 w-8 p-0 text-white dark:text-white ${
              pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) && 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) ? (
              <X size={16} className="" />
            ) : (
              <Plus size={16} className="" />
            )}
          </Button>

            <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
             
            <ArrowSquareOut size={8} className="h-4 w-4" />
            </Button>

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
              onClick={() => navigator.clipboard.writeText(payment)}
            ><Copy className="h-4 w-4" />
              Copiar Lattes ID
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-3" onClick={() => handleDownloadJson()}><FileCsv className="h-4 w-4" />Baixar CSV das publicações</DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-3" onClick={() => setApiVisible(!apiVisible)}><BracketsCurly className="h-4 w-4" />API da consulta</DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-3"
              onClick={() => navigator.clipboard.writeText(urlShare)}
            ><ShareNetwork className="h-4 w-4" />
              Copiar link para compartilhar
             
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-center py-4">
            
            <QRCode size={200} className={'bg-transparent'} value={urlShare} />
            
            
            </DropdownMenuItem>
      
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
          
          </div>
         

          <div className="flex items-center flex-col  relative">
          <h4 className="text-3xl font-medium px-8 text-center mb-2">{props.name}</h4>
          <div className="flex text-gray-500 items-center gap-2 mb-4">
              {props.image == "None" ? (
                <Buildings size={16} className="" />
              ) : (
                <img src={props.image} alt="" className="h-6" />
              )}
              <p className="text-md  ">{props.university}</p>
            </div>
            <div className="mb-4 flex gap-3 items-center">

         
              {props.area != '' && (
                  props.area.split(';').map((value, index) => (
                    <li
                      key={index}
                  className={`py-2 whitespace-nowrap px-4 rounded-md text-xs font-bold flex gap-2 text-white items-center ${value.includes('CIENCIAS AGRARIAS') ? 'bg-red-400' : value.includes('CIENCIAS EXATAS E DA TERRA') ? 'bg-green-400' : value.includes('CIENCIAS DA SAUDE') ? 'bg-[#20BDBE]' : value.includes('CIENCIAS HUMANAS') ? 'bg-[#F5831F]' : value.includes('CIENCIAS BIOLOGICAS') ? 'bg-[#EB008B]' : value.includes('ENGENHARIAS') ? 'bg-[#FCB712]' : value.includes('CIENCIAS SOCIAIS APLICADAS') ? 'bg-[#009245]' : value.includes('LINGUISTICA LETRAS E ARTES') ? 'bg-[#A67C52]' : value.includes('OUTROS') ? 'bg-[#1B1464]' : 'bg-[#000]'}
                                  `}
                    >
                      <PuzzlePiece size={12} className="text-white" /> {value.trim()}
                    </li>
                  ))
                )}
  
              {props.graduation != '' && (
                  <div className={`bg-blue-700 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center`}><GraduationCap size={12} className="textwhite" /> {props.graduation}</div>
                )}
  
              {props.city != "None" && (
                    <div className="bg-blue-700 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center"><MapPin size={12} className="textwhite" /> {props.city}</div>
                  )}
  

            
<div className=" flex gap-3 items-center">
{(props.orcid !== "None" && props.orcid !== '')  && (
    <Link  to={props.orcid ? (props.orcid):(`https://orcid.org/${props.orcid}`)} target="_blank" className="bg-[#A6CE39] py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center">
        <IdentificationBadge size={12} className="" />
        Orcid: {props.orcid ? props.orcid.replace(/[^\d-]/g, '') : props.orcid}
    </Link>
)}

{props.scopus != null && (
    <Link  to={props.scopus} target="_blank" className="bg-[#FF8200] py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center">
        <IdentificationBadge size={12} className="" />
        Scopus
    </Link>
)}
</div>
  
  
 
         

<a href={`https://lattes.cnpq.br/${props.lattes_id}`} target="blank_" className="bg-blue-900 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center"><LinkSimple size={12} className="textwhite" /> Currículo Lattes</a>
  
  <a href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(props.name)}`} rel="noopener noreferrer" target="blank_" className="bg-blue-500 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center"><LinkedinLogo size={12} className="textwhite" />Pesquisar no LinkedIn</a>

           </div>

            <div className={isVisible ? "h-auto transition-all" : "h-[60px] overflow-hidden transition-all"}>
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

            <div className="flex gap-4 items-center mt-4">
              <div className={`${!isVisible && ('animate-bounce')} cursor-pointer rounded-md hover:bg-gray-100 h-8 w-8 transition-all flex items-center justify-center`}>
                <CaretDown onClick={() => setIsVisible(!isVisible)} size={24} className={isVisible ? "rotate-180 transition-all  text-gray-400" : "text-gray-400  transition-all"} />
              </div>
            </div>

            <Separator/>

          </div>
        </div>
    )

}


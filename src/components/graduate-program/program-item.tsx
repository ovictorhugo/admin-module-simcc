import { Star } from "phosphor-react";

import { Building2, Calendar, GraduationCapIcon, MapPin, MapPinIcon, User, Users } from "lucide-react";

import { cn } from "../../lib"


import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "../ui/alert";
import { InfiniteMovingCardsResearchers } from "../ui/infinite-moving-cards-researchers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useModal } from "../hooks/use-modal-store";
import { useContext } from "react";
import { UserContext } from "../../context/context";

interface GraduateProgram {
  area: string;
  code: string;
  graduate_program_id: string;
  modality: string;
  name: string;
  rating: string;
  type: string;
  city: string
  state: string
  instituicao: string
  url_image: string
  region: string
  sigla: string
  visible: boolean
  qtd_discente: string
  qtd_colaborador: string
  qtd_permanente: string
  create_at: string
  institution: string;
  researchers:string[]
  acronym:string

}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}


export function ProgramItem(props: GraduateProgram) {


  const qualisColor = {
    // Ciências Exatas e da Terra
    'MATEMÁTICA / PROBABILIDADE E ESTATÍSTICA': 'bg-red-200',
    'ASTRONOMIA / FÍSICA': 'bg-red-300',
    'QUÍMICA': 'bg-red-400',
    'GEOCIÊNCIAS': 'bg-red-500',
    'CIÊNCIA DA COMPUTAÇÃO': 'bg-red-600',
  
    // Ciências Biológicas
    'BIODIVERSIDADE': 'bg-green-200',
    'CIÊNCIAS BIOLÓGICAS I': 'bg-green-300',
    'CIÊNCIAS BIOLÓGICAS II': 'bg-green-400',
    'CIÊNCIAS BIOLÓGICAS III': 'bg-green-500',
  
    // Engenharias
    'ENGENHARIA I': 'bg-blue-200',
    'ENGENHARIA II': 'bg-blue-300',
    'ENGENHARIA III': 'bg-blue-400',
    'ENGENHARIA IV': 'bg-blue-500',
  
    // Ciências da Saúde
    'MEDICINA I': 'bg-yellow-200',
    'MEDICINA II': 'bg-yellow-300',
    'MEDICINA III': 'bg-yellow-400',
    'NUTRIÇÃO': 'bg-yellow-500',
    'ODONTOLOGIA': 'bg-yellow-600',
    'FARMÁCIA': 'bg-yellow-700',
    'ENFERMAGEM': 'bg-yellow-800',
    'SAÚDE COLETIVA': 'bg-yellow-900',
    'EDUCAÇÃO FÍSICA': 'bg-yellow-950',
  
    // Ciências Agrárias
    'CIÊNCIAS AGRÁRIAS I': 'bg-green-600',
    'ZOOTECNIA / RECURSOS PESQUEIROS': 'bg-green-700',
    'MEDICINA VETERINÁRIA': 'bg-green-800',
    'CIÊNCIA DE ALIMENTOS': 'bg-green-900',
  
    // Ciências Sociais Aplicadas
    'DIREITO': 'bg-purple-200',
    'ADMINISTRAÇÃO PÚBLICA E DE EMPRESAS, CIÊNCIAS CONTÁBEIS E TURISMO': 'bg-purple-300',
    'ECONOMIA': 'bg-purple-400',
    'ARQUITETURA, URBANISMO E DESIGN': 'bg-purple-500',
    'PLANEJAMENTO URBANO E REGIONAL / DEMOGRAFIA': 'bg-purple-600',
    'COMUNICAÇÃO E INFORMAÇÃO': 'bg-purple-700',
    'SERVIÇO SOCIAL': 'bg-purple-800',
  
    // Ciências Humanas
    'FILOSOFIA': 'bg-pink-200',
    'TEOLOGIA': 'bg-pink-300',
    'SOCIOLOGIA': 'bg-pink-400',
    'ANTROPOLOGIA / ARQUEOLOGIA': 'bg-pink-500',
    'HISTÓRIA': 'bg-pink-600',
    'GEOGRAFIA': 'bg-pink-700',
    'PSICOLOGIA': 'bg-pink-800',
    'EDUCAÇÃO': 'bg-pink-900',
    'CIÊNCIA POLÍTICA E RELAÇÕES INTERNACIONAIS': 'bg-pink-950',
  
    // Linguística, Letras e Artes
    'LETRAS / LINGUÍSTICA': 'bg-orange-200',
    'ARTES / MÚSICA': 'bg-orange-400',
  
    // Multidisciplinar
    'INTERDISCIPLINAR': 'bg-gray-200',
    'ENSINO': 'bg-gray-400',
    'MATERIAIS': 'bg-gray-600',
    'BIOTECNOLOGIA': 'bg-gray-800',
    'CIÊNCIAS AMBIENTAIS': 'bg-gray-900'
  };

  const normalizeArea = (area) => {
    return area
      .toUpperCase()
      .normalize("NFD") // Remove acentos
      .replace(/[̀-ͯ]/g, "") // Remove diacríticos
      .replace(/[^a-z0-9 ]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único espaço
      .trim();
  };
  
  const getColorByArea = (area) => {
    const normalizedArea = normalizeArea(area);
    return qualisColor[normalizedArea] || 'bg-gray-500';
  };

  const queryUrl = useQuery();
  const navigate = useNavigate();

  // Calcula a diferença em dias entre a data atual e a data do item

  const handlePesquisaFinal = () => {
    queryUrl.set('graduate_program_id', props.graduate_program_id);
    navigate({
      pathname: '/pos-graduacao',
      search: queryUrl.toString(),
    });
  }

  const {onOpen} = useModal()
  const {urlGeral, simcc} = useContext(UserContext)

  return (
    <div onClick={() => handlePesquisaFinal()}   className="flex w-full cursor-pointer" key={props.graduate_program_id}>
    <Alert className={`rounded-r-none border-r-0 w-2 min-w-2 p-0 ${getColorByArea(props.area)}`} />
    <Alert className="rounded-l-none">
    <div className="flex justify-between gap-8 items-start">
           <div className="flex gap-3 w-full">
       
           <div className="w-full">
              <h1 className="flex gap-2 items-end w-full justify-between">{props.acronym} <p className="text-white mb-1 px-2 bg-eng-blue rounded-md p-1 h-fit text-xs flex items-center gap-1"><Star size={12}/>{props.rating}</p></h1>
             <div>
             <p className="text-gray-500 text-sm">
                {props.name}
              </p>

             
             </div>
              
            </div>
           </div>

           
          </div>

          <div className="flex gap-2 flex-wrap my-6">
                <div className="text-gray-500 text-sm flex gap-1 items-center">
                  <MapPin size={12} />
                  <p>{props.city}</p>
                </div>
               
                <div className="text-gray-500 text-sm flex gap-1 items-center">
                  <Calendar size={12} />
                  <p>{props.modality}</p>

                  
                </div>

                <div className="text-gray-500 text-sm flex gap-1 items-center">
                  <Calendar size={12} />
                  <p>{props.area}</p>
                </div>

              {simcc && (
                  <div className="text-gray-500 text-sm flex gap-1 items-center">
                  <Calendar size={12} />
                  <p>{props.institution}</p>
                </div>
              )}

              
              </div>

<div className="mt-4 flex gap-2 items-center">
  {props.researchers.slice(0,5).map((item) => (
    <Avatar onClick={() => onOpen('researcher-modal', {name:item})} className="cursor-pointer rounded-md  h-8 w-8">
    <AvatarImage className={'rounded-md h-8 w-8'} src={`${urlGeral}ResearcherData/Image?name=${item}`} />
    <AvatarFallback className="flex items-center justify-center"><User size={16} /></AvatarFallback>
  </Avatar>
  ))}

  {props.researchers.length > 5 && (<p className="h-8 w-8 flex items-center justify-center text-gray-500">+</p>)}
</div>


      </Alert>
      </div>

  )
}
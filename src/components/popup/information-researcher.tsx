import { useContext, useState } from "react"
import { UserContext } from "../../context/context"
import { Buildings, CaretDown, Copy, Export, FileCsv, GraduationCap, IdentificationBadge, LinkSimple, MapPin, Plus, PuzzlePiece } from "phosphor-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { Separator } from "../ui/separator"

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
  }

export function InformationResearcher(props:Props) {
    const {urlGeral} = useContext(UserContext)
    const [isVisible, setIsVisible] = useState(false);
    const payment = props.lattes_id

    //data atualização
  const currentDate = new Date();
  const lattesUpdate = String(props.lattes_update).split('/');
  const lattesMonth = parseInt(lattesUpdate[1]);
  const lattesYear = parseInt(lattesUpdate[2]);

  const monthDifference = (currentDate.getFullYear() - lattesYear) * 12 + (currentDate.getMonth() + 1 - lattesMonth);

  const isOutdated = monthDifference > 3;

    return (
        <div className="flex flex-col">

          <div className="flex justify-between items-center w-full"> 
       
          <div className={`border-[1px] border-gray-300 w-fit py-2 px-4 text-gray-400 rounded-md text-xs font-bold flex gap-1 items-center ${isOutdated ? ('bg-red-500 text-white border-none') : ('')}`}>Data de atualização do Lattes: {String(props.lattes_update)}</div>
        

          <div className="flex gap-3">
          <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
             
              <Plus size={8} className="h-4 w-4" />
            </Button>

            <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
             
            <Export size={8} className="h-4 w-4" />
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
              Copie Lattes ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-3"><FileCsv className="h-4 w-4" />Baixar CSV das publicações</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
          
          </div>
            <div className="w-full flex justify-center ">
            <div className="bg-cover bg-center bg-no-repeat h-28 w-28 bg-white dark:bg-neutral-950 rounded-2xl mb-3 border-4 border-white dark:border-neutral-950  absolute  top-[-50px] " style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.id}) ` }}></div>
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

{props.orcid != "None" && (
                <a href={`https://orcid.org/${props.orcid}`} target="blank_" className="bg-[#A6CE39] py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center"><IdentificationBadge size={12} className="textwhite" /> Orcid: {props.orcid}</a>
              )}


<a href={`https://lattes.cnpq.br/${props.lattes_id}`} target="blank_" className="bg-blue-900 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center"><LinkSimple size={12} className="textwhite" /> Currículo Lattes</a>


            </div>

            <div className={isVisible ? "h-auto transition-all" : "h-[60px] overflow-hidden transition-all"}>
            <p className="text-gray-400 text-sm text-justify ">{props.abstract}</p>
            </div>

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
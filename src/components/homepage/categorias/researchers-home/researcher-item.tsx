import { useContext } from "react"
import { Alert } from "../../../ui/alert"
import { UserContext } from "../../../../context/context"
import { Buildings, MapPin, Star } from "phosphor-react"
import { GraduationCap } from "lucide-react"
import { useModal } from "../../../hooks/use-modal-store"

type Research = {
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
    city: string,
    graduation: string,
    patent: string,
    speaker: string
}

export function ResearchItem(props: Research) {
    const { onOpen } = useModal();
    const { urlGeral, valorDigitadoPesquisaDireta, valoresSelecionadosExport, searchType} = useContext(UserContext)
    const name = props.name
    return(
        <div onClick={() => onOpen('researcher-modal', {name:props.name})} className="flex min=h-[170px] w-full cursor-pointer">
            {props.area != '' && (
                  props.area.split(';').slice(0, 1).map((value, index) => (
                    <div
                      key={index}
                      className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 ${value.includes('CIENCIAS AGRARIAS') ? 'bg-red-400' : value.includes('CIENCIAS EXATAS E DA TERRA') ? 'bg-green-400' : value.includes('CIENCIAS DA SAUDE') ? 'bg-[#20BDBE]' : value.includes('CIENCIAS HUMANAS') ? 'bg-[#F5831F]' : value.includes('CIENCIAS BIOLOGICAS') ? 'bg-[#EB008B]' : value.includes('ENGENHARIAS') ? 'bg-[#FCB712]' : value.includes('CIENCIAS SOCIAIS APLICADAS') ? 'bg-[#009245]' : value.includes('LINGUISTICA LETRAS E ARTES') ? 'bg-[#A67C52]' : value.includes('OUTROS') ? 'bg-[#1B1464]' : 'bg-[#000]'} `}
                    >
                      
                    </div>
                  ))
                )}
            <Alert className="flex flex-1 gap-4 rounded-l-none">
            <div className="h-full w-[110px] bg-cover bg-center bg-no-repeat rounded-md" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.id}) ` }}></div>

            <div className="flex gap-2 flex-col h-full justify-between ">
                <div className="flex gap-2 flex-col justify-center">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1 text-xs p-2 border items-center border-gray-300 dark:border-stone-700 rounded-md "><GraduationCap size={12}/>{props.graduation}</div>

                    <div className="flex gap-1 text-xs p-2 border items-center border-gray-300 dark:border-stone-700 rounded-md"><MapPin size={12}/>{props.city}</div>
                </div>

                <p className="font-medium">{props.name}</p>

                <p className="text-xs flex items-center gap-1"><Buildings size={12}/> {props.university}</p>
                </div>

                <div className="flex gap-3">
                    <p className=" font-bold text-xs text-blue-700">{props.among} ocorrências de {searchType == 'article' ? (`${props.articles} artigos`): searchType == 'book' ? (`${Number(props.book) + Number(props.book_chapters)} livros e capítulos`) : searchType == 'speaker' ? (`${props.patent} patentes`):('')}</p>
                </div>
            </div>
        </Alert>
        </div>
    )
}
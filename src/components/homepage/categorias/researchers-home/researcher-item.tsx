import { useContext } from "react"
import { Alert } from "../../../ui/alert"
import { UserContext } from "../../../../context/context"
import { Buildings, MapPin, Plus, PuzzlePiece, Star, X } from "phosphor-react"
import { GraduationCap } from "lucide-react"
import { useModal } from "../../../hooks/use-modal-store"
import { Button } from "../../../ui/button"

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

    h_index:string,
    relevance_score:string,
    works_count:string,
    cited_by_count:string,
    i10_index:string,
    scopus:string,
    openalex:string,
}

export function ResearchItem(props: Research) {
    const { onOpen } = useModal();
    const { urlGeral, valorDigitadoPesquisaDireta, valoresSelecionadosExport, searchType, setPesquisadoresSelecionados, pesquisadoresSelecionados} = useContext(UserContext)
    const name = props.name
    return(
        <div onClick={() => onOpen('researcher-modal', {name:props.name})} className="flex group min=h-[170px] w-full cursor-pointer">
           
            <Alert className="flex p-0 flex-col flex-1 gap-4">
            <div className="flex flex-col">
            <div className="z-[1] w-full absolute p-4 flex gap-3 justify-end">
            <Button 
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
            
            size={'icon'} className={`hidden group-hover:flex transition-all h-8 w-8  ${
                pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) && 'bg-red-500 hover:bg-red-600 text-white'
              }`}>

{pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) ? (
              <X size={16} className="" />
            ) : (
              <Plus size={16} className="" />
            )}
              </Button>
            </div>
            
            
            <div className="h-20  w-full absolute bg-cover bg-center bg-no-repeat rounded-t-md bg-gray-400 backdrop-blur-md backdrop-brightness-150" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.id}) ` }}>
            
            <div className="bg-[#000000]  bg-opacity-30 absolute backdrop-blur-sm w-full h-full rounded-t-md"></div>
            
            </div>

            <div className="h-full mx-6 mt-8 border-4 border-white dark:border-neutral-900 z-[0]  min-w-20 max-w-20 bg-cover bg-center bg-no-repeat rounded-xl aspect-square" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.id}) ` }}></div>
            </div>

            <div className="flex gap-2 px-6 flex-col  w-full  ">
                <div className="flex gap-2 flex-col">
                

                <p className="font-medium  text-base">{props.name}</p>

                {props.university.length > 0 && (
                  <p className="text-xs flex font-medium text-center w-full items-center gap-1"><Buildings size={12}/> {props.university}</p>
                )}
                </div>

                <div className="flex items-center flex-wrap gap-3 mt-4 mb-6">
                    <div className="flex gap-1 text-sm  items-center "><GraduationCap size={12}/>{props.graduation}</div>

                    <div className="flex gap-1 text-sm  items-center"><MapPin size={12}/>{props.city}</div>

                    
                </div>
              {props.area.length != 0 && (
                  <div className="flex gap-3 flex-wrap mb-6">
                  {props.area != '' && (
                    props.area.split(';').map((value, index) => (
                      <li
                        key={index}
                    className={`py-1 whitespace-nowrap px-2 rounded-md text-[10px] font-bold flex gap-2 text-white items-center ${value.includes('CIENCIAS AGRARIAS') ? 'bg-red-400' : value.includes('CIENCIAS EXATAS E DA TERRA') ? 'bg-green-400' : value.includes('CIENCIAS DA SAUDE') ? 'bg-[#20BDBE]' : value.includes('CIENCIAS HUMANAS') ? 'bg-[#F5831F]' : value.includes('CIENCIAS BIOLOGICAS') ? 'bg-[#EB008B]' : value.includes('ENGENHARIAS') ? 'bg-[#FCB712]' : value.includes('CIENCIAS SOCIAIS APLICADAS') ? 'bg-[#009245]' : value.includes('LINGUISTICA LETRAS E ARTES') ? 'bg-[#A67C52]' : value.includes('OUTROS') ? 'bg-[#1B1464]' : 'bg-[#000]'}
                                    `}
                      >
                        <PuzzlePiece size={12} className="text-white" /> {value.trim()}
                      </li>
                    ))
                  )}
                  </div>
              )}

               
            </div>
        </Alert>
        </div>
    )
}
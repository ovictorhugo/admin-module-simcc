import { useContext } from "react"
import { Alert } from "../../../ui/alert"
import { UserContext } from "../../../../context/context"
import { MapPin, Plus, PuzzlePiece, X } from "phosphor-react"
import { GraduationCap } from "lucide-react"
import { useModal } from "../../../hooks/use-modal-store"
import { Button } from "../../../ui/button"

import dt from '../../../../assets/dt.png'
import pq from '../../../../assets/pq.png'
import { CardTitle } from "../../../ui/card"
import { InfiniteMovingCards } from "../../../ui/infinite-moving-cards"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip"
import { toast } from "sonner"

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
  status: boolean
  h_index: string,
  relevance_score: string,
  works_count: string,
  cited_by_count: string,
  i10_index: string,
  scopus: string,
  openalex: string,
  departament?: string
  departments: string
  subsidy: Bolsistas[]
  graduate_programs: GraduatePrograms[]
}

interface Bolsistas {
  aid_quantity: string
  call_title: string
  funding_program_name: string
  modality_code: string
  category_level_code: string
  institute_name: string
  modality_name: string
  scholarship_quantity: string
}

interface GraduatePrograms {
  graduate_program_id: string
  name: string
}


export function ResearchItem(props: Research) {
  const { onOpen } = useModal();
  const { urlGeral, setPesquisadoresSelecionados, permission, pesquisadoresSelecionados } = useContext(UserContext)

  const hasBaremaAvaliacao = permission.some(
    (perm) => perm.permission === 'criar_barema_avaliacao'
  );

  return (
    <div onClick={() => onOpen('researcher-modal', { name: props.name })} className="flex group min-h-[300px] w-full cursor-pointer">

      <Alert className="flex p-0 flex-col flex-1 gap-4 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.id}) ` }}>
        <div className="bg-[#000000] rounded-md bg-opacity-30 hover:bg-opacity-70 transition-all absolute w-full h-full rounded-t-md ">
          <div className="flex flex-col justify-between h-full">
            <div className="z-[1] w-full  p-4 flex gap-3 justify-end">

              <div className="mr-auto">
        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                            <Button
  onClick={(event) => {
    event.stopPropagation(); // Impede a propagação do evento de clique para o contêiner pai

    if (pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name)) {
      setPesquisadoresSelecionados(prev =>
        prev.filter(pesquisador => pesquisador.name !== props.name)
      );

       toast("Pesquisador(a) removido dos selecionados", {
                                          description: `${props.name}`,
                                          action: {
                                            label: "Fechar",
                                            onClick: () => console.log("Fechar"),
                                          },
                                        });
    } else {
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

        toast("Pesquisador(a) adicionado aos selecionados", {
                                          description: `${props.name}`,
                                          action: {
                                            label: "Fechar",
                                            onClick: () => console.log("Fechar"),
                                          },
                                        });
    }
  }}
  size={'icon'}
  className={`hidden group-hover:flex transition-all h-8 w-8 ${pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) && 'bg-red-500 hover:bg-red-600 text-white'}`}
>
  {pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) ? (
    <X size={16} />
  ) : (
    <Plus size={16} />
  )}
</Button>
                            </TooltipTrigger>
                            <TooltipContent> {pesquisadoresSelecionados.some(pesquisador => pesquisador.name === props.name) ? (
                              'Remover pesquisador(a) do barema'
                            ) : (
                              'Adicionar pesquisador(a) ao barema'
                            )}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                 
              



                <div className="flex group-hover:hidden">
                  <div className="flex text-white gap-2 items-center" >
                    <div className={` rounded-md h-4 w-4 ${props.status ? ('bg-green-500') : ('bg-red-500')}`}></div>
                    <div className="flex-1 flex">{props.status ? ('Ativo') : ('Inativo')}</div></div>
                </div>
              </div>

              {props.subsidy && props.subsidy.length != 0 && props.subsidy.slice(0, 1).map((item) => (
                <img src={item.modality_code == 'DT' ? (dt) : (pq)} className="w-8 relative -top-4" alt="" />
              ))}
            </div>

            <div className="flex gap-2 px-6 flex-col pb-6  w-full h-full text-white justify-end  ">
              <div className="flex gap-1 flex-col">


                <CardTitle className="text-lg font-medium">{props.name}</CardTitle>

                <div className="group-hover:flex hidden items-center flex-wrap gap-1  mb-2">
                  <div className="flex gap-1 text-sm  items-center "><GraduationCap size={12} />{props.graduation}</div>

                  {(props.city != "" && props.city != "None") && (
                    <div className="flex gap-1 text-sm  items-center"><MapPin size={12} />{props.city}</div>
                  )}


                </div>
              </div>


              {props.area.length !== 0 && (
                <div className="flex gap-3 flex-wrap">
                  {props.area !== '' && (
                    <InfiniteMovingCards
                      items={[...new Set(props.area.split(';').map((item) => item.trim()))] // Remove duplicados e espaços
                        .filter((item) => item !== '') // Remove entradas vazias
                        .map((item) => ({ value: item }))} // Formata cada item como um objeto
                      direction="right"
                      speed="fast"
                      pauseOnHover={true}
                      className="custom-class"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Alert>
    </div>
  )
}
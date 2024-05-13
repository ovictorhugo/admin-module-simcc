import { useContext, useEffect } from "react"
import { UserContext } from "../../context/context"
import { Trash, X } from "phosphor-react"
import { Button } from "../ui/button"

export function HeaderBarema() {
    const { pesquisadoresSelecionados, urlGeral, setPesquisadoresSelecionados } = useContext(UserContext)


    return(
        <div className="my-8">
            <div className="flex  gap-6 w-full flex-col  ">
            <div>
            <h1 className=" text-3xl mb-4  font-medium max-w-[380px] ">
 <strong className="bg-red-700 font-medium text-white">Barema</strong> de avaliação dos pesquisadores
      </h1>
      <p className="mt-2 max-w-[420px] text-gray-500 dark:text-gray-300">O sistema de classificação, é uma estrutura criada para avaliar e classificar pesquisadores com base em critérios específicos.</p>
            </div>

            <div className="flex items-center gap-3">
            {pesquisadoresSelecionados.slice(0,8).map(props => {
                    
                    return(
                      <div key={props.id} className="group flex transition-all">
                          <div className=" rounded-md w-10 h-10 bg-cover bg-center bg-no-repeat group-hover:rounded-l-lg group-hover:rounded-r-none" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${props.id}) ` }}></div>
                          <div 
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
                                  lattes_id:props.lattes_id,
                                  city: props.city,
                                  area: props.area,
                                  graduation: props.graduation,
                                }
                              ]);
                            }
                          }}
                           className="h-10 w-10  hidden group-hover:flex items-center justify-center transition-all hover:text-neutral-900 dark:bg-neutral-950 bg-white hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-50  text-gray-500 dark:text-white rounded-r-md cursor-pointer" ><X size={16} className="" /></div>

                      </div>
                  )
                  
              })}

              <Button variant={'secondary'} onClick={() => setPesquisadoresSelecionados([])} size={'icon'}><Trash size={16} /></Button>
            </div>
            
          
        </div>
        </div>
    )
}
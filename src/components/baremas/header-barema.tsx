import { useContext, useEffect } from "react"
import { UserContext } from "../../context/context"
import { Trash, X } from "phosphor-react"
import { Button } from "../ui/button"
import { ArrowRight, Info } from "lucide-react"
import { Link } from "react-router-dom"

export function HeaderBarema() {
    const { pesquisadoresSelecionados, urlGeral, setPesquisadoresSelecionados } = useContext(UserContext)


    return(
        <div className="">
            <div className="flex  gap-6 w-full flex-col  ">
            <div>
            <Link to={'http://www.bi.cnpq.br/painel/mapa-fomento-cti/'} target="_blank"  className="inline-flex items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2 mb-3 px-3 py-1 text-sm font-medium"><Info size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Visitar página do programa<ArrowRight size={12}/></Link>
           
      

      <h1 className=" max-w-[450px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
            Criar  <strong className="bg-[#82AAC0]  rounded-md px-3 pb-2 text-white font-medium">barema</strong> de avaliação dos pesquisadores
        </h1>
        <p className="max-w-[500px]  text-lg font-light text-foreground">O sistema de classificação, é uma estrutura criada para avaliar e classificar pesquisadores com base em critérios específicos.</p>
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
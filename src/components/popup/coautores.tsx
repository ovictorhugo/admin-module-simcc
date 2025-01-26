import { Maximize2, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { useModalSecundary } from "../hooks/use-modal-store-secundary"

interface Props {
id:string
name:string
}

export function Coautores(props:Props) {

    const {onOpen} = useModalSecundary()
    return(
        <div>
  <div className="flex mb-6 items-center justify-between">
  <div className="text-left  font-medium text-2xl">Coautores</div>

  <Button onClick={() => onOpen('coautores', {id:props.id, name:props.name})} className="w-8 h-8" size={'icon'} variant={'outline'}>
    <Maximize2 size={16}/>
  </Button>
  </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-md bg-yellow-400"></div>
            <p className="text-sm text-gray-500">Mesma instituição</p>
        </div>

        <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-md bg-orange-400"></div>
            <p className="text-sm text-gray-500">Externo</p>
        </div>

        <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-md bg-red-400"></div>
            <p className="text-sm text-gray-500">Não identificado</p>
        </div>
      </div>


      <div className="w-full mt-8 items-center flex justify-center">
        <Button variant={'outline'} size={'sm'}>
          <Plus size={16}/>  Mostrar mais
        </Button>
      </div>
      
        </div>
    )
}
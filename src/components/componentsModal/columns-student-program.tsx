

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "../../components/ui/button"
import { ArrowUpDown, Copy, MoreHorizontal } from "lucide-react"
import { ArrowSquareOut, Buildings, Export, MapPin, Plus, ShareNetwork, Trash, X} from "phosphor-react"
import { GraduationCap} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/context"
import { toast } from "sonner"
import { useModal } from "../hooks/use-modal-store"
//import { UserContext } from "../../../../context/context"


export type Research = {
  lattes_id: string
  name: string
  type_: string
}



export const columns: ColumnDef<Research>[] = [
 
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      
      
      const { urlGeral} = useContext(UserContext)
      return <div className="flex gap-3 items-center" > {row.getValue("name")}</div>
    },
  },
  
 
  {
    accessorKey: "lattes_id",

    header: () => <div className="text-right flex items-center">Lattes Id</div>,
    cell: ({ row }) => {
    
      return  <div className="flex w-fit gap-1 text-xs  ">{row.getValue("lattes_id")}</div>
      
    },
  },


  {
    id: "actions",
    cell: ({ row }) => {
      const {urlGeralAdm} = useContext(UserContext)
      const {data: dataModal, onOpen } = useModal();
      const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
      useEffect(() => {
        setIdProgram(dataModal.graduate_program_id)
      }, [dataModal]);
  
   

 
      return (
        <Button  onClick={() => onOpen('confirm-delete-student-graduate-program',{lattes_id:row.original.lattes_id, nome:row.original.name})} variant={'destructive'} className="h-8 w-8 p-0 text-white ml-auto dark:text-white">
                       <Trash size={8} className="h-4 w-4" />
                     </Button>
      )
    },
  },
]

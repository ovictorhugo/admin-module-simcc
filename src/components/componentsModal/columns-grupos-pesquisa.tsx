

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "../../components/ui/button"
import { ArrowUpDown, Copy, MoreHorizontal } from "lucide-react"
import { ArrowSquareOut, Buildings, Export, MapPin, Plus, ShareNetwork, X} from "phosphor-react"
import { GraduationCap} from "lucide-react"
import { useContext } from "react"
import { UserContext } from "../../context/context"
//import { UserContext } from "../../../../context/context"


export type Research = {
  nome_prupo:string
  nome_lider:string
  area:string
}



export const columns: ColumnDef<Research>[] = [
 
  {
    accessorKey: "nome_prupo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do grupo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      
      
      return <div className="flex gap-3 items-center" >  <div className="flex-1 flex">{row.getValue("nome_prupo")}</div></div>
    },
  },
  
 
  {
    accessorKey: "nome_lider",

    header: () => <div className="text-right flex items-center">Líder do grupo</div>,
    cell: ({ row }) => {
      
 
      return <div className="text-xs flex items-center gap-1"><Buildings size={12}/> {row.getValue("nome_lider")}</div>
    },
  },
  {
    accessorKey: "area",

    header: () => <div className="text-right flex items-center">Área</div>,
    cell: ({ row }) => {
    
      return  <div className="flex w-fit gap-1 text-xs p-2 border items-center border-gray-300 dark:border-stone-700 rounded-md "><GraduationCap size={12}/>{row.getValue("area")}</div>
      
      
    },
  },


]

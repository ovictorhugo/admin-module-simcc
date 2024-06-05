

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import {  MoreHorizontal } from "lucide-react"
import { CalendarBlank, Export, LinkBreak} from "phosphor-react"
import { Link } from "react-router-dom";
import { Skeleton } from "../../ui/skeleton"





type Orientacoes = {

  id: string,
  nature: string,
  oriented: string,
  status: string,
  title: string,
  type: string,
  year: string
  }


export const columns: ColumnDef< Orientacoes >[] = [

  {
    accessorKey: "title",
    header: "Título",
  },

 {
        accessorKey: "oriented",
        header: "Orientação",
      },
     
  
      {
        accessorKey: "nature",
        header: "Tipo",
        cell: ({row}) =>{
            return        <div className="flex items-center gap-4"> {(row.getValue("nature")!= undefined) && (
              row.getValue("nature")
                )} 
            </div>
        }
      },
      {
        accessorKey: "year",
        header: "Ano",
        cell: ({ row }) => {

          return <div className="flex gap-1 items-center"><CalendarBlank size={12}/> {row.getValue("year")}</div>
        }
      },
     
    
   
 
 

]

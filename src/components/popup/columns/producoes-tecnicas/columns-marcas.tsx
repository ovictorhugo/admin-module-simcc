

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "../../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
import {  MoreHorizontal } from "lucide-react"
import { CalendarBlank, Export} from "phosphor-react"







type Livros = {
  id: string,
  title: string,
  year: string,

  }



export const columns: ColumnDef<Livros>[] = [



 {
        accessorKey: "title",
        header: "Título",
      },
     
      {
        accessorKey: "year",
        header: "Ano",
        cell: ({ row }) => {

          return <div className="flex gap-1 items-center"><CalendarBlank size={12}/> {row.getValue("year")}</div>
        }
      },
    
 

]

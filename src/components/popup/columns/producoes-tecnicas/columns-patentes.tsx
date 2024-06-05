

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
import { CalendarBlank, Export, LinkBreak} from "phosphor-react"
import { Link } from "react-router-dom";







type Patente = {
  id: string,
  grant_date: string,
  title: string,
  year: string,
  financing: string,
  project_name: string
  }



export const columns: ColumnDef<Patente>[] = [



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
     
      {
        accessorKey: "financing",
        header: "Financiamento",
      },
      
  
    
    
   
 
 

]

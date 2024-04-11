

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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Buildings,Export,MapPin, Plus} from "phosphor-react"
import { GraduationCap} from "lucide-react"
import { useContext } from "react"
import { UserContext } from "../../../../context/context"
//import { UserContext } from "../../../../context/context"


export type Research = {
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
      
      const lattes_id = row.original.id;
      const { urlGeral} = useContext(UserContext)
      return <div className="flex gap-3 items-center" >  <div className="h-8 w-8  bg-cover bg-top bg-no-repeat rounded-md whitespace-nowrap" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${lattes_id}) ` }}></div> <div className="flex-1 flex">{row.getValue("name")}</div></div>
    },
  },
  {
    accessorKey: "among",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº Ocorrências
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
 
  {
    accessorKey: "university",

    header: () => <div className="text-right flex items-center">Universidade</div>,
    cell: ({ row }) => {
      
 
      return <div className="text-xs flex items-center gap-1"><Buildings size={12}/> {row.getValue("university")}</div>
    },
  },
  {
    accessorKey: "graduation",

    header: () => <div className="text-right flex items-center">Titulação</div>,
    cell: ({ row }) => {
    
      return  <div className="flex w-fit gap-1 text-xs p-2 border items-center border-gray-300 dark:border-stone-700 rounded-md "><GraduationCap size={12}/>{row.getValue("graduation")}</div>
      
      
    },
  },
  {
    accessorKey: "city",

    header: () => <div className="text-right flex items-center">Cidade</div>,
    cell: ({ row }) => {
    
      return  <div className="flex w-fit gap-1 text-xs p-2 border items-center border-gray-300 dark:border-stone-700 rounded-md"><MapPin size={12}/>{row.getValue("city")}</div>

      
      
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <div className="flex gap-3">
          <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
             
              <Plus size={8} className="h-4 w-4" />
            </Button>

            <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
             
            <Export size={8} className="h-4 w-4" />
            </Button>

          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.lattes_id)}
            >
              Copie Lattes ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
  },
]

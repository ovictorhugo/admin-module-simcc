

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





export type Articles = {
    id: string,
    doi: string,
    name_periodical: string,
    qualis: "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "None" | "NP" | "SQ",
    title: string,
    year: string,
    color: string,
    researcher: string,
    lattes_id: string,
    magazine: string,
    lattes_10_id: string,
    jif: string,
    jcr_link: string
    researcher_id: string
    distinct: boolean
}



export const columns: ColumnDef<Articles>[] = [



 {
        accessorKey: "title",
        header: "Título",
      },
      {
        accessorKey: "name_periodical",
        header: "Revista",
      },
      {
        accessorKey: "year",
        header: "Ano",
        cell: ({ row }) => {

          return <div className="flex gap-1 items-center"><CalendarBlank size={12}/> {row.getValue("year")}</div>
        }
      },
      {
        accessorKey: "qualis",
        header: "Qualis",
        cell: ({ row }) => {
      
          let qualisColor = {
            'A1': 'bg-[#006837]',
            'A2': 'bg-[#8FC53E]',
            'A3': 'bg-[#ACC483]',
            'A4': 'bg-[#BDC4B1]',
            'B1': 'bg-[#F15A24]',
            'B2': 'bg-[#F5831F]',
            'B3': 'bg-[#F4AD78]',
            'B4': 'bg-[#F4A992]',
            'B5': 'bg-[#F2D3BB]',
            'C': 'bg-[#EC1C22]',
            'None': 'bg-[#560B11]',
            'SQ': 'bg-[#560B11]'
        }
          
          return <div className="flex gap-1 items-center" ><div className={`w-4 h-4 rounded-md  ${qualisColor[row.getValue("qualis") as keyof typeof qualisColor]}`}></div>  {row.getValue("qualis")}</div>
        },
      },
      {
        accessorKey: "jcr_link",
        header: "JCR",
        cell: ({ row }) => {
          const jif = row.original.jif;
          return <div>
            {row.getValue("jcr_link") != "None" && (
                                <a href={row.getValue("jcr_link")} target="_blank" rel="noopener noreferrer" className="border-[1px] cursor-pointer border-gray-300 py-2 flex px-4 text-gray-400 rounded-md text-xs font-medium gap-2 items-center  whitespace-nowrap"><LinkBreak size={16} className="text-gray-400" />JCR {jif}</a>
                            )}
          </div>
        }
      },
 
 
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
    
 
      return (
        <div className="flex gap-3">
       
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
              onClick={() => navigator.clipboard.writeText(payment.jcr_link)}
            >
      
              Copie JCR
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
  },
]

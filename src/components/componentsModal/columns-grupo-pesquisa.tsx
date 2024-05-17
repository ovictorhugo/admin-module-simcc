
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {Copy, Trash} from "phosphor-react"
import { useModal } from "../hooks/use-modal-store"


export interface PesquisadorProps {
  nome_grupo:string
  nome_lider:string
  cpf:string
  instituicao:string
  area:string
  ultimo_envio:string
  situacao:string
  }


export const columns: ColumnDef<PesquisadorProps>[] = [
  {
    accessorKey: "nome_grupo",
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
      
      
     
      return <div className="flex gap-3 items-center" > {row.getValue("nome_grupo")}</div>
    },
  },
  {
    accessorKey: "nome_lider",
    header: () => <div className="text-right flex items-center">Nome do Líder</div>,
    cell: ({ row }) => {
    
      return  <div className="flex w-fit gap-1 text-xs  ">{row.getValue("nome_lider")}</div>
      
    },
  },

  {
    accessorKey: "situacao",
    header: () => <div className="text-right flex items-center">Situação</div>,
    cell: ({ row }) => {
    
      return  <div className="flex w-fit gap-1 text-xs  ">{row.getValue("situacao")}</div>
      
    },
  },


 
]

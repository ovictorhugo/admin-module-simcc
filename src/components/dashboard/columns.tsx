

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "../../components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useContext } from "react"
import { UserContext } from "../../context/context"

export interface PesquisadorProps {
    name: string
    lattes_id: string
    researcher_id: string
    institution_id: string
  }


export const columns: ColumnDef<PesquisadorProps>[] = [
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
  },
  {
    accessorKey: "lattes_id",
    header: "ID Lattes",
  },
  {
    accessorKey: "researcher_id",
    header: "ID do pesquisador",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      const id_pesquisador = row.original.researcher_id;

      const handleDeleteResearcher = (id: any) => {

        const {urlGeralAdm} = useContext(UserContext)

        let urlDeleteProgram =  urlGeralAdm + `ResearcherRest/Delete?researcher_id=${id}`

        const fetchData = async () => {
         
          try {
            const response = await fetch(urlDeleteProgram, {
              mode: 'cors',
              method: 'DELETE',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
                'Content-Type': 'text/plain'
              }
            });
            if (response.ok) {
              toast("Dados deletados com sucesso!", {
                description: "Pesquisador removido da base de dados",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
            
            }
          } catch (err) {
            console.log(err);
          } 
        };
        
        fetchData()

      };
 
      return (
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
            <DropdownMenuItem onClick={() => handleDeleteResearcher(id_pesquisador)} className="text-white bg-red-500">Deletar pesquisador</DropdownMenuItem>
            <DropdownMenuItem>Editar informações</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

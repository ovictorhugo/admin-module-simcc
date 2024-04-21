
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
import {Trash} from "phosphor-react"
import { useModal } from "../hooks/use-modal-store"

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

      const { onOpen } = useModal();
  
      return (
        <div className="flex gap-3">
        <Button  onClick={() => onOpen('confirm-delete-researcher', {id_delete:id_pesquisador})} variant={'destructive'} className="h-8 w-8 p-0 text-white dark:text-white">
             
        <Trash size={8} className="h-4 w-4" />
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

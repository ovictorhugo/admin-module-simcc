
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
    name: string
    lattes_id: string
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

 
]

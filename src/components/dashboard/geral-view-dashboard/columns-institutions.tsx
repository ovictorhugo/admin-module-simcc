
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { ArrowUpDown, Maximize2, MoreHorizontal, Pencil, User } from "lucide-react"
import { Copy, Eye, Trash } from "phosphor-react"
import { useModal } from "../../hooks/use-modal-store"
import { useContext, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { EditResearcherModal } from "../../modals/edit-researcher-modal"
import { UserContext } from "../../../context/context"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { EditInstitutionModal } from "../../modals/edit-institution-modal"


export interface PesquisadorProps {
  name: string
  institution_id: string
  acronym:string
  lattes_id:string
}


export const columnsInstitution: ColumnDef<PesquisadorProps>[] = [
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

      const lattes_id = row.original.name;
      const { urlGeral } = useContext(UserContext)
      return <div className="flex gap-3 items-center" >

        <div className="flex-1 flex">{row.getValue("name")}</div></div>
    },
  },

  {
    accessorKey: "acronym",
    header: "Sigla",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      const id_pesquisador = row.original.institution_id;
      const name = row.original.name;

      const { onOpen } = useModal();


      return (
        <div className="flex gap-3 justify-end">

          <Button onClick={() => onOpen('confirm-delete-institution', { id_delete: id_pesquisador, name: name })} variant={'destructive'} className="h-8 w-8 p-0 text-white  dark:text-white">

            <Trash size={8} className="h-4 w-4" />
          </Button>

          <EditInstitutionModal

            name={row.original.name}

            institution_id={row.original.institution_id}
            acronym={row.original.acronym}
          />

          <EditInstitutionModal
          
            name={row.original.name}
            acronym={row.original.acronym}
            institution_id={row.original.institution_id}
        
          />

          <Button onClick={() => onOpen('researcher-modal', { name: name })} variant={'outline'} className="h-8 w-8 p-0 ">
            <Maximize2 size={8} className="h-4 w-4" />
          </Button>

          <Button onClick={() => {
            navigator.clipboard.writeText(payment.lattes_id)

            toast("Operação realizada", {
              description: "ID Lattes copiado para área de transferência",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })

          }} variant={'outline'} className="h-8 w-8 p-0 ">
            <Copy size={16} />
          </Button>

        </div >
      )
    },
  },
]

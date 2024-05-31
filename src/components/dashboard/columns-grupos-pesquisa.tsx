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
import {  MoreHorizontal, Trash, UserCheck } from "lucide-react"
import { ArrowSquareOut, ClockClockwise, Export, PencilSimple, Student} from "phosphor-react"
import {  Eye, EyeSlash, Hash, MapPin, Star } from "phosphor-react"; 
import {GraduationCapIcon } from "lucide-react";
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { useModal } from "../hooks/use-modal-store"
import { useContext } from "react"
import { UserContext } from "../../context/context"





export type  PosGraduationsProps = {
  acronym: null,
    area: string
    institution_id: string
    institution_name: string
    last_date_sent: string
    lattes_id: string
    leader_name: string
    research_group_id: string
    research_group_name: string
    researcher_id: string
    situation: string
}


export const columns: ColumnDef<PosGraduationsProps>[] = [



 {
        accessorKey: "research_group_name",
        header: "Nome do grupo",
        cell: ({ row }) => {
          const {user} = useContext(UserContext)

          return <div className="flex gap-2 items-center"> <img className="w-4  object-cover object-center  whitespace-nowrap" src={user.img_url}  /> {row.getValue("research_group_name")}</div>
        }
      },
      {
        accessorKey: "area",
        header: "Área",
        cell: ({ row }) => {

            return <div className="flex gap-1 items-center"><ClockClockwise size={12}/> {row.getValue("area")}</div>
          }
      },
      {
        accessorKey: "situation",
        header: "Situação",
        cell: ({ row }) => {

          return <div className="flex gap-1 items-center"><GraduationCapIcon size={12}/> {row.getValue("situation")}</div>
        }
      },
      
]

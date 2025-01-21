import { ColumnDef } from "@tanstack/react-table"
import { CalendarBlank } from "phosphor-react"

type ProjetoPesquisa = {

  id?: string,
  title: string,
  year: string,
  type: string
}

export const columnsProjetoPesquisa: ColumnDef<ProjetoPesquisa>[] = [
  {
    accessorKey: "project_name",
    header: "Título",
  },
  {
    accessorKey: "nature",
    header: "Tipo",
    cell: ({ row }) => {
      return <div className="flex items-center gap-4"> {(row.getValue("nature") != undefined) && (
        row.getValue("nature")
      )}
      </div>
    }
  },
  {
    accessorKey: "start_year",
    header: "Ano",
    cell: ({ row }) => {

      return <div className="flex gap-1 items-center"><CalendarBlank size={12} /> {row.getValue("start_year")}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
import { ColumnDef } from "@tanstack/react-table"
import { CalendarBlank } from "phosphor-react"

type TextoRevista = {

  id?: string,
  title: string,
  year: string,
  language: string
}


export const columnsTextoRevista: ColumnDef<TextoRevista>[] = [

  {
    accessorKey: "means_divulgation",
    header: "Status",
  },
  {
    accessorKey: "nature",
    header: "Revista",
    cell: ({ row }) => {
      return <div className="flex items-center gap-4"> {(row.getValue("nature") != undefined) && (
        row.getValue("nature")
      )}
      </div>
    }
  },
  {
    accessorKey: "year_",
    header: "Ano",
    cell: ({ row }) => {

      return <div className="flex gap-1 items-center"><CalendarBlank size={12} /> {row.getValue("year_")}</div>
    }
  },
  {
    accessorKey: "language",
    header: "Idioma",
  }
]

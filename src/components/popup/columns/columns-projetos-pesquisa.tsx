import { ColumnDef } from "@tanstack/react-table"
import { Maximize2 } from "lucide-react"
import { CalendarBlank } from "phosphor-react"
import { Button } from "../../ui/button"

import { useModalSecundary } from "../../hooks/use-modal-store-secundary"

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
  {

    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      const { onOpen } = useModalSecundary()

      return (
        <div className="flex gap-3">
          <Button
            onClick={() =>
              onOpen('project-modal', {
                agency_code: row.original.agency_code,
                agency_name: row.original.agency_name,
                nature: row.original.nature,
                description: row.original.description,
                end_year: row.original.end_year,
                id: row.original.id,
                number_academic_masters: row.original.number_academic_masters,
                number_phd: row.original.number_phd,
                number_specialists: row.original.number_specialists,
                number_undergraduates: row.original.number_undergraduates,
                project_name: row.original.project_name,
                start_year: row.original.start_year,
                status: row.original.status,
                researcher_id: row.original.researcher_id,
                production: row.original.production,
                foment: row.original.foment,
                components: row.original.components,
                researcher_name: row.original.researcher_name
              })
            }
            variant="outline"
            size={'icon'}
            className="  text-sm h-8 w-8 text-gray-500 dark:text-gray-300"
          >
            <Maximize2 size={16} />
          </Button>

        </div>
      )
    },
  },
]
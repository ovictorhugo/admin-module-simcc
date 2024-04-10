

import { ColumnDef } from "@tanstack/react-table"

export interface PesquisadorProps {
    name: string
    lattes_id: string
    researcher_id: string
    institution_id: string
  }


export const columns: ColumnDef<PesquisadorProps>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "lattes_id",
    header: "ID Lattes",
  },
  {
    accessorKey: "researcher_id",
    header: "ID do pesquisador",
  },
]

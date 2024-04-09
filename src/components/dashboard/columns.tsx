

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
    header: "Lattes Id",
  },
  {
    accessorKey: "researcher_id",
    header: "Researcher Id",
  },
  {
    accessorKey: "institution_id",
    header: "Institution Id",
  },
]



import { ColumnDef } from "@tanstack/react-table"


import { CalendarBlank} from "phosphor-react"







type Livros = {
  id: string,
  title: string,
  year: string,

  }



export const columns: ColumnDef<Livros>[] = [



 {
        accessorKey: "title",
        header: "Título",
      },
     
      {
        accessorKey: "year",
        header: "Ano",
        cell: ({ row }) => {

          return <div className="flex gap-1 items-center"><CalendarBlank size={12}/> {row.getValue("year")}</div>
        }
      },
    
 

]

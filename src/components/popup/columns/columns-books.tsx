

import { ColumnDef } from "@tanstack/react-table"


import { CalendarBlank,  LinkBreak} from "phosphor-react"
import { Link } from "react-router-dom";





export type Livros = {
    id: string,
    title: string,
    year: string,
    isbn: string,
    publishing_company: string
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
      {
        accessorKey: "isbn",
        header: "ISBN",
        cell: ({row}) =>{
            return        <div className="flex items-center gap-4"> {(row.getValue("year")!= undefined) && (
                   <Link to={`https://www.cblservicos.org.br/isbn/pesquisa/?page=1&q=${row.getValue("year")}&filtrar_por%5B0%5D=todos&ord%5B0%5D=relevancia&dir%5B0%5D=asc`} target="_blank"  className="text-sm font-normal flex gap-1 items-center"><LinkBreak size={16} className="" />ISBN {row.getValue("isbn")}</Link>
                )}
            </div>
        }
      },
      {
        accessorKey: "publishing_company",
        header: "Editora",
      },
    
   
 
 

]

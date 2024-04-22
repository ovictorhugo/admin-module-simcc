

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
import {  MoreHorizontal } from "lucide-react"
import { Export} from "phosphor-react"
import {  Eye, EyeSlash, Hash, MapPin, Star } from "phosphor-react"; 
import {GraduationCapIcon } from "lucide-react";
import { toast } from "sonner"





export type  PosGraduationsProps = {
  graduate_program_id: string
  code: string
  name: string
  area: string
  modality: string
  type: string
  rating: string
  institution_id: string
  description: string
  url_image: string
  city:string
  visible: boolean
}


export const columns: ColumnDef<PosGraduationsProps>[] = [



 {
        accessorKey: "name",
        header: "Nome",
      },
      {
        accessorKey: "code",
        header: "código",
        cell: ({ row }) => {

            return <div className="flex gap-1 items-center"><Hash size={12}/> {row.getValue("code")}</div>
          }
      },
      {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => {

          return <div className="flex gap-1 items-center"><GraduationCapIcon size={12}/> {row.getValue("type")}</div>
        }
      },
      {
        accessorKey: "city",
        header: "Cidade",
        cell: ({ row }) => {

          return <div className="flex gap-1 items-center"><MapPin size={12}/> {row.getValue("city")}</div>
        }

      },
      {
        accessorKey: "rating",
        header: "Classificação",
        cell: ({ row }) => {

          return <div className="flex gap-1 items-center"><Star size={12}/> {row.getValue("rating")}</div>
        }

      },
      {
        accessorKey: "visible",
        header: "Visibiidade",
        cell: ({ row }) => {
          

          return <div className="flex gap-1 items-center"><Button variant="outline" size={'icon'} className="ml-auto text-sm text-gray-500 dark:text-gray-300 flex items-center">
            {row.getValue("visible") ? (<EyeSlash size={16}/>):(<Eye size={16}/>)}</Button></div>
          
        }
    

      },
     
     
    
 
 
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      const URLGERALADMIN = import.meta.env.VITE_API_KEY
      const handleVisibleProgram = (id: string) => {

        const urlVisibleProgram = URLGERALADMIN + `GraduateProgramRest/Update?graduate_program_id=${id}`
        const fetchData = async () => {
         
          try {
            const response = await fetch(urlVisibleProgram, {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
                'Content-Type': 'text/plain'
              }
            });
            if (response.ok) {

            
              toast("Visibilidade alterada", {
                description: "Operação realizada com sucesso!",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
            } 
      
          
          } catch (err) {
            toast("Erro ao mudar visibilidade", {
              description: "Tente novamente",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
          } 
        };
        fetchData();
     
    
      };

    
 
      return (
        <div className="flex gap-3">
       
            <Button variant={'default'} className="h-8 w-8 p-0 text-white dark:text-white">
             
            <Export size={8} className="h-4 w-4" />
            </Button>

          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.code)}
            >
      
              Copie o código
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleVisibleProgram (payment.graduate_program_id)}
            >
              Mudar visibilidade
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
  },
]

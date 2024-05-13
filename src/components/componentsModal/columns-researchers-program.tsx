

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "../../components/ui/button"
import { ArrowUpDown, Copy, MoreHorizontal } from "lucide-react"
import { ArrowSquareOut, Buildings, Export, MapPin, Plus, ShareNetwork, Trash, X} from "phosphor-react"
import { GraduationCap} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/context"
import { toast } from "sonner"
import { useModal } from "../hooks/use-modal-store"
//import { UserContext } from "../../../../context/context"


export type Research = {
  lattes_id: string
  name: string
  type_: string
}



export const columns: ColumnDef<Research>[] = [
 
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
      
      
      const { urlGeral} = useContext(UserContext)
      return <div className="flex gap-3 items-center" > {row.getValue("name")}</div>
    },
  },
  
 
  {
    accessorKey: "lattes_id",

    header: () => <div className="text-right flex items-center">Lattes Id</div>,
    cell: ({ row }) => {
    
      return  <div className="flex w-fit gap-1 text-xs  ">{row.getValue("lattes_id")}</div>
      
    },
  },

  {
    accessorKey: "type_",

    header: () => <div className="text-right flex items-center">Tipo</div>,
    cell: ({ row }) => {
    
      return  <div className="flex w-fit gap-1 text-xs p-2 border items-center border-gray-300 dark:border-stone-700 rounded-md ">{row.getValue("type_")}</div>
      
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const {urlGeralAdm} = useContext(UserContext)
      const {data: dataModal } = useModal();
      const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
      useEffect(() => {
        setIdProgram(dataModal.graduate_program_id)
      }, [dataModal]);
  
      const handleSubmitDelete = async ( researcher_id:string) => {


        try {
          const data = [
            {
              graduate_program_id: id_program,
              lattes_id:researcher_id,
              }
          ]
  
          console.log('dataa reesfs', data)
  
          let urlProgram = urlGeralAdm + 'GraduateProgramResearcherRest/Delete'
  
  
          const fetchData = async () => {
          
            try {
              const response = await fetch(urlProgram, {
                mode: 'cors',
                method: 'DELETE',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'POST',
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Max-Age': '3600',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              });
  
              if (response.ok) {
               
                toast("Dados enviados com sucesso", {
                    description: "Pesquisador removido no programa de pós-graduação",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               
              } else {
                console.error('Erro ao enviar dados para o servidor.');
                toast("Tente novamente!", {
                    description: "Erro ao cadastrar pesquisador ao programa",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
              }
              
            } catch (err) {
              console.log(err);
            } 
          };
          fetchData();
  
         
     
    
          
        } catch (error) {
            toast("Erro ao processar requisição", {
                description: "Tente novamente",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
        }
      };

 
      return (
        <Button  onClick={() => handleSubmitDelete(row.original.lattes_id)} variant={'destructive'} className="h-8 w-8 p-0 text-white ml-auto dark:text-white">
                       <Trash size={8} className="h-4 w-4" />
                     </Button>
      )
    },
  },
]

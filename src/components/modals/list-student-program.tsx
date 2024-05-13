import { ArrowUUpLeft, Trash, User } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { Dialog, DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "../ui/dialog";
import { Plus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { toast } from "sonner"

export interface PesquisadorProps {
  lattes_id: string
  name: string
  type_: string
}

export interface PesquisadorProps2 {
  name: string
  lattes_id: string
  researcher_id: string
  institution_id: string
}

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../../components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { DataTableModal } from "../componentsModal/data-table";
import { columns } from "../componentsModal/columns-researchers-program";



export function ListStudentProgramModal() {
    const { onClose, isOpen, type: typeModal, data: dataModal } = useModal();
    const isModalOpen = isOpen && typeModal === "list-student-program";
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);
    const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
    const { urlGeralAdm, user } = useContext(UserContext);

    useEffect(() => {
      setIdProgram(dataModal.graduate_program_id)
    }, [dataModal]);

  


    //listar todos os pesquisadores popover

    const [researcherSearch, setResearcherSearch] = useState<PesquisadorProps2[]>([]);
  
    const urlGetResearcherSearch = urlGeralAdm + `ResearcherRest/Query?institution_id=${user.institution_id}`;
  
    

    //sdfsf

    const handleSubmit = async (type:string, researcher_id:string) => {
      const currentYear = new Date().getFullYear();

      try {
        const data = [
          {
            graduate_program_id: id_program,
            researcher_id:researcher_id,
            year:String(currentYear),
            type_: type
            }
        ]

        console.log('dataa reesfs', data)

        let urlProgram = urlGeralAdm + 'GraduateProgramResearcherRest/Insert'


        const fetchData = async () => {
        
          try {
            const response = await fetch(urlProgram, {
              mode: 'cors',
              method: 'POST',
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
                  description: "Pesquisador adicionado no programa de pós-graduação",
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


    ///deteltar
    //sdfsf




    //

    const urlGetResearcher =
    urlGeralAdm + `studentRest/query?graduate_program_id=${id_program}`;
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlGetResearcher, {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
            "Content-Type": "text/plain",
          },
        });
        const data = await response.json();
        if (data) {
          setResearcher(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlGetResearcher, handleSubmit]);
  


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent className="min-w-[40vw] ">
        <DialogHeader className="pt-8 px-6">
                 <DialogTitle className="text-2xl text-center font-medium">
                 Discentes <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">vinculados</strong> ao programa <br/> {dataModal.name}
                 </DialogTitle>
                 <DialogDescription className="text-center text-zinc-500">
                 Adicione ou remova os pesquisadores permanentes e colaboradores do programa de pós graduação
                 </DialogDescription>
               </DialogHeader>
<Separator/>
               <div>
                <div>


                <DataTableModal columns={columns} data={researcher}/>


              
                </div>

               


               </div>

               <DialogFooter className=" py-4 ">
        <Button variant={'ghost'}   onClick={() => onClose()}>
            <ArrowUUpLeft size={16} className="" />Cancelar
              </Button>

        
            </DialogFooter>

               </DialogContent>

        </Dialog>
    )
}
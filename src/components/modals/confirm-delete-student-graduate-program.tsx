
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { ArrowUUpLeft, Trash } from "phosphor-react";
import { toast } from "sonner"
import { UserContext } from "../../context/context";
import { useContext, useEffect, useState} from "react";

export function ConfirmDeleteStudentGraduateProgram() {
    const { onOpen, onClose, isOpen, type: typeModal, data:dataModal } = useModal();
    const isModalOpen = isOpen && typeModal === "confirm-delete-student-graduate-program";
    const {urlGeralAdm} = useContext(UserContext)

     const id_delete = String(dataModal.id_delete)
 
     const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
     const [lattes_id, setLattesId] = useState('')
     useEffect(() => {
       setIdProgram(dataModal.graduate_program_id)
       setLattesId(dataModal?.lattes_id || '')
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

        let urlProgram = urlGeralAdm + '/studentRest/delete'


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
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent>
        <DialogHeader className="pt-8 px-6 flex flex-col items-center">
        <DialogTitle className="text-2xl text-center font-medium max-w-[350px]">
        <strong className="bg-red-500 text-white hover:bg-red-600 transition duration-500 font-medium">Deletar</strong> discente {dataModal.nome} do programa
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
          Você tem certeza de que deseja prosseguir com a exclusão do pesquisador que está atualmente vinculado a este programa de pós-graduação?
          </DialogDescription>
            </DialogHeader>

            <DialogFooter className=" py-4 ">
            <Button variant={'ghost'}   onClick={() => onOpen('add-researcher-graduation')}>
            <ArrowUUpLeft size={16} className="" />Cancelar
              </Button>

              <Button variant={'destructive'}    onClick={() =>handleSubmitDelete(lattes_id)}>
              <Trash size={16} className="" />Deletar
              </Button>
            </DialogFooter>

            </DialogContent>
            </Dialog>
    )
}
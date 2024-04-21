
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { Trash } from "phosphor-react";
import { toast } from "sonner"
import { UserContext } from "../../context/context";
import { useContext} from "react";

export function ConfirmDeletePosGraduateProgram() {
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = isOpen && typeModal === "confirm-delete-pos-graduate-program";
    const {urlGeralAdm} = useContext(UserContext)

     const id_delete = String(data.id_delete)
    const handleDeleteProgram = (id: string) => {

      const urlDeleteProgram =  urlGeralAdm + `GraduateProgramRest/Delete?graduate_program_id=${id}`
      const fetchData = async () => {
       
        try {
          const response = await fetch(urlDeleteProgram, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'DELETE',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Max-Age': '3600',
              'Content-Type': 'text/plain'
            }
          });
          if (response.ok) {
            toast("Dados deletados com sucesso!", {
              description: "Programa de  pós graduação removido da base de dados",
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

   
    };


    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent>
        <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-medium">
        Deletar programa de <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">pós-graduação</strong>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
          É possível alterar informações básicas do programa de pós-graduação, no campo de edição, caso delete o programa todas as informações serão perdidas.
          </DialogDescription>
            </DialogHeader>

            <DialogFooter className=" py-4 ">
              <Button variant={'destructive'}    onClick={() =>handleDeleteProgram(id_delete)}>
              <Trash size={16} className="" />Deletar
              </Button>
            </DialogFooter>

            </DialogContent>
            </Dialog>
    )
}
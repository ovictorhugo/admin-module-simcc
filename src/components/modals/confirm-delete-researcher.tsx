
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { Trash } from "phosphor-react";

export function ConfirmDeleteResearcher() {
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = isOpen && typeModal === "confirm-delete-researcher";

    const id_delete = data.id_delete

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent>
        <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-medium">
          Cadastrar programa de <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">pós-graduação</strong>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
          Adicione as informações básicas do programa de pós-graduação como o corpo docente envolvido, classificação e descrição.
          </DialogDescription>
            </DialogHeader>

            <DialogFooter className=" py-4 ">
              <Button variant={'destructive'}   >
              <Trash size={16} className="" />Deletar
              </Button>
            </DialogFooter>

            </DialogContent>
            </Dialog>
    )
}
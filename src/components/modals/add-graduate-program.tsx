import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";

  import { useModal } from "../hooks/use-modal-store";

export function AddGraduateProgram() {

    const { onClose, isOpen, type } = useModal();
    const isModalOpen = isOpen && type === "add-graduate-program";

    return  (
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
 <DialogContent></DialogContent>
        </Dialog>
    )
}
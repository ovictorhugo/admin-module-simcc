import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { useModal } from "../hooks/use-modal-store";

export function ConfirmDeleteResearcher() {
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = isOpen && typeModal === "confirm-delete-researcher";

        const id_delete = data.id_delete
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent>
        <DialogHeader className="pt-8 px-6">
            </DialogHeader>

            </DialogContent>
            </Dialog>
    )
}
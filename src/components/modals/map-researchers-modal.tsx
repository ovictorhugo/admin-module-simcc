import { useModal } from "../hooks/use-modal-store";

export function MapResearchersModal() {
    const { onClose, isOpen, type: typeModal } = useModal();
    const isModalOpen = isOpen && typeModal === "map-researchers-modal";

    return(
        <>
        {isModalOpen && (
            <div>

                
            </div>
        )}
        </>
    )
}
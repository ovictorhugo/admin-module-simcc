import { useModal } from "../hooks/use-modal-store";

export function CookiesModal() {
    const { onClose, isOpen, type: typeModal } = useModal();
    const isModalOpen = isOpen && typeModal === "cookies";

    return(
        <>
        {isModalOpen && (
            <div></div>
        )}
        </>
    )
}
import { useModalResult } from "../../hooks/use-modal-result";

export function InstitutionsHome() {
    const { isOpen, type} = useModalResult();
  
    const isModalOpen = isOpen && type === "institutions-home";
    return(
        <>
        {isModalOpen && (
            <div>c</div>
        )}
        </>
    )
}
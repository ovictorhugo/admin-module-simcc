import { useModalResult } from "../../hooks/use-modal-result";

export function ArticlesHome() {
    const { isOpen, type} = useModalResult();
  
    const isModalOpen = isOpen && type === "articles-home";
    return(
        <>
        {isModalOpen && (
            <div>b</div>
        )}
        </>
    )
}
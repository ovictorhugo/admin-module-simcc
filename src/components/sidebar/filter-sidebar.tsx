import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { Alert } from "../ui/alert";


export function FilterSidebar() {

    const { isOpen, onClose, type} = useModalSidebar();
  
    const isModalOpen = isOpen && type === "filter";

    const handleClose = () => {
        onClose();
      }


    return(
        <>
        {isModalOpen && (
            <div className=" pb-3 h-full mr-6 transition-all">
           <Alert className="w-[280px]">

           </Alert>
        </div>
    )}</>
    )
}
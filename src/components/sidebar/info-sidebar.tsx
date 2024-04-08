import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { Alert } from "../ui/alert";


export function InfoSidebar() {

    const { isOpen, onClose, type} = useModalSidebar();
  
    const isModalOpen = isOpen && type === "info";

    const handleClose = () => {
        onClose();
      }


    return(
        <>
        {isModalOpen && (
            <div className="z-[99] pb-6 h-full mr-4 transition-all">
           <Alert className="w-[280px] h-full flex">
ss
           </Alert>
        </div>
    )}</>
    )
        }
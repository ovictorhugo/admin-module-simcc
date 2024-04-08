import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { SelectInstitution } from "./filter-sidebar/select-institution";


export function FilterSidebar() {

    const { isOpen, onClose, type} = useModalSidebar();
  
    const isModalOpen = isOpen && type === "filter";

    const handleClose = () => {
        onClose();
      }


    return(
        <>
        {isModalOpen && (
            <div className="z-[99] pb-6 h-full mr-6 transition-all">
           <Alert className="w-[280px] h-full flex justify-between flex-col">
                <div>
                <div>
                <h3>Filtros de pesquisa</h3>
                </div>

                <div className="">
                    <p className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Instituição</p>
                    <SelectInstitution/>
                </div>
                </div>

                <div><Button className="w-full" variant={'destructive'}>Deletar filtos</Button></div>
           </Alert>
        </div>
    )}</>
    )
}
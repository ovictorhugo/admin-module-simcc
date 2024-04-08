import { AddResearcherDashboard } from "./add-researcher-dashboard";
import { DataGeralDashboard } from "./data-geral-dashboard";
import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { GraduateProgramDashboard } from "./graduate-program-dashboard";
import { useModalSidebar } from "../hooks/use-modal-sidebar";
export function GeralViewDashboard() {

    
    const { isOpenSidebar } = useModalSidebar();

    console.log(isOpenSidebar)

    const { isOpen, type} = useModalDashboard();
  
    const isModalOpen = isOpen && type === "general";

    return  (
       <>
       {isModalOpen && (
         <div className="overflow-y-hidden flex pr-6 md:pr-[72px] w-full">
         <div className="flex flex-1  flex-col">
            <DataGeralDashboard/>
            <div className="mt-6">
            <AddResearcherDashboard/>
            </div>
         </div>

         {!isOpenSidebar && (
            <div className="ml-6 max-w-[450px] overflow-y-auto elementBarra pr-2">
            <GraduateProgramDashboard/>
            </div>
         )}
          
        </div>
       )}
       </>
    )
}
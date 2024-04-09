import { AddResearcherDashboard } from "./add-researcher-dashboard";
import { DataGeralDashboard } from "./data-geral-dashboard";
import {TableResearcherViewDashboard} from "./table-reseracher-view-dashboard"
import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { GraduateProgramDashboard } from "./graduate-program-dashboard";
import { useModalSidebar } from "../hooks/use-modal-sidebar";


export function GeralViewDashboard() {

    
    const { isOpen: isOpenSidebar } = useModalSidebar();

    console.log(isOpenSidebar)

    const { isOpen, type} = useModalDashboard();
  
    const isModalOpen = isOpen && type === "general";

    return  (
       <>
       {isModalOpen && (
         <div className=" overflow-y-hidden flex max-lg:flex-col pr-6 md:pr-[72px] w-full">
         <div className="flex flex-1  flex-col">
            <DataGeralDashboard/>
            <div className="mt-6">
            <AddResearcherDashboard/>
            <div className="my-6 h-full flex flex-1">
            <TableResearcherViewDashboard/>
            </div>

            </div>
         </div>

         {!isOpenSidebar && (
            <div className="ml-6 lg:max-w-[350px]  w-full overflow-y-auto elementBarra pr-2">
            <GraduateProgramDashboard/>
            </div>
         )}
          
        </div>
       )}
       </>
    )
}
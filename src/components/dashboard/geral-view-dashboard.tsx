import { AddResearcherDashboard } from "./add-researcher-dashboard";
import { DataGeralDashboard } from "./data-geral-dashboard";
import {TableResearcherViewDashboard} from "./table-reseracher-view-dashboard"
import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { GraduateProgramDashboard } from "./graduate-program-dashboard";
import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../..//components/ui/tabs"
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { Badge } from "../ui/badge";
import { AddAdmin } from "./add-admin";
import { PesquisadoresHeader } from "./pesquisadores-header";


export function GeralViewDashboard() {
const {user} = useContext(UserContext)
    
    const { isOpen: isOpenSidebar } = useModalSidebar();

    console.log(isOpenSidebar)

    const { isOpen, type} = useModalDashboard();
  
    const isModalOpen = isOpen && type === "general";

    const [value, setValue] = useState('geral')

    return  (
       <>
       {isModalOpen && (
         <div className=" overflow-y-hidden flex max-lg:flex-col pr-6 md:pr-[72px] w-full">
      <Tabs defaultValue="geral" value={value} className="w-full" >
       
        {value == 'geral' && (
         <DataGeralDashboard/>
        )}

{value == 'pesquisadores' && (
          <PesquisadoresHeader/>
        )}
        
        <TabsList className="mb-8">
         <TabsTrigger value="geral" onClick={() => setValue('geral')}>Visão geral</TabsTrigger>
         <TabsTrigger value="pesquisadores" onClick={() => setValue('pesquisadores')}>Pesquisadores</TabsTrigger>
         <TabsTrigger value="pos-graduacoes" onClick={() => setValue('pos-graduacoes')}>Pós-graduações</TabsTrigger>
      </TabsList>

        
         <TabsContent value="geral">

         oi
         </TabsContent>
         <TabsContent value="pesquisadores">
            
           <TableResearcherViewDashboard/>
          
         </TabsContent>
         </Tabs>

         {!isOpenSidebar && value== 'geral' && (
            <div className="ml-6 lg:max-w-[350px]  w-full overflow-y-auto ">
            <GraduateProgramDashboard/>
            
            <div className="mt-6 flex h-full flex-1">
            <AddAdmin/>
            </div>


            </div>
         )}

          
        </div>
       )}
       </>
    )
}
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
import { ScrollArea } from "../ui/scroll-area";
import { PosGraduacoesHeader } from "./pos-graduacoes-header";
import {PosGraducaoView} from "./pos-graduacao-view-dashboard";
import { PesoProducoes } from "./peso-producoes";
import { GrupoPesquisaHeader } from "./grupo-pesquisa-header";
import { PesoProducoesHeader } from "./peso-producao-header";


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
         <div className="pb-4  overflow-y-hidden flex max-lg:flex-col pr-6 md:pr-[72px] w-full">
      <Tabs defaultValue="geral" value={value} className="w-full" >
       
        {value == 'geral' && (
         <DataGeralDashboard/>
        )}

   {value == 'pesquisadores' && (
          <PesquisadoresHeader/>
        )}

   {value == 'pos-graduacoes' && (
          <PosGraduacoesHeader/>
        )}

   {value == 'grupos-pesquisa' && (
          <GrupoPesquisaHeader/>
        )}

   {value == 'peso-producoes' && (
          <PesoProducoesHeader/>
        )}
        
        <TabsList className="my-4">
         <TabsTrigger value="geral" onClick={() => setValue('geral')}>Visão geral</TabsTrigger>
         <TabsTrigger value="pesquisadores" onClick={() => setValue('pesquisadores')}>Pesquisadores</TabsTrigger>
         <TabsTrigger value="pos-graduacoes" onClick={() => setValue('pos-graduacoes')}>Pós-graduações</TabsTrigger>
         <TabsTrigger value="grupos-pesquisa" onClick={() => setValue('grupos-pesquisa')}>Grupos de pesquisas</TabsTrigger>
         {user.state == 'admin' || user.state == 'master' && (<TabsTrigger value="peso-producoes" onClick={() => setValue('peso-producoes')}>Peso de produções</TabsTrigger>)}
      </TabsList>

        
         <TabsContent value="geral">

         oi
         </TabsContent>
         <TabsContent value="pesquisadores" className="m-0">
            
           <TableResearcherViewDashboard/>
          
         </TabsContent>

         <TabsContent value="pos-graduacoes" className="m-0">

            <PosGraducaoView/>
         </TabsContent>

         <TabsContent value="grupos-pesquisa">


</TabsContent>

<TabsContent value="peso-producoes">
<PesoProducoes/>

</TabsContent>

         </Tabs>

         {!isOpenSidebar && value== 'geral' && (
            <ScrollArea  className="ml-6 lg:max-w-[365px] w-full sticky top-0">
               <div className="  w-full">
            <GraduateProgramDashboard/>
            
            <div className="mt-6 flex h-full flex-1">
            <AddAdmin/>
            </div>


            </div>
            </ScrollArea>
         )}

          
        </div>
       )}
       </>
    )
}
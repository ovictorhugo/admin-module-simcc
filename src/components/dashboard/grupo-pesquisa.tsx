import { useContext,  useState } from "react";

import { UserContext } from "../../context/context";

import {ArrowRight, ChevronLeft, Info, Search } from "lucide-react";


  interface PosGraduationsProps {
  area: string,
  institution: string,
  leader_one: string,
  leader_one_id: string,
  leader_two:string,
  leader_two_id: string,
  name: string,
}


import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { Tabs, TabsContent } from "../ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { TooltipProvider } from "../ui/tooltip";
import { Input } from "../ui/input";


import { DisplayItemGrupoPesquisa } from "./components/display-item-grupo-pesquisa";
import { ItensListGrupoPesquisa } from "./components/itens-list-grupo-pesquisa";
  


export function GrupoPesquisaView() {


    const { urlGeral, defaultLayout } = useContext(UserContext);



 
      const { isOpen, type} = useModalDashboard();
  
      const isModalOpen = isOpen && type === "grupo-pesquisa";

      const [tab, setTab] = useState('all')
      const [search, setSearch] = useState('')
    
      const [total, setTotal] = useState<PosGraduationsProps | null>(null);

      // Função para lidar com a atualização de researcherData
      const handleResearcherUpdate = (newResearcherData: PosGraduationsProps) => {
          setTotal(newResearcherData);
        };

        console.log(`${urlGeral}research_group`)

        const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }


    return(
      <>
      {isModalOpen && (
        <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
    direction="horizontal"
    onLayout={() => defaultLayout}
    className="h-full  items-stretch"
    >
         <ResizablePanel defaultSize={40} minSize={40}>
         <Tabs defaultValue={tab} value={tab}>
    <div className="flex items-center justify-between px-4 py-2  h-[56px]">
    <div className="flex items-center gap-4">
          
          <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
      <h1 className="text-lg font-bold">Grupos de pesquisa</h1>
          </div>
      <Link to={'https://dgp.cnpq.br/dgp/faces/consulta/consulta_parametrizada.jsf'} target="_blank"  className="inline-flex items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2  px-3 py-1 text-sm font-medium"><Info size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Plataforma DGP CNPq<ArrowRight size={12}/></Link>
    </div>
   <div className="w-full border-b border-neutral-200 dark:border-neutral-800 "></div>

    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
     
        <div className="relative w-full bg-white h-10 flex gap-2 items-center border pl-4 border-neutral-200 dark:border-neutral-800 rounded-md dark:bg-neutral-950">
          <Search size={16} />
          <Input placeholder="Filtrar pelo nome do grupo..." className="border-none h-8" value={search}  onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>
    </div>
    <TabsContent value="all" className="m-0">
     <ItensListGrupoPesquisa
     onResearcherUpdate={handleResearcherUpdate}
     url={`${urlGeral}research_group`}
     search={search}
     />
    </TabsContent>
    <TabsContent value="unread" className="m-0">
   
    </TabsContent>
  </Tabs>
         </ResizablePanel>
         <ResizableHandle withHandle />

         <ResizablePanel defaultSize={defaultLayout[2]} minSize={50}>
     
               {total ? (
      <DisplayItemGrupoPesquisa
      area={total.area}
  institution={total.institution}
  leader_one={total.leader_one}
  leader_one_id={total.leader_one_id}
  leader_two={total.leader_two}
  leader_two_id={total.leader_two_id}
  name={total.name}
      />
    ):(
      <div className="w-full h-full flex flex-col items-center justify-center">
       <p className="text-9xl  text-[#719CB8]  font-bold mb-16 animate-pulse">(¬_¬ )</p>
        <p className="font-medium text-lg">Nenhum grupo de pesquisa selecionado</p>
      </div>
    )}
      
      </ResizablePanel>
      </ResizablePanelGroup>
      </TooltipProvider>
      )}
       </>
   
        
    )
}
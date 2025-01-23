import {  ChevronLeft, Plus,  Search } from "lucide-react";

import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { Input } from "../ui/input";


import { UserContext } from "../../context/context";
import { TooltipProvider } from "../ui/tooltip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Tabs, TabsContent } from "../ui/tabs";
import { ItensListDepartamento } from "./components/itens-list-departamento";
import { useModal } from "../hooks/use-modal-store";
import { DisplayItemDepartamento } from "./components/display-item-departamento";
import { Helmet } from "react-helmet";


interface Departamentos {
  dep_id:string
      org_cod: string
      dep_nom: string
      dep_des: string
      dep_email: string
      dep_site: string
      dep_tel: string
      img_data:string
      dep_sigla: string
}

export function Departamentos() {
   

    const {urlGeralAdm} = useContext(UserContext)
  
   

    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }


   



  ///

  const [tab] = useState('all')
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState<Departamentos | null>(null);

  const { defaultLayout } = useContext(UserContext);
  const {onOpen} = useModal()

  

  // Função para lidar com a atualização de researcherData
  const handleResearcherUpdate = (newResearcherData: Departamentos) => {
    setTotal(newResearcherData);
  };

  const {version} = useContext(UserContext)

    return(
      <TooltipProvider delayDuration={0}>
         <Helmet>
          <title>Departamentos | Módulo administrativo | {version ? ('Conectee'):('Iapós')} </title>
          <meta name="description" content={`Departamentos | Módulo administrativo | ${version ? ('Conectee'):('Iapós')}`} />
          <meta name="robots" content="index, follow" />
        </Helmet>
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
      <h1 className="text-lg font-bold">Departamentos</h1>
          </div>

    
  </div>
 <div className="w-full border-b border-neutral-200 dark:border-neutral-800 "></div>

  <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="flex items-center gap-3">
      <Button onClick={() => onOpen('add-departamento')}>
        <Plus size={16}/> Adicionar departamento
      </Button>
      <div className="relative w-full bg-white h-10 flex gap-2 items-center border pl-4 border-neutral-200 dark:border-neutral-800 rounded-md dark:bg-neutral-950">
        <Search size={16} />
        <Input placeholder="Filtrar pelo nome do departamento..." className="border-none h-8" value={search}  onChange={(e) => setSearch(e.target.value)}/>
      </div>
    </div>
  </div>
  <TabsContent value="all" className="m-0">
   <ItensListDepartamento
   onResearcherUpdate={handleResearcherUpdate}
   url={`${urlGeralAdm}departamentos`}
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
    <DisplayItemDepartamento
    dep_id={total.dep_id}
      org_cod={total.org_cod}
      dep_nom={total.dep_nom}
      dep_des={total.dep_des}
      dep_email={total.dep_email}
      dep_site={total.dep_site}
      dep_tel={total.dep_tel}
      img_data={total.img_data}
      dep_sigla={total.dep_sigla}
    />
  ):(
    <div className="w-full h-full flex flex-col items-center justify-center">
     <p className="text-9xl  text-eng-blue  font-bold mb-16 animate-pulse">^____^</p>
      <p className="font-medium text-lg">Nenhum departamento selecionado</p>
    </div>
  )}
    
    </ResizablePanel>
    </ResizablePanelGroup>
    </TooltipProvider>
    )
}
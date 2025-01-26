import { useContext,  useState } from "react";
import { useModal } from "../../hooks/use-modal-store"

import { UserContext } from "../../../context/context";

import {ChevronLeft,  Plus, Search } from "lucide-react";


  interface PosGraduationsProps {
    graduate_program_id: string
    code: string
    name: string
    area: string
    modality: string
    type: string
    rating: string
    institution_id: string
    description: string
    url_image: string
    city:string
    created_at:string
    visible: boolean
    updated_at:string
    qtd_discente:string
    qtd_colaborador:string
    qtd_permanente:string
    site:string 
    acronym:string 
  }


import { useModalDashboard } from "../../hooks/use-modal-dashboard";
import { TooltipProvider } from "../../ui/tooltip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { DisplayItem } from "../components/display-item";
import { ItensList } from "../components/itens-list-vitrine";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
  


export function PosGraducaoView() {


const { isOpen, type} = useModalDashboard();
  
const isModalOpen = isOpen && type === "graduate-program";

    const { urlGeralAdm, user, defaultLayout } = useContext(UserContext);

  
    const { onOpen } = useModal();




      const [tab, setTab] = useState('all')
      const [search, setSearch] = useState('')
    const [menu, setMenu] = useState(true)
      const [total, setTotal] = useState<PosGraduationsProps | null>(null);

      // Função para lidar com a atualização de researcherData
      const handleResearcherUpdate = (newResearcherData: PosGraduationsProps) => {
          setTotal(newResearcherData);
        };

        const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const {version} = useContext(UserContext)
    return(
      <>
       <Helmet>
          <title>Pós-graduações | Módulo administrativo | {version ? ('Conectee'):('Iapós')} </title>
          <meta name="description" content={`Pós-graduações | Módulo administrativo | ${version ? ('Conectee'):('Iapós')}`} />
          <meta name="robots" content="index, follow" />
        </Helmet>

      

        <div className="grid relative grid-cols-5 h-full">
          <div className={`grid col-span-2 h-fit sticky top-[68px] p-8 ${menu ? ('grid'):('hidden')}`}>

        
          <Tabs defaultValue={tab} value={tab}>
          
          <div className={`flex items-center justify-between  `}>
        <div className="flex items-center gap-4">
     
          <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Pós-graduação</h1>
          </div>
           
          <Button onClick={() => setMenu(!menu) } variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
          
            </Button>
          </div>

          <div className="bg-background/95 pt-8 pb-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-3">
            <Button onClick={() => onOpen('add-graduate-program')}  size="sm" className="ml-auto gap-1">
              <Plus className="h-4 w-4" />
                  Adicionar programa
                  
               
              </Button>

              <div className="relative w-full bg-white h-10 flex gap-2 items-center border pl-4 border-neutral-200 dark:border-neutral-800 rounded-md dark:bg-neutral-950">
                <Search size={16} />
                <Input placeholder="Filtrar pelo nome do programa..." className="border-none h-8" value={search}  onChange={(e) => setSearch(e.target.value)}/>
              </div>
            </div>
          </div>
          <TabsContent value="all" className="m-0">
           <ItensList
           onResearcherUpdate={handleResearcherUpdate}
           url={`${urlGeralAdm}GraduateProgramRest/Query?institution_id=${user?.institution_id}`}
           search={search}
           />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
         
          </TabsContent>
        </Tabs>
          </div>

          <div className={`p-8  ${menu ? ('col-span-3 pl-0'):('col-span-5')}`}>
          {total ? (
      <div className="h-full  ">
        <DisplayItem
      graduate_program_id={total.graduate_program_id}
      code={total.code}
      name={total.name}
      area={total.area}
      modality={total.modality}
      type={total.type}
      rating={total.rating}
      institution_id={total.institution_id}
      description={total.description}
      url_image={total.url_image}
      city={total.city}
      created_at={total.created_at}
      visible={total.visible}
      updated_at={total.updated_at}
      qtd_discente={total.qtd_discente}
      qtd_colaborador={total.qtd_colaborador}
      qtd_permanente={total.qtd_permanente}
      site={total.site}
      acronym={total.acronym}
      menu_state={menu}
      />
      </div>
    ):(
      <div className="h-full  ">
        <div className="w-full dark:border-neutral-800 rounded-lg border h-full flex flex-col items-center justify-center">
       <p className="text-9xl  text-[#719CB8]  font-bold mb-16 animate-pulse">=]</p>
        <p className="font-medium text-lg">Nenhum programa selecionado</p>
      </div>
      </div>
    )}
          </div>

        </div>
       
       </>
   
        
    )
}
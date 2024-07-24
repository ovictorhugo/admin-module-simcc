import { useContext, useEffect, useState } from "react";
import { useModal } from "../hooks/use-modal-store"
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";
import { ArrowSquareOut, DotsThree, Eye, EyeSlash, GraduationCap, Hash, MapPin, PencilSimple, Rows, SquaresFour, Star, Student, Trash } from "phosphor-react"; 
import {ChevronLeft, Divide, GraduationCapIcon, Plus, Search, UserCheck } from "lucide-react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { toast } from "sonner"


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
  }


import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { TooltipProvider } from "../ui/tooltip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { DisplayItem } from "./components/display-item";
import { ItensList } from "./components/itens-list-vitrine";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
  


export function PosGraducaoView() {
  let qualisColor = {
    'MESTRADO': 'bg-[#006837]',
    'DOUTORADO': 'bg-[#8FC53E]',

}

const { isOpen, type} = useModalDashboard();
  
const isModalOpen = isOpen && type === "graduate-program";

    const { urlGeralAdm, user, defaultLayout } = useContext(UserContext);

    const [visibleProgram, setVisibleProgram] = useState(false);
    const { onOpen } = useModal();



     const handleVisibleProgram = (id: string) => {

        const urlVisibleProgram = urlGeralAdm  + `GraduateProgramRest/Update?graduate_program_id=${id}`
        const fetchData = async () => {
         
          try {
            const response = await fetch(urlVisibleProgram, {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
                'Content-Type': 'text/plain'
              }
            });
            if (response.ok) {

              setVisibleProgram(!visibleProgram)
              toast("Visibilidade alterada", {
                description: "Operação realizada com sucesso!",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
            } 
      
          
          } catch (err) {
            toast("Erro ao mudar visibilidade", {
              description: "Tente novamente",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
          } 
        };
        fetchData()
      };

      const [tab, setTab] = useState('all')
      const [search, setSearch] = useState('')
    
      const [total, setTotal] = useState<PosGraduationsProps | null>(null);

      // Função para lidar com a atualização de researcherData
      const handleResearcherUpdate = (newResearcherData: PosGraduationsProps) => {
          setTotal(newResearcherData);
        };

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
          <div className="flex items-center px-4 py-2">
          <div className="flex items-center gap-4">
          
          <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
            <h1 className="text-lg font-bold">Pós-graduação</h1>
          </div>
           

            <TabsList className="ml-auto">
              <TabsTrigger onClick={() => setTab('all')} value="all" className="text-zinc-600 dark:text-zinc-200">Pós-graduação</TabsTrigger>
              <TabsTrigger  onClick={() => setTab('unread')} value="unread" className="text-zinc-600 dark:text-zinc-200">Graduação</TabsTrigger>
            </TabsList>
           
          </div>
         <div className="w-full border-b border-neutral-200 dark:border-neutral-800 "></div>

          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
           url={`${urlGeralAdm}GraduateProgramRest/Query?institution_id=${user.institution_id}`}
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
      />
    ):(
      <div className="w-full h-full flex flex-col items-center justify-center">
       <p className="text-9xl  text-[#719CB8]  font-bold mb-16 animate-pulse">=]</p>
        <p className="font-medium text-lg">Nenhum programa selecionado</p>
      </div>
    )}
      
      </ResizablePanel>

</ResizablePanelGroup>
          </TooltipProvider>
      )}
       </>
   
        
    )
}
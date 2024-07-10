import { useContext, useEffect, useState } from "react";
import { useModal } from "../hooks/use-modal-store"
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";
import { ArrowSquareOut, ClockClockwise, DotsThree, Eye, EyeSlash, FileXls, GraduationCap, Hash, MapPin, PencilSimple, Plus, Rows, SquaresFour, Star, Student, Trash } from "phosphor-react"; 
import {Divide, GraduationCapIcon, Search, UserCheck } from "lucide-react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { toast } from "sonner"



import { DataTable } from "./data-table-grupo-pesquisa";

  interface PosGraduationsProps {
    acronym: null,
    area: string
    institution_id: string
    institution_name: string
    last_date_sent: string
    lattes_id: string
    leader_name: string
    research_group_id: string
    research_group_name: string
    researcher_id: string
    situation: string
  }

  import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { TablePosGraduateViewDashboard } from "./table-pos-graduate-dashboard";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { Skeleton } from "../ui/skeleton";
import { columns } from "./columns-grupos-pesquisa";
import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { Tabs, TabsContent } from "../ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { TooltipProvider } from "../ui/tooltip";
import { Input } from "../ui/input";
import { ItensList } from "./components/itens-list-vitrine";
import { ItensListGrupoPesquisa } from "./components/itens-list-grupo-pesquisa";
import { DisplayItemGrupoPesquisa } from "./components/display-item-grupo-pesquisa";
  


export function GrupoPesquisaView() {


    const { urlGeralAdm, user,defaultLayout } = useContext(UserContext);

    const { onOpen } = useModal();

 
      const { isOpen, type} = useModalDashboard();
  
      const isModalOpen = isOpen && type === "grupo-pesquisa";

      const [tab, setTab] = useState('all')
      const [search, setSearch] = useState('')
    
      const [total, setTotal] = useState<PosGraduationsProps | null>(null);

      // Função para lidar com a atualização de researcherData
      const handleResearcherUpdate = (newResearcherData: PosGraduationsProps) => {
          setTotal(newResearcherData);
        };

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
      <h1 className="text-lg font-bold">Grupos de pesquisa</h1>

     
    </div>
   <div className="w-full border-b border-neutral-200 dark:border-neutral-800 "></div>

    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
      <Button onClick={() => onOpen('add-graduate-program')}  size="sm" className="ml-auto gap-1">
        <FileXls className="h-4 w-4" />
            Atualizar dados
            
         
        </Button>

        <div className="relative w-full bg-white h-10 flex gap-2 items-center border pl-4 border-neutral-200 dark:border-neutral-800 rounded-md dark:bg-neutral-950">
          <Search size={16} />
          <Input placeholder="Filtrar pelo nome do grupo..." className="border-none h-8" value={search}  onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>
    </div>
    <TabsContent value="all" className="m-0">
     <ItensListGrupoPesquisa
     onResearcherUpdate={handleResearcherUpdate}
     url={`${urlGeralAdm}researchGroupRest/Query?institution_id=${user.institution_id}`}
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
      acronym={total.acronym}
    area={total.area}
    institution_id={total.institution_id}
    institution_name={total.institution_name}
    last_date_sent={total.last_date_sent}
    lattes_id={total.lattes_id}
    leader_name={total.leader_name}
    research_group_id={total.research_group_id}
    research_group_name={total.research_group_name}
    researcher_id={total.researcher_id}
    situation={total.situation}
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
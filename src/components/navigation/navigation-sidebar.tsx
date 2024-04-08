import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import { ModeToggle } from "../../components/mode-toggle";
import { Button } from "../ui/button";
import { Info, List, Users } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { UserContext } from "../../context/context";

export function NavigationSidebar() {
    const { onOpen, onClose } = useModalSidebar();

    const {navbar, setNavbar} = useContext(UserContext)

    const [filterState, setFilterState] = useState(""); // Inicialmente, sem filtro

    const handleButtonClickInfo = () => {
        if (filterState === "filter") {
          onClose();
          setFilterState("");
        } else {
          onOpen("filter");
          setFilterState("filter");
        }
      };

     
  
    return (
     <div className={`whitespace-nowrap  hidden md:flex h-screen  z-30 flex-col transition-all inset-y-0  ${navbar ? ('w-[278px]'):('w-[72px]')}`}> 
         <div
        className={`space-y-4 flex flex-col  h-full text-primary w-full py-3 ${navbar ? ('px-4'):('items-center')}`}
      >
       <div className={`flex items-center  h-16 `}>
       <Button onClick={() => setNavbar(!navbar)} variant="outline" className="bg-transparent border-0" size="icon">
       <List size={16} className="" /> 
        </Button>
       </div>
        <Separator
          className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
        />
        <ScrollArea className="flex-1 w-full">
        
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <Button onClick={() => handleButtonClickInfo()} variant="outline" className="bg-transparent border-0" size="icon">
       <Info size={16} className="" /> 
       <span className="sr-only">Informações</span>
        </Button>

          <ModeToggle />

          <Button variant="outline" className={`bg-blue-800 dark:bg-blue-800 text-white border-0 ${navbar ? ('w-full justify-start'):('')}`} size={navbar ? ('default'):('icon')}>
       <Users size={16} className="" /> 
       <span className="sr-only">Pesquisadores selecionados</span>
        </Button>

        {navbar && (
          <p>u</p>
        )
          
        }
          
        </div>
      </div>
     </div>
    )
  }
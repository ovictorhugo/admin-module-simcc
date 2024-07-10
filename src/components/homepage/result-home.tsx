import { useContext, useEffect, useState } from "react";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { useModalResult } from "../hooks/use-modal-result";
import { ResultProvider } from "../provider/result-provider";
import { CategoriasPesquisaHome } from "./categorias-pesquisa-home";
import { UserContext } from "../../context/context";
import { ChatItem } from "../chat/chat-item";
import { HeaderResult } from "./header-results";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, SlidersHorizontal, Ticket, Users } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "../hooks/use-modal-store";
import { File, Quotes, Stamp } from "phosphor-react";
import { Search } from "../search/search";

export function ResultHome() {
    const { isOpen, type} = useModalHomepage();
    const { onOpen, type: typeResult } = useModalResult();
    const { mapModal, maria, messagesMaria, itemsSelecionados} = useContext(UserContext)
    const { onOpen:onOpenModal } = useModal();

    const {searchType} = useContext(UserContext)

    const [isOn, setIsOn] = useState(true)
    

    useEffect(() => {
        if (typeResult === null) {
          onOpen('researchers-home');
        }
      }, []);
  
    const isModalOpen = isOpen && type === "result-home";

    return(
        <>
        {isModalOpen && (
            <div className="h-full w-full flex flex-col   ">
             {itemsSelecionados.length > 0 && (
                <div>
                <div className={`w-full ${isOn ? ('px-8'):('px-4')} border-b  border-b-neutral-200 dark:border-b-neutral-800`}>
                  {isOn && (
                    <div className="w-full pt-4 pb-2 flex justify-between items-center">
                    <p className="font-medium text-2xl">Resultados</p>
                    
                  </div>
 
                  )}
                   <div className="flex py-2 justify-between items-center">
                   <div className="flex items-center gap-2 ">
            
 
             <Button variant="ghost" size="sm" className="m-0" onClick={() => onOpen('researchers-home')}>
                 <Users className="h-4 w-4" />
                 Pesquisadores
               </Button>
 
               {searchType == 'article' && (
                 <Button variant="ghost" size="sm" className="m-0" onClick={() => onOpen('researchers-home')}>
                 <Quotes className="h-4 w-4" />
                 Artigos
               </Button>
               )}
 
 {searchType == 'book' && (
                 <Button variant="ghost" size="sm" className="m-0" onClick={() => onOpen('researchers-home')}>
                 <File className="h-4 w-4" />
                 Livros e capítulos
               </Button>
               )}
 
 {searchType == 'patent' && (
                 <Button variant="ghost" size="sm" className="m-0" onClick={() => onOpen('researchers-home')}>
                 <Stamp className="h-4 w-4" />
                 Patentes
               </Button>
               )}
 
 {searchType == 'speaker' && (
                 <Button variant="ghost" size="sm" className="m-0" onClick={() => onOpen('researchers-home')}>
                 <Ticket className="h-4 w-4" />
                 Participação em eventos
               </Button>
               )}
             <div onClick={() => onOpen('articles-home')}></div>
             <div onClick={() => onOpen('institutions-home')}></div>
         </div>
 
         <div>
         <Button onClick={() => onOpenModal('filters')} variant={'ghost'} size={'sm'} className=""><SlidersHorizontal size={16} className="" />Filtros</Button>
 
         <Button variant="ghost" className=" h-9 w-9" size="icon" onClick={() => setIsOn(!isOn)} >
                 {isOn ? (
                   <ChevronUp className="h-4 w-4" />
                 ):(
                   <ChevronDown className="h-4 w-4" />
                 )}
              
               </Button>
         </div>
                   </div>
                </div>
          
                   
             
 
                <div className={`${isOn ? ('px-8'):('px-4')} `}>
                <HeaderResult/>
                </div>
                </div>
             )}

                <ScrollArea className="h-full">
               {itemsSelecionados.length > 0 ? (
                 <div className="px-8">
                 <ResultProvider/>
 
                 </div>
               ):(
                <div className="w-full flex flex-col items-center justify-center">
                <p className="text-9xl  text-[#719CB8]  font-bold mb-16 animate-pulse">=]</p>
                 <p className="font-medium text-lg">Experimente pesquisar um tema e veja o que a plataforma pode filtrar para você. </p>
               </div>
               )}
                <Search/>
                </ScrollArea>
               
            </div>
        )}
        </>
    )
}
import { useContext, useEffect, useState } from "react";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { useModalResult } from "../hooks/use-modal-result";
import { ResultProvider } from "../provider/result-provider";
import { CategoriasPesquisaHome } from "./categorias-pesquisa-home";
import { UserContext } from "../../context/context";
import { ChatItem } from "../chat/chat-item";
import { HeaderResult } from "./header-results";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Copyright, SlidersHorizontal, Ticket, Users } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "../hooks/use-modal-store";
import { File, Quotes, Stamp } from "phosphor-react";
import { Search } from "../search/search";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export function ResultHome() {
  const { isOpen, type } = useModalHomepage();
  const { onOpen, type: typeResult } = useModalResult();
  const { mapModal, maria, messagesMaria, itemsSelecionados, searchType, setItensSelecionados, setSearchType, setValoresSelecionadosExport } = useContext(UserContext);
  const { onOpen: onOpenModal } = useModal();
  
  const [isOn, setIsOn] = useState(true);
  
  const queryUrl = useQuery();

  const terms = queryUrl.get('terms');
  
  const researcher = queryUrl.get('researcher');

  useEffect(() => { 
    if (researcher == 'false' && itemsSelecionados.length == 0) {
          if(searchType == 'article') {
            return onOpen('articles-home')
          } else if(searchType == 'book') {
            return onOpen('book-home')
          } else if(searchType == 'patent') {
            return onOpen('patent-home')
          }
    }
    else if (!typeResult) {
      onOpen('researchers-home');
    }
  }, [typeResult, onOpen, searchType]);
  



  const isModalOpen = isOpen && type === "result-home";

  


  return (
    <>
      {isModalOpen && (
        <div className="h-full w-full flex flex-col">
          {(itemsSelecionados.length > 0 || (researcher == 'false'))  && (
            <div>
              <div className={`w-full ${isOn ? 'px-8' : 'px-4'} border-b border-b-neutral-200 dark:border-b-neutral-800`}>
                {isOn && (
                  <div className="w-full pt-4  flex justify-between items-center">
                    <Search />
                  </div>
                )}
                <div className={`flex pt-2 justify-between  ${isOn ? '' : ''} `}>
                  <div className="flex items-center gap-2">
                   {!((researcher == 'false' && itemsSelecionados.length == 0) && itemsSelecionados.length == 0) && (
                    <div className={`pb-2 border-b-2 transition-all ${typeResult == 'researchers-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                    <Button variant={typeResult == 'researchers-home' ? ('ghost'):('ghost')}  className={`${typeResult}`} onClick={() => onOpen('researchers-home')}>
                       <Users className="h-4 w-4" />
                       Pesquisadores
                     </Button>
                    </div>
                   )}
                    {searchType === 'article' && (
                       <div className={`pb-2 border-b-2  transition-all ${typeResult == 'articles-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'articles-home' ? ('ghost'):('ghost')}  className="m-0" onClick={() => onOpen('articles-home')}>
                        <Quotes className="h-4 w-4" />
                        Artigos
                      </Button>
                      </div>
                    )}
                    {searchType === 'book' && (
                    <div className={`pb-2 border-b-2  transition-all ${typeResult == 'book-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                    <Button variant={typeResult == 'book-home' ? ('ghost'):('ghost')}  className="m-0" onClick={() => onOpen('book-home')}>
                    <File className="h-4 w-4" />
                    Livros e capítulos
                    </Button>
                    </div>
                    )}
                    {searchType === 'patent' && (
                        <div className={`pb-2 border-b-2  transition-all ${typeResult == 'patent-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                        <Button variant={typeResult == 'patent-home' ? ('ghost'):('ghost')}  className="m-0" onClick={() => onOpen('patent-home')}>
                        <Copyright className="h-4 w-4" />
                        Patentes
                        </Button>
                        </div>
                    )}
                    {searchType === 'speaker' && (
                    <div className={`pb-2 border-b-2  transition-all ${typeResult == 'speaker-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                    <Button variant={typeResult == 'speaker-home' ? ('ghost'):('ghost')}  className="m-0" onClick={() => onOpen('speaker-home')}>
                    <Ticket className="h-4 w-4" />
                    Participação em eventos
                    </Button>
                    </div>
                    )}

                   
                  </div>
                  <div>
                   {typeResult == 'researchers-home' && (
                     <Button onClick={() => onOpenModal('filters')} variant="ghost"  className="">
                     <SlidersHorizontal size={16} className="" />
                     Filtros
                   </Button>
                   )}
                    <Button variant="ghost"  size="icon" onClick={() => setIsOn(!isOn)}>
                      {isOn ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            
            </div>
          )}
           

          <ScrollArea className="h-full">
            {(itemsSelecionados.length > 0 || (researcher == 'false')) ? (
              <div className="px-8">
                <ResultProvider />
              </div>
            ) : (
              <div className="h-[calc(100vh-90px)] flex flex-col md:p-8 p-4 md:pt-4">
              <Search/>

              <div className="w-full flex flex-col items-center justify-center h-full">
                <p className="text-9xl text-[#719CB8] font-bold mb-16 animate-pulse">^_^</p>
                <p className="font-medium text-lg">
                  Experimente pesquisar um tema e veja o que a plataforma pode filtrar para você.
                </p>
              </div>
             </div>
            )}
           
          </ScrollArea>
        </div>
      )}
    </>
  );
}

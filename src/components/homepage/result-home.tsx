import { useContext, useEffect, useState } from "react";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { useModalResult } from "../hooks/use-modal-result";
import { ResultProvider } from "../provider/result-provider";

import { UserContext } from "../../context/context";

import { Button } from "../ui/button";
import { Building, Building2, ChevronDown, ChevronUp, Copyright, SlidersHorizontal, Ticket, Users } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "../hooks/use-modal-store";
import { File, Quotes } from "phosphor-react";
import { Search } from "../search/search";
import { useLocation} from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export function ResultHome() {
  const { isOpen, type } = useModalHomepage();
  const { onOpen, type: typeResult } = useModalResult();
  const { itemsSelecionados, searchType, simcc} = useContext(UserContext);
  const { onOpen: onOpenModal } = useModal();
  
  const [isOn, setIsOn] = useState(true);
  
  const queryUrl = useQuery();

 
  
  const researcher = queryUrl.get('researcher');

  const type_search = queryUrl.get('type_search');
  const terms = queryUrl.get('terms');

  const isModalOpen = isOpen && type === "result-home";

  useEffect(() => {
    if (type_search == 'patent' && terms == '') {
      onOpen('patent-home')
    } else if (type_search == 'area' && terms == '') {
      onOpen('researchers-home')
    } else if (type_search == 'abstract' && terms == '') {
      onOpen('researchers-home')
    } else if (type_search == 'speaker' && terms == '') {
      onOpen('speaker-home')
    } else if (type_search == 'book' && terms == '') {
      onOpen('book-home')
    } else if (type_search == 'article' && terms == '') {
      onOpen('articles-home')
    } else if (type_search == 'name' && terms == '') {
      onOpen('researchers-home')
    } else if(typeResult == null || typeResult == undefined) {
      onOpen('researchers-home')
    }
    }, [ typeResult]);

  return (
  
        <div className="h-full w-full grid grid-cols-1">
          {(itemsSelecionados.length > 0 || (researcher == 'false'))  && (
            <div className="top-0 sticky z-[3] bg-neutral-50 dark:bg-neutral-900">
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


{!((simcc && researcher == 'false' && itemsSelecionados.length == 0) && itemsSelecionados.length == 0) && (
                    <div className={`pb-2 border-b-2 transition-all ${typeResult == 'institutions-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                    <Button variant={typeResult == 'institutions-home' ? ('ghost'):('ghost')}  className={`${typeResult}`} onClick={() => onOpen('institutions-home')}>
                       <Building2 className="h-4 w-4" />
                       Instituições
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
           

          <div className="relative">
            {(itemsSelecionados.length > 0 || (researcher == 'false')) ? (
              <div className="px-8">
                <ResultProvider />
              </div>
            ) : (
              <div className="h-[calc(100vh-130px)] flex flex-col md:p-8 p-4 md:pt-4">
              <Search/>

              <div className="w-full flex flex-col items-center justify-center h-full">
                <p className="text-9xl text-[#719CB8] font-bold mb-16 animate-pulse">^_^</p>
                <p className="font-medium text-lg">
                  Experimente pesquisar um tema e veja o que a plataforma pode filtrar para você.
                </p>
              </div>
             </div>
            )}
           
          </div>
        </div>
     
  );
}

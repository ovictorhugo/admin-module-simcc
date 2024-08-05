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
  const { mapModal, maria, messagesMaria, itemsSelecionados, searchType, setItensSelecionados } = useContext(UserContext);
  const { onOpen: onOpenModal } = useModal();
  
  const [isOn, setIsOn] = useState(true);
  
  const queryUrl = useQuery();
  const navigate = useNavigate();
  const type_search = queryUrl.get('type_search');
  const terms = queryUrl.get('terms');

  useEffect(() => {
    if (!typeResult) {
      onOpen('researchers-home');
    }
  }, [typeResult, onOpen]);

  useEffect(() => {
    if (terms) {
      const parsedTerms = parseTerms(String(terms));
      setItensSelecionados(parsedTerms);
    }
  }, [terms, setItensSelecionados]);

  const isModalOpen = isOpen && type === "result-home";

  function parseTerms(encoded: string): { term: string }[] {
    // Decode the URL-encoded string first
    const formatted = decodeURIComponent(encoded);
  
    let result: { term: string }[] = [];
    let temp = '';
    let inGroup = false;
  
    for (let i = 0; i < formatted.length; i++) {
      const char = formatted[i];
  
      if (char === '(') {
        inGroup = true;
        // Add any preceding term as an individual term
        if (temp.trim()) {
          result.push({ term: temp.trim() + '|' });
          temp = '';
        }
      } else if (char === ')') {
        inGroup = false;
        // Process the grouped terms
        if (temp.trim()) {
          const terms = temp.split(';').map(t => t.trim());
          terms.forEach(term => {
            if (term) {
              result.push({ term: term + ';' });
            }
          });
          temp = '';
        }
      } else if (char === '|') {
        if (!inGroup && temp.trim()) {
          result.push({ term: temp.trim() + '|' });
          temp = '';
        }
      } else {
        temp += char;
      }
    }
  
    // Add any remaining term
    if (temp.trim()) {
      result.push({ term: temp.trim() + (inGroup ? ';' : '|') });
    }
  
    // Handle final cleanup for separators
    return result.map(item => {
      if (item.term.endsWith('|') || item.term.endsWith(';')) {
        item.term = item.term.slice(0, -1);
      }
      return item;
    });
  }
  


  return (
    <>
      {isModalOpen && (
        <div className="h-full w-full flex flex-col">
          {itemsSelecionados.length > 0 && (
            <div>
              <div className={`w-full ${isOn ? 'px-8' : 'px-4'} border-b border-b-neutral-200 dark:border-b-neutral-800`}>
                {isOn && (
                  <div className="w-full pt-4  flex justify-between items-center">
                    <Search />
                  </div>
                )}
                <div className={`flex pt-2 justify-between  ${isOn ? '' : ''} `}>
                  <div className="flex items-center gap-2">
                   <div className={`pb-2 border-b-2 transition-all ${typeResult == 'researchers-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                   <Button variant={typeResult == 'researchers-home' ? ('ghost'):('ghost')}  className={`${typeResult}`} onClick={() => onOpen('researchers-home')}>
                      <Users className="h-4 w-4" />
                      Pesquisadores
                    </Button>
                   </div>
                    {searchType === 'article' && (
                       <div className={`pb-2 border-b-2  transition-all ${typeResult == 'articles-home' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'articles-home' ? ('ghost'):('ghost')}  className="m-0" onClick={() => onOpen('articles-home')}>
                        <Quotes className="h-4 w-4" />
                        Artigos
                      </Button>
                      </div>
                    )}
                    {searchType === 'book' && (
                      <Button variant="ghost"  className="m-0" onClick={() => onOpen('researchers-home')}>
                        <File className="h-4 w-4" />
                        Livros e capítulos
                      </Button>
                    )}
                    {searchType === 'patent' && (
                      <Button variant="ghost" className="m-0" onClick={() => onOpen('researchers-home')}>
                        <Copyright className="h-4 w-4" />
                        Patentes
                      </Button>
                    )}
                    {searchType === 'speaker' && (
                      <Button variant="ghost" className="m-0" onClick={() => onOpen('researchers-home')}>
                        <Ticket className="h-4 w-4" />
                        Participação em eventos
                      </Button>
                    )}
                    <div onClick={() => onOpen('articles-home')}></div>
                    <div onClick={() => onOpen('institutions-home')}></div>
                  </div>
                  <div>
                    <Button onClick={() => onOpenModal('filters')} variant="ghost"  className="">
                      <SlidersHorizontal size={16} className="" />
                      Filtros
                    </Button>
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
            {itemsSelecionados.length > 0 ? (
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

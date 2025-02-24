import {
  Dialog,
  DialogClose,
  DialogContent,
} from "../ui/dialog";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { toast } from "sonner";
import { useModal } from "../hooks/use-modal-store";
import { SelectTypeSearch } from "../search/select-type-search";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { CloudArrowDown, Funnel, MagnifyingGlass, Plus, X } from "phosphor-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Csv {
  great_area: string
  term: string
  frequency: string
  type_: string
  term_normalize: string
}

interface ItemsSelecionados {
  term: string
}

interface Bigrama {
  word: string
}


interface ResearchOpenAlex {
  term: string
  type: string
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}



import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';

import { useLocation, useNavigate } from "react-router-dom";
import { useModalResult } from "../hooks/use-modal-result";
import { Trash } from "lucide-react";

export function SearchModal() {

  //retorna url
  const queryUrl = useQuery();
  const navigate = useNavigate();
  const type_search = queryUrl.get('type_search');
  const terms = queryUrl.get('terms');

  const { onClose, isOpen, type } = useModal();


  const [itemsBigrama, setBigrama] = useState<Bigrama[]>([])
  const [itemsSelecionadosPopUp, setItensSelecionadosPopUp] = useState<ItemsSelecionados[]>([])
  const [researcherOpenAlex, setResearcherOpenAlex] = useState<ResearchOpenAlex[]>([])
  const [showInput, setShowInput] = useState(true);
  const isModalOpen = isOpen && type === "search";
  const { setValoresSelecionadosExport, setMode, searchType, setSearchType, urlGeral, itemsSelecionados, setItensSelecionados, setValorDigitadoPesquisaDireta, version } = useContext(UserContext)
  const db = getFirestore();
  const [input, setInput] = useState('')

  const handleClickTermos = (type: string, value: string) => {
    setValoresSelecionadosExport(value)
    setSearchType(type)
  }

  useEffect(() => {

    setItensSelecionadosPopUp(itemsSelecionados)

  }, [itemsSelecionados]);


  const [filteredItems, setFilteredItems] = useState<Csv[]>([]);
  /////////////////

  const searchFilesByTermPrefix = async (prefix: string) => {
    if (prefix.length >= 3) {
      try {
        // Consulta os documentos cujo term começa com o prefixo fornecido
        const filesRef = collection(db, `${version ? ('termos_busca') : ('termos_busca_cimatec')}`);
        const q = query(filesRef,
          where('term_normalize', '>=', prefix),
          where('term_normalize', '<=', prefix + '\uf8ff')
        );

        const querySnapshot = await getDocs(q);
        // Extrai os dados dos documentos encontrados
        const files = querySnapshot.docs.map(doc => doc.data());

        console.log('files', files)
        const mappedFiles = files.map(file => ({
          great_area: file.great_area,
          term: file.term,
          frequency: file.frequency,
          type_: file.type_,
          term_normalize: file.term_normalize
        }));

        // Define os dados encontrados em filteredItems
        setFilteredItems(mappedFiles);
      } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
        return [];
      }
    }
  };

  console.log('filter', filteredItems)

  const normalizeInput = (value: string): string => {
    // Remove acentos e diacríticos
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Converte para minúsculas
    value = value.toLowerCase();
    // Remove caracteres especiais, mantendo letras, números e espaços
    value = value.replace(/[^a-z0-9\s]/g, "");
    return value;
  };

  const handleChangeInput = (value: string) => {
    const normalizedValue = normalizeInput(value);
    console.log(normalizedValue)
    searchFilesByTermPrefix(normalizedValue)
    setInput(value)
  }

  const handlePesquisa = (value: string, type: string) => {
    setInput('');
    setShowInput(false)
    setBigrama([])

    // Determine the searchType based on the provided type
    let newSearchType = '';
    if (type === 'ARTICLE') {
      newSearchType = 'article';
    } else if (type === 'SPEAKER') {
      newSearchType = 'speaker';
    } else if (type === 'BOOK_CHAPTER' || type === 'BOOK') {
      newSearchType = 'book';
    } else if (type === 'NAME') {
      newSearchType = 'name';
    } else if (type === 'PATENT') {
      newSearchType = 'patent';
    } else if (type === 'ABSTRACT') {
      newSearchType = 'abstract';
    } else if (type === 'AREA') {
      newSearchType = 'area';
    }
    const hasSameType = newSearchType === searchType;

    setItensSelecionadosPopUp(prevItems => {
      if (hasSameType) {
        setSearchType(newSearchType)
        return [...prevItems, { term: value + ';' }];
      } else {
        setSearchType(newSearchType)
      }

      return [{ term: value + ';' }];
    });

    setSearchType(newSearchType);
  };

  const [isOpenAlex, setIsOpenAlex] = useState(false)

  const handlePesquisaOpenAlex = (value: string) => {
    setInput('');
    setShowInput(false)
    setBigrama([])
    setIsOpenAlex(true)

    setItensSelecionadosPopUp([{ term: value }]);

    setSearchType('name');
  };

  const { onOpen: onOpenResult } = useModalResult();

  function formatTerms(valores: { term: string }[]): string {
    let result = '';
    let tempTerms: string[] = [];
    let lastConnector = '';

    valores.forEach(item => {
      let term = item.term.trim();
      let connector = term.slice(-1);

      if (connector === ';' || connector === '|') {
        term = term.slice(0, -1);
      }

      if (connector === ';') {
        tempTerms.push(term);
        lastConnector = ';';
      } else if (connector === '|') {
        tempTerms.push(term);
        result += '(' + tempTerms.join(';') + ')|';
        tempTerms = [];
        lastConnector = '|';
      } else {
        if (tempTerms.length > 0) {
          result += '(' + tempTerms.join(';') + ')|';
          tempTerms = [];
        }
        result += term + '|';
        lastConnector = '|';
      }
    });

    if (tempTerms.length > 0) {
      result += '(' + tempTerms.join(';') + ')';
    } else if (result.endsWith('|')) {
      result = result.slice(0, -1);
    }

    return result;
  }



  const [termosformatados, setTermosformatados] = useState(formatTerms(itemsSelecionadosPopUp))

  useEffect(() => {
    setTermosformatados(formatTerms(itemsSelecionadosPopUp))
  }, [itemsSelecionadosPopUp, itemsSelecionados]);

  console.log(termosformatados)
  let TypeSearch = type_search ?? ''
  let Terms = terms ?? ''

  const location = useLocation();

  const posGrad = location.pathname == '/pos-graduacao'




  const handlePesquisaFinal = () => {


    if (itemsSelecionadosPopUp.length == 0 && input.length == 0) {
      toast("Tente novamente", {
        description: "Selecione ou digite um termo para pesquisa",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
      return
    }

    if (itemsSelecionadosPopUp.length > 0 && posGrad) {

      TypeSearch = searchType
      Terms = termosformatados
      setInput('')

      queryUrl.set('type_search', searchType);
      if (searchType == 'name') {
        queryUrl.set('terms', Terms.replace(/[()]/g, ''));
        setItensSelecionados(itemsSelecionadosPopUp)
      } else {
        queryUrl.set('terms', Terms);
        setItensSelecionados(itemsSelecionadosPopUp)
      }
      navigate({
        pathname: '/pos-graduacao',
        search: queryUrl.toString(),
      });

      onOpenResult('researchers-home')

      onClose()

    } else if (itemsSelecionadosPopUp.length > 0) {

      TypeSearch = searchType
      Terms = termosformatados
      setInput('')

      queryUrl.set('type_search', searchType);
      if (searchType == 'name') {
        queryUrl.set('terms', Terms.replace(/[()]/g, ''));
        setItensSelecionados(itemsSelecionadosPopUp)
      } else {
        queryUrl.set('terms', Terms);
        setItensSelecionados(itemsSelecionadosPopUp)
      }
      navigate({
        pathname: '/resultados',
        search: queryUrl.toString(),
      });

      onOpenResult('researchers-home')
      onClose()

    } else if (itemsSelecionadosPopUp.length == 0 && input.length > 0) {
      const newItems = [{ term: input }];
      setItensSelecionadosPopUp(newItems);
      setItensSelecionados(newItems);
      TypeSearch = searchType;
      Terms = formatTerms(newItems);

      if (posGrad) {
        queryUrl.set('type_search', searchType);
        if (searchType == 'name') {
          queryUrl.set('terms', formatTerms(newItems));
        } else {
          queryUrl.set('terms', `(${input.split(' ').join(';')})`);
        }

        navigate({
          pathname: '/pos-graduacao',
          search: queryUrl.toString(),
        });
      } else {
        queryUrl.set('type_search', searchType);

        if (searchType == 'name') {
          queryUrl.set('terms', formatTerms(newItems));
        } else {
          queryUrl.set('terms', `(${input.split(' ').join(';')})`);
        }

        navigate({
          pathname: '/resultados',
          search: queryUrl.toString(),
        });
      }

      onOpenResult('researchers-home');
      setMode('');
      setInput('');
      onClose();
    }

  }

  ///open alex
  const urlOpenAlex = `https://api.openalex.org/authors?filter=display_name.search:${input}`;




  useMemo(() => {
    const fetchData = async () => {
      if (filteredItems.filter(item => item.type_ === 'NAME').length == 0) {
        try {
          const response = await fetch(urlOpenAlex, {
            mode: "cors",
            headers: {
              // Adicione quaisquer headers necessários aqui
            },
          });
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const firstFiveResults = data.results.slice(0, 5);
            const extractedData = firstFiveResults.map(result => ({
              term: result.display_name,
              type: 'name-openalex'
            }));
            setResearcherOpenAlex(extractedData);
          }

        } catch (err) {
          console.log(err);
        }
      } else {
        // Faça outra coisa, já que não há mais de um item com tipo 'NAME'
      }
    };

    if (input) {
      fetchData();
    }
  }, [input, urlOpenAlex]);


  console.log('fawefwef', researcherOpenAlex)
  console.log('fawefwef', urlOpenAlex)
  //auto complete

  let urlBigrama = `${urlGeral}secondWord?term=${input}`;
  console.log('bigrama', urlBigrama)
  useMemo(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(urlBigrama, {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
            "Content-Type": "text/plain",
          },
        });
        const data = await response.json();
        if (data) {
          setBigrama(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlBigrama]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(input + ' ' + suggestion);
  };

  // Função para lidar com a pressão da tecla Tab
  const handleTabPress = (event: any) => {
    if (event.key === "Tab" && itemsBigrama.length > 0) {
      event.preventDefault(); // Impedir que a tecla Tab mova o foco para o próximo elemento
      setInput(input + ' ' + itemsBigrama[0].word); // Selecionar a primeira sugestão
    }
  };

  const handleEnterPress = (event: any) => {
    if (event.key === "Enter") {
      handlePesquisaFinal()
    }
  };
  //////////q
  console.log(itemsSelecionadosPopUp)

  //itens selecionados 
  const handleRemoveItem = (index: number) => {
    const newItems = [...itemsSelecionadosPopUp];
    newItems.splice(index, 1);
    setItensSelecionadosPopUp(newItems);
  };




  //conectores 
  // Função para alterar o conector, considerando termos entre parênteses
  const handleConnectorChange = (index: number, connector: string) => {
    const newItems = [...itemsSelecionadosPopUp];
    let term = newItems[index].term.trim();

    // Remove qualquer conector existente no final, mas preserve os parênteses
    term = term.replace(/[|;]$/, '');

    // Se o termo estiver entre parênteses, adicione o conector fora dos parênteses
    if (term.startsWith('(') && term.endsWith(')')) {
      term = term.slice(0, -1) + connector + ')';
    } else {
      term += connector;
    }

    newItems[index].term = term;
    setItensSelecionadosPopUp(newItems);
  };


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-scroll p-0 border-none min-w-[63vw] px-4 mx-auto md:px-0 bg-transparent dark:bg-transparent">

        <Alert onKeyDown={handleEnterPress} className="h-14 bg-white p-2 min-w-[40%] flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2 w-full flex-1">
            <MagnifyingGlass size={16} className="hidden md:block whitespace-nowrap w-10" />

            <div className="flex gap-2 w-full items-center">
              <div className='flex gap-2 items-center'>
                <SelectTypeSearch />

                {itemsSelecionadosPopUp.map((valor, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className={`flex gap-2 items-center h-10 p-2 px-4 capitalize rounded-md text-xs ${searchType == 'article' ? 'bg-blue-500 dark:bg-blue-500' :
                      searchType == 'abstract' ? 'bg-yellow-500 dark:bg-yellow-500' :
                        searchType == 'speaker' ? 'bg-orange-500 dark:bg-orange-500' :
                          searchType == 'book' ? 'bg-pink-500 dark:bg-pink-500' :
                            searchType == 'patent' ? 'bg-cyan-500 dark:bg-cyan-500' :
                              searchType == 'name' ? 'bg-red-500 dark:bg-red-500' :
                                searchType == 'area' ? 'bg-green-500 dark:bg-green-500' :
                                  'bg-blue-700 dark:bg-blue-700'
                      } text-white border-0`}>
                      {valor.term.replace(/[|;]/g, '')}
                      <X size={12} onClick={() => handleRemoveItem(index)} className="cursor-pointer" />
                    </div>

                    {index < itemsSelecionadosPopUp.length - 1 && (
                      <button
                        className="rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap h-8 w-8 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 transition-all text-xs outline-none"
                        onClick={() => {
                          const connector = itemsSelecionadosPopUp[index].term.endsWith('|') ? ';' : '|';
                          handleConnectorChange(index, connector);
                        }}
                      >
                        {itemsSelecionadosPopUp[index].term.endsWith(';') ? "e" : "ou"}
                      </button>
                    )}
                  </div>
                ))}

                {(itemsSelecionadosPopUp.length >= 1 && !showInput) && (
                  <div
                    className="rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap h-8 w-8 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 transition-all"
                    onClick={() => setShowInput(true)}
                  >
                    <Plus size={16} className="" />
                  </div>
                )}

              </div>

              {(showInput || itemsSelecionadosPopUp.length == 0) && (
                <Input
                  onChange={(e) => handleChangeInput(e.target.value)}
                  type="text"
                  value={input}
                  className="border-0  flex-1 p-0 w-auto inline-block"
                  onKeyDown={handleTabPress}
                />
              )}

              <span className="hidden md:block">
                {(showInput || itemsSelecionadosPopUp.length == 0) && (
                  <p>
                    {itemsBigrama.slice(0, 1).map((item, index) => (
                      <div className="text-neutral-500 text-sm w-full" key={index} onClick={() => handleSuggestionClick(item.word)}>
                        {item.word}
                      </div>
                    ))}
                  </p>
                )}
              </span>

              <span className="hidden lg:block">
                {(showInput || itemsSelecionadosPopUp.length == 0) && itemsBigrama.length != 0 && (
                  <div className=" text-xs text-neutral-500 whitespace-nowrap px-2 ml-3  border border-neutral-500 p-1 rounded-md">Tab ↹</div>
                )}
              </span>
            </div>
          </div>

          <div className="w-fit flex gap-2">
            {itemsSelecionadosPopUp.length > 0 && (
              <Button size={'icon'} variant={'ghost'} onClick={() => {
                setItensSelecionadosPopUp([])
              }}><Trash size={16} /></Button>
            )}
            <Button onClick={() => handlePesquisaFinal()} variant="outline" className={`${searchType == 'article' && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract' && ('bg-yellow-500 dark:bg-yellow-500')} ${searchType == 'speaker' && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book' && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent' && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name' && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area' && ('bg-green-500 dark:bg-green-500')} ${searchType == '' && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 z-[9999] `} size={'icon'}>
              <Funnel size={16} className="" />

            </Button>
          </div>

        </Alert>

        {input.length >= 3 && (
          <Alert className="w-full">
            <ResponsiveMasonry
              columnsCountBreakPoints={{
                350: 1,
                750: 2,
                900: 3,
                1200: 2
              }}
            >
              <Masonry className="max-h-[80vh] overflow-y-scroll" gutter="20px">
                {filteredItems.filter(item => item.type_ === 'ARTICLE').length != 0 && (
                  <div>
                    <p className="uppercase font-medium text-xs mb-3">Artigos</p>
                    <div className="flex flex-wrap gap-3">
                      {filteredItems.filter(item => item.type_ === 'ARTICLE').slice(0, 5).map((props, index) => (
                        <div key={index} onClick={() => handlePesquisa(props.term_normalize, props.type_)} className={`flex gap-2 h-8 capitalize cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                          {props.term}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredItems.filter(item => item.type_ === 'ABSTRACT').length != 0 && (
                  <div>
                    <p className="uppercase font-medium text-xs mb-3">Resumo</p>
                    <div className="flex flex-wrap gap-3">
                      {filteredItems.filter(item => item.type_ === 'ABSTRACT').slice(0, 5).map((props, index) => (
                        <div key={index} onClick={() => handlePesquisa(props.term_normalize, props.type_)} className={`flex gap-2 h-8 capitalize cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                          {props.term}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredItems.filter(item => item.type_ === 'PATENT').length != 0 && (
                  <div>
                    <p className="uppercase font-medium text-xs mb-3">Patente</p>
                    <div className="flex flex-wrap gap-3">
                      {filteredItems.filter(item => item.type_ === 'PATENT').slice(0, 5).map((props, index) => (
                        <div key={index} onClick={() => handlePesquisa(props.term_normalize, props.type_)} className={`flex gap-2 h-8 capitalize cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                          {props.term}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredItems.filter(item => item.type_ === 'BOOK' || item.type_ == 'BOOK_CHAPTER').length != 0 && (
                  <div>
                    <p className="uppercase font-medium text-xs mb-3">Livros e capítulos</p>
                    <div className="flex flex-wrap gap-3">
                      {filteredItems.filter(item => item.type_ === 'BOOK' || item.type_ === 'BOOK_CHAPTER').slice(0, 5).map((props, index) => (
                        <div key={index} onClick={() => handlePesquisa(props.term_normalize, props.type_)} className={`flex gap-2 h-8 capitalize cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                          {props.term}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredItems.filter(item => item.type_ === 'SPEAKER').length != 0 && (
                  <div>
                    <p className="uppercase font-medium text-xs mb-3">Participação em eventos</p>
                    <div className="flex flex-wrap gap-3">
                      {filteredItems.filter(item => item.type_ === 'SPEAKER').slice(0, 5).map((props, index) => (
                        <div key={index} onClick={() => handlePesquisa(props.term_normalize, props.type_)} className={`flex gap-2 h-8 capitalize cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                          {props.term}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredItems.filter(item => item.type_ === 'AREA').length != 0 && (
                  <div>
                    <p className="uppercase font-medium text-xs mb-3">Área de especialidade</p>
                    <div className="flex flex-wrap gap-3">
                      {filteredItems.filter(item => item.type_ === 'AREA').slice(0, 5).map((props, index) => (
                        <div key={index} onClick={() => handlePesquisa(props.term, props.type_)} className={`flex gap-2 h-8 capitalize cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                          {props.term} | {props.great_area}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(filteredItems.filter(item => item.type_ === 'NAME').length != 0) && (
                  <div className="">
                    <p className="uppercase font-medium text-xs mb-3">Nome</p>
                    <div className="flex flex-wrap gap-3">
                      {filteredItems.filter(item => item.type_ === 'NAME').slice(0, 5).map((props, index) => (
                        <div key={index} onClick={() => handlePesquisa(props.term, props.type_)} className={`flex gap-2 capitalize h-8 cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                          {props.term}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!posGrad && (
                  <div>
                    <p className="uppercase font-medium text-xs mb-3">OpenAlex</p>
                    <div className="flex flex-wrap gap-3">
                      {researcherOpenAlex.slice(0, 5).map((props, index) => (
                        <div key={index} onClick={() => handlePesquisaOpenAlex(props.term)} className={`flex gap-2 capitalize h-8 cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                          <CloudArrowDown size={16} className="" />    {props.term}
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              </Masonry>
            </ResponsiveMasonry>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  )
}
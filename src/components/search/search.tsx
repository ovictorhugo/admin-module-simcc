import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { FadersHorizontal, Funnel, MagnifyingGlass } from "phosphor-react";


import { Button } from "../ui/button";
import { useModal} from "../hooks/use-modal-store";
import { UserContext } from "../../context/context";
import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { SelectTypeSearch } from "./select-type-search";
import { Input } from "../ui/input";

export function Search() {




    const { onOpen } = useModal();
    const {navbar, searchType} = useContext(UserContext)
    const { isOpen: isOpenSidebar, onOpen: onOpenSidebar, onClose } = useModalSidebar();
    
    const [dataModificacao, setDataModificacao] = useState('');

  useEffect(() => {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

    
    setDataModificacao(dataFormatada);
  }, []);

  const [filterState, setFilterState] = useState("");

  const handleButtonClickInfo = () => {
    if (filterState === "filter") {
      onClose();
      setFilterState("");
    } else {
      onOpenSidebar("filter");
      setFilterState("filter");
    }
  };

    return  (
        <div className="bottom-0 right-0 fixed w-full  bg-gradient-to-t from-white dark:from-neutral-900 to-transparent flex flex-col">
        <div className={`pb-3 px-[72px] ${navbar && !isOpenSidebar && 'pl-[278px]'} ${isOpenSidebar && !navbar && 'pl-[368px]'} ${isOpenSidebar && navbar && 'pl-[574px]'}`}>
        <div className="mb-4">
        <div className="flex gap-4">
        <Alert onClick={() => handleButtonClickInfo()} className="h-14 p-2 flex items-center w-fit whitespace-nowrap gap-3 px-6 text-sm font-medium"><div><FadersHorizontal size={16} className="" /></div> Filtros</Alert>
            <Alert onClick={() => onOpen('search')} className="h-14 p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />

                <div className="flex gap-2">
                <SelectTypeSearch/>
                <Input type="text" className="border-0 w-full "/>
                </div>

    
                
            </div>

            <div>
            <Button variant="outline" className={`${searchType == 'article'  && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract'  && ('bg-yellow-500 dark:bg-yellow-500')} ${searchType == 'speaker'  && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book'  && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent'  && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name'  && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area'  && ('bg-green-500 dark:bg-green-500')} ${searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} size={'icon'}>
       <Funnel size={16} className="" /> 
       <span className="sr-only">Pesquisadores selecionados</span>
        </Button>
            </div>
            </Alert>
        </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
        <p className="text-xs  md:flex hidden">Sistema de Mapeamento de Competências da Bahia | versão 2.0.5 (beta) </p>
        <p className="text-xs flex">Atualizado em {dataModificacao}</p>
        </div>
        </div>
        </div>
    )
}
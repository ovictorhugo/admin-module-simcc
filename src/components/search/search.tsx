import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { FadersHorizontal, Funnel, MagnifyingGlass } from "phosphor-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select"
import { Button } from "../ui/button";
import { useModal} from "../hooks/use-modal-store";
import { UserContext } from "../../context/context";

export function Search() {

    const { onOpen } = useModal();
    const {navbar, setNavbar} = useContext(UserContext)
    
    const [dataModificacao, setDataModificacao] = useState('');

  useEffect(() => {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

    
    setDataModificacao(dataFormatada);
  }, []);

    return  (
        <div className="bottom-0 right-0 fixed w-full  bg-gradient-to-t from-white dark:from-neutral-900 to-transparent flex flex-col">
        <div className={`pb-3 px-[72px] ${navbar && 'pl-[278px]'}`}>
        <div className="mb-4">
        <div className="flex gap-4">
        <Alert onClick={() => onOpen('search')} className="h-14 p-2 flex items-center w-fit whitespace-nowrap gap-3 px-6 text-sm font-medium"><div><FadersHorizontal size={16} className="" /></div> Filtros</Alert>
            <Alert onClick={() => onOpen('search')} className="h-14 p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />

                <div className="">
                <Select >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha o tipo de pesquisa" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Óleo sobre tela">Óleo sobre tela</SelectItem>
                <SelectItem value="Acrílica sobre papel">Acrílica sobre papel </SelectItem>
                <SelectItem value="Acrilica sobre tela">Acrilica sobre tela</SelectItem>
                <SelectItem value="Óleo sobre papel">Óleo sobre papel</SelectItem>
                <SelectItem value="Impressão em fine art">Impressão em fine art</SelectItem>
            </SelectContent>
            </Select>
                </div>
                
            </div>

            <div>
            <Button variant="outline" className={`bg-blue-800 dark:bg-blue-800 text-white border-0 `} size={'icon'}>
       <Funnel size={16} className="" /> 
       <span className="sr-only">Pesquisadores selecionados</span>
        </Button>
            </div>
            </Alert>
        </div>
        </div>

        <div className="flex items-center justify-between">
        <p className="text-xs  md:flex hidden">Sistema de Mapeamento de Competências da Bahia | versão 2.0.5 (beta) </p>
        <p className="text-xs flex">Atualizado em {dataModificacao}</p>
        </div>
        </div>
        </div>
    )
}
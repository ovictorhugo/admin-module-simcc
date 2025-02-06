import { useContext, useEffect, useState } from "react";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { useModalResult } from "../hooks/use-modal-result";
import { ResultProvider } from "../provider/result-provider";

import { UserContext } from "../../context/context";

import { Button } from "../ui/button";
import { Building, Building2, ChevronDown, ChevronUp, Copyright, Download, MoreHorizontal, SlidersHorizontal, Ticket, Users } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useModal } from "../hooks/use-modal-store";
import { DotsThreeOutline, DotsThreeVertical, File, Plus, Quotes } from "phosphor-react";
import { Search } from "../search/search";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export function ResultHome() {
  const { isOpen, type } = useModalHomepage();
  const { onOpen, type: typeResult } = useModalResult();
  const { itemsSelecionados, searchType, simcc, urlGeral, valoresSelecionadosExport } = useContext(UserContext);
  const { onOpen: onOpenModal } = useModal();

  const [isOn, setIsOn] = useState(true);

  const queryUrl = useQuery();



  const researcher = queryUrl.get('researcher');

  const type_search = queryUrl.get('type_search');
  const terms = queryUrl.get('terms');
  const [previousTypeSearch, setPreviousTypeSearch] = useState(type_search);
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
    } else if (typeResult == null || typeResult == undefined) {
      onOpen('researchers-home')
    }
  }, [typeResult]);



  //csv
  const [jsonData, setJsonData] = useState<any[]>([]);


  let urlPublicacoesPorPesquisador = ''
  if (typeResult == 'articles-home') {
    urlPublicacoesPorPesquisador = `${urlGeral}bibliographic_production_researcher?terms=${valoresSelecionadosExport}&researcher_id=&type=ARTICLE&qualis=&qualis=&year=1900`;
  } else if (typeResult == 'researchers-home') {
    urlPublicacoesPorPesquisador = `${urlGeral}patent_production_researcher?researcher_id=&year=1900&term=${valoresSelecionadosExport}&distinct=0`
  } else if (typeResult == 'speaker-home') {
    urlPublicacoesPorPesquisador = `${urlGeral}pevent_researcher?researcher_id=&year=1900&term=${valoresSelecionadosExport}&nature=`
  } else if (typeResult == 'institutions-home') {
    urlPublicacoesPorPesquisador = `${urlGeral}institutionFrequenci?terms=${valoresSelecionadosExport}&university=&type=ARTICLE`
  }


  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(urlPublicacoesPorPesquisador, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'text/plain'
          }
        });
        const data = await response.json();
        if (data) {
          setJsonData(data)
        }
      } catch (err) {
        console.log(err);
      } finally {

      }
    };
    fetchData();
  }, [urlPublicacoesPorPesquisador]);


  const convertJsonToCsv = (json: any[]): string => {
    const items = json;
    const replacer = (_: string, value: any) => (value === null ? '' : value); // Handle null values
    const header = Object.keys(items[0]);
    const csv = [
      '\uFEFF' + header.join(';'), // Add BOM and CSV header
      ...items.map((item) =>
        header.map((fieldName) => JSON.stringify(item[fieldName], replacer)).join(';')
      ) // CSV data
    ].join('\r\n');

    return csv;
  };

  const handleDownloadJson = async () => {
    try {
      const csvData = convertJsonToCsv(jsonData);
      const blob = new Blob([csvData], { type: 'text/csv;charset=windows-1252;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `dados.csv`;
      link.href = url;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const { version } = useContext(UserContext)
  return (
    <div className="h-full w-full grid grid-cols-1">
      <Helmet>
        <title>
          {itemsSelecionados.length === 0

            ? 'Pesquisa'
            : 'Pesquisa: ' + itemsSelecionados

              .map((item, index) => {
                const term = item.term.replace(/[|;]/g, ''); // Remove o conector para obter apenas o termo
                const connector = item.term.endsWith('|') ? 'ou' : 'e'; // Determina o conector
                return index < itemsSelecionados.length - 1 ? `${term} ${connector}` : term; // Adiciona o conector apenas se não for o último
              })
              .join(' ')} | {version ? ('Conectee') : ('Iapós')}
        </title>
        <meta name="description" content={`Pesquisa | ${version ? ('Conectee') : ('Iapós')}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {(itemsSelecionados.length > 0 || (researcher == 'false')) && (
        <div className="top-[68px] sticky z-[2] supports-[backdrop-filter]:dark:bg-neutral-900/60 supports-[backdrop-filter]:bg-neutral-50/60 backdrop-blur">
          <div className={`w-full ${isOn ? 'px-8' : 'px-4'} border-b border-b-neutral-200 dark:border-b-neutral-800`}>
            {isOn && (
              <div className="w-full pt-4  flex justify-between items-center">
                <Search />
              </div>
            )}
            <div className={`flex w-full flex-wrap pt-2 justify-between ${isOn ? '' : ''} `}>
              <ScrollArea>
                <div className="w-full flex overflow-x-scroll md:overflow-x-auto items-center gap-2 pb-4 md:pb-0">
                  {!((researcher == 'false' && itemsSelecionados.length == 0) && itemsSelecionados.length == 0) && (
                    <div className={`pb-2 border-b-2 transition-all ${typeResult == 'researchers-home' ? ('border-b-[#719CB8]') : (' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'researchers-home' ? ('ghost') : ('ghost')} className={`${typeResult}`} onClick={() => onOpen('researchers-home')}>
                        <Users className="h-4 w-4" />
                        Pesquisadores
                      </Button>
                    </div>
                  )}
                  {searchType === 'article' && (
                    <div className={`pb-2 border-b-2  transition-all ${typeResult == 'articles-home' ? ('border-b-[#719CB8]') : (' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'articles-home' ? ('ghost') : ('ghost')} className="m-0" onClick={() => onOpen('articles-home')}>
                        <Quotes className="h-4 w-4" />
                        Artigos
                      </Button>
                    </div>
                  )}
                  {searchType === 'book' && (
                    <div className={`pb-2 border-b-2  transition-all ${typeResult == 'book-home' ? ('border-b-[#719CB8]') : (' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'book-home' ? ('ghost') : ('ghost')} className="m-0" onClick={() => onOpen('book-home')}>
                        <File className="h-4 w-4" />
                        Livros e capítulos
                      </Button>
                    </div>
                  )}
                  {searchType === 'patent' && (
                    <div className={`pb-2 border-b-2  transition-all ${typeResult == 'patent-home' ? ('border-b-[#719CB8]') : (' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'patent-home' ? ('ghost') : ('ghost')} className="m-0" onClick={() => onOpen('patent-home')}>
                        <Copyright className="h-4 w-4" />
                        Patentes
                      </Button>
                    </div>
                  )}
                  {searchType === 'speaker' && (
                    <div className={`pb-2 border-b-2  transition-all ${typeResult == 'speaker-home' ? ('border-b-[#719CB8]') : (' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'speaker-home' ? ('ghost') : ('ghost')} className="m-0" onClick={() => onOpen('speaker-home')}>
                        <Ticket className="h-4 w-4" />
                        Participação em eventos
                      </Button>
                    </div>
                  )}
                  {!((simcc && researcher == 'false' && itemsSelecionados.length == 0) && itemsSelecionados.length == 0) && (
                    <div className={`pb-2 border-b-2 transition-all ${typeResult == 'institutions-home' ? ('border-b-[#719CB8]') : (' border-b-transparent ')}`}>
                      <Button variant={typeResult == 'institutions-home' ? ('ghost') : ('ghost')} className={`${typeResult}`} onClick={() => onOpen('institutions-home')}>
                        <Building2 className="h-4 w-4" />
                        Instituições
                      </Button>
                    </div>
                  )}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <div className="hidden lg:flex md:flex-nowrap gap-2">
                <div className="md:flex md:flex-nowrap gap-2">
                  <Button onClick={() => handleDownloadJson()} variant="ghost" className="">
                    <File size={16} className="" />
                    Dicionário de dados
                  </Button>
                  <Button onClick={() => handleDownloadJson()} variant="ghost" className="">
                    <Download size={16} className="" />
                    Baixar resultado
                  </Button>
                </div>

                <div>
                  {typeResult == 'researchers-home' && (
                    <Button onClick={() => onOpenModal('filters')} variant="ghost" className="">
                      <SlidersHorizontal size={16} className="" />
                      Filtros
                    </Button>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOn(!isOn)}>
                  {isOn ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="md:block lg:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" className="h-8 w-8 p-0 hidden md:block">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Mais opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0">
                      <Button onClick={() => handleDownloadJson()} variant="ghost" className="">
                        <File size={16} className="" />
                        Dicionário de dados
                      </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="p-0">
                      <Button onClick={() => handleDownloadJson()} variant="ghost" className="">
                        <Download size={16} className="" />
                        Baixar resultado
                      </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <div>
                        {typeResult == 'researchers-home' && (
                          <Button onClick={() => onOpenModal('filters')} variant="ghost" className="">
                            <SlidersHorizontal size={16} className="" />
                            Filtros
                          </Button>
                        )}
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
          <div className="h-[calc(100vh-134px)] flex flex-col md:p-8 p-4 md:pt-4">
            <Search />

            <div className="w-full flex flex-col items-center justify-center h-full">
              <p className="text-9xl text-eng-blue font-bold mb-16 animate-pulse">^_^</p>
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

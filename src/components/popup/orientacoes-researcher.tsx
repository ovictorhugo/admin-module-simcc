import { useContext, useEffect, useMemo, useState } from "react";



type Livros = {

  id: string,
  nature: string,
  oriented: string,
  status: string,
  title: string,
  type: string,
  year: string
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,

} from "../../components/ui/accordion"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Skeleton } from "../ui/skeleton";

import { ChartBar, SquaresFour, Rows, Book, ArrowUDownLeft, Student } from "phosphor-react";

import { Button } from "../ui/button";
import { UserContext } from "../../context/context";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";

import { BookBlockPopUp } from "./book-block-popup";
import { FilterYearPopUp } from "./filters-year-popup";
import { TableReseracherOrientacoesPopup } from "./columns/table-orientacoes-popup";
import { GraficoOrientacoes } from "./graficos/grafico-orientacoes";
import { CheckSquare } from "lucide-react";
import { Alert } from "../ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


type Filter = {
  year: number[]
  qualis: string[]
}

type Props = {
  name: string
}


export function OrientacoesResearcherPopUp(props: Props) {

  const { urlGeral, searchType, itemsSelecionadosPopUp, setItensSelecionadosPopUp, itemsSelecionados } = useContext(UserContext)

  const [loading, isLoading] = useState(false)

  const [distinct] = useState(false)
  const [publicacoes, setPublicacoes] = useState<Livros[]>([]);
  const [typeVisu, setTypeVisu] = useState('block')

  const [filters, setFilters] = useState<Filter[]>([]);

  // Função para lidar com a atualização de researcherData
  const handleResearcherUpdate = (newResearcherData: Filter[]) => {
    setFilters(newResearcherData);
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const [type, setType] = useState('')

  const yearString = filters.length > 0 ? filters[0].year.join(';') : '';

  const urlTermPublicacoes = `${urlGeral}guidance_researcher?researcher_id=${props.name}&year=${yearString || year-5}`;

  console.log(urlTermPublicacoes)
  useMemo(() => {
    const fetchData = async () => {
      try {
        isLoading(true)
        const response = await fetch(urlTermPublicacoes, {
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
          setPublicacoes(data);
          isLoading(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlTermPublicacoes]);



  const items = Array.from({ length: 12 }, (_, index) => (
    <Skeleton key={index} className="w-full rounded-md h-[170px]" />
  ));

  //conectores 
  const [filteredPublicacoes, setFilteredPublicacoes] = useState<Livros[]>([]);

  // Função para normalizar strings, removendo acentos e caracteres especiais
  const normalizeString = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
      .toLowerCase(); // Transforma em minúsculas para comparação case-insensitive

  useEffect(() => {
    const filtered = publicacoes.filter((pub) =>
      type
        ? normalizeString(pub.nature).includes(normalizeString(type))
        : true
    );
    setFilteredPublicacoes(filtered);
  }, [type, publicacoes]);

  return (
    <>
      <div className="mb-[150px]">

        <div className="flex flex-col md:flex-row mb-6  gap-6 w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4 w-full ">
              <CheckSquare size={24} className="text-gray-400" />
              <p className="font-medium whitespace-nowrap">Selecione o tipo de orientação</p>
            </div>
            <Alert className="w-full">
              <Select defaultValue={type} value={type} onValueChange={(value) => setType(value)}>
                <SelectTrigger className="w-full max-w-[300px] whitespace-nowrap border-0">
                  <SelectValue placeholder="Escolha o tipo de orientação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" "> <div className="flex gap-4 items-center mr-2"><div className="border dark:border-neutral-800 flex rounded-sm h-4 w-4 min-w-4"></div> Todas as orientações</div></SelectItem>
                  <SelectItem value="Iniciação científica"> <div className="flex gap-4 items-center mr-2"><div className="bg-[#8BFBD3] flex rounded-sm h-4 w-4 min-w-4"></div> Iniciação científica</div></SelectItem>
                  <SelectItem value="Dissertação De Mestrado"><div className="flex gap-4 items-center mr-2"><div className="bg-[#67A896] flex rounded-sm h-4 w-4 min-w-4"></div>Dissertação De Mestrado</div></SelectItem>
                  <SelectItem value="Tese de Doutorado"><div className="flex gap-4 items-center mr-2"><div className="bg-[#425450] flex rounded-sm h-4 w-4 min-w-4"></div>Tese de Doutorado</div></SelectItem>
                  <SelectItem value="Trabalho de Conclusao de Curso Graduação"><div className="flex gap-4 items-center mr-2"><div className="bg-[#77D2B6] flex rounded-sm h-4 w-4 min-w-4 whitespace-nowrap"></div>Trabalho de Conclusao de Curso Graduação</div></SelectItem>
                  <SelectItem value="Orientacao-De-Outra-Natureza"><div className="flex gap-4 items-center mr-2"><div className="bg-[#577E74] flex rounded-sm h-4 w-4"></div>Orientacao-De-Outra-Natureza</div></SelectItem>
                  <SelectItem value="Monografia de Conclusao de Curso Aperfeicoamento e Especializacao"><div className="flex gap-4 items-center mr-2"><div className="bg-[#2F7F7C] flex rounded-sm h-4 w-4 min-w-4"></div>Monografia de Conclusao de Curso Aperfeicoamento e Especializacao</div></SelectItem>
                  <SelectItem value="Supervisão de Pós-Doutorado"><div className="flex gap-4 items-center mr-2"><div className="bg-[#46724B] flex rounded-sm h-4 w-4 min-w-4"></div>Supervisão de Pós-Doutorado</div></SelectItem>
                </SelectContent>
              </Select>
            </Alert>
          </div>

          <div className="w-full ">
            <FilterYearPopUp
              onFilterUpdate={handleResearcherUpdate} />
          </div>
        </div>

        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="text-left" >
            <div className="flex mb-2">
              <HeaderResultTypeHome title="Gráfico de orientações em andamento e concluídas " icon={<ChartBar size={24} className="text-gray-400" />}>
              </HeaderResultTypeHome>
              <AccordionTrigger>

              </AccordionTrigger>
            </div>
            <AccordionContent >
              {loading ? (
                <Skeleton className="w-full rounded-md h-[300px]" />
              ) : (
                <GraficoOrientacoes
                  livros={filteredPublicacoes} // Passa um array com um único item para o componente
                />

              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion defaultValue="item-1" type="single" collapsible >
          <AccordionItem value="item-1" >
            <div className="flex mb-2">
              <div className="flex gap-4 w-full justify-between items-center ">
                <div className="flex gap-4 items-center">
                  <Student size={24} className="text-gray-400" />
                  <p className="font-medium">Todas as orientações</p>
                </div>

                <div className="flex gap-3 mr-3  items-center h-full">
                  {(itemsSelecionadosPopUp != itemsSelecionados && searchType == '') && (
                    <div className="flex gap-3  items-center">
                      <Button onClick={() => setItensSelecionadosPopUp(itemsSelecionados)} variant="ghost" size={'icon'}>
                        <ArrowUDownLeft size={16} className=" whitespace-nowrap" />
                      </Button>

                      <div className="w-[0.5px] h-6 dark:bg-neutral-800 bg-neutral-200"></div>
                    </div>
                  )}

                  <div className="hidden gap-3 md:flex">
                    <Button onClick={() => setTypeVisu('rows')} variant={typeVisu == 'block' ? 'ghost' : 'outline'} size={'icon'}>
                      <Rows size={16} className=" whitespace-nowrap" />
                    </Button>
                    <Button onClick={() => setTypeVisu('block')} variant={typeVisu == 'block' ? 'outline' : 'ghost'} size={'icon'}>
                      <SquaresFour size={16} className=" whitespace-nowrap" />
                    </Button>
                  </div>
                </div>

              </div>

              <AccordionTrigger>


              </AccordionTrigger>
            </div>
            <AccordionContent >

              {typeVisu == 'block' ? (
                loading ? (
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{
                      350: 1,
                      750: 1,
                      900: 2,
                      1200: 2
                    }}
                  >
                    <Masonry gutter="16px">
                      {items.map((item, index) => (
                        <div className="w-full" key={index}>{item}</div>
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
                ) : (
                  publicacoes.length == 0 ? (
                    <div className="items-center justify-center w-full flex text-center pt-6">Nenhum resultado encontrado a partir de {year-5}</div>
                  ) : (
                    <BookBlockPopUp
                      articles={filteredPublicacoes}
                      distinct={distinct}
                      type={'orientacoes'}
                    />
                  )
                )
              ) : (
                loading ? (
                  <Skeleton className="w-full rounded-md h-[400px]" />
                ) : (
                  <TableReseracherOrientacoesPopup
                    orientacoes={filteredPublicacoes}
                  />
                )
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
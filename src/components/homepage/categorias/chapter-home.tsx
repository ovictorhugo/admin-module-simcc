import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../../context/context";
import { FilterYearPopUp } from "../../popup/filters-year-popup";
import { Skeleton } from "../../ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { HeaderResultTypeHome } from "./header-result-type-home";
import debounce from "lodash.debounce"; // Importing debounce

import { Button } from "../../ui/button";
import { Book, Books, ChartBar, Rows, SquaresFour } from "phosphor-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Alert } from "../../ui/alert";
import { CardContent, CardHeader, CardTitle } from "../../ui/card";
import { GraficoLivros } from "../../popup/graficos/grafico-livros";
import { TableReseracherBookPopup } from "../../popup/columns/table-books-popup";
import { BlockItemGeral } from "./book-home/block-item-geral";
import { HeaderResult } from "../header-results";
import { Switch } from "../../ui/switch";
import { useQuery } from "../../dashboard/builder-page/tabelas/tabela-artigos";

type Patente = {
  id: string,
  title: string,
  year: string,
  isbn: string,
  publishing_company: string
  name: string
}

type Filter = {
  year: number[]
  qualis: string[]
}

export function ChapterHome() {
  const [publicacoes, setPublicacoes] = useState<Patente[]>([]);
  const [capLivros, setCapLivros] = useState<Patente[]>([]);
  const [typeVisu, setTypeVisu] = useState('block')
  const [loading, isLoading] = useState(false)

  const [loading2, isLoading2] = useState(false)
  const [typeVisu2, setTypeVisu2] = useState('block')

  const [filters, setFilters] = useState<Filter[]>([]);

  let yearString = useMemo(() => {
    return filters.length > 0 ? filters[0].year.join(';') : '';
  }, [filters]);

  const handleResearcherUpdate = (newResearcherData: Filter[]) => {
    setFilters(newResearcherData);

    let yearString = newResearcherData.length > 0 
    ? newResearcherData[0].year.join(';') 
    : '';

  }
  const [distinct, setDistinct] = useState(false)
  const [distinct2, setDistinct2] = useState(false)

  const queryUrl = useQuery();
  const Page =  queryUrl.get('page') || '1';
  const Length =  queryUrl.get('length') || '12';
  
  const { urlGeral, valoresSelecionadosExport } = useContext(UserContext)
  const currentDate = new Date();
  const year = currentDate.getFullYear();
 

  const items = Array.from({ length: 12 }, (_, index) => (
    <Skeleton key={index} className="w-full rounded-md h-[170px]" />
  ));

  ///cap

  let urlTermCap = `${urlGeral}book_chapter_production_researcher?researcher_id=&year=${yearString || year-5}&term=${valoresSelecionadosExport}&distinct=${distinct2 ? '1' : '0'}&lenght=${Length}&page=${Page}`
console.log(urlTermCap)

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoading2(true)
        const response = await fetch(urlTermCap, {
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
          setCapLivros(data);
          isLoading2(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlTermCap]);

  const updateDistinct = useCallback(
      debounce((value: boolean) => {
        setDistinct(value);
      }, 300), // 300ms de debounce
      []
    );

    const updateDistinct2 = useCallback(
      debounce((value: boolean) => {
        setDistinct2(value);
      }, 300), // 300ms de debounce
      []
    );

  return (
    <div className="grid grid-cols-1 gap-4 pb-16">
      <HeaderResult />

      <div className="mt-6">
     <FilterYearPopUp
        onFilterUpdate={handleResearcherUpdate} />
     </div>

     <Alert className={`p-0 mt-4 bg-cover bg-no-repeat bg-center `}  >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de capítulos
            </CardTitle>
            <Books className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex justify-between items-end">
            <div>
            <div className="text-2xl font-bold">{capLivros.length}</div>
            <p className="text-xs text-muted-foreground flex gap-2">
              encontrados na busca 
            </p>
            </div>

            <div className="gap-2 flex items-center h-fit text-xs text-gray-500 dark:text-gray-300">
  <p>Capítulos:</p>
  <Switch
  checked={distinct2}
  onCheckedChange={(value) => updateDistinct2(value)}
/>
  <span>{distinct2 ? "Sem repetição" : "Com repetição"}</span>
</div>
          </CardContent>
        </Alert>

  
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" >
          <div className="flex ">
            <HeaderResultTypeHome title="Gráfico de quantidade total de capítulos de livros" icon={<ChartBar size={24} className="text-gray-400" />}>
            </HeaderResultTypeHome>
            <AccordionTrigger>

            </AccordionTrigger>
          </div>
          <AccordionContent >
            {(loading || loading2) ? (
              <Skeleton className="w-full rounded-md h-[300px]" />
            ) : (
              <GraficoLivros capLivros={capLivros} publicacoes={publicacoes} />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

     

      <Accordion defaultValue="item-1" type="single" collapsible >
        <AccordionItem value="item-1" >
          <div className="flex ">
            <div className="flex gap-4 w-full justify-between items-center ">
              <div className="flex gap-4 items-center">
                <Books size={24} className="text-gray-400" />
                <p className=" font-medium">Capítulos de livros</p>
              </div>

              <div className="flex gap-3 mr-3  items-center h-full">
              
                <Button onClick={() => setTypeVisu2('rows')} variant={typeVisu2 == 'block' ? 'ghost' : 'outline'} size={'icon'}>
                  <Rows size={16} className=" whitespace-nowrap" />
                </Button>

                <Button onClick={() => setTypeVisu2('block')} variant={typeVisu2 == 'block' ? 'outline' : 'ghost'} size={'icon'}>
                  <SquaresFour size={16} className=" whitespace-nowrap" />
                </Button>
              </div>
            </div>

            <AccordionTrigger>

            </AccordionTrigger>
          </div>
          <AccordionContent >

            {typeVisu2 == 'block' ? (
              loading2 ? (
                <ResponsiveMasonry
                  columnsCountBreakPoints={{
                    350: 1,
                    750: 2,
                    900: 3,
                    1200: 4
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
                  <div className="items-center justify-center w-full flex text-center pt-6">Sem resultados para essa pesquisa</div>
                ) : (
                  <BlockItemGeral
                    articles={capLivros}
                    distinct={distinct2}
                    type={'capLivro'}
                  />
                )
              )
            ) : (
              loading2 ? (

                <Skeleton className="w-full rounded-md h-[400px]" />
              ) : (
                <TableReseracherBookPopup
                  books={capLivros}
                />
              )
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
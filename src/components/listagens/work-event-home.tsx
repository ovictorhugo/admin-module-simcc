import { useCallback, useContext, useMemo, useState } from "react"
import { UserContext } from "../../context/context"
import { Skeleton } from "../ui/skeleton"
import { HeaderResult } from "../homepage/header-results"
import { Alert } from "../ui/alert"
import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { Briefcase, Code } from "lucide-react"
import { FilterYearPopUp } from "../popup/filters-year-popup"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home"
import { ChartBar, Rows, SquaresFour, StripeLogo } from "phosphor-react"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { BlockItemGeral } from "../homepage/categorias/book-home/block-item-geral"
import { TableReseracherMarcasPopup } from "../popup/columns/producoes-tecnicas/table-marcas-popup"
import { GraficoTrabalhoEvento } from "../popup/graficos/grafico-trabalho-evento"
import debounce from "lodash.debounce"; // Importing debounce
import { useQuery } from "../dashboard/builder-page/tabelas/tabela-artigos"

type Patente = {
  authors: string;
  homepage: string;
  language: string;
  means_divulgation: string;
  nature: string;
  relevance: boolean;
  scientific_divulgation: boolean;
  title: string;
  title_en: string;
  year_: string;
    }

    type Filter = {
        year: number[]
        qualis: string[]
      }

export function WorkEventHome() {
    const [publicacoes, setPublicacoes] = useState<Patente[]>([]);
    const [typeVisu, setTypeVisu] = useState('block')
    const [loading, isLoading] = useState(true)

    const [filters, setFilters] = useState<Filter[]>([]);

    const handleResearcherUpdate = (newResearcherData: Filter[]) => {
        setFilters(newResearcherData);
  
    }

    const yearString = filters.length > 0 ? filters[0].year.join(';') : '';

    const {urlGeral, valoresSelecionadosExport} = useContext(UserContext)
    const [distinct, setDistinct] = useState(false)
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const queryUrl = useQuery();
    const Page =  queryUrl.get('page') || '1';
    const Length =  queryUrl.get('length') || '12';
    
    let urlTermPublicacoes = `${urlGeral}researcher_production/events?researcher_id=&year=${yearString || year-5}&distinct=${distinct ? '1' : '0'}&lenght=${Length}&page=${Page}`;
  
    console.log(urlTermPublicacoes)
    useMemo(() => {
        const fetchData = async () => {
            try {
              isLoading(true)
              const response = await fetch( urlTermPublicacoes, {
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
        }, [ urlTermPublicacoes]);

        const items = Array.from({ length: 12 }, (_, index) => (
            <Skeleton key={index} className="w-full rounded-md h-[170px]" />
          ));

          const updateDistinct = useCallback(
            debounce((value: boolean) => {
              setDistinct(value);
            }, 300), // 300ms de debounce
            []
          );


    return(
        <div className="grid grid-cols-1 gap-4 pb-16 ">
          <HeaderResult/>
          <div className="mt-6">
          <FilterYearPopUp
                onFilterUpdate={handleResearcherUpdate}/>
          </div>

             <div className="mt-4 ">
             <Alert className={`p-0 bg-cover bg-no-repeat bg-center `}  >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de trabalhos em eventos
                    </CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="flex justify-between items-end">
            <div>
            <div className="text-2xl font-bold">{publicacoes.length}</div>
            <p className="text-xs text-muted-foreground flex gap-2">
              encontrados na busca desde {yearString}
            </p>
            </div>

            <div className="gap-2 flex items-center h-fit text-xs text-gray-500 dark:text-gray-300">
  <p>Trabalho em evento:</p>
  <Switch
  checked={distinct}
  onCheckedChange={(value) => updateDistinct(value)}
/>
  <span>{distinct ? "Sem repetição" : "Com repetição"}</span>
</div>
          </CardContent>
                  </Alert>
             </div>

         

<Accordion  type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" >
                <div className="flex ">
                <HeaderResultTypeHome title="Gráfico de quantidade total de trabalhos em eventos" icon={<ChartBar size={24} className="text-gray-400" />}>
                        </HeaderResultTypeHome>
                    <AccordionTrigger>
                    
                    </AccordionTrigger>
                    </div>
                    <AccordionContent className="p-0">
                    {loading ? (
                      <Skeleton className="w-full rounded-md h-[300px]"/>
                    ):(
                     <GraficoTrabalhoEvento publicacoes={publicacoes} />
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>

                <Accordion defaultValue="item-1"  type="single" collapsible >
                <AccordionItem value="item-1" >
                <div className="flex ">
                <div className="flex gap-4 w-full justify-between items-center ">
            <div className="flex gap-4 items-center">
            <Briefcase size={24} className="text-gray-400" />
            <p className=" font-medium"> Trabalhos em eventos</p>
            </div>

            <div className="flex gap-3 mr-3  items-center h-full">
        

            <Button onClick={() => setTypeVisu('rows')}  variant={typeVisu == 'block' ? 'ghost' : 'outline' } size={'icon'}>
                            <Rows size={16} className=" whitespace-nowrap" />
                        </Button>

                        <Button  onClick={() => setTypeVisu('block')}  variant={typeVisu == 'block' ? 'outline' : 'ghost' }  size={'icon'}>
                            <SquaresFour size={16} className=" whitespace-nowrap" />
                        </Button>
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
                      ):(
                        publicacoes.length == 0 ? (
                          <div className="items-center justify-center w-full flex text-center pt-6">Sem resultados para essa pesquisa</div>
                         ):(
                          <BlockItemGeral
                          articles={publicacoes}
                          distinct={distinct}
                          type={'work-event'}
                          />
                         )
                      )
                    ):(
                      loading ? (
                        
                        <Skeleton className="w-full rounded-md h-[400px]"/>
                      ):(
                     <TableReseracherMarcasPopup
                                         livros={publicacoes}
                                       />
                      )
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
        </div>
    )
}
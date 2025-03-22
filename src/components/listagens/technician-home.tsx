import { useContext, useMemo, useState } from "react"
import { UserContext } from "../../context/context"
import { Skeleton } from "../ui/skeleton"
import { HeaderResult } from "../homepage/header-results"
import { Alert } from "../ui/alert"
import { CardContent, CardHeader, CardTitle } from "../ui/card"
import { Code, Plus, UserCog } from "lucide-react"
import { FilterYearPopUp } from "../popup/filters-year-popup"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home"
import { ChartBar, Rows, SquaresFour, UserGear } from "phosphor-react"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { BlockItemGeral } from "../homepage/categorias/book-home/block-item-geral"
import { TableReseracherMarcasPopup } from "../popup/columns/producoes-tecnicas/table-marcas-popup"
import { GraficoSoftware } from "./graficos/grafico-software"
import { DataTable } from "../popup/columns/popup-data-table"
import { columns } from "../componentsModal/columns-researchers-program"
import { columnsTecnicos } from "./columns/colums-tecnicos"

type Patente = {
  technician_id: string,
  nome: string,
  genero: string,
    name:string
    deno_sit:string
    rt:string 
    classe:string 
    cargo:string
    nivel:string 
    ref:string
    titulacao:string 
    setor:string 
    detalhe_setor:string 
    dting_org:string 
    data_prog:string 
    semester:string 
    }

    type Filter = {
        year: number[]
        qualis: string[]
      }

export function TechnicianHome() {
    const [publicacoes, setPublicacoes] = useState<Patente[]>([]);
    const [typeVisu, setTypeVisu] = useState('block')
    const [loading, isLoading] = useState(false)

    const [filters, setFilters] = useState<Filter[]>([]);

    const handleResearcherUpdate = (newResearcherData: Filter[]) => {
        setFilters(newResearcherData);
  
    }

    const yearString = filters.length > 0 ? filters[0].year.join(';') : '';

    const {urlGeral, valoresSelecionadosExport} = useContext(UserContext)
    const [distinct, setDistinct] = useState(false)

    let urlTermPublicacoes = `${urlGeral}ufmg/technician`;
  
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

const [count, setCount] = useState(12)
    return(
        <div className="grid grid-cols-1 gap-4 pb-16 ">
          <HeaderResult/>
             <div className="mt-4 ">
             <Alert className={`p-0 bg-cover bg-no-repeat bg-center `}  >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de técnicos administrativos
                    </CardTitle>
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{publicacoes.length}</div>
                    <p className="text-xs text-muted-foreground">
                      encontradas na busca
                    </p>
                  </CardContent>
                  </Alert>
             </div>

         

<Accordion  type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" >
                <div className="flex ">
                <HeaderResultTypeHome title="Gráfico de quantidade total de softwares" icon={<ChartBar size={24} className="text-gray-400" />}>
                        </HeaderResultTypeHome>
                    <AccordionTrigger>
                    
                    </AccordionTrigger>
                    </div>
                    <AccordionContent className="p-0">
                    {loading ? (
                      <Skeleton className="w-full rounded-md h-[300px]"/>
                    ):(
                     <GraficoSoftware software={publicacoes}  />
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>

                <Accordion defaultValue="item-1"  type="single" collapsible >
                <AccordionItem value="item-1" >
                <div className="flex ">
                <div className="flex gap-4 w-full justify-between items-center ">
            <div className="flex gap-4 items-center">
            <Code size={24} className="text-gray-400" />
            <p className=" font-medium"> Técnicos administrativos</p>
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
                          <ResponsiveMasonry
                          columnsCountBreakPoints={{
                              350: 1,
                              750: 2,
                              900: 3,
                              1200: 4
                          }}
                      >
                                       <Masonry gutter="16px">
                       <div>
                       {publicacoes.slice(0, count).map((props) => (
                          <div>
                            
                          </div>
                         ))}

{publicacoes.length > count && (
                <div className="w-full flex justify-center mt-8"><Button onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
            )}
                       </div>
                          </Masonry>
          </ResponsiveMasonry>
                         )
                      )
                    ):(
                      loading ? (
                        
                        <Skeleton className="w-full rounded-md h-[400px]"/>
                      ):(
                     <DataTable
                     columns={columnsTecnicos}
                                         data={publicacoes}
                                       />
                      )
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
        </div>
    )
}
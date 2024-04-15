import { useModalResult } from "../../hooks/use-modal-result";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../components/ui/accordion"
import { Skeleton } from "../../ui/skeleton";
import { HeaderResultTypeHome } from "./header-result-type-home";
import { useContext, useMemo, useState } from "react";
import { Buildings, ChartBar, Rows, SquaresFour } from "phosphor-react";
import { UserContext } from "../../../context/context";
import { seriesType } from "highcharts";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { GraficoInstitutionsHome } from "./institutions-home/grafico-institutions-home";
import { InstitutionsBlock } from "./institutions-home/institutions-block";
import { Button } from "../../ui/button";
import { useModalSidebar } from "../../hooks/use-modal-sidebar";

type Instituicoes = {
    among: string,
    id: string,
    image: string,
    institution: string,
  }

export function InstitutionsHome() {
    const { isOpen, type} = useModalResult();
    const [loading, isLoading] = useState(false)
    const {urlGeral, searchType, valoresSelecionadosExport, navbar} = useContext(UserContext)
    const [instituicoes, setInstituicoes] = useState<Instituicoes[]>([]);
    const [typeVisu, setTypeVisu] = useState('block')
    const isModalOpen = isOpen && type === "institutions-home";
    const {isOpen:isOpenSidebar} = useModalSidebar()
    

    let urlTermPublicacoes =''

    if (searchType == 'article') {
        urlTermPublicacoes = `${urlGeral}institutionFrequenci?terms=${valoresSelecionadosExport}&university=&type=ARTICLE`
    }

      useMemo(() => {
        const fetchData = async () => {
          isLoading(true);
          try {
            const response = await fetch(urlTermPublicacoes, {
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
              setInstituicoes(data);
            }
          } catch (err) {
            console.log(err);
          } finally {
            isLoading(false);
          }
        };
        fetchData();
      }, [urlTermPublicacoes]);

      const items = Array.from({ length: 12 }, (_, index) => (
        <Skeleton key={index} className="w-full rounded-md h-[170px]" />
      ));

    return(
        <>
        {isModalOpen && (
            <div className=" mb-[150px]  ">
                <Accordion defaultValue="item-1"  type="single" collapsible >
                <AccordionItem value="item-1" >
                    <AccordionTrigger>
                    <HeaderResultTypeHome title="Gráfico de quantidade por Instituição" icon={<ChartBar size={24} className="text-gray-400" />}>
                        </HeaderResultTypeHome>
                    </AccordionTrigger>
                    <AccordionContent >
                    {loading ? (
                      <Skeleton className="w-full rounded-md h-[300px]"/>
                    ):(
                    <div>
                        <GraficoInstitutionsHome
                    institutions={instituicoes}
                    />
                    </div>
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>

                <Accordion defaultValue="item-1"  type="single" collapsible >
                <AccordionItem value="item-1" >
                    <AccordionTrigger>
                    <HeaderResultTypeHome title="Universidades cadastradas" icon={<Buildings size={24} className="text-gray-400" />}>
                    
                    <Button onClick={() => setTypeVisu('rows')}  variant="outline" className={`bg-transparent border-0 ${typeVisu == 'rows' && ('bg-white dark:bg-neutral-800')}`} size={'icon'}>
                            <Rows size={16} className=" whitespace-nowrap" />
                        </Button>

                        <Button  onClick={() => setTypeVisu('block')} variant="outline" className={`bg-transparent border-0 ${typeVisu == 'block' && ('bg-white dark:bg-neutral-800')} `} size={'icon'}>
                            <SquaresFour size={16} className=" whitespace-nowrap" />
                        </Button>
                        </HeaderResultTypeHome>
                    </AccordionTrigger>
                    <AccordionContent >

{typeVisu == 'block' ? (
                    loading ? (
                        <ResponsiveMasonry
                        columnsCountBreakPoints={{
                            350: 1,
                            750: 2,
                            900: 3,
                            1200: navbar || isOpenSidebar ? 3 : 4
                        }}
                    >
                                     <Masonry gutter="16px">
                        {items.map((item, index) => (
                                <div key={index}>{item}</div>
                              ))}
                        </Masonry>
        </ResponsiveMasonry>
                      ):(
                        <InstitutionsBlock
                        institutions={instituicoes}
                        />
                      )
                    ):(
                      loading ? (
                        
                        <Skeleton className="w-full rounded-md h-[400px]"/>
                      ):(
                        ''
                      )
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </div>
        )}
        </>
    )
}
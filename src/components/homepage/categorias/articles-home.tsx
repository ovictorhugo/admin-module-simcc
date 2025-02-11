import { useContext, useMemo, useState } from "react";
import { useModalResult } from "../../hooks/use-modal-result";
import { UserContext } from "../../../context/context";

type Publicacao = {
    id: string,
    doi: string,
    name_periodical: string,
    qualis: "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "SQ" | "NP",
    title: string,
    year: string,
    color: string,
    researcher: string,
    lattes_id: string,
    magazine: string,
    lattes_10_id: string,
    jcr_link: string,
    jif: string
    researcher_id: string
  }

  import { Switch } from "../../ui/switch";

  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    
  } from "../../../components/ui/accordion"
  import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Skeleton } from "../../ui/skeleton";
import { HeaderResultTypeHome } from "./header-result-type-home";
import { ChartBar, Quotes, SquaresFour, Rows } from "phosphor-react";
import { GraficoArticleHome } from "./articles-home/grafico-articles-home";
import { ArticleBlock } from "./articles-home/articles-block";
import { Button } from "../../ui/button";
import { useModalSidebar } from "../../hooks/use-modal-sidebar";
import { FilterArticle } from "./articles-home/filters-articles";
import { TableReseracherArticleshome } from "./articles-home/table-articles";

type Filter = {
  year: number[]
  qualis: string[]
}

export function ArticlesHome() {
    const { isOpen, type} = useModalResult();
    const {isOpen:isOpenSidebar} = useModalSidebar()

    const {urlGeral, searchType, valoresSelecionadosExport, navbar} = useContext(UserContext)
  
    const isModalOpen = isOpen && type === "articles-home";
    const [loading, isLoading] = useState(false)
    const [distinct, setDistinct] = useState(false)
    const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
    const [typeVisu, setTypeVisu] = useState('block')

    const [filters, setFilters] = useState<Filter[]>([]);

    // Função para lidar com a atualização de researcherData
    const handleResearcherUpdate = (newResearcherData: Filter[]) => {
      setFilters(newResearcherData);
    };

    const yearString = filters.length > 0 ? filters[0].year.join(';') : '';
    const qualisString = filters.length > 0 ? filters[0].qualis.join(';') : '';
    let urlTermPublicacoes = ``;

if(valoresSelecionadosExport != '') {
  
  if (searchType == 'name') {
    urlTermPublicacoes = `${urlGeral}bibliographic_production_researcher?terms=&researcher_id=&type=ARTICLE&qualis=${qualisString}&year=${yearString}`;
} else if (searchType == 'article') {
  urlTermPublicacoes = `${urlGeral}bibliographic_production_article?terms=${valoresSelecionadosExport}&year=${yearString}&qualis=${qualisString}&university=&distinct=${distinct ? ('1'):('0')}&graduate_program_id=4`;
} else if (searchType == 'area') {
  urlTermPublicacoes = `${urlGeral}bibliographic_production_article_area?area_specialty=${valoresSelecionadosExport.replace(/;/g, ' ')}&great_area=&year=${yearString}&qualis=${qualisString}`
} else if (searchType == 'abstract') {
  urlTermPublicacoes = `${urlGeral}bibliographic_production_article?terms=${valoresSelecionadosExport}&year=${yearString}&qualis=${qualisString}&university=&distinct=${distinct ? ('1'):('0')}`
  }
}

    console.log('urlTermPublicacoes', urlTermPublicacoes)
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

         

    return(
        <>
        {isModalOpen && (
            <div className="mb-[150px]">

                <FilterArticle
                onFilterUpdate={handleResearcherUpdate}/>
              
                        <Accordion defaultValue="item-1" type="single" collapsible >
                <AccordionItem value="item-1" >
                    <AccordionTrigger>
                    <HeaderResultTypeHome title="Gráfico de quantidade total por Qualis" icon={<ChartBar size={24} className="text-gray-400" />}>
                        </HeaderResultTypeHome>
                    </AccordionTrigger>
                    <AccordionContent >
                    {loading ? (
                      <Skeleton className="w-full rounded-md h-[300px]"/>
                    ):(
                      <GraficoArticleHome
                      articles={publicacoes}
                      />
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>

                <Accordion defaultValue="item-1"  type="single" collapsible >
                <AccordionItem value="item-1" >
                    <AccordionTrigger>
                    <HeaderResultTypeHome title="Artigos" icon={<Quotes size={24} className="text-gray-400" />}>
                    <div className="gap-2 flex items-center text-xs text-gray-500 dark:text-gray-300">
                        <p>Artigos:</p>
                        Iguais
                    <Switch
                     checked={distinct}
                     onCheckedChange={(value) => setDistinct(value)}

                />

                Distintos
                    </div>
                    
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
                        <ArticleBlock
                        articles={publicacoes}
                        distinct={distinct}
                        />
                      )
                    ):(
                      loading ? (
                        
                        <Skeleton className="w-full rounded-md h-[400px]"/>
                      ):(
                        <TableReseracherArticleshome
                        articles={publicacoes}
                        />
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
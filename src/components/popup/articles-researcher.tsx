import { useContext, useMemo, useState } from "react";


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

  import { Switch } from "../ui/switch";

  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    
  } from "../../components/ui/accordion"
  import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Skeleton } from "../ui/skeleton";

import { ChartBar, Quotes, SquaresFour, Rows } from "phosphor-react";

import { Button } from "../ui/button";
import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { useModalResult } from "../hooks/use-modal-result";
import { UserContext } from "../../context/context";
import { FilterArticle } from "../homepage/categorias/articles-home/filters-articles";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { GraficoArticleHome } from "../homepage/categorias/articles-home/grafico-articles-home";
import { ArticleBlock } from "../homepage/categorias/articles-home/articles-block";
import { TableReseracherArticleshome } from "../homepage/categorias/articles-home/table-articles";
import { FilterArticlePopUp } from "./filters-articles-popup";
import { ArticleBlockPopUp } from "./articles-block-popup";


type Filter = {
  year: number[]
  qualis: string[]
}

type Props = {
  name:string
}

export function ArticlesResearcherPopUp(props:Props) {
  

    const {urlGeral, valoresSelecionadosExport, navbar} = useContext(UserContext)
  
   
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
    let urlTermPublicacoes = `${urlGeral}bibliographic_production_researcher?terms=${valoresSelecionadosExport}&researcher_id=${props.name}&type=ARTICLE&qualis=${qualisString}&year=${yearString}`;

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
  
            <div className="mb-[150px]">

                <FilterArticlePopUp
                onFilterUpdate={handleResearcherUpdate}/>
              
                        <Accordion  type="single" collapsible >
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
                            750: 1,
                            900: 1,
                            1200: 2
                        }}
                    >
                                     <Masonry gutter="16px">
                        {items.map((item, index) => (
                                <div key={index}>{item}</div>
                              ))}
                        </Masonry>
        </ResponsiveMasonry>
                      ):(
                        <ArticleBlockPopUp
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

        </>
    )
}
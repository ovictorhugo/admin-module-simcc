import { useContext, useMemo, useState } from "react";
import { useModalResult } from "../../hooks/use-modal-result";
import { UserContext } from "../../../context/context";

export type Publicacao = {
  abstract: string,
  article_institution: string,
  authors: string
  authors_institution: string
  citations_count: string
  issn: string
  keywords: string
  landing_page_url: string
  language: string
  pdf: string

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
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Skeleton } from "../../ui/skeleton";
import { HeaderResultTypeHome } from "./header-result-type-home";
import { ChartBar, Quotes, SquaresFour, Rows } from "phosphor-react";
import { GraficoArticleHome } from "./articles-home/grafico-articles-home";
import { ArticleBlock } from "./articles-home/articles-block";
import { Button } from "../../ui/button";
import { useModalSidebar } from "../../hooks/use-modal-sidebar";

import { TableReseracherArticleshome } from "./articles-home/table-articles";
import { Alert } from "../../ui/alert";
import { CardContent, CardHeader, CardTitle } from "../../ui/card";
import { HeaderResult } from "../header-results";
import { FilterArticle } from "./articles-home/filters-articles";

type Filter = {
  year: number[]
  qualis: string[]
}

export function ArticlesHome() {
  const { isOpen, type } = useModalResult();
  const { isOpen: isOpenSidebar } = useModalSidebar()

  const { urlGeral, searchType, valoresSelecionadosExport, navbar } = useContext(UserContext)

  const isModalOpen = isOpen && type === "articles-home";
  const [loading, isLoading] = useState(false)
  const [distinct, setDistinct] = useState(false)
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [typeVisu, setTypeVisu] = useState('block')

  const total = publicacoes.length;
const validDoiCount = publicacoes.filter(pub => pub.doi && pub.doi.trim() !== "").length;
const percentage = total > 0 ? (validDoiCount / total) * 100 : 0;

  const idGraduateProgram = ''

  const [filters, setFilters] = useState<Filter[]>([]);

  // Função para lidar com a atualização de researcherData
  const handleResearcherUpdate = (newResearcherData: Filter[]) => {
    setFilters(newResearcherData);


  };
  // Atualização de `yearString` e `qualisString` dentro do useMemo
  const urlTermPublicacoes = useMemo(() => {
    const yearString = filters.length > 0 ? filters[0].year.join(';') : '';
    const qualisString = filters.length > 0 ? filters[0].qualis.join(';') : '';
    console.log('yearString', yearString)
    let url = `${urlGeral}bibliographic_production_article?terms=&year=${yearString}&qualis=${qualisString}&university=&distinct=${distinct ? '1' : '0'}&graduate_program_id=${String(idGraduateProgram) === "0" ? "" : idGraduateProgram}`;

    if (valoresSelecionadosExport !== '') {
      if (searchType === 'name') {
        url = `${urlGeral}bibliographic_production_researcher?terms=${valoresSelecionadosExport}&researcher_id=&type=ARTICLE&qualis=${qualisString}&year=${yearString}`;
      } else if (searchType === 'article') {
        url = `${urlGeral}bibliographic_production_article?terms=${valoresSelecionadosExport}&year=${yearString}&qualis=${qualisString}&university=&distinct=${distinct ? '1' : '0'}&graduate_program_id=${String(idGraduateProgram) === "0" ? "" : idGraduateProgram}`;
      } else if (searchType === 'area') {
        url = `${urlGeral}bibliographic_production_article_area?area_specialty=${valoresSelecionadosExport.replace(/;/g, ' ')}&great_area=&year=${yearString}&qualis=${qualisString}`;
      } else if (searchType === 'abstract') {
        url = `${urlGeral}bibliographic_production_article?terms=${valoresSelecionadosExport}&year=${yearString}&qualis=${qualisString}&university=&distinct=${distinct ? '1' : '0'}`;
      }
    }

    console.log('urlTermPublicacoes', url);
    return url;
  }, [filters, searchType, valoresSelecionadosExport, distinct, idGraduateProgram]);


  console.log('urlTermPublicacoes', urlTermPublicacoes)
  useMemo(() => {
    const fetchData = async () => {
      isLoading(true)
      try {
      
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

  return (

    <div className="grid grid-cols-1 gap-4 pb-16">
      <HeaderResult />
      <div className="pt-4">
        <Alert className={`p-0 bg-cover bg-no-repeat bg-center `}  >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de artigos
            </CardTitle>
            <Quotes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publicacoes.length}</div>
            <p className="text-xs text-muted-foreground flex gap-2">
              encontrados na busca <p className="text-eng-blue">({percentage.toFixed(2)}% com DOI)</p>
            </p>
          </CardContent>
        </Alert>
      </div>

     <div className="mt-6">
     <FilterArticle
        onFilterUpdate={handleResearcherUpdate} />
     </div>

      <Accordion defaultValue="item-1" type="single" collapsible >
        <AccordionItem value="item-1" >
          <div className="flex">
            <HeaderResultTypeHome title="Gráfico de quantidade total por Qualis" icon={<ChartBar size={24} className="text-gray-400" />}>
            </HeaderResultTypeHome>

            <AccordionTrigger>

            </AccordionTrigger>
          </div>

          <AccordionContent className="p-0" >
            {loading ? (
              <Skeleton className="w-full rounded-md h-[300px]" />
            ) : (
              <GraficoArticleHome
                articles={publicacoes}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion defaultValue="item-1" type="single" collapsible>
        <AccordionItem value="item-1" >
          <div className="flex mb-2">
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

              <div className="hidden md:flex gap-2 mr-2">
                <Button onClick={() => setTypeVisu('rows')} variant="outline" className={`bg-transparent border-0 ${typeVisu == 'rows' && ('bg-white dark:bg-neutral-800 border')}`} size={'icon'}>
                  <Rows size={16} className=" whitespace-nowrap" />
                </Button>
                <Button onClick={() => setTypeVisu('block')} variant="outline" className={`bg-transparent border-0 ${typeVisu == 'block' && ('bg-white dark:bg-neutral-800 border')} `} size={'icon'}>
                  <SquaresFour size={16} className=" whitespace-nowrap" />
                </Button>
              </div>
            </HeaderResultTypeHome>
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
              ) : (
                <ArticleBlock
                  articles={publicacoes}
                  distinct={distinct}
                />
              )
            ) : (
              loading ? (

                <Skeleton className="w-full rounded-md h-[400px]" />
              ) : (
                <TableReseracherArticleshome
                  articles={publicacoes}
                />
              )
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>

  )
}
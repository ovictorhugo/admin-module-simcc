import { useContext, useEffect, useState } from "react";
import { useModalResult } from "../../hooks/use-modal-result";
import { UserContext } from "../../../context/context";
import { CloudWordResearcherHome } from "./researchers-home/clould-word-researcher-home";
import { HeaderResultTypeHome } from "./header-result-type-home";
import { ListNumbers, Rows, SquaresFour, UserList } from "phosphor-react";
import { Button } from "../../ui/button";
import { ResearchersBloco } from "./researchers-home/researchers-bloco";
import { ResearcherMap } from "./researchers-home/researcher-map";
import { TableReseracherhome } from "./researchers-home/table-reseracher-home";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";
import { Skeleton } from "../../ui/skeleton";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useModalSidebar } from "../../hooks/use-modal-sidebar";
import { useLocation, useNavigate } from "react-router-dom";

type Research = {
  among: number,
  articles: number,
  book: number,
  book_chapters: number,
  id: string,
  name: string,
  university: string,
  lattes_id: string,
  area: string,
  lattes_10_id: string,
  abstract: string,
  city: string,
  orcid: string,
  image: string
  graduation: string,
  patent: string,
  software: string,
  brand: string,
  lattes_update: Date,
  h_index: string,
  relevance_score: string,
  works_count: string,
  cited_by_count: string,
  i10_index: string,
  scopus: string,
  openalex: string,
}
interface ItemsSelecionados {
  term: string
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export function ResearchersHome() {
  const { isOpen, type } = useModalResult();
  const { isOpen: isOpenSidebar } = useModalSidebar();
  const [loading, setLoading] = useState(false);
  const [researcher, setResearcher] = useState<Research[]>([]);
  const [typeVisu, setTypeVisu] = useState('block');
  const { itemsSelecionados, setItensSelecionados, urlGeral, searchType, setSearchType, valoresSelecionadosExport, valorDigitadoPesquisaDireta, navbar, setValoresSelecionadosExport } = useContext(UserContext);
  const { mapModal, setMapModal, pesquisadoresSelecionados } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem('pesquisadoresSelecionados', JSON.stringify(pesquisadoresSelecionados));
  }, [pesquisadoresSelecionados]);

  const queryUrl = useQuery();
  const navigate = useNavigate();
  const type_search = queryUrl.get('type_search');
  const terms = queryUrl.get('terms');

  useEffect(() => {
    setSearchType(String(type_search || ''));
    setValoresSelecionadosExport(terms || '')
  }, [type_search, terms]);


  const isModalOpen = isOpen && type === "researchers-home";

  let urlTermPesquisadores = ``;

  if (searchType === 'name') {
    urlTermPesquisadores = `${urlGeral}/researcherName?name=${terms}${valorDigitadoPesquisaDireta.split(" ").join(";")}`;
  } else if (searchType === 'article') {
    urlTermPesquisadores = `${urlGeral}researcher?terms=${terms}${valorDigitadoPesquisaDireta}&university=&type=ARTICLE&graduate_program_id=`;
  } else if (searchType === 'book') {
    urlTermPesquisadores = `${urlGeral}researcherBook?term=${terms}${valorDigitadoPesquisaDireta}&university=&type=BOOK`;
  } else if (searchType === 'area') {
    urlTermPesquisadores = `${urlGeral}/researcherArea_specialty?area_specialty=${terms}${valorDigitadoPesquisaDireta}&university=&graduate_program_id=`;
  } else if (searchType === 'speaker') {
    urlTermPesquisadores = `${urlGeral}researcherParticipationEvent?term=${terms}${valorDigitadoPesquisaDireta}&university=`;
  } else if (searchType === 'patent') {
    urlTermPesquisadores = `${urlGeral}/researcherPatent?term=${terms}${valorDigitadoPesquisaDireta}&graduate_program_id=&university=`;
  } else if (searchType === 'abstract') {
    urlTermPesquisadores = `${urlGeral}researcher?terms=${terms}${valorDigitadoPesquisaDireta}&university=&type=ABSTRACT&graduate_program_id=`;
  }

  console.log(urlTermPesquisadores);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(urlTermPesquisadores, {
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
          setResearcher(data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [urlTermPesquisadores]);

  const items = Array.from({ length: 12 }, (_, index) => (
    <Skeleton key={index} className="w-full rounded-md h-[170px]" />
  ));

  return (
    <>
      {isModalOpen && (
        <div className="w-full flex gap-6 mb-[150px] justify-center">
          <div className="flex-1 flex flex-col">
            {searchType !== 'abstract' && searchType !== 'name' && searchType !== 'area' && (
              <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <HeaderResultTypeHome title="Pesquisadores mais relevantes por ordem de ocorrências" icon={<ListNumbers size={24} className="text-gray-400" />}>
                    </HeaderResultTypeHome>
                  </AccordionTrigger>
                  <AccordionContent>
                    {loading ? (
                      <Skeleton className="w-full rounded-md h-[300px]" />
                    ) : (
                      <CloudWordResearcherHome researcher={researcher} />
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            <div>
              <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <HeaderResultTypeHome title="Pesquisadores por detalhamento" icon={<UserList size={24} className="text-gray-400" />}>
                      <Button onClick={() => setTypeVisu('rows')} variant="ghost" className={`h-9 w-9 ${typeVisu === 'rows' && 'bg-white dark:bg-neutral-800'}`} size={'icon'}>
                        <Rows size={16} className="whitespace-nowrap" />
                      </Button>
                      <Button onClick={() => setTypeVisu('block')} variant="ghost" className={`h-9 w-9 ${typeVisu === 'block' && 'bg-white dark:bg-neutral-800'}`} size={'icon'}>
                        <SquaresFour size={16} className="whitespace-nowrap" />
                      </Button>
                    </HeaderResultTypeHome>
                  </AccordionTrigger>
                  <AccordionContent>
                    {typeVisu === 'block' ? (
                      loading ? (
                        <ResponsiveMasonry
                          columnsCountBreakPoints={{
                            350: 1,
                            750: 2,
                            900: 3,
                            1200: 3
                          }}
                        >
                          <Masonry gutter="16px">
                            {items.map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                          </Masonry>
                        </ResponsiveMasonry>
                      ) : (
                        <ResearchersBloco researcher={researcher} />
                      )
                    ) : (
                      loading ? (
                        <Skeleton className="w-full rounded-md h-[400px]" />
                      ) : (
                        <TableReseracherhome researcher={researcher} />
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {mapModal && (
            <div className="flex w-[450px] top-20 sticky">
              <div className="w-[450px]"></div>
              <div className="flex w-[450px] h-screen pb-[230px] top-20 fixed">
                {loading ? (
                  <Skeleton className="w-full rounded-md h-screen pb-[230px] top-20 fixed" />
                ) : (
                  <ResearcherMap researcher={researcher} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

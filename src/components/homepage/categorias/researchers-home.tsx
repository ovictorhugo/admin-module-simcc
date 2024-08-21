import { useContext, useEffect, useState } from "react";
import { useModalResult } from "../../hooks/use-modal-result";
import { UserContext } from "../../../context/context";
import { CloudWordResearcherHome } from "./researchers-home/clould-word-researcher-home";
import { HeaderResultTypeHome } from "./header-result-type-home";
import { FadersHorizontal, ListNumbers, Rows, SquaresFour, UserList } from "phosphor-react";
import { Button } from "../../ui/button";
import { ResearchersBloco } from "./researchers-home/researchers-bloco";
import { TableReseracherhome } from "./researchers-home/table-reseracher-home";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";
import { Skeleton } from "../../ui/skeleton";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "../../ui/alert";
import { CardContent,  CardHeader, CardTitle } from "../../ui/card";
import { Hash, Trash, User } from "lucide-react";
import bg_popup from '../../../assets/bg_popup.png';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { useModal } from "../../hooks/use-modal-store";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group"

import { Label } from "../../ui/label";
import { HeaderResult } from "../header-results";


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
  subsidy:Bolsistas[]
  graduate_programs:GraduatePrograms[]
}

interface Bolsistas {
  aid_quantity:string
  call_title:string
  funding_program_name:string
  modality_code:string
  category_level_code:string
  institute_name:string
  modality_name:string
  scholarship_quantity:string
  }

  interface  GraduatePrograms {
    graduate_program_id:string
    name:string
  }

  
interface ItemsSelecionados {
  term: string
}

interface ResearchOpenAlex {
  display_name:string
  id: string
  orcid:string
  works_count:string
  works_api_url:string
  relevance_score:string
  cited_by_count:string
  summary_stats:SummaryStats
  ids:Ids
}

interface SummaryStats {

  h_index:string
  i10_index:string
}

interface Ids {
  scopus:string
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

type FiltersModalProps = {
  researcher: Research[];
  setResearcher: React.Dispatch<React.SetStateAction<Research[]>>;
};

export function FiltersModal({ researcher, setResearcher }: FiltersModalProps) {

  const { onClose, isOpen, type: typeModal } = useModal();
    const isModalOpen = isOpen && typeModal === "filters";
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [selectedGraduations, setSelectedGraduations] = useState([]);
  
    const handleAreaToggle = (value:any) => {
      setSelectedAreas(value);
    };
  
    const handleGraduationToggle = (value:any) => {
      setSelectedGraduations(value);
    };

    const filteredResearchers = researcher.filter((res) => {
      const areas = res.area.split(';').map(area => area.trim()); // Split and trim areas
      const hasSelectedArea = selectedAreas.length === 0 || selectedAreas.some((selectedArea) =>
        areas.some((area) => area.includes(selectedArea)) // Check if any area includes the selected area
      );
      const hasSelectedGraduation = selectedGraduations.length === 0 || selectedGraduations.includes(res.graduation);
      return hasSelectedArea && hasSelectedGraduation;
    });
  
    const applyFilters = () => {
    
  
      setResearcher(filteredResearchers);
      onClose();
    };
  
    const clearFilters = () => {
      setSelectedAreas([]);
      setSelectedGraduations([]);
      // Reset to initial researchers data if you have the original data stored somewhere
      // setResearcher(initialResearcherData);
      setResearcher(researcher);
      onClose();
    };
     // Ensure unique areas and graduations
  const uniqueAreas = Array.from(new Set(researcher.flatMap((res) => res.area.split(';').map(area => area.trim()))));
  const uniqueGraduations = Array.from(new Set(researcher.map((res) => res.graduation)));

  useEffect(() => {
    if(researcher.length == 0) {
      setSelectedAreas([]);
      setSelectedGraduations([]);
    }
  }, [researcher]);

  
  
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[40vw]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-medium">Filtros de pesquisa</DialogTitle>
        </DialogHeader>

        <div>
        <div className="pb-2">
        <Label >Área de especialidade</Label>
        </div>
         

          <ToggleGroup
            type="multiple"
            value={selectedAreas}
            onValueChange={handleAreaToggle}
            className="aspect-auto flex flex-wrap items-start justify-start"
          >
             {uniqueAreas.map((area) => (
              <ToggleGroupItem key={area} value={area}>
                {area}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div>
        <div className="pb-2">
        <Label >Titulação</Label>
        </div>
         

          <ToggleGroup
            type="multiple"
            value={selectedGraduations}
            onValueChange={handleGraduationToggle}
             className="aspect-auto  flex flex-wrap items-start justify-start"
          >
            {uniqueGraduations.map((grad) => (
              <ToggleGroupItem key={grad} value={grad}>
                {grad}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <DialogFooter className="py-4">
          <Button variant="ghost" onClick={clearFilters}>
            <Trash size={16} /> Limpar Filtros
          </Button>
          <Button onClick={applyFilters} className="text-white dark:text-white">
            <FadersHorizontal size={16} /> Mostrar {filteredResearchers.length} resultados
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ResearchersHome() {
  const { isOpen, type } = useModalResult();

  const [loading, setLoading] = useState(false);
  const [researcher, setResearcher] = useState<Research[]>([]);
  const [originalResearcher, setOriginalResearcher] = useState<Research[]>([]);
  const [typeVisu, setTypeVisu] = useState('block');
  const { itemsSelecionados,  urlGeral, searchType, setSearchType, setValoresSelecionadosExport } = useContext(UserContext);
  const { pesquisadoresSelecionados, idGraduateProgram } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem('pesquisadoresSelecionados', JSON.stringify(pesquisadoresSelecionados));
  }, [pesquisadoresSelecionados]);

  const queryUrl = useQuery();
  const navigate = useNavigate();
  const type_search = queryUrl.get('type_search');
  const terms = queryUrl.get('terms');
  const openAlexState = queryUrl.get('open_alex');

  let FinalOpenAlex = openAlexState || ''



  const isModalOpen = isOpen && type === "researchers-home";

  let urlTermPesquisadores = ``;

  if (searchType === 'name') {
    urlTermPesquisadores = `${urlGeral}researcherName?name=${terms?.replace(/[;|()]/g, '')}`;
  } else if (searchType === 'article') {
    urlTermPesquisadores = `${urlGeral}researcher?terms=${terms}&university=&type=ARTICLE&graduate_program_id=${idGraduateProgram == '0' ? (''):(idGraduateProgram)}`;
  } else if (searchType === 'book') {
    urlTermPesquisadores = `${urlGeral}researcherBook?term=${terms}&university=&type=BOOK&graduate_program_id=${idGraduateProgram == '0' ? (''):(idGraduateProgram)}`; //
  } else if (searchType === 'area') {
    urlTermPesquisadores = `${urlGeral}researcherArea_specialty?area_specialty=${terms}&university=&graduate_program_id=${idGraduateProgram == '0' ? (''):(idGraduateProgram)}`;
  } else if (searchType === 'speaker') {
    urlTermPesquisadores = `${urlGeral}researcherParticipationEvent?term=${terms}&university=&graduate_program_id=${idGraduateProgram == '0' ? (''):(idGraduateProgram)}`; //
  } else if (searchType === 'patent') {
    urlTermPesquisadores = `${urlGeral}researcherPatent?term=${terms}&graduate_program_id=${idGraduateProgram == '0' ? (''):(idGraduateProgram)}&university=`;
  } else if (searchType === 'abstract') {
    urlTermPesquisadores = `${urlGeral}researcher?terms=${terms}&university=&type=ABSTRACT&graduate_program_id=${idGraduateProgram == '0' ? (''):(idGraduateProgram)}`;
  }

  console.log(urlTermPesquisadores);

  const urlOpenAlex =`https://api.openalex.org/authors?filter=display_name.search:${terms?.replace(/[()|;]/g, "")}`;
  const [researcherOpenAlex , setResearcherOpenAlex] = useState<ResearchOpenAlex[]>([])
const [isOpenAlex, setIsOpenAlex] = useState(false)

  const fetchDataOpenAlex = async () => {
 
      try {
        const response = await fetch(urlOpenAlex, {
          mode: "cors",
          headers: {
            // Adicione quaisquer headers necessários aqui
          },
        });
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const firstFiveResults = data.results.slice(0, 1);
          
          setResearcherOpenAlex(firstFiveResults);
        }
        
      } catch (err) {
        console.log(err);
      }
  };

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
          setOriginalResearcher(data);
          setLoading(false)
        } 
        if(originalResearcher.length == 0 && FinalOpenAlex == 'true') {
          console.log('oi')
          console.log(urlOpenAlex);
          await fetchDataOpenAlex();
          if (researcherOpenAlex.length > 0) {
            setIsOpenAlex(true);
            console.log(researcherOpenAlex);
          }
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

  const totalAmong = researcher.reduce((sum, researcher) => sum + researcher.among, 0);



  return (
    <>
      {isModalOpen && (
        <div className="w-full flex gap-6 mb-8 justify-center">
          <div className="flex-1 flex flex-col">
           <div className="">
           <HeaderResult/>
           </div>
         {(!isOpenAlex && FinalOpenAlex != 'true' ) && (
           <div className="grid gap-4 md:mt-8 mt-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
           {(searchType != 'abstract' && searchType != 'name' && searchType != 'area') && (
              <Alert className="p-0 bg-cover bg-no-repeat bg-center lg:col-span-3"  style={{ backgroundImage: `url(${bg_popup})` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de ocorrências
                </CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAmong}</div>
               <div className="flex items-center gap-3">
               <p className="text-xs text-muted-foreground">
                  pela pesquisa
                </p>
       
                <div className="flex gap-2">
                {itemsSelecionados.map((valor, index) => {
                 return(
                     <>
                     <div key={index} className={`flex gap-2 items-center w-fit p-2 px-3 capitalize rounded-md text-xs ${searchType == 'article' && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract' && ('bg-yellow-500 dark:bg-yellow-500')} ${searchType == 'speaker' && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book' && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent' && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name' && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area' && ('bg-green-500 dark:bg-green-500')} ${searchType == '' && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} >
                     {valor.term.replace(/[|;]/g, '')}
                         
                         {/* Adicionando a escolha entre "e" ou "ou" */}
                         
                     </div>
       
                     {index < itemsSelecionados.length - 1 && (
         <div className="rounded-full flex items-center justify-center whitespace-nowrap h-8 w-8 bg-neutral-100  dark:bg-neutral-800 transition-all text-xs outline-none" onClick={() => {
           const connector = itemsSelecionados[index].term.endsWith('|') ? ';' : '|'; // Alterna entre "|" e ";" conforme necessário
          
         }} >
           {itemsSelecionados[index].term.endsWith(';') ? "e" : "ou"}
         </div>
       )}
       
                     </>
                 );
             })}
                </div>
               </div>
              </CardContent>
              </Alert>
           )}
       
                         <Alert className={`p-0 bg-cover bg-no-repeat bg-center ${(searchType == 'abstract' || searchType == 'name' || searchType == 'area') && ('col-span-4')}`}  >
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">
                             Total de pesquisadores
                           </CardTitle>
                           <User className="h-4 w-4 text-muted-foreground" />
                         </CardHeader>
                         <CardContent>
                           <div className="text-2xl font-bold">{researcher.length}</div>
                           <p className="text-xs text-muted-foreground">
                             encontrados na busca
                           </p>
                         </CardContent>
                         </Alert>
       
                     
            </div>
         )}

            {searchType !== 'abstract' && searchType !== 'name' && searchType !== 'area' && (
              <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                <div className="flex mb-2">
                <HeaderResultTypeHome title="Pesquisadores mais relevantes por ordem de ocorrências" icon={<ListNumbers size={24} className="text-gray-400" />}>
                    </HeaderResultTypeHome>
                  <AccordionTrigger>
                   
                  </AccordionTrigger>
                  </div>
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

            {(!isOpenAlex && FinalOpenAlex != 'true' )&& (
              <div>
              <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                <div className="flex mb-2">
                <HeaderResultTypeHome title="Pesquisadores por detalhamento" icon={<UserList size={24} className="text-gray-400" />}>
                      <div className="flex gap-3 mr-3">
                      <Button onClick={() => setTypeVisu('rows')}  variant={typeVisu === 'block' ? 'ghost' : 'outline'} size={'icon'}>
                        <Rows size={16} className="whitespace-nowrap" />
                      </Button>
                      <Button onClick={() => setTypeVisu('block')} variant={typeVisu === 'block' ? 'outline' : 'ghost'}  size={'icon'}>
                        <SquaresFour size={16} className="whitespace-nowrap" />
                      </Button>
                      </div>
                    </HeaderResultTypeHome>
                  <AccordionTrigger>
                 
                  </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    {typeVisu === 'block' ? (
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
            )}

            {(isOpenAlex && FinalOpenAlex === 'true') && (
              <div>
                <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                <div className="flex mb-2">
                <HeaderResultTypeHome title="Pesquisador encontrado no OpenAlex" icon={<UserList size={24} className="text-gray-400" />}>
                      <div className="flex gap-3 mr-3">
                      <Button onClick={() => setTypeVisu('rows')}  variant={typeVisu === 'block' ? 'ghost' : 'outline'} size={'icon'}>
                        <Rows size={16} className="whitespace-nowrap" />
                      </Button>
                      <Button onClick={() => setTypeVisu('block')} variant={typeVisu === 'block' ? 'outline' : 'ghost'}  size={'icon'}>
                        <SquaresFour size={16} className="whitespace-nowrap" />
                      </Button>
                      </div>
                    </HeaderResultTypeHome>
                  <AccordionTrigger>
                 
                  </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    {typeVisu === 'block' ? (
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
            )}
          </div>


<FiltersModal 
        researcher={originalResearcher} 
        setResearcher={setResearcher} 
      />

        </div>

        
      )}
    </>
  );
}

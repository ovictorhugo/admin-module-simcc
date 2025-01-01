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

import { useLocation} from "react-router-dom";
import { Alert } from "../../ui/alert";
import { CardContent,  CardHeader, CardTitle } from "../../ui/card";
import { Hash,  MapIcon,  Sparkles, Trash, User, X } from "lucide-react";
import bg_popup from '../../../assets/bg_popup.png';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { useModal } from "../../hooks/use-modal-store";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group"

import { Label } from "../../ui/label";
import { HeaderResult } from "../header-results";
import { SymbolEEWhite } from "../../svg/SymbolEEWhite";
import { SymbolEE } from "../../svg/SymbolEE";
import { useTheme } from "next-themes";
import { MariaHome } from "../maria-home";
import MapaResearcher from "./researchers-home/mapa-researcher";

//mapa
import municipios from './researchers-home/municipios.json';
import { Sheet, SheetContent } from "../../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { ScrollArea } from "../../ui/scroll-area";

type CityData = {
  nome: string;
  latitude: number;
  longitude: number;
  pesquisadores: number;
  professores: string[];
  lattes_10_id: string;
};

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
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedGraduations, setSelectedGraduations] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [selectedSubsidies, setSelectedSubsidies] = useState<string[]>([]);
  const [filteredCount, setFilteredCount] = useState<number>(0);

  const {simcc} = useContext(UserContext)
  useEffect(() => {
    // Calculate filtered results count
    let filtered = [...researcher];
    if (selectedAreas.length > 0) {
      filtered = filtered.filter((r) => selectedAreas.some((selectedArea) =>
        r.area.split(';').map(area => area.trim()).some((area) => area.includes(selectedArea))
      ));
    }
    if (selectedGraduations.length > 0) {
      filtered = filtered.filter((r) => selectedGraduations.includes(r.graduation));
    }
    if (selectedCities.length > 0) {
      filtered = filtered.filter((r) => selectedCities.includes(r.city));
    }
    if (selectedUniversities.length > 0) {
      filtered = filtered.filter((r) => selectedUniversities.includes(r.university));
    }
    if (selectedSubsidies.length > 0) {
      filtered = filtered.filter((r) => {
        if (!r.subsidy || !Array.isArray(r.subsidy)) return false;
        return r.subsidy.some(s => selectedSubsidies.includes(s.modality_name));
      });
    }
    setFilteredCount(filtered.length);
  }, [researcher, selectedAreas, selectedGraduations, selectedCities, selectedUniversities, selectedSubsidies]);

  const handleAreaToggle = (value: any) => {
    setSelectedAreas(value);
  };

  const handleGraduationToggle = (value: any) => {
    setSelectedGraduations(value);
  };

  const handleCityToggle = (value: any) => {
    setSelectedCities(value);
  };

  const handleUniversityToggle = (value: any) => {
    setSelectedUniversities(value);
  };

  const handleSubsidyToggle = (value: any) => {
    setSelectedSubsidies(value);
  };

  const filteredResearchers = researcher.filter((res) => {
    const areas = res.area.split(';').map(area => area.trim());
    const hasSelectedArea = selectedAreas.length === 0 || selectedAreas.some((selectedArea) =>
      areas.some((area) => area.includes(selectedArea))
    );
    const hasSelectedGraduation = selectedGraduations.length === 0 || selectedGraduations.includes(res.graduation);
    const hasSelectedCity = selectedCities.length === 0 || selectedCities.includes(res.city);
    const hasSelectedUniversity = selectedUniversities.length === 0 || selectedUniversities.includes(res.university);
    const hasSelectedSubsidy = selectedSubsidies.length === 0 || (
      res.subsidy && res.subsidy.some(sub => selectedSubsidies.includes(sub.modality_name))
    );

    return hasSelectedArea && hasSelectedGraduation && hasSelectedCity && hasSelectedUniversity && hasSelectedSubsidy;
  });

  const applyFilters = () => {
    setResearcher(filteredResearchers);
    onClose();
  };

  const clearFilters = () => {
    setSelectedAreas([]);
    setSelectedGraduations([]);
    setSelectedCities([]);
    setSelectedUniversities([]);
    setSelectedSubsidies([]);
    setResearcher(researcher);
    onClose();
  };

  // Ensure unique values
  const uniqueAreas = Array.from(new Set(researcher.flatMap((res) => res.area.split(';').map(area => area.trim()))));
  const uniqueGraduations = Array.from(new Set(researcher.map((res) => res.graduation)));
  const uniqueCities = Array.from(new Set(researcher.map((res) => res.city))).filter(Boolean);
  const uniqueUniversities = Array.from(new Set(researcher.map((res) => res.university))).filter(Boolean);
  const uniqueSubsidies = Array.from(
    new Set(
      researcher.flatMap((res) => 
        Array.isArray(res.subsidy) ? res.subsidy.map((sub) => sub.modality_name) : []
      )
    )
  ).filter(Boolean);

  useEffect(() => {
    if(researcher.length == 0) {
      setSelectedAreas([]);
      setSelectedGraduations([]);
      setSelectedCities([]);
      setSelectedUniversities([]);
      setSelectedSubsidies([]);
    }
  }, [researcher]);

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose}>
       <SheetContent className={`p-0 dark:bg-neutral-900 dark:border-gray-600 min-w-[60vw]`}>
      <DialogHeader className="h-[50px] px-4 justify-center border-b dark:border-gray-600">
 
 <div className="flex items-center gap-3">



 <TooltipProvider>
<Tooltip>
  <TooltipTrigger asChild>
  <Button className="h-8 w-8" variant={'outline'}  onClick={() => {
    onClose()
  }} size={'icon'}><X size={16}/></Button>
  </TooltipTrigger>
  <TooltipContent> Fechar</TooltipContent>
</Tooltip>
</TooltipProvider>



 </div>
  
 </DialogHeader>

 <div className="relative flex">

 <div className="p-8 pr-0">
 <div className="h-full w-[270px] rounded-md bg-eng-blue p-8"></div>
 
 </div>
         <ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-50px)] p-8 ">
         <div>
                      <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                      Pesquisadores
                        </p>

                        <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] mb-8 md:block">
                        Filtros de pesquisa
                        </h1>
                      </div>



                      <div className="space-y-6">
          {/* Área de especialidade */}
          <div>
            <div className="pb-2">
              <Label>Área de especialidade</Label>
            </div>
            <ToggleGroup
              type="multiple"
              variant={'outline'}
              value={selectedAreas}
              onValueChange={handleAreaToggle}
              className="aspect-auto flex flex-wrap items-start justify-start gap-2"
            >
              {uniqueAreas.map((area) => (
                <ToggleGroupItem key={area} value={area} className="px-3 py-2">
                  {area}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Titulação */}
          <div>
            <div className="pb-2">
              <Label>Titulação</Label>
            </div>
            <ToggleGroup
              type="multiple"
              variant={'outline'}
              value={selectedGraduations}
              onValueChange={handleGraduationToggle}
              className="aspect-auto flex flex-wrap items-start justify-start gap-2"
            >
              {uniqueGraduations.map((graduation) => (
                <ToggleGroupItem key={graduation} value={graduation} className="px-3 py-2">
                  {graduation}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Cidade */}
        {simcc && (
            <div>
            <div className="pb-2">
              <Label>Cidade</Label>
            </div>
            <ToggleGroup
              type="multiple"
              variant={'outline'}
              value={selectedCities}
              onValueChange={handleCityToggle}
              className="aspect-auto flex flex-wrap items-start justify-start gap-2"
            >
              {uniqueCities.map((city) => (
                <ToggleGroupItem key={city} value={city} className="px-3 py-2">
                  {city}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}

          {/* Universidade */}
         {simcc && (
           <div>
           <div className="pb-2">
             <Label>Universidade</Label>
           </div>
           <ToggleGroup
             type="multiple"
             variant={'outline'}
             value={selectedUniversities}
             onValueChange={handleUniversityToggle}
             className="aspect-auto flex flex-wrap items-start justify-start gap-2"
           >
             {uniqueUniversities.map((university) => (
               <ToggleGroupItem key={university} value={university} className="px-3 py-2">
                 {university}
               </ToggleGroupItem>
             ))}
           </ToggleGroup>
         </div>
         )}

          {/* Tipo de Subsídio */}
          <div>
            <div className="pb-2">
              <Label>Tipo de Subsídio</Label>
            </div>
            <ToggleGroup
              type="multiple"
              variant={'outline'}
              value={selectedSubsidies}
              onValueChange={handleSubsidyToggle}
              className="aspect-auto flex flex-wrap items-start justify-start gap-2"
            >
              {uniqueSubsidies.map((subsidy) => (
                <ToggleGroupItem key={subsidy} value={subsidy} className="px-3 py-2">
                  {subsidy === 'pq' ? 'Produtividade em Pesquisa' : subsidy === 'dt' ? 'Desenvolvimento Tecnológico' : subsidy}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <DialogFooter className="py-4">
          <Button variant="ghost" onClick={clearFilters} className="gap-2">
            <Trash size={16} />
            Limpar Filtros
          </Button>

          <Button onClick={applyFilters} className="gap-2">
            <FadersHorizontal size={16} />
            Mostrar {filteredCount} resultados
          </Button>
        </DialogFooter>
         </ScrollArea>
  </div>
        
   

       

     
      </SheetContent>
    </Sheet>
  );
}

export function ResearchersHome() {
  const { isOpen, type } = useModalResult();

  const [loading, setLoading] = useState(false);
  const [researcher, setResearcher] = useState<Research[]>([]);
  const [originalResearcher, setOriginalResearcher] = useState<Research[]>([]);
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [typeVisu, setTypeVisu] = useState('block');
  const { itemsSelecionados,  urlGeral, searchType, simcc } = useContext(UserContext);
  const { pesquisadoresSelecionados, idGraduateProgram } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem('pesquisadoresSelecionados', JSON.stringify(pesquisadoresSelecionados));
  }, [pesquisadoresSelecionados]);

  const queryUrl = useQuery();

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
          setLoading(false);

          // Process city data
          const counts = {};
          const cityProfessors = {};
          const cityLattess1Ids = {};

          const normalizedData = data.map((research) => ({
            ...research,
            city: normalizeCityName(research.city),
          }));

          normalizedData.forEach((research) => {
            const city = research.city;
            const codigoUf = municipios.find(
              (municipio) => normalizeCityName(municipio.nome) === city
            )?.codigo_uf;

            if (codigoUf === 29) {
              counts[city] = (counts[city] || 0) + 1;
              if (!cityProfessors[city]) {
                cityProfessors[city] = [];
              }
              cityProfessors[city].push(research.name);
              if (!cityLattess1Ids[city]) {
                cityLattess1Ids[city] = research.lattes_10_id;
              }
            }
          });

          const updatedCityData: CityData[] = [];
          municipios.forEach((municipio) => {
            const cityName = normalizeCityName(municipio.nome);
            const pesquisadores = counts[cityName] || 0;

            if (pesquisadores > 0 && municipio.codigo_uf === 29) {
              updatedCityData.push({
                nome: municipio.nome,
                latitude: municipio.latitude,
                longitude: municipio.longitude,
                pesquisadores: pesquisadores,
                professores: cityProfessors[cityName] || [],
                lattes_10_id: cityLattess1Ids[cityName] || '',
              });
            }
          });

          setCityData(updatedCityData);
        }

        // Check OpenAlex data only if no researchers found and OpenAlex is enabled
        if (data.length === 0 && FinalOpenAlex === 'true') {
          try {
            const openAlexResponse = await fetch(urlOpenAlex, {
              mode: "cors"
            });
            const openAlexData = await openAlexResponse.json();
            if (openAlexData.results?.length > 0) {
              const firstResult = openAlexData.results[0];
              setResearcherOpenAlex([firstResult]);
              setIsOpenAlex(true);
            }
          } catch (err) {
            console.error("OpenAlex fetch error:", err);
          }
        }
      } catch (err) {
        console.error("Main data fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [urlTermPesquisadores, FinalOpenAlex, urlOpenAlex]);

  useEffect(() => {
    const processCityData = () => {
      const cityMap = new Map<string, CityData>();
      
      researcher.forEach(r => {
        if (r.city) {
          if (!cityMap.has(r.city)) {
            cityMap.set(r.city, {
              nome: r.city,
              latitude: 0, // You'll need to add actual coordinates
              longitude: 0, // You'll need to add actual coordinates
              pesquisadores: 1,
              professores: [r.name],
              lattes_10_id: r.lattes_10_id
            });
          } else {
            const city = cityMap.get(r.city)!;
            city.pesquisadores += 1;
            city.professores.push(r.name);
          }
        }
      });
      
      setCityData(Array.from(cityMap.values()));
    };

    processCityData();
  }, [researcher]);

  const items = Array.from({ length: 12 }, (_, index) => (
    <Skeleton key={index} className="w-full rounded-md h-[300px]" />
  ));

  const totalAmong = researcher.reduce((sum, researcher) => sum + researcher.among, 0);

  const {theme} = useTheme()

  //mapa
    const normalizeCityName = (cityName: string) => {
      // Normaliza o nome da cidade (ex: "Ilhéus" -> "Ilheus")
      return cityName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

  return (
    <div className="flex flex-col w-full">
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
                        return (
                          <div key={index}>
                            <div className={`flex gap-2 items-center w-fit p-2 px-3 capitalize rounded-md text-xs ${searchType == 'article' && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract' && ('bg-yellow-500 dark:bg-yellow-500')} ${searchType == 'speaker' && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book' && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent' && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name' && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area' && ('bg-green-500 dark:bg-green-500')} ${searchType == '' && ('bg-blue-700 dark:bg-blue-700')} text-white border-0`}>
                              {valor.term.replace(/[|;]/g, '')}
                            </div>
                            {index < itemsSelecionados.length - 1 && (
                              <div className="rounded-full flex items-center justify-center whitespace-nowrap h-8 w-8 bg-neutral-100 dark:bg-neutral-800 transition-all text-xs outline-none">
                                {itemsSelecionados[index].term.endsWith(';') ? "e" : "ou"}
                              </div>
                            )}
                          </div>
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

          <MariaHome/>

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

          {(simcc && searchType != 'name') && (
            <Accordion defaultValue="item-1"  type="single" collapsible >
            <AccordionItem value="item-1" >
            <div className="flex mb-2">
            <HeaderResultTypeHome title="Pesquisadores no mapa" icon={<MapIcon size={24} className="text-gray-400" />}>
            </HeaderResultTypeHome>

            <AccordionTrigger>
  
            </AccordionTrigger>
            </div>
                <AccordionContent >
                {loading ? (
                  <Skeleton className="w-full rounded-md h-[300px]"/>
                ):( 
                <div>
                   <MapaResearcher
                   cityData={cityData}
                   />
                </div>
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
                        350: 2,
                        750: 3,
                        900: 4,
                        1200:  6,
                        1500: 6,
                        1700: 7
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
    </div>
  );
} 

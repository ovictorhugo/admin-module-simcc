import { useContext, useEffect, useRef, useState } from "react";
import { useModalResult } from "../hooks/use-modal-result";
import { UserContext } from "../../context/context";
import municipios from '../homepage/categorias/researchers-home/municipios.json';
import { FadersHorizontal, ListNumbers, MagnifyingGlass, Rows, SquaresFour, UserList } from "phosphor-react";
import { Button } from "../ui/button";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Skeleton } from "../ui/skeleton";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "../ui/alert";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Hash, MapIcon, Sparkles, Trash, User, X } from "lucide-react";
import bg_popup from '../../assets/bg_popup.png';
import bg_user from '../../assets/user.png';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "../hooks/use-modal-store";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

import { Label } from "../ui/label";
;

import { useTheme } from "next-themes";


//mapa

import { Sheet, SheetContent } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { MariaHome } from "../homepage/maria-home";
import MapaResearcher from "../homepage/categorias/researchers-home/mapa-researcher";
import { TableReseracherhome } from "../homepage/categorias/researchers-home/table-reseracher-home";
import { ResearchersBloco } from "../homepage/categorias/researchers-home/researchers-bloco";
import { HeaderResult } from "../homepage/header-results";

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
  satus: boolean
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
  subsidy: Bolsistas[]
  graduate_programs: GraduatePrograms[]
  departments: Departments[]
}

interface Departments {
  dep_des: string
  dep_email: string
  dep_nom: string
  dep_id: string
  dep_sigla: string
  dep_site: string
  dep_tel: string
  img_data: string
}

interface Bolsistas {
  aid_quantity: string
  call_title: string
  funding_program_name: string
  modality_code: string
  category_level_code: string
  institute_name: string
  modality_name: string
  scholarship_quantity: string
}

interface GraduatePrograms {
  graduate_program_id: string
  name: string
}

interface ResearchOpenAlex {
  display_name: string
  id: string
  orcid: string
  works_count: string
  works_api_url: string
  relevance_score: string
  cited_by_count: string
  summary_stats: SummaryStats
  ids: Ids
}

interface SummaryStats {

  h_index: string
  i10_index: string
}

interface Ids {
  scopus: string
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

type FiltersModalProps = {
  researcher: Research[];
  setResearcher: React.Dispatch<React.SetStateAction<Research[]>>;
};

export function FiltersModal({ researcher, setResearcher }: FiltersModalProps) {
  const isFirstRender = useRef(true);
  const queryUrl = useQuery();
  const getArrayFromUrl = (key: string) => queryUrl.get(key)?.split(";") || [];

  
  const { onClose, isOpen, type: typeModal } = useModal();
  const isModalOpen = isOpen && typeModal === "filters-researcher-listagens";
  const [selectedAreas, setSelectedAreas] = useState<string[]>(getArrayFromUrl("areas"));
  const [selectedGraduations, setSelectedGraduations] = useState<string[]>(getArrayFromUrl("graduations"));
  const [selectedCities, setSelectedCities] = useState<string[]>(getArrayFromUrl("cities"));
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(getArrayFromUrl("universities"));
  const [selectedSubsidies, setSelectedSubsidies] = useState<string[]>(getArrayFromUrl("subsidy"));
  const [selectedGraduatePrograms, setSelectedGraduatePrograms] = useState<string[]>(getArrayFromUrl("graduatePrograms"));
  const [selectedDepartaments, setSelectedDepartaments] = useState<string[]>(getArrayFromUrl("departments"));

  const [filteredCount, setFilteredCount] = useState<number>(0);
  const navigate = useNavigate();

  const { simcc } = useContext(UserContext)
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
    if (selectedGraduatePrograms.length > 0) {
      filtered = filtered.filter((r) => {
        if (!r.graduate_programs || !Array.isArray(r.graduate_programs)) return false;
        return r.graduate_programs.some(gp => selectedGraduatePrograms.includes(gp.name));
      });
    }
    if (selectedDepartaments.length > 0) {
      filtered = filtered.filter((r) => {
        if (!r.departments || !Array.isArray(r.departments)) return false;
        return r.departments.some(gp => selectedDepartaments.includes(gp.dep_sigla));
      });
    }
    setFilteredCount(filtered.length);

      updateFilters("areas", selectedAreas );
    updateFilters("graduations", selectedGraduations);
    updateFilters("cities", selectedCities);
    updateFilters("universities", selectedUniversities);
    updateFilters("subsidy", selectedSubsidies);
    updateFilters("graduatePrograms", selectedGraduatePrograms);
    updateFilters("departments", selectedDepartaments);

    navigate({
      pathname: '/listagens',
      search: queryUrl.toString(),
    });
    

   



  }, [researcher, selectedAreas, selectedGraduations, selectedCities, selectedUniversities, selectedSubsidies, selectedGraduatePrograms, selectedDepartaments]);

  const handleAreaToggle = (value: any) => {
    setSelectedAreas(value);
  };

  const handleGraduationToggle = (value: any) => {
    setSelectedGraduations(value);
  };

  const handleDepartamentToggle = (value: any) => {
    setSelectedDepartaments(value);
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

  const handleGraduateProgramToggle = (value: any) => {
    setSelectedGraduatePrograms(value);
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

    const hasSelectedGraduateProgram = selectedGraduatePrograms.length === 0 || (
      res.graduate_programs && res.graduate_programs.some(gp => selectedGraduatePrograms.includes(gp.name))
    );

    const hasSelectedDepartament = selectedDepartaments.length === 0 || (
      res.departments && res.departments.some(gp => selectedDepartaments.includes(gp.dep_sigla))
    );

    return hasSelectedArea && hasSelectedGraduation && hasSelectedCity && hasSelectedUniversity && hasSelectedSubsidy && hasSelectedGraduateProgram && hasSelectedDepartament;
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
    setSelectedDepartaments([]);
    setSelectedGraduatePrograms([])
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

  const uniqueGraduatePrograms = Array.from(
    new Set(
      researcher.flatMap((res) =>
        Array.isArray(res.graduate_programs) ? res.graduate_programs.map((gp) => gp.name) : []
      )
    )
  ).filter(Boolean);

  const uniqueDepartaments = Array.from(
    new Set(
      researcher.flatMap((res) =>
        Array.isArray(res.departments) ? res.departments.map((gp) => gp.dep_sigla) : []
      )
    )
  ).filter(Boolean);

  useEffect(() => {
    if (researcher.length == 0) {
      setSelectedAreas([]);
      setSelectedGraduations([]);
      setSelectedCities([]);
      setSelectedUniversities([]);
      setSelectedSubsidies([]);
      setSelectedDepartaments([])
      setSelectedGraduatePrograms([])
    }
  }, [researcher]);



  const {version} = useContext(UserContext)


  ///////////q


   // Função para atualizar os filtros na URL
   const updateFilters = (category: string, values: string[]) => {
    if (values.length > 0 ) {
     
      queryUrl.set(category, values.join(";"));
      setResearcher(filteredResearchers);
    } else {
     queryUrl.delete(category)
    }
   
  };

 
  // Carrega os valores da URL ao iniciar a página
  useEffect(() => {

    setSelectedAreas(getArrayFromUrl("areas"));
    setSelectedGraduations(getArrayFromUrl("graduations"));
    setSelectedCities(getArrayFromUrl("cities"));
    setSelectedUniversities(getArrayFromUrl("universities"));
    setSelectedSubsidies(getArrayFromUrl("subsidy"));
    setSelectedGraduatePrograms(getArrayFromUrl("graduatePrograms"));
    setSelectedDepartaments(getArrayFromUrl("departments"));

   
 
  }, []);

  const [search, setSearch] = useState('')
  const [search2, setSearch2] = useState('')

  const filteredTotal = Array.isArray(uniqueGraduatePrograms) ? uniqueGraduatePrograms.filter(item => {
    // Normaliza a string do item e da busca para comparação
    const normalizeString = (str: any) => str
      .normalize("NFD") // Decompõe os caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
      .toLowerCase(); // Converte para minúsculas

    const searchString = normalizeString(item);
    const normalizedSearch = normalizeString(search);

    return searchString.includes(normalizedSearch);
  }) : [];

  const filteredTotal2 = Array.isArray(uniqueCities) ? uniqueCities.filter(item => {
    // Normaliza a string do item e da busca para comparação
    const normalizeString = (str: any) => str
      .normalize("NFD") // Decompõe os caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
      .toLowerCase(); // Converte para minúsculas

    const searchString = normalizeString(item);
    const normalizedSearch = normalizeString(search2);

    return searchString.includes(normalizedSearch);
  }) : [];

  return {
    selectedAreas,
    selectedGraduations,
    selectedCities,
    selectedDepartaments,
    selectedGraduatePrograms,
    selectedSubsidies,
    selectedUniversities,
    clearFilters,
    component: (
    <Sheet open={isModalOpen} onOpenChange={onClose}>
      <SheetContent className={`p-0 dark:bg-neutral-900 dark:border-gray-600 min-w-[60vw]`}>
        <DialogHeader className="h-[50px] px-4 justify-center border-b dark:border-gray-600">

          <div className="flex items-center gap-3">

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="h-8 w-8" variant={'outline'} onClick={() => {
                    onClose()
                  }} size={'icon'}><X size={16} /></Button>
                </TooltipTrigger>
                <TooltipContent> Fechar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

        </DialogHeader>

        <div className="relative flex">

          <div>
            <div className="hidden lg:block p-8 pr-0 h-full">
              <div style={{ backgroundImage: `url(${bg_user})` }} className=" h-full w-[270px]  bg-cover bg-no-repeat bg-left rounded-md bg-eng-blue p-8"></div>

            </div>

          </div>
          <ScrollArea className="relative whitespace-nowrap h-[calc(100vh-50px)] p-8 w-full ">
            <div>
              <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                Pesquisadores
              </p>

              <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] mb-8 md:block">
                Filtros de pesquisa
              </h1>
            </div>

            <div className="w-full">
              {/* Área de especialidade */}
             

              <Accordion defaultValue="item-1" type="single" collapsible className="w-full">
  <AccordionItem value="item-1" className="w-full">
    <div className="flex items-center justify-between">
    <Label>Área de especialidade</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
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
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <div className="flex items-center justify-between">
    <Label>Titulação</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
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
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <div className="flex items-center justify-between">
    <Label>Cidade</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
    <Alert className="h-12 p-2 mb-4 flex items-center justify-between  w-full ">
                <div className="flex items-center gap-2 w-full flex-1">
                  <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
                  <Input onChange={(e) => setSearch2(e.target.value)} value={search2} type="text" className="border-0 w-full " />
                </div>

                <div className="w-fit">


                </div>
              </Alert>

    <ToggleGroup
                    type="multiple"
                    variant={'outline'}
                    value={selectedCities}
                    onValueChange={handleCityToggle}
                    className="aspect-auto flex flex-wrap items-start justify-start gap-2"
                  >
                    {filteredTotal2.map((city) => (
                      <ToggleGroupItem key={city} value={city} className="px-3 py-2">
                        {city}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4">
    <div className="flex items-center justify-between">
    <Label>Universidade</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
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
    </AccordionContent>
  </AccordionItem>


<AccordionItem value="item-5">
    <div className="flex items-center justify-between">
    <Label>Tipo de Subsídio</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
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
    </AccordionContent>
  </AccordionItem>

  {version && (
  <AccordionItem value="item-6">
    <div className="flex items-center justify-between">
    <Label>Departamentos</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
    <ToggleGroup
                type="multiple"
                variant={'outline'}
                value={selectedDepartaments}
                onValueChange={handleDepartamentToggle}
                className="aspect-auto flex flex-wrap items-start justify-start gap-2"
              >
                {uniqueDepartaments.map((program) => (
                  <ToggleGroupItem key={program} value={program} className="px-3 py-2 whitespace-normal">
                    {program}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
    </AccordionContent>
  </AccordionItem>
)}

<AccordionItem value="item-7">
    <div className="flex items-center justify-between">
    <Label>Programas de Pós-graduação</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
    <Alert className="h-12 p-2 mb-4 flex items-center justify-between  w-full ">
                <div className="flex items-center gap-2 w-full flex-1">
                  <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
                  <Input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border-0 w-full " />
                </div>

                <div className="w-fit">


                </div>
              </Alert>

    <ToggleGroup
                  type="multiple"
                  variant={'outline'}
                  value={selectedGraduatePrograms}
                  onValueChange={handleGraduateProgramToggle}
                  className="aspect-auto flex flex-wrap items-start justify-start gap-2"
                >
                  {filteredTotal.map((program) => (
                    <ToggleGroupItem key={program} value={program} className="px-3 py-2 whitespace-normal">
                      {program}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
    </AccordionContent>
  </AccordionItem>
</Accordion>

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
  )}
}

export function ResearchersHomeListagens() {
  const { isOpen, type } = useModalResult();

  const [loading, setLoading] = useState(false);
  const [researcher, setResearcher] = useState<Research[]>([]);
  const [originalResearcher, setOriginalResearcher] = useState<Research[]>([]);
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [typeVisu, setTypeVisu] = useState('block');
  const { itemsSelecionados, urlGeral, searchType, simcc } = useContext(UserContext);
  const { version, pesquisadoresSelecionados, idGraduateProgram } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem('pesquisadoresSelecionados', JSON.stringify(pesquisadoresSelecionados));
  }, [pesquisadoresSelecionados]);

  const queryUrl = useQuery();

  const terms = queryUrl.get('terms');
  const openAlexState = queryUrl.get('open_alex');

  let FinalOpenAlex = openAlexState || ''

  const isModalOpen = isOpen && type === "researchers-home";

  let urlTermPesquisadores =`${urlGeral}researcherName?name=`;

 
  console.log(urlTermPesquisadores);

  const urlOpenAlex = `https://api.openalex.org/authors?filter=display_name.search:${terms?.replace(/[()|;]/g, "")}`;
  const [researcherOpenAlex, setResearcherOpenAlex] = useState<ResearchOpenAlex[]>([])
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

      // Cria um mapa para associar o nome normalizado da cidade aos dados do município
      const municipioMap = new Map(
        municipios.map((m) => [normalizeCityName(m.nome), m])
      );

      researcher.forEach((r) => {
        if (r.city) {
          const normalizedCity = normalizeCityName(r.city);
          const municipio = municipioMap.get(normalizedCity);

          if (!municipio) {
            console.warn(`Município não encontrado para a cidade: ${r.city}`);
            return;
          }

          if (!cityMap.has(normalizedCity)) {
            cityMap.set(normalizedCity, {
              nome: r.city,
              latitude: municipio.latitude,
              longitude: municipio.longitude,
              pesquisadores: 1,
              professores: [r.name],
              lattes_10_id: r.lattes_10_id,
            });
          } else {
            const city = cityMap.get(normalizedCity)!;
            city.pesquisadores += 1;
            city.professores.push(r.name);
          }
        }
      });

      setCityData(Array.from(cityMap.values()));
    };

    processCityData();

    console.log('cidades', cityData)
  }, [researcher]);

  const items = Array.from({ length: 12 }, (_, index) => (
    <Skeleton key={index} className="w-full rounded-md h-[300px]" />
  ));
  const totalAmong = researcher.reduce((sum, researcher) => sum + researcher.among, 0);

  const { theme } = useTheme()

  //mapa
  const normalizeCityName = (cityName: string) => {
    return cityName
      .normalize("NFD") // Remove acentos
      .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
      .toLowerCase(); // Converte para minúsculas
  };

  const { clearFilters, selectedAreas, selectedGraduations, component, selectedCities, selectedDepartaments, selectedGraduatePrograms, selectedSubsidies, selectedUniversities } = FiltersModal({
    researcher: originalResearcher,
    setResearcher,
  });

  return (
    <div className="w-full">
      <div className="w-full flex gap-4 justify-center">
        <div className="flex-1 gap-4 flex flex-col">
         
          <div className="w-full">
            <HeaderResult />
          </div>
<div className={`flex flex-col gap-4 w-full ${selectedAreas.length > 0 || selectedCities.length > 0 || selectedDepartaments.length > 0 || selectedGraduatePrograms.length > 0 || selectedGraduations.length > 0 || selectedSubsidies.length > 0 || selectedUniversities.length > 0 ? ('flex'):('hidden')}`}>
  <Separator/>
          <div className="flex flex-wrap gap-3 items-center">
            <p className="text-sm font-medium">Filtros aplicados:</p>
            {selectedAreas.map((item) => (
               <Badge className="bg-eng-blue font-normal hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 ">{item}</Badge>
            ))}

{selectedGraduations.map((item) => (
               <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}

{selectedCities.map((item) => (
                <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}

{selectedDepartaments.map((item) => (
                <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}

{selectedGraduatePrograms.map((item) => (
               <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}

{selectedSubsidies.map((item) => (
                <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}
            {selectedUniversities.map((item) => (
              <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}


<Badge variant={'secondary'} onClick={() => clearFilters()} className=" rounded-md cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900 border-0  py-2 px-3 font-normal flex items-center justify-center gap-2"><Trash size={12}/>Limpar filtros</Badge>
         
          </div>
</div>

<Alert className={`p-0 mt-4 bg-cover bg-no-repeat bg-center ${(searchType == 'abstract' || searchType == 'name' || searchType == 'area') && ('col-span-4')}`}  >
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

      

         

  
            <Accordion defaultValue="item-1" type="single" collapsible className="hidden md:flex ">
              <AccordionItem value="item-1" className="w-full ">
                <div className="flex mb-2">
                  <HeaderResultTypeHome title="Pesquisadores no mapa" icon={<MapIcon size={24} className="text-gray-400" />}>
                  </HeaderResultTypeHome>

                  <AccordionTrigger>

                  </AccordionTrigger>
                </div>
                <AccordionContent className="p-0">
                  {loading ? (
                    <Skeleton className="rounded-md w-full h-[300px] " />
                  ) : (
                    <div>
                      <MapaResearcher
                        cityData={cityData}
                      />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
     

        
            <div>
              <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="flex mb-2">
                    <HeaderResultTypeHome title="Pesquisadores por detalhamento" icon={<UserList size={24} className="text-gray-400" />}>
                      <div className="hidden md:flex gap-3 mr-3">
                        <Button onClick={() => setTypeVisu('rows')} variant={typeVisu === 'block' ? 'ghost' : 'outline'} size={'icon'}>
                          <Rows size={16} className="whitespace-nowrap" />
                        </Button>
                        <Button onClick={() => setTypeVisu('block')} variant={typeVisu === 'block' ? 'outline' : 'ghost'} size={'icon'}>
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
                            1200: 6,
                            1500: 6,
                            1700: 7
                          }}
                        >
                          <Masonry gutter="16px">
                            {items.map((item, index) => (
                              <div className="w-full" key={index}>{item}</div>
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

     {component}
      </div>
    </div>
  );
} 

import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/context";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import bg_user from '../../assets/user.png';

import { ProgramItem } from "./program-item";
import { VisualizacaoPrograma } from "./visualizacao-programa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { Alert } from "../ui/alert";
import { FadersHorizontal, MagnifyingGlass, Rows, SquaresFour } from "phosphor-react";
import { Input } from "../ui/input";
import { ArrowRight, ChevronDown, ChevronUp, Download, File, GraduationCap, Info, SlidersHorizontal, Trash, X } from "lucide-react";

import bg_graduate from '../../assets/bg_graduate.png'
import { Helmet } from "react-helmet";
import BahiaMap from "./bahia-map";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { TableReseracherhome } from "../homepage/categorias/researchers-home/table-reseracher-home";

import { columnsGraduate } from "./columns-graduate";
import { DataTable } from "../homepage/categorias/researchers-home/data-table";
import { useModal } from "../hooks/use-modal-store";
import { Sheet, SheetContent } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Badge } from "../ui/badge";
import { se } from "date-fns/locale";
import { CardContent, CardHeader, CardTitle } from "../ui/card";

export interface GraduateProgram {
  area: string;
  code: string;
  graduate_program_id: string;
  modality: string;
  name: string;
  rating: string;
  type: string;
  city: string
  state: string
  instituicao: string
  url_image: string
  region: string
  sigla: string
  latitude: string
  longitude: string
  visible: string
  qtd_discente: string
  qtd_colaborador: string
  qtd_permanente: string
  create_at: string
  institution: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

type FiltersModalProps = {
  graduatePrograms: GraduateProgram[];
  setGraduatePrograms: React.Dispatch<React.SetStateAction<GraduateProgram[]>>;
};

export function FiltersModal({ graduatePrograms, setGraduatePrograms }: FiltersModalProps) {
const { onClose, isOpen, type: typeModal } = useModal();
  const isModalOpen = isOpen && typeModal === "filters-graduate";

  const queryUrl = useQuery();
  const getArrayFromUrl = (key: string) => queryUrl.get(key)?.split(";") || [];

  const [selectedCities, setSelectedCities] = useState<string[]>(getArrayFromUrl("cities"));
  const [selectedTypes, setSelectedTypes] = useState<string[]>(getArrayFromUrl("types"));
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(getArrayFromUrl("universities"));
  const [selectedAreas, setSelectedAreas] = useState<string[]>(getArrayFromUrl("areas"));
  const [selectedModalities, setSelectedModalities] = useState<string[]>(getArrayFromUrl("modalities"));

  const [filteredCount, setFilteredCount] = useState<number>(0);
const navigate = useNavigate();

  useEffect(() => {
    // Calculate filtered results count
    let filtered = [...graduatePrograms];
    if (selectedCities.length > 0) {
      filtered = filtered.filter((r) => selectedCities.includes(r.city));
    }
    if (selectedUniversities.length > 0) {
      filtered = filtered.filter((r) => selectedUniversities.includes(r.institution));
    }
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((r) => selectedTypes.includes(r.type));
    }
    if (selectedAreas.length > 0) {
      filtered = filtered.filter((r) => selectedAreas.includes(r.area));
    }
    if (selectedModalities.length > 0) {
      filtered = filtered.filter((r) => selectedModalities.includes(r.modality));
    }
 
    setFilteredCount(filtered.length);

      updateFilters("areas", selectedAreas );
    updateFilters("cities", selectedCities);
    updateFilters("universities", selectedUniversities);
    updateFilters("modalities", selectedModalities);
    updateFilters("types", selectedTypes);


    navigate({
      pathname: '/pos-graduacao',
      search: queryUrl.toString(),
    });

  }, [graduatePrograms, selectedAreas, selectedCities, selectedUniversities, selectedModalities, selectedTypes]);

  const handleAreaToggle = (value: string[]) => {
    setSelectedAreas(value);
  };

  const handleCityToggle = (value: any) => {
    setSelectedCities(value);
  };

  const handleUniversityToggle = (value: any) => {
    setSelectedUniversities(value);
  };

  const handleTypeToggle = (value: any) => {
    setSelectedTypes(value);
  };

  const handleModalityToggle = (value: any) => {
    setSelectedModalities(value);
  };

  const filteredPrograms = graduatePrograms.filter((res) => {
   
    const hasSelectedArea = selectedAreas.length === 0 || selectedAreas.includes(res.area);
   
    const hasSelectedCity = selectedCities.length === 0 || selectedCities.includes(res.city);
    const hasSelectedUniversity = selectedUniversities.length === 0 || selectedUniversities.includes(res.institution);
    const hasSelectedType = selectedTypes.length === 0 || selectedTypes.includes(res.type);
    const hasSelectedModality = selectedModalities.length === 0 || selectedModalities.includes(res.modality);
   

   
    return graduatePrograms && hasSelectedArea && hasSelectedCity && hasSelectedUniversity && hasSelectedType && hasSelectedModality;
  });

  const applyFilters = () => {
    setGraduatePrograms(filteredPrograms);
    onClose();
  };

  const clearFilters = () => {
   
    setSelectedAreas([]);
    setSelectedCities([]);
    setSelectedUniversities([]);
    setSelectedTypes([]);
    setSelectedModalities([]);
    setGraduatePrograms(graduatePrograms);
   
    onClose();
  };

  
  const updateFilters = (category: string, values: string[]) => {
    if (values.length > 0 ) {
     
      queryUrl.set(category, values.join(";"));
      setGraduatePrograms(filteredPrograms);
    } else {
     queryUrl.delete(category)
    }
   
  };

  const uniqueAreas = Array.from(new Set(graduatePrograms.flatMap((res) => res.area.split(';').map(area => area.trim()))));
  const uniqueCities = Array.from(new Set(graduatePrograms.map((res) => res.city))).filter(Boolean);
  const uniqueUniversities = Array.from(new Set(graduatePrograms.map((res) => res.institution))).filter(Boolean);
  const uniqueTypes = Array.from(new Set(graduatePrograms.map((res) => res.type))).filter(Boolean);
  const uniqueModalities = Array.from(new Set(graduatePrograms.map((res) => res.modality))).filter(Boolean);

  // Carrega os valores da URL ao iniciar a página
  useEffect(() => {

    setSelectedAreas(getArrayFromUrl("areas"));
 
    setSelectedCities(getArrayFromUrl("cities"));
    setSelectedUniversities(getArrayFromUrl("universities"));
    setSelectedTypes(getArrayFromUrl("types"));
    setSelectedModalities(getArrayFromUrl("modalities"));
   
 
  }, []);

  const [search, setSearch] = useState('')
  const [search2, setSearch2] = useState('')

  const filteredTotal = Array.isArray(uniqueAreas) ? uniqueAreas.filter(item => {
    // Normaliza a string do item e da busca para comparação
    const normalizeString = (str: any) => str
      .normalize("NFD") // Decompõe os caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
      .toLowerCase(); // Converte para minúsculas

    const searchString = normalizeString(item);
    const normalizedSearch = normalizeString(search2);

    return searchString.includes(normalizedSearch);
  }) : [];

  const filteredTotal2 = Array.isArray(uniqueCities) ? uniqueCities.filter(item => {
    // Normaliza a string do item e da busca para comparação
    const normalizeString = (str: any) => str
      .normalize("NFD") // Decompõe os caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
      .toLowerCase(); // Converte para minúsculas

    const searchString = normalizeString(item);
    const normalizedSearch = normalizeString(search);

    return searchString.includes(normalizedSearch);
  }) : [];

  useEffect(() => {
    if (graduatePrograms.length == 0) {
      setSelectedAreas([]);
      setSelectedTypes([]);
      setSelectedModalities([]);
      setSelectedCities([]);
      setSelectedUniversities([]);
    }
  }, [graduatePrograms]);

  useEffect(() => {
    if (!(selectedAreas.length > 0 ||  selectedCities.length > 0 || selectedUniversities.length > 0 || selectedTypes.length > 0 || selectedModalities.length > 0)) {
     setGraduatePrograms(graduatePrograms)
    }
  }, [graduatePrograms, selectedAreas, selectedCities, selectedUniversities, selectedTypes, selectedModalities]);

  return {
    selectedAreas,
    selectedModalities,
    selectedTypes,
    selectedCities,
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
            <Accordion defaultValue="item-1" type="single" collapsible className="w-full">
  <AccordionItem value="item-1" className="w-full">
    <div className="flex items-center justify-between">
    <Label>Área </Label>
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
                  value={selectedAreas}
                  onValueChange={handleAreaToggle}
                  className="aspect-auto flex flex-wrap items-start justify-start gap-2"
                >
                  {filteredTotal.map((area) => (
                    <ToggleGroupItem key={area} value={area} className="px-3 py-2">
                      {area}
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
                  <Input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border-0 w-full " />
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

  <AccordionItem value="item-4">
    <div className="flex items-center justify-between">
    <Label>Tipo</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
    <ToggleGroup
                    type="multiple"
                    variant={'outline'}
                    value={selectedTypes}
                    onValueChange={handleTypeToggle}
                    className="aspect-auto flex flex-wrap items-start justify-start gap-2"
                  >
                    {uniqueTypes.map((university) => (
                      <ToggleGroupItem key={university} value={university} className="px-3 py-2">
                        {university}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4">
    <div className="flex items-center justify-between">
    <Label>Modalidade</Label>
    <AccordionTrigger></AccordionTrigger>
    </div>
    <AccordionContent>
    <ToggleGroup
                    type="multiple"
                    variant={'outline'}
                    value={selectedModalities}
                    onValueChange={handleModalityToggle}
                    className="aspect-auto flex flex-wrap items-start justify-start gap-2"
                  >
                    {uniqueModalities.map((university) => (
                      <ToggleGroupItem key={university} value={university} className="px-3 py-2">
                        {university}
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
    )
  }

}


export function GraduateProgram() {
  const { urlGeral } = useContext(UserContext);
  const { isOpen, type } = useModalHomepage();
const { onOpen } = useModal();
  const queryUrl = useQuery();

  const type_search = queryUrl.get('graduate_program_id');

  const isModalOpen = isOpen && type === "graduation-home";

  const [cidade, setCidade] = useState('')
  const [graduatePrograms, setGraduatePrograms] = useState<GraduateProgram[]>([]);
  const [originalGraduatePrograms, setOriginalGraduatePrograms] = useState<GraduateProgram[]>([]);
  let programSelecionado = type_search || ''

  const [search, setSearch] = useState('')
  const urlGraduateProgram = `${urlGeral}graduate_program_profnit?id=`;

  console.log(urlGraduateProgram)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(urlGraduateProgram, {
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
          setGraduatePrograms(data);
          setOriginalGraduatePrograms(data);
          setJsonData(data)
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlGraduateProgram]);


  const filteredTotal = Array.isArray(graduatePrograms) ? graduatePrograms.filter(item => {
    // Normaliza a string do item e da busca para comparação
    const normalizeString = (str: any) => str
      .normalize("NFD") // Decompõe os caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
      .toLowerCase(); // Converte para minúsculas

    const searchString = normalizeString(item.name);
    const normalizedSearch = normalizeString(search);

    return searchString.includes(normalizedSearch);
  }) : [];

  const {version, simcc} = useContext(UserContext)
  
  const [isOn, setIsOn] = useState(true);

  const [jsonData, setJsonData] = useState<any[]>([]);


  const convertJsonToCsv = (json: any[]): string => {
    const items = json;
    const replacer = (_: string, value: any) => (value === null ? '' : value); // Handle null values
    const header = Object.keys(items[0]);
    const csv = [
      '\uFEFF' + header.join(';'), // Add BOM and CSV header
      ...items.map((item) =>
        header.map((fieldName) => JSON.stringify(item[fieldName], replacer)).join(';')
      ) // CSV data
    ].join('\r\n');

    return csv;
  };

  const handleDownloadJson = async () => {
    try {
      const csvData = convertJsonToCsv(jsonData);
      const blob = new Blob([csvData], { type: 'text/csv;charset=windows-1252;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `dados.csv`;
      link.href = url;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const items = Array.from({ length: 12 }, (_, index) => (
    <Skeleton key={index} className="w-full rounded-md h-[300px]" />
  ));

  const [typeVisu, setTypeVisu] = useState('block');

   const { clearFilters, selectedAreas,  component, selectedCities,  selectedUniversities, selectedModalities, selectedTypes } = FiltersModal({
      graduatePrograms: originalGraduatePrograms,
      setGraduatePrograms,
    });

  return (
    <>

<Helmet>
          <title>Pós-graduações | {version ? ('Conectee'):('Simcc')}</title>
          <meta name="description" content={`Pós-graduações | ${version ? ('Conectee'):('Simcc')}`} />
          <meta name="robots" content="index, follow" />
        </Helmet>
      
        <>
          {programSelecionado.length == 0 ? (
            <div>
              {simcc && (
                 <div className="w-full hidden lg:flex h-[calc(100vh-68px)] overflow-hidden items-center absolute   "><BahiaMap/></div>
              )}
              <main className="z-[2]  gap-4 md:gap-8 flex flex-col  pt-0 md:pt-0 w-full">
              <div className="bg-cover w-fit pl-8 bg-bottom bg-no-repeat" >
                <div className="justify-center h-[calc(100vh-68px)] z-[9] m w-full  flex max-w-[980px] flex-col items-center lg:items-start  gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20" >
                  <Link to={'/informacoes'} className="inline-flex z-[2] lg:w-fit  w-fit items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2  px-3 py-1 text-sm font-medium"><Info size={12} /><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Saiba como utilizar a plataforma<ArrowRight size={12} /></Link>

                  <h1 className="lg:w-fit  lg:text-left text-center max-w-[600px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
                    Selecione um programa de {" "}
                    <strong className="bg-eng-blue  rounded-md px-3 pb-2 text-white font-medium">
                      {" "}
                      pós-graduação
                    </strong>{" "}
                  </h1>

               
                </div>
              </div>
<div>
<div className="top-[68px] sticky z-[9] supports-[backdrop-filter]:dark:bg-neutral-900/60 supports-[backdrop-filter]:bg-neutral-50/60 backdrop-blur">
<div className={`w-full px-8  border-b border-b-neutral-200 dark:border-b-neutral-800`}>


        {isOn && (
           <div className="w-full   flex justify-between items-center">
 
                      <div className="w-full pt-4  flex justify-between items-center">
                          <Alert className="h-14 mt-4 mb-2  p-2 flex items-center justify-between  w-full">
          <div className="flex items-center gap-2 w-full flex-1">
            <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
            <Input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border-0 w-full " />
          </div>
        </Alert>
                      </div>
                         </div>
                    )}

              
           

              <div className={`flex w-full flex-wrap pt-2 pb-3 justify-between `}>
                    <div>

                    </div>

                    <div className="hidden xl:flex xl:flex-nowrap gap-2">
                <div className="md:flex md:flex-nowrap gap-2">
                  <Link to={`${urlGeral}dictionary.pdf`} target="_blank">
                  <Button variant="ghost" className="">
                    <File size={16} className="" />
                    Dicionário de dados
                  </Button>
                  </Link>
                  <Button onClick={() => handleDownloadJson()} variant="ghost" className="">
                    <Download size={16} className="" />
                    Baixar resultado
                  </Button>
                </div>

                <div>
                <Button onClick={() => onOpen('filters-graduate')}  variant="ghost" className="">
                      <SlidersHorizontal size={16} className="" />
                      Filtros
                    </Button>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOn(!isOn)}>
                  {isOn ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
                  </div>
</div>
</div>
 <div className="mt-8 px-4 md:px-8">
 <div className={`${selectedAreas.length > 0 || selectedCities.length > 0 || selectedModalities.length > 0 || selectedTypes.length > 0 || selectedUniversities.length > 0 ? ('flex'):('hidden')} flex flex-wrap gap-3 mb-6 items-center`}>
            <p className="text-sm font-medium">Filtros aplicados:</p>
            {selectedAreas.map((item) => (
               <Badge className="bg-eng-blue font-normal hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 ">{item}</Badge>
            ))}



{selectedCities.map((item) => (
                <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}

{selectedUniversities.map((item) => (
              <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}

{selectedTypes.map((item) => (
              <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}

{selectedModalities.map((item) => (
              <Badge className="bg-eng-blue hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3 font-normal">{item}</Badge>
            ))}



<Badge variant={'secondary'} onClick={() => clearFilters()} className=" rounded-md cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900 border-0  py-2 px-3 font-normal flex items-center justify-center gap-2"><Trash size={12}/>Limpar filtros</Badge>
         
          </div>

          <Alert className={`p-0 bg-cover bg-no-repeat bg-center `}  >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de programas
                  </CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{graduatePrograms.length}</div>
                  <p className="text-xs text-muted-foreground">
                    encontrados na busca
                  </p>
                </CardContent>
              </Alert>

 <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="flex mb-2">
                    <HeaderResultTypeHome title="Programas de pós-graduação" icon={<GraduationCap size={24} className="text-gray-400" />}>
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
                        <ResponsiveMasonry
                        columnsCountBreakPoints={{
                          350: 1,
                          750: 2,
                          900: 2,
                          1200: 3,
                          1700: 4
                        }}
                      >
                        <Masonry gutter="16px" className=" z-[1] w-full">
                          {filteredTotal
                            .filter(item => item.visible == "True") // Filtra os itens onde `visible` é `true`
                            .map((props, index) => (
                              <ProgramItem
                                key={index} // Adiciona uma chave para cada item
                                area={props.area}
                                code={props.code}
                                graduate_program_id={props.graduate_program_id}
                                modality={props.modality}
                                name={props.name}
                                rating={props.rating}
                                type={props.type}
                                city={props.city}
                                state={props.state}
                                instituicao={props.instituicao}
                                url_image={props.url_image}
                                region={props.region}
                                sigla={props.sigla}
                                visible={props.visible}
                                qtd_discente={props.qtd_discente}
                                qtd_colaborador={props.qtd_colaborador}
                                qtd_permanente={props.qtd_permanente}
                                create_at={props.create_at}
                              />
                            ))}
                        </Masonry>
                      </ResponsiveMasonry>
                      )
                    ) : (
                      loading ? (
                        <Skeleton className="w-full rounded-md h-[400px]" />
                      ) : (
                        <DataTable columns={columnsGraduate} data={graduatePrograms} />
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
   

 </div>
</div>

            </main>
            {component}
            </div>
          ) : (
            <VisualizacaoPrograma />
          )}
        </>
     
    </>
  )
}
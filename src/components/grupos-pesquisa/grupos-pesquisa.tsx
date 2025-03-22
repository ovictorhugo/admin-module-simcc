import { ArrowRight, Blocks, Info, Plus, Shapes, Trash, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib"
import { Alert } from "../ui/alert";
import { MagnifyingGlass, Rows, SquaresFour } from "phosphor-react";
import { Input } from "../ui/input";
import { VisualizacaoGrupo } from "./visualizacao-grupo-pesquisa";

import bg_popup from '../../assets/bg_home.png'
import { Helmet } from "react-helmet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { DataTable } from "../popup/columns/popup-data-table";
import { columns } from "../componentsModal/columns-grupo-pesquisa";
import { Badge } from "../ui/badge";
interface Patrimonio {
  area: string,
  institution: string,
  first_leader: string,
  first_leader_id: string,
  second_leader: string,
  second_leader_id: string,
  name: string,
  id: string
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}


export function GruposPesquisaPage() {


  const queryUrl = useQuery();
  const type_search = queryUrl.get('group_id');

  let programSelecionado = type_search || ''


  const [isLoading, setIsLoading] = useState(false)

  const [total, setTotal] = useState<Patrimonio[]>([]);

  const { urlGeral } = useContext(UserContext)

  const urlPatrimonioInsert = ` ${urlGeral}research_group`;

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {

      try {

        const response = await fetch(urlPatrimonioInsert, {
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
          setTotal(data)
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()


  }, [urlPatrimonioInsert]);

  console.log(urlPatrimonioInsert)
  const normalizeArea = (area: string): string => {
    return area

      .toUpperCase(); // Converte para maiúsculas
  };

  const qualisColor: { [key: string]: string } = {
    "ASTRONOMIA": "bg-red-200",
    "FÍSICA": "bg-blue-200",
    "GEOCIÊNCIAS": "bg-green-200",
    "MATEMÁTICA": "bg-yellow-200",
    "OCEANOGRAFIA": "bg-teal-200",
    "PROBABILIDADE E ESTATÍSTICA": "bg-purple-200",
    "QUÍMICA": "bg-orange-200",
    "AGRONOMIA": "bg-red-800",
    "CIÊNCIA E TECNOLOGIA DE ALIMENTOS": "bg-blue-800",
    "ENGENHARIA AGRÍCOLA": "bg-green-800",
    "MEDICINA VETERINÁRIA": "bg-yellow-800",
    "RECURSOS FLORESTAIS E ENGENHARIA FLORESTAL": "bg-teal-800",
    "RECURSOS PESQUEIROS E ENGENHARIA DE PESCA": "bg-purple-800",
    "ZOOTECNIA": "bg-orange-800",
    "BIOFÍSICA": "bg-red-600",
    "BIOLOGIA GERAL": "bg-blue-600",
    "BIOQUÍMICA": "bg-green-600",
    "BIOTECNOLOGIA": "bg-yellow-600",
    "BOTÂNICA": "bg-teal-600",
    "ECOLOGIA": "bg-purple-600",
    "FARMACOLOGIA": "bg-orange-600",
    "FISIOLOGIA": "bg-red-400",
    "GENÉTICA": "bg-blue-400",
    "IMUNOLOGIA": "bg-green-400",
    "MICROBIOLOGIA": "bg-yellow-400",
    "MORFOLOGIA": "bg-teal-400",
    "PARASITOLOGIA": "bg-purple-400",
    "ZOOLOGIA": "bg-orange-400",
    "EDUCAÇÃO FÍSICA": "bg-red-300",
    "ENFERMAGEM": "bg-blue-300",
    "FARMÁCIA": "bg-green-300",
    "FISIOTERAPIA E TERAPIA OCUPACIONAL": "bg-yellow-300",
    "FONOAUDIOLOGIA": "bg-teal-300",
    "MEDICINA": "bg-purple-300",
    "NUTRIÇÃO": "bg-orange-300",
    "ODONTOLOGIA": "bg-red-100",
    "SAÚDE COLETIVA": "bg-blue-100",
    "ANTROPOLOGIA": "bg-green-100",
    "ARQUEOLOGIA": "bg-yellow-100",
    "CIÊNCIA POLÍTICA": "bg-teal-100",
    "EDUCAÇÃO": "bg-purple-100",
    "FILOSOFIA": "bg-orange-100",
    "GEOGRAFIA": "bg-red-900",
    "HISTÓRIA": "bg-blue-900",
    "PSICOLOGIA": "bg-green-900",
    "SOCIOLOGIA": "bg-yellow-900",
    "TEOLOGIA": "bg-teal-900",
    "CIÊNCIA DA COMPUTAÇÃO": "bg-purple-900",
    "DESENHO INDUSTRIAL": "bg-orange-900",
    "ENGENHARIA AEROESPACIAL": "bg-red-500",
    "ENGENHARIA BIOMÉDICA": "bg-blue-500",
    "ENGENHARIA CIVIL": "bg-green-500",
    "ENGENHARIA DE ENERGIA": "bg-yellow-500",
    "ENGENHARIA DE MATERIAIS E METALÚRGICA": "bg-teal-500",
    "ENGENHARIA DE MINAS": "bg-purple-500",
    "ENGENHARIA DE PRODUÇÃO": "bg-orange-500",
    "ENGENHARIA DE TRANSPORTES": "bg-red-700",
    "ENGENHARIA ELÉTRICA": "bg-blue-700",
    "ENGENHARIA MECÂNICA": "bg-green-700",
    "ENGENHARIA NAVAL E OCEÂNICA": "bg-yellow-700",
    "ENGENHARIA NUCLEAR": "bg-teal-700",
    "ENGENHARIA QUÍMICA": "bg-purple-700",
    "ENGENHARIA SANITÁRIA": "bg-orange-700",
    "ARTES": "bg-red-50",
    "LETRAS": "bg-blue-50",
    "LINGÜÍSTICA": "bg-green-50",
    "BIOÉTICA": "bg-yellow-50",
    "CIÊNCIAS AMBIENTAIS": "bg-teal-50",
    "DEFESA": "bg-purple-50",
    "DIVULGAÇÃO CIENTÍFICA": "bg-orange-50",
    "MICROELETRÔNICA": "bg-red-700",
    "ROBÓTICA, MECATRÔNICA E AUTOMAÇÃO": "bg-blue-700",
    "SEGURANÇA CONTRA INCÊNDIO": "bg-green-700",
    "ADMINISTRAÇÃO": "bg-yellow-700",
    "ARQUITETURA E URBANISMO": "bg-teal-700",
    "CIÊNCIA DA INFORMAÇÃO": "bg-purple-700",
    "COMUNICAÇÃO": "bg-orange-700",
    "DEMOGRAFIA": "bg-red-100",
    "DIREITO": "bg-blue-100",
    "ECONOMIA": "bg-green-100",
    "ECONOMIA DOMÉSTICA": "bg-yellow-100",
    "MUSEOLOGIA": "bg-teal-100",
    "PLANEJAMENTO URBANO E REGIONAL": "bg-purple-100",
    "SERVIÇO SOCIAL": "bg-orange-100",
    "TURISMO": "bg-red-200",
  };
  console.log(total)
  const [count, setCount] = useState(12)

  const [search, setSearch] = useState('')

  /////

  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const institutions = Array.isArray(total) ? [...new Set(total.map(item => item.institution))] : [];
  const areas = Array.isArray(total) ? [...new Set(total.map(item => item.area))] : [];

  const updateFilters = (category: string, values: string[]) => {
    const query = new URLSearchParams(location.search);
    if (values.length > 0) {
      query.set(category, values.join(";"));
    } else {
      query.delete(category);
    }
    navigate({ search: query.toString() }, { replace: true });
  };

  const handleInstitutionChange = (value: string) => {
    setSelectedInstitutions((prev) => {
      const newValues = prev.includes(value) ? prev.filter((inst) => inst !== value) : [...prev, value];
      updateFilters("institution", newValues);
      return newValues;
    });
  };

  const handleAreaChange = (value: string) => {
    setSelectedAreas((prev) => {
      const newValues = prev.includes(value) ? prev.filter((area) => area !== value) : [...prev, value];
      updateFilters("area", newValues);
      return newValues;
    });
  };

  const getArrayFromUrl = (key: string) => {
    const query = new URLSearchParams(location.search);
    return query.get(key)?.split(";") || [];
  };

  useEffect(() => {
    setSelectedInstitutions(getArrayFromUrl("institution"));
    setSelectedAreas(getArrayFromUrl("area"));
  }, [location.search]);

const filteredTotal = Array.isArray(total) ? total.filter(item => { 
    const normalizeString = (str) => str
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
    
    const searchString = normalizeString(item.name);
    const normalizedSearch = normalizeString(search);
    
    return (
      searchString.includes(normalizedSearch) &&
      (selectedInstitutions.length > 0 ? selectedInstitutions.includes(item.institution) : true) &&
      (selectedAreas.length > 0 ? selectedAreas.includes(item.area) : true)
    );
  }) : [];

  ////////



  const handlePesquisaFinal = (id: string) => {
    queryUrl.set('group_id', id);
    navigate({
      pathname: '/grupos-pesquisa',
      search: queryUrl.toString(),
    });
  }

  const { version } = useContext(UserContext)
  const [typeVisu, setTypeVisu] = useState('block');

const clearFilters = () => {

setSelectedAreas([])
setSelectedInstitutions([])
navigate('/grupos-pesquisa')
}
  return (
    <>
      {programSelecionado.length == 0 ? (
        <main className="flex flex-1 flex-col gap-4 md:gap-8  ">
          <Helmet>
            <title>Grupos de pesquisa | {version ? ('Conectee') : ('Simcc')}</title>
            <meta name="description" content={`Grupos de pesquisa | ${version ? ('Conectee') : ('Simcc')}`} />
            <meta name="robots" content="index, follow" />
          </Helmet>
          <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg_popup})` }}>
            <div className="justify-center md:px-8 px-4 w-full mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20" >
              <Link to={'/informacoes'} className="inline-flex z-[2] items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2  px-3 py-1 text-sm font-medium"><Info size={12} /><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Saiba como utilizar a plataforma<ArrowRight size={12} /></Link>

              <h1 className="z-[2] text-center max-w-[600px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
                Explore as informações dos{" "}
                <strong className="bg-eng-blue  rounded-md px-3 pb-2 text-white font-medium">
                  {" "}
                  grupos de pesquisa
                </strong>{" "}

              </h1>




              <Alert className="h-14 mt-8 p-2 flex items-center justify-between lg:max-w-[60vw] lg:w-[60vw] w-full ">
                <div className="flex items-center gap-2 w-full flex-1">
                  <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
                  <Input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border-0 w-full " />
                </div>

                <div className="w-fit flex items-center gap-2">
   <p className="text-xs">Filtros:</p>
      {/* DropdownMenu para Instituições */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Instituições</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
     
          {institutions.map(inst => (
            <DropdownMenuCheckboxItem
              key={inst}
              checked={selectedInstitutions.includes(inst)}
              onCheckedChange={(checked) => handleInstitutionChange(inst)}
            >
              {inst}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DropdownMenu para Áreas */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Áreas</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          {areas.map(area => (
            <DropdownMenuCheckboxItem
              key={area}
              checked={selectedAreas.includes(area)}
              onCheckedChange={(checked) => handleAreaChange(area)}
            >
              {area}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>


                </div>
              </Alert>




            </div>
          </div>

          <div className="px-4 md:px-8">

          <div className={`${selectedAreas.length > 0 || selectedInstitutions.length > 0 ? ('flex'):('hidden')} flex flex-wrap gap-3 mb-6 items-center`}>
          <p className="text-sm font-medium">Filtros aplicados:</p>
            {/* Filtros de Áreas */}
  {selectedAreas.map((item) => (
    <Badge key={item} className="bg-eng-blue font-normal hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3">
      {item}
    </Badge>
  ))}

   {/* Filtros de Instituições */}
   {selectedInstitutions.map((item) => (
    <Badge key={item} className="bg-eng-blue font-normal hover:bg-eng-dark-blue rounded-md dark:bg-eng-blue dark:hover:bg-eng-dark-blue dark:text-white py-2 px-3">
      {item}
    </Badge>
  ))}

<Badge variant={'secondary'} onClick={() => clearFilters()} className=" rounded-md cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900 border-0  py-2 px-3 font-normal flex items-center justify-center gap-2"><Trash size={12}/>Limpar filtros</Badge>
      
            </div>

          <Alert className={`p-0 mb-6  bg-cover bg-no-repeat bg-center `}  >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de grupos de pesquisa
                  </CardTitle>
                  <Blocks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredTotal.length}</div>
                  <p className="text-xs text-muted-foreground">
                    encontrados na busca
                  </p>
                </CardContent>
              </Alert>

              <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="flex mb-2">
                    <HeaderResultTypeHome title="Grupos de pesquisa" icon={<Blocks size={24} className="text-gray-400" />}>
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
                    isLoading ? (
                      <ResponsiveMasonry
                        columnsCountBreakPoints={{
                          350: 1,
                          750: 2,
                          900: 2,
                          1200: 3,
                          1700: 4
                        }}
                      >
                        <Masonry gutter="16px" className="pb-4 md:pb-8">
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                          <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
                        </Masonry>
                      </ResponsiveMasonry>
                    ) : (
                     <div>
                       <ResponsiveMasonry
                        columnsCountBreakPoints={{
                          350: 1,
                          750: 2,
                          900: 2,
                          1200: 3,
                          1700: 4
                        }}
                      >
                        <Masonry gutter="16px" className="pb-4 md:pb-8">
                          {filteredTotal.slice(0, count).map((item) => {
        
                            return (
                              <div className="flex w-full" onClick={() => handlePesquisaFinal(item.id)}>
                                <div className={`w-2 min-w-2 rounded-l-md dark:border-neutral-800 border min-h-[120px] border-neutral-200 border-r-0 ${qualisColor[normalizeArea(item.area || '')]} min-h-full relative`}></div>
        
                                <button
        
                                  className={cn(
                                    "flex flex-col rounded-lg w-full rounded-l-none bg-white dark:bg-neutral-800 dark:border-neutral-700 items-start gap-2  border p-3 text-left text-sm transition-all hover:bg-accent",
        
                                  )}
        
                                >
                                  <div className="flex w-full flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                      <div className="text-xs font-medium mb-2 flex items-center gap-2">{item.area != '' ? (item.area) : ('Sem código')}
                                      </div>
                                      <Shapes size={16} />
                                    </div>
                                    <div className="flex items-center">
                                      <div className="flex items-center gap-2">
                                        <div className="font-semibold text-lg">{item.name}</div>
                                      </div>
                                    </div>
        
                                  </div>
                                  <div className="line-clamp-2 flex-wrap text-xs text-muted-foreground flex gap-2">
                                    <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12} />{item.first_leader}</div>
                                    {(item.second_leader != '' && item.second_leader != null) && (<div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12} />{item.second_leader}</div>)}
        
                                  </div>
        
                                </button>
                              </div>
                            )
                          })}
        
                        </Masonry>
                      </ResponsiveMasonry>

{filteredTotal.length >= count && (
  <div className="w-full flex justify-center pb-8"><Button className="w-fit" onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
)}
                     </div>
                    )
                  ):(
                    isLoading ? (
                      <Skeleton className="w-full h-[300px] rounded-md"></Skeleton>
                    ):(
                     <DataTable columns={columns} data={filteredTotal}/>
                    )
                  )}
                  </AccordionContent>
                  </AccordionItem>


                  </Accordion>


        
          </div>

          
        </main>
      ) : (
        <VisualizacaoGrupo />
      )}
    </>
  )
}
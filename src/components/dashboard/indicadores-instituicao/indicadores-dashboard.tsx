import { ArrowRight, Book, Building, ChevronLeft, Copyright, Download, File, GraduationCap, Hash, Info, Link2, Upload, User, UserCog } from "lucide-react";
import { useModalDashboard } from "../../hooks/use-modal-dashboard";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../ui/alert";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { UserContext } from "../../../context/context";
import { Books, ChartBar, Code, FileCsv, FileXls, Quotes, StripeLogo, Student, Warning } from "phosphor-react";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

import {
  Label,
  Cell,
  PieChart,
  Pie,
  CartesianGrid,
  Bar,
  LabelList,
  BarChart,
  XAxis
} from "recharts"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip"


interface TotalPatrimonios {
  count_gp: string,
  count_gpr: string,
  institution_id: string,
  count_r: string
  count_d: string
  count_gps: string
  count_t: string
  name: string
}

interface Bolsistas {
  aid_quantity: string
  call_title: string
  funding_program_name: string
  modality_code: string
  category_level_code: string
  institute_name: string
  modality_name: string
  name: string
  researcher_id: string
  scholarship_quantity: string
}

import { ChartContainer, ChartTooltip, ChartConfig, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

interface Docentes {
  matric: string;
  inscUFMG: string;
  nome: string;
  genero: string;
  situacao: string;
  rt: string;
  clas: string;
  cargo: string;
  classe: string;
  ref: string;
  titulacao: string;
  entradaNaUFMG: string;
  progressao: string;
  year_charge: string;
  semester: string;
}

interface Tecnicos {
  cargo: string
  classe: string
  data_prog: string
  deno_sit: string
  detalhe_setor: string
  dting_org: string
  genero: string
  ins_ufmg: string
  matric: string
  nivel: string
  nome: string
  ref: string
  rt: string
  semester: string
  setor: string
  titulacao: string
}

type Research = {
  count_article: number
  count_book: number
  count_book_chapter: number,
  count_guidance: number
  count_patent: number
  count_report: number
  count_software: number
  count_guidance_complete: number
  count_guidance_in_progress: number
  count_patent_granted: number
  count_patent_not_granted: number
  count_brand: number
  year: number
  A1: number
  A2: number
  A3: number
  A4: number
  B1: number
  B2: number
  B3: number
  B4: number
  C: number
  SQ: number
}

interface VisaoPrograma {
  article: number;
  book: number;
  book_chapter: number;
  brand: number;
  patent: number;
  researcher: string;
  software: number;
  work_in_event: number;
}


interface YearSemester {
  year: string
  semester: string
}

import bg_popup from '../../../assets/bg_popup.png';
import { useModal } from "../../hooks/use-modal-store";
import { GraficoBolsistaProdutividade } from "../graficos/grafico-bolsista-produtividade";
import { GraficoBolsistaTecnologico } from "../graficos/grafico-bolsista-tecnologico";
import { GraficoDocentesRt } from "../graficos/grafico-docente-rt";
import { GraficoDocentesClasse } from "../graficos/grafico-docentes-classe";
import { GraficoArtigosPorQualis } from "../graficos/grafico-qualis";
import { GraficoDocentesGenero } from "../graficos/grafico-genero";
import { GraficoProgressaoDocentes } from "../graficos/grafico-progressao-docentes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { ScrollArea } from "../../ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { GraficoTecnicosRt } from "../graficos/grafico-tecnicos-rt";
import { GraficoTecnicosGenero } from "../graficos/grafico-tecnicos-genero";
import { GraficoProgressaoTecnicos } from "../graficos/grafico-progressao-tecnicos";
import { GraficoTecnicosCargo } from "../graficos/grafico-tecnico-cargo";
import { Helmet } from "react-helmet";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { ColorPicker } from "../../ui/color-picker";
import { Input } from "../../ui/input";
import { Label as LabelUi } from "../../ui/label";


const chartConfig = {

  'Produtividade em Pesquisa': {
    label: "Produtividade em Pesquisa",
    color: "#809BB5",
  },
  'Desen. Tec. e Extensão Inovadora': {
    label: "Desen. Tec. e Extensão Inovadora",
    color: "#A6BCCD",
  },
  'Outros docentes': {
    label: "Outros docentes",
    color: "#354A5C",
  },
} satisfies ChartConfig

const chartConfig3 = {

  'Participam da pós-graduação': {
    label: "Participam da pós-graduação",
    color: "#809BB5",
  },

  'Outros docentes': {
    label: "Outros docentes",
    color: "#354A5C",
  },
} satisfies ChartConfig


const chartConfig2 = {
  views: {
    label: "Page Views",
  },
  producao_bibliografica: {
    label: "Produção bibliográfica",
    color: "hsl(var(--chart-1))",
  },
  producao_tecnica: {
    label: "Produção técnica",
    color: "hsl(var(--chart-2))",
  },
  count_article: {
    label: "Artigos",
    color: "hsl(var(--chart-2))",
  },
  count_book: {
    label: "Livros",
    color: "hsl(var(--chart-2))",
  },
  count_book_chapter: {
    label: "Capítulos de livros",
    color: "hsl(var(--chart-2))",
  },
  count_patent: {
    label: "Patentes",
    color: "hsl(var(--chart-2))",
  },
  count_brand: {
    label: "Marcas",
    color: "hsl(var(--chart-2))",
  },
  count_software: {
    label: "Softwares",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

function generateYearSemesterArray(startYear: number, startSemester: number, endYear: number, endSemester: number): YearSemester[] {
  const result: YearSemester[] = [];
  for (let year = startYear; year <= endYear; year++) {
    for (let semester = 1; semester <= 2; semester++) {
      if (year === endYear && semester > endSemester) break;
      result.push({ year: year.toString(), semester: semester.toString() });
    }
  }
  return result;
}



export function IndicadoresDashboard() {
  const { isOpen, type } = useModalDashboard();



  const { onOpen } = useModal()

  const isModalOpen = isOpen && type === "indicadores";

  const history = useNavigate();

  const handleVoltar = () => {
    history(-1);
  }

  const { user, urlGeralAdm, urlGeral, setItensSelecionados } = useContext(UserContext);

  const [total, setTotal] = useState<TotalPatrimonios[]>([]);



  const urlPatrimonioInsert = `${urlGeralAdm}/InstitutionRest/Query/Count?institution_id=${user?.institution_id}`;
  console.log(urlPatrimonioInsert)
  useEffect(() => {
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
         
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()


  }, [urlPatrimonioInsert]);

  console.log(urlPatrimonioInsert)

  
  const [profile, setProfile] = useState({
    img_perfil: '',
    img_background: '',
    institution_id: '',
    color:'',
    site:''
  });

  useEffect(() => {
    if (total?.[0]) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        institution_id: total[0]?.institution_id || '' // Se não for array, pega direto
      }));
    }
  }, [total]); // Atualiza sempre que `total` mudar
  

  console.log('total',total)

  //
  const [bolsistas, setBolsistas] = useState<Bolsistas[]>([]);

  let urlBolsistas = urlGeralAdm + `ResearcherRest/Query/Subsidy`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlBolsistas, {
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
          setBolsistas(data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()

  }, [urlBolsistas]);

  //
  console.log(urlBolsistas)
  console.log(bolsistas)


  //

  const [docentes, setDocentes] = useState<Docentes[]>([]);

  let urlDocentes = urlGeralAdm + `docentes`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlDocentes, {
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
          setDocentes(data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()

  }, [urlDocentes]);

  console.log(docentes)

  //

  const [taes, setTaes] = useState<Tecnicos[]>([]);

  let urlTecnicos = urlGeralAdm + `tecnicos`

  console.log(urlTecnicos)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlTecnicos, {
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
          setTaes(data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()

  }, [urlTecnicos]);

  console.log(taes)


  //Anos arquivos enviados docentes 

  const [yearDocentes, setYearDocentes] = useState<YearSemester[]>([]);

  let urlYearDocentes = urlGeralAdm + `docentes`

  console.log(urlYearDocentes)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlYearDocentes, {
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
          setYearDocentes(data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()

  }, [urlYearDocentes]);

  const currentYear = new Date().getFullYear();
  const currentSemester = new Date().getMonth() < 6 ? 1 : 2;

  const yearSemesterArray = generateYearSemesterArray(2010, 1, currentYear, currentSemester);

  const items = yearSemesterArray.map(item => ({
    ...item,
    selected: yearDocentes.some(docente => docente.year === item.year && docente.semester === item.semester)
  }));

  const [openModalYearDocente, setOpenModalYearDocente] = useState(false)

  useEffect(() => {
    const currentItem = items.find(
      item => item.year === String(currentYear) && item.semester === String(currentSemester)
    );

    if (currentItem && !currentItem.selected) {
      setOpenModalYearDocente(true)
    }

  }, []);

  //


  const pqCount = bolsistas.filter(b => b.modality_code === 'PQ').length;
  const dtCount = bolsistas.filter(b => b.modality_code === 'DT').length;
  const totalCountR = total.reduce((sum, t) => sum + parseInt(t.count_r), 0);
  const totalCountGraduateR = total.reduce((sum, t) => sum + parseInt(t.count_gpr), 0);

  const chartData = [
    { name: 'Produtividade em Pesquisa', value: pqCount },
    { name: 'Desen. Tec. e Extensão Inovadora', value: dtCount },
    { name: 'Outros docentes', value: totalCountR - pqCount - dtCount },
  ];

  const chartData2 = [
    { name: 'Participam da pós-graduação', value: totalCountGraduateR },
    { name: 'Outros docentes', value: totalCountR - totalCountGraduateR },
  ];

  //

  const [year, setYear] = useState(new Date().getFullYear() - 9);


  const years: number[] = [];
  for (let i = currentYear; i > currentYear - 30; i--) {
    years.push(i);
  }

  const [dados, setDados] = useState<Research[]>([]);

  let urlDados = `${urlGeral}ResearcherData/DadosGerais?year=${year}`

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(urlDados, {
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
          setDados(data);

        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlDados]);


  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig2>('producao_bibliografica')

  const totalBiblio = useMemo(
    () => ({
      producao_bibliografica: dados.reduce(
        (acc, curr) => acc + Number(curr.count_article) + Number(curr.count_book) + Number(curr.count_book_chapter),
        0
      ),
      producao_tecnica: dados.reduce((acc, curr) => acc + curr.count_patent + curr.count_software + curr.count_brand, 0),
    }),
    [dados]
  );


  const { onOpen: onOpenModal } = useModal()

  //

  const [VisaoPrograma, setVisaoPrograma] = useState<VisaoPrograma[]>([]);

  let urlVisaoPrograma = `${urlGeral}/graduate_program_production?graduate_program_id=0&year=1900`;
  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlVisaoPrograma, {
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
          setVisaoPrograma(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlVisaoPrograma]);

  /////////////// csv

  const handleBtnCsv = () => {
    try {

      const convertJsonToCsv = (json: any[]): string => {
        const items = json;
        const replacer = (key: string, value: any) => (value === null ? '' : value); // Handle null values
        const header = Object.keys(items[0]);
        const csv = [
          '\uFEFF' + header.join(';'), // Add BOM and CSV header
          ...items.map((item) =>
            header.map((fieldName) => JSON.stringify(item[fieldName], replacer)).join(';')
          ) // CSV data
        ].join('\r\n');

        return csv;
      };


      const csvData = convertJsonToCsv(bolsistas);
      const blob = new Blob([csvData], { type: 'text/csv;charset=windows-1252;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `bolsistas_escola_engenharia.csv`;
      link.href = url;
      link.click();

    } catch (error) {
      console.error('Error:', error);
    }

  };


  const url = 'https://app.powerbi.com/view?r=eyJrIjoiNTBjNmQ3NWQtODNmZC00MWZkLThjNWEtZjU5YmE2ZDkwMjVkIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9'
  const { version } = useContext(UserContext)

  console.log(profile)

  const db = getFirestore();
  const storage = getStorage();
  const isDataLoaded = useRef(false); // Evita loops de salvamento
  
  // Carregar dados ao montar a página
  useEffect(() => {
    if (profile.institution_id) {
      const fetchInstitutionData = async () => {
        const docRef = doc(db, "institutions", profile.institution_id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
  
          setProfile({
            institution_id:data?.institution_id || '',
            img_background: data?.img_background || "",
            img_perfil: data?.img_perfil || "",
            color: data?.color || "",
            site: data?.site || "",
          });
  
          isDataLoaded.current = true; // Marca que os dados foram carregados
        } else {
          console.log("Instituição não encontrada. Criando novo registro...");
          await setDoc(docRef, {
            img_background: "",
            img_perfil: "",
            color: "",
            site: "",
          });
          isDataLoaded.current = true;
        }
      };
  
      fetchInstitutionData();
    }
  }, [profile.institution_id]);

  console.log('profile',profile)
  
  // Salvar automaticamente no Firebase quando os dados mudam
  useEffect(() => {
    if (profile.institution_id && isDataLoaded.current) {
      const saveData = async () => {
        await setDoc(doc(db, "institutions", profile.institution_id), profile, { merge: true });
      };
      saveData();
    }
  }, [profile]);
  
  // Função para upload de imagem
  const handleUpload = async (folder: "perfil" | "background") => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();
  
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file || !profile.institution_id) return;
  
      const storagePath = `institutions/${profile.institution_id}/${folder}/${file.name}`;
      const storageRef = ref(storage, storagePath);
      
      toast.info("Enviando imagem...");
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
  
      setProfile((prev) => ({
        ...prev,
        img_background: folder === "background" ? downloadURL : prev.img_background,
        img_perfil: folder === "perfil" ? downloadURL : prev.img_perfil,
      }));
  
      await setDoc(doc(db, "institutions", profile.institution_id), { [`img_${folder}`]: downloadURL }, { merge: true });
  
      toast.success("Upload concluído!");
    };
  };
  
  return (
    <>
      <Helmet>
        <title>Indicadores da instituição | Módulo administrativo | {version ? ('Conectee') : ('Simcc')} </title>
        <meta name="description" content={`Indicadores da instituição | Módulo administrativo | ${version ? ('Conectee') : ('Simcc')}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {isModalOpen && (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Tabs defaultValue={'all'} className="h-full" >
            <div className="w-full mb-8  gap-4">
              <div className="flex items-center gap-4">

                <Button onClick={handleVoltar} variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Voltar</span>
                </Button>

                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Indicadores da Instituição
                </h1>

                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <TabsList >

                    <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>

                    <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                    {version && (<TabsTrigger value="tec" className="text-zinc-600 dark:text-zinc-200">Técnicos</TabsTrigger>)}

                  </TabsList>


                  <Link target="_blank" to={url}><Button size="sm"><ChartBar size={16} />Indicadores Power Bi</Button></Link>
                </div>
              </div>

            </div>

            <TabsContent value="all" className="h-auto flex flex-col gap-4 md:gap-8  mt-2">
              <div className="flex flex-col items-center md:flex-row gap-6 w-full">

              <div className="w-full">
      {/* 🔹 Seção de Background */}
      <Alert
        className="h-[200px] flex justify-end bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${profile.img_background})` }}
      >
        <Button variant="outline" size="sm" onClick={() => handleUpload("background")}>
          <Upload size={16} /> Alterar imagem
        </Button>
      </Alert>

      {/* 🔹 Avatar do usuário */}
      <div className="relative group w-fit -top-16 px-16">
        <Alert
          className="aspect-square bg-no-repeat bg-center bg-contain rounded-md h-28 bg-white dark:bg-white"
          style={{ backgroundImage: `url(${profile.img_perfil})` }}
        ></Alert>
        {/* 🔹 Overlay de Upload */}
        <div
          className="aspect-square rounded-md h-28 group-hover:flex bg-black/20 items-center justify-center absolute hidden top-0 z-[1] cursor-pointer"
          onClick={() => handleUpload('perfil')}
        >
          <Upload size={20} />
        </div>
      </div>

      {/* 🔹 Accordion com detalhes */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="md:px-16 -top-8 relative flex justify-between">
            <div>
            <h1 className="text-2xl max-w-[800px] font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                      {total.map((props) => props.name)}
                    </h1>
                    <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center capitalize"><Hash size={12} />{total.map((props) => props.institution_id)}</div>
            </div>
            <AccordionTrigger />
          </div>

          <AccordionContent className="md:px-16 flex gap-4 w-full">
            {/* 🔹 Campo Site */}
            <div className="flex flex-col gap-2 w-full">
              <LabelUi>Site da instituição</LabelUi>
              <Input
                type="text"
                value={profile.site}
                onChange={(e) => {
                  setProfile((prev) => ({ ...prev, site: e.target.value }));
                  
                }}
              />
            </div>

            {/* 🔹 Campo Cor Base */}
            <div className="flex flex-col gap-2 w-full">
              <LabelUi>Cor base</LabelUi>
              <div className="flex gap-4">
                <Input
                  type="text"
                  value={profile.color}
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, color: e.target.value }));
                  
                  }}
                />
                <ColorPicker
                  value={profile.color}
                  onChange={(v) => {
                    setProfile((prev) => ({ ...prev, color: v }));
                   
                  }}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>



              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Alert className="p-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de docentes
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{total.map((props) => props.count_r)}</div>
                    <p className="text-xs text-muted-foreground">
                      registrados
                    </p>
                  </CardContent>
                </Alert>

                {version && (
                  <Alert className="p-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total de Técnicos
                      </CardTitle>
                      <UserCog className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{total.map((props) => props.count_t)}</div>
                      <p className="text-xs text-muted-foreground">
                        registrados
                      </p>
                    </CardContent>
                  </Alert>
                )}

                {version && (
                  <Alert className="p-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total de discentes
                      </CardTitle>
                      <Student className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{total.map((props) => props.count_gps)}</div>
                      <p className="text-xs text-muted-foreground">
                        cadastrados
                      </p>
                    </CardContent>
                  </Alert>
                )}

                <Alert className="p-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de pós-graduação
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{total.map((props) => props.count_gp)}</div>
                    <p className="text-xs text-muted-foreground">
                      cadastrados
                    </p>
                  </CardContent>
                </Alert>
              </div>


              <Alert className=" bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bg_popup})` }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Crie e edite
                  </CardTitle>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <div className="flex gap-6 justify-between">

                  <CardContent>
                    <div className="text-2xl font-bold">Você também pode baixar o Power Bi e criar seus próprios indicadores</div>
                    <div className="flex gap-3 mt-3">
                      <Button size={'sm'}><Download size={16} />Baixar arquivo</Button>
                      <Button size={'sm'} variant={'ghost'}><File size={16} />Ver manual</Button>
                    </div>
                  </CardContent>

                  <div></div>
                </div>
              </Alert>

              <div className="w-full h-screen flex  rounded-md">
                <iframe
                  title="Report Section"
                  className="w-full h-screen rounded-md mb-8 border dark:border-neutral-800 "
                  src={url}
                ></iframe>
              </div>
            </TabsContent>

            <TabsContent value="unread" className="h-auto flex flex-col gap-4 md:gap-8">



              <div className="">


                <h1 className=" max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
                  Painel dos{" "}
                  <strong className="bg-eng-blue  rounded-md px-3 pb-2 text-white font-medium">
                    {" "}
                    docentes
                  </strong>{" "}
                  da instituição
                </h1>
                <p className="max-w-[750px]  text-lg font-light text-foreground">Visão geral dos pesquisadores cadastrados na plataforma</p>


              </div>



              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Alert className="lg:col-span-2 h-[400px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Perfil da carreira
                      </CardTitle>
                      <CardDescription>Classe de trabalho</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                    <GraficoDocentesClasse docentes={docentes} />
                  </CardContent>

                </Alert>

                <Alert className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Regime de trabalho
                      </CardTitle>
                      <CardDescription>Carga horária semanal</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                    <GraficoDocentesRt docentes={docentes} />
                  </CardContent>
                </Alert>
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Alert className=" h-[400px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Divisão por gênero
                      </CardTitle>
                      <CardDescription>Autodeclaração dos docentes</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Fonte: Escola de Engenharia</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                    <GraficoDocentesGenero docentes={docentes} />
                  </CardContent>

                </Alert>

                <Alert className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Progressão de carreira
                      </CardTitle>
                      <CardDescription>Quantidade por ano</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Fonte: Escola de Engenharia </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                    <GraficoProgressaoDocentes docentes={docentes} />
                  </CardContent>
                </Alert>

                <Alert className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Quantidade de docentes na pós-graduação
                      </CardTitle>
                      <CardDescription>Bolsas PQ e DT </CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Fonte: Conectee</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>


                  <CardContent className="py-0 flex-1 items-center justify-center">
                    <ChartContainer
                      config={chartConfig3}
                      className="mx-auto aspect-square max-h-[300px]"
                    >
                      <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Pie data={chartData2} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                          {chartData2.map((key, index) => (
                            <Cell key={`cell-${index}`} fill={(chartConfig3[key.name as keyof typeof chartConfig3]).color} />
                          ))}

                          <Label
                            content={({ viewBox }) => {
                              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-4xl font-bold"
                                    >
                                      {totalCountGraduateR.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Docentes
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Alert>

                <Alert className=" h-[400px] lg:col-span-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Artigos qualificados
                      </CardTitle>
                      <CardDescription>Carga horária semanal</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">

                  </CardContent>
                </Alert>
              </div>

              <div>
                <div className="md:mb-8 mb-4 flex gap-3 items-center">
                  <h3 className="text-2xl font-medium ">Produção bibliográfica e técnica</h3>
                </div>

                <Alert className="grid gap-3 lg:grid-cols-4 grid-cols-2 md:mb-8 mb-4">
                  <div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Total de artigos
                        </CardTitle>


                      </div>

                      <Quotes className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>
                      <span className="text-lg font-bold leading-none sm:text-3xl">
                        {VisaoPrograma.map((props) => (<>{props.article}</>))}
                      </span>
                    </CardContent>
                  </div>
                  <div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Total de livros
                        </CardTitle>


                      </div>

                      <Book className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>
                      <span className="text-lg font-bold leading-none sm:text-3xl">
                        {VisaoPrograma.map((props) => (<>{props.book}</>))}
                      </span>
                    </CardContent>
                  </div>
                  <div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Total de capítulos
                        </CardTitle>


                      </div>

                      <Books className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>
                      <span className="text-lg font-bold leading-none sm:text-3xl">
                        {VisaoPrograma.map((props) => (<>{props.book_chapter}</>))}
                      </span>
                    </CardContent>
                  </div>

                  <div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Total de patentes
                        </CardTitle>

                      </div>

                      <Copyright className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>
                      <span className="text-lg font-bold leading-none sm:text-3xl">
                        {VisaoPrograma.map((props) => (<>{props.patent}</>))}
                      </span>
                    </CardContent>

                  </div>

                  <div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Total de marcas
                        </CardTitle>

                      </div>

                      <StripeLogo className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>
                      <span className="text-lg font-bold leading-none sm:text-3xl">
                        {VisaoPrograma.map((props) => (<>{props.brand}</>))}
                      </span>
                    </CardContent>

                  </div>

                  <div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Total de software
                        </CardTitle>

                      </div>

                      <Code className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>
                      <span className="text-lg font-bold leading-none sm:text-3xl">
                        {VisaoPrograma.map((props) => (<>{props.software}</>))}
                      </span>
                    </CardContent>

                  </div>

                  <div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Total de trabalho em evento
                        </CardTitle>

                      </div>

                      <File className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>
                      <span className="text-lg font-bold leading-none sm:text-3xl">
                        {VisaoPrograma.map((props) => (<>{props.work_in_event}</>))}
                      </span>
                    </CardContent>

                  </div>


                  <div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Total de orientações
                        </CardTitle>

                      </div>

                      <Student className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>
                      <span className="text-lg font-bold leading-none sm:text-3xl">
                        {VisaoPrograma.map((props) => (<>{props.researcher}</>))}
                      </span>
                    </CardContent>

                  </div>
                </Alert>

                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">


                  <Alert className="lg:col-span-3 h-[400px] p-0 ">
                    <CardHeader className="flex p-0 flex-col items-stretch space-y-0 border-b  sm:flex-row">
                      <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardHeader className="flex p-0 flex-row items-center justify-between space-y-0 ">
                          <div>
                            <CardTitle className="text-sm font-medium">
                              Produção geral
                            </CardTitle>
                            <CardDescription>Dados desde o ano {year}</CardDescription>
                          </div>

                          <div className="flex items-center gap-3">
                            <Select defaultValue={String(year)} value={String(year)} onValueChange={(value) => setYear(Number(value))}>
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                                <TooltipContent>
                                  <p>Essas informações não representam a produção total da Escola desde a sua fundação, é um recorte a partir de {year}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                        </CardHeader>
                      </div>
                      <div className="flex">
                        {["producao_bibliografica", "producao_tecnica"].map((key) => {
                          const chart = key as keyof typeof chartConfig2
                          return (
                            <button
                              key={chart}
                              data-active={activeChart === chart}
                              className={`relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 ${activeChart === chart && ('bg-neutral-100')} ${activeChart === 'producao_tecnica' && ('rounded-tr-md')}`}
                              onClick={() => setActiveChart(chart)}
                            >
                              <span className="text-xs text-muted-foreground">
                                {chartConfig2[chart].label}
                              </span>
                              <span className="text-lg font-bold leading-none sm:text-3xl">
                                {totalBiblio[key as keyof typeof totalBiblio].toLocaleString()}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </CardHeader>

                    <CardContent className="px-2 sm:p-6">
                      <ChartContainer
                        config={chartConfig2}
                        className="aspect-auto h-[250px] w-full"
                      >
                        <BarChart accessibilityLayer data={dados}>
                          <CartesianGrid vertical={false} horizontal={false} />
                          <ChartLegend content={<ChartLegendContent />} />

                          <XAxis
                            dataKey="year"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}

                          />

                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                          />

                          {activeChart == 'producao_bibliografica' && (
                            <>
                              <Bar dataKey="count_article" fill="#5F82ED" radius={4} >
                                <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                                />


                              </Bar>
                              <Bar dataKey="count_book" fill="#792F4C" radius={4} >
                                <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                                />
                              </Bar>
                              <Bar dataKey="count_book_chapter" fill="#DBAFD0" radius={4} >
                                <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                                />
                              </Bar></>
                          )}

                          {activeChart == 'producao_tecnica' && (
                            <>
                              <Bar dataKey="count_patent" fill="#66B4D0" radius={4} >
                                <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                                />
                              </Bar>
                              <Bar dataKey="count_brand" fill="#1B1464" radius={4} >
                                <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                                />
                              </Bar>
                              <Bar dataKey="count_software" fill="#096670" radius={4} >
                                <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                                />
                              </Bar></>
                          )}

                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Alert>





                  <Alert className="lg:col-span-3 ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Artigos qualificados
                        </CardTitle>
                        <CardDescription>Carga horária semanal</CardDescription>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                    </CardHeader>

                    <CardContent className="flex py-0 flex-1  items-center justify-center">
                      <GraficoArtigosPorQualis dados={dados} />
                    </CardContent>
                  </Alert>

                  <Alert className=" h-[400px]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Titulação
                        </CardTitle>
                        <CardDescription>Graduação, mestrado, doutorado...</CardDescription>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                    </CardHeader>

                  </Alert>

                  <Alert className=" h-[400px] lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Artigos qualificados
                        </CardTitle>
                        <CardDescription>Carga horária semanal</CardDescription>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                    </CardHeader>

                    <CardContent className="flex py-0 flex-1  items-center justify-center">

                    </CardContent>
                  </Alert>


                </div>
              </div>

              <div>
                <div className="md:mb-8 mb-4 flex gap-3 items-center">
                  <h3 className="text-2xl font-medium ">Informações sociais</h3>
                </div>

              </div>

              <div>
                <div className="md:mb-8 mb-4 flex gap-3 items-center">
                  <h3 className="text-2xl font-medium ">Bolsistas CNPq</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">


                  <Alert className=" flex flex-col ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Gráfico Produtividade em Pesquisa
                        </CardTitle>
                        <CardDescription>Total por categoria</CardDescription>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                          <TooltipContent>
                            <p>Bolsistas CNPq</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                    </CardHeader>

                    <CardContent className="flex py-0 flex-1  items-center justify-center">
                      <GraficoBolsistaProdutividade bolsistas={bolsistas} />
                    </CardContent>
                  </Alert>


                  <Alert className=" flex flex-col ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Gráfico Desen. Tec. e Extensão Inovadora
                        </CardTitle>
                        <CardDescription>Total por categoria</CardDescription>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                          <TooltipContent>
                            <p>Bolsistas CNPq</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                    </CardHeader>

                    <CardContent className="flex py-0 flex-1  items-center justify-center">
                      <GraficoBolsistaTecnologico bolsistas={bolsistas} />
                    </CardContent>
                  </Alert>

                  <Alert className="  flex flex-col ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Gráfico percentual de bolsistas
                        </CardTitle>
                        <CardDescription>Visão geral da Escola de Engenharia</CardDescription>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                          <TooltipContent>
                            <p>Bolsistas CNPq</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                    </CardHeader>

                    <CardContent className="py-0 flex-1 items-center justify-center">
                      <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[300px]"
                      >
                        <PieChart>
                          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                            {chartData.map((key, index) => (
                              <Cell key={`cell-${index}`} fill={(chartConfig[key.name as keyof typeof chartConfig]).color} />
                            ))}

                            <Label
                              content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                  return (
                                    <text
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                    >
                                      <tspan
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        className="fill-foreground text-4xl font-bold"
                                      >
                                        {bolsistas.length.toLocaleString()}
                                      </tspan>
                                      <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) + 24}
                                        className="fill-muted-foreground"
                                      >
                                        Bolsistas
                                      </tspan>
                                    </text>
                                  );
                                }
                              }}
                            />
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                  </Alert>

                  <Alert className="  lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-sm font-medium">
                          Tabela de pesquisadores
                        </CardTitle>
                        <CardDescription>Bolsistas de Produtividade em Pesquisa</CardDescription>
                      </div>

                      <Button variant={'outline'} onClick={() => handleBtnCsv()}><FileCsv size={16} /> Exportar csv</Button>

                    </CardHeader>

                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="  whitespace-nowrap">Nome</TableHead>
                              <TableHead className="w-[150px] whitespace-nowrap">Modalidade</TableHead>
                              <TableHead className="w-[100px] whitespace-nowrap">Categoria</TableHead>
                              <TableHead className=" whitespace-nowrap">Chamada</TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {bolsistas.map((props, index) => {
                              return (
                                <TableRow className="cursor-pointer" onClick={() => {
                                  onOpenModal('researcher-modal', { name: props.name })
                                  setItensSelecionados([])
                                }}>
                                  <TableCell className=" text-sm flex whitespace-nowrap flex-1">
                                    {props.name}
                                  </TableCell>

                                  <TableCell className=" text-sm w-[150px] whitespace-nowrap">
                                    {props.modality_name}
                                  </TableCell>

                                  <TableCell className=" text-sm w-[150px] whitespace-nowrap">
                                    {props.category_level_code}
                                  </TableCell>

                                  <TableCell className=" text-sm w-full flex-1">
                                    {props.call_title}
                                  </TableCell>
                                </TableRow>

                              )
                            })}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>

                  </Alert>
                </div>

              </div>


            </TabsContent>

            <TabsContent value="tec" className="h-auto flex flex-col gap-4 md:gap-8">
              <div className="">


                <h1 className=" max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
                  Painel dos{" "}
                  <strong className="bg-eng-blue  rounded-md px-3 pb-2 text-white font-medium">
                    {" "}
                    técnicos
                  </strong>{" "}
                  da instituição
                </h1>
                <p className="max-w-[750px]  text-lg font-light text-foreground">Visão geral dos técnicos cadastrados na plataforma</p>
                <div className="flex gap-3 mt-3">
                  <Button size={'sm'}
                    onClick={() => onOpen('import-taes')}><FileXls size={16} />Importar dados dos técnicos</Button>

                </div>


              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Alert className="lg:col-span-2 h-[400px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Perfil da carreira
                      </CardTitle>
                      <CardDescription>Classe de trabalho</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                    <GraficoTecnicosCargo docentes={taes} />
                  </CardContent>

                </Alert>

                <Alert className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Regime de trabalho
                      </CardTitle>
                      <CardDescription>Carga horária semanal</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                    <GraficoTecnicosRt docentes={taes} />
                  </CardContent>
                </Alert>
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Alert className=" h-[400px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Divisão por gênero
                      </CardTitle>
                      <CardDescription>Graduação, mestrado, doutorado...</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                    <GraficoTecnicosGenero docentes={taes} />
                  </CardContent>

                </Alert>

                <Alert className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Produção técnica
                      </CardTitle>
                      <CardDescription>Patente, software e marca</CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>

                  <CardContent className="flex py-0 flex-1  items-center justify-center">
                    <GraficoProgressaoTecnicos docentes={taes} />
                  </CardContent>
                </Alert>

                <Alert className="">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Bolsistas CNPq
                      </CardTitle>
                      <CardDescription>Bolsas PQ e DT </CardDescription>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger></TooltipTrigger>
                        <TooltipContent>
                          <p>Add to library</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </CardHeader>


                  <CardContent className="py-0 flex-1 items-center justify-center">
                    <ChartContainer
                      config={chartConfig3}
                      className="mx-auto aspect-square max-h-[300px]"
                    >
                      <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Pie data={chartData2} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                          {chartData2.map((key, index) => (
                            <Cell key={`cell-${index}`} fill={(chartConfig3[key.name as keyof typeof chartConfig3]).color} />
                          ))}

                          <Label
                            content={({ viewBox }) => {
                              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-4xl font-bold"
                                    >
                                      {totalCountGraduateR.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Docentes
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      )}
    </>
  )
}
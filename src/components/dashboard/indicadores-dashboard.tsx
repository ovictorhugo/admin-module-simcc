import { ArrowRight, ChevronLeft, Download, File, GraduationCap, Info, Link2, User } from "lucide-react";
import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../ui/alert";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { FileXls } from "phosphor-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"


interface TotalPatrimonios {
    count_gp: string,
    count_gpr: string,
    institution_id: string,
    count_r:string
  }

  interface Patrimonio {
    id: string
    id_lattes: string
    nome_beneficiario: string
    cpf_beneficiario: string
    nome_pais: string
    nome_regiao: string
    nome_uf: string
    nome_cidade: string
    nome_grande_area: string
    nome_area: string
    nome_sub_area: string
    cod_modalidade: string
    nome_modalidade: string
    titulo_chamada: string
    cod_categoria_nivel: string
    nome_programa_fomento: string
    nome_instituto: string
    quant_auxilio: string
    quant_bolsa: string
}


  import bg_popup from '../../assets/bg_popup.png';
import { useModal } from "../hooks/use-modal-store";

export function IndicadoresDashboard() {
    const { isOpen, type} = useModalDashboard();

    const {onOpen} = useModal()
  
    const isModalOpen = isOpen && type === "indicadores";
    
    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const {user, urlGeralAdm } = useContext(UserContext);

    const [total, setTotal] = useState<TotalPatrimonios[]>([]);

    const urlPatrimonioInsert =  `${urlGeralAdm}/InstitutionRest/Query/Count?institution_id=${user.institution_id}`;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(urlPatrimonioInsert , {
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

    //
    const [bolsistas, setBolsistas] = useState<Patrimonio[]>([]);

    let urlBolsistas = urlGeralAdm + `ResearcherRest/Query/Subsidy`

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(urlBolsistas , {
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
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    return(
        <>
        {isModalOpen && (
              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Tabs defaultValue={'all'} className="h-full" >
            <div className="w-full  gap-4">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Indicadores
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
             
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                <TabsTrigger value="tec" className="text-zinc-600 dark:text-zinc-200">Técnicos</TabsTrigger>
                <TabsTrigger value="dis" className="text-zinc-600 dark:text-zinc-200">Discentes</TabsTrigger>
                </TabsList>
               
          
                <Button size="sm">Button</Button>
              </div>
            </div>

            </div>

            <TabsContent value="all" className="h-auto flex flex-col gap-4 md:gap-8  mt-2">
            {total.map((props) => {
                  return(
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Alert className="p-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de docentes
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{props.count_r}</div>
                    <p className="text-xs text-muted-foreground">
                      registrados
                    </p>
                  </CardContent>
                  </Alert>

                  <Alert className="p-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de Técnicos
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{props.count_gp}</div>
                    <p className="text-xs text-muted-foreground">
                      registrados
                    </p>
                  </CardContent>
                  </Alert>

                  <Alert className="p-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de discentes
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{props.count_gp}</div>
                    <p className="text-xs text-muted-foreground">
                      cadastrados
                    </p>
                  </CardContent>
                  </Alert>

                  <Alert className="p-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de pós-graduação
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{props.count_gp}</div>
                    <p className="text-xs text-muted-foreground">
                      cadastrados
                    </p>
                  </CardContent>
                  </Alert>
                    </div>
                  )
                })}

                <Alert className=" bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${bg_popup})` }}>
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
                    <Button size={'sm'}><Download size={16}/>Baixar arquivo</Button>
                    <Button size={'sm'} variant={'ghost'}><File size={16}/>Ver manual</Button>
                  </div>
                  </CardContent>

                  <div></div>
                  </div>
                </Alert>

                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
                    </Alert>
                
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

                    </Alert>

                   
                </div>
            </TabsContent>

            <TabsContent value="unread" className="h-auto flex flex-col gap-4 md:gap-8 mt-2">
                  <div>
                  <Link to={'https://app.powerbi.com/view?r=eyJrIjoiYTg4MGFmNWQtMjQ4Yi00ZmFhLTgzMmMtMDFiMmI3YzFmNmEwIiwidCI6IjkyYzBjZmE5LTdlOTEtNGVhZC1hYzI5LWNkNDRhMjM4OWIwMSJ9&pageName=ReportSectionaf31612e05234cb0b779'} target="_blank"  className="inline-flex items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2 mb-3 px-3 py-1 text-sm font-medium"><Info size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Saiba como extrair os bolsistas CNPq<ArrowRight size={12}/></Link>
        
        <h1 className=" max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
          Painel dos{" "}
          <strong className="bg-[#709CB6]  rounded-md px-3 pb-2 text-white font-medium">
            {" "}
            docentes
          </strong>{" "}
          da instituição
        </h1>
        <p className="max-w-[750px]  text-lg font-light text-foreground">Atualize os dados importando o arquivo .xls na plataforma </p>
                  <div className="flex gap-3 mt-3">
                    <Button size={'sm'} 
                    onClick={() => onOpen('import-docentes')}><FileXls size={16}/>Importar dados dos docentes</Button>
                    <Button size={'sm'} variant={'ghost'} onClick={() => onOpen('import-bolsistas')}><FileXls size={16}/>Importar bolsistas CNPq</Button>
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
                    </Alert>
                  </div>

                  <div>
                   <div className="md:mb-8 mb-4 flex gap-3 items-center">
                   <h3 className="text-2xl font-medium ">Produção bibliográfica e técnica</h3>
                   </div>
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <Alert className=" h-[400px]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Produção bibliográfica
                    </CardTitle>
                    <CardDescription>Artigos, livros e capítulos</CardDescription>
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
                    </Alert>

                    <Alert className="">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                      Produção anual
                    </CardTitle>
                    <CardDescription>Visão por quadrienal </CardDescription>
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
                  </div>
                  </div>

                  <div>
                   <div className="md:mb-8 mb-4 flex gap-3 items-center">
                   <h3 className="text-2xl font-medium ">Informações sociais</h3>
                   </div>

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
                   </div>

                  <div>
                   <div className="md:mb-8 mb-4 flex gap-3 items-center">
                   <h3 className="text-2xl font-medium ">Outros dados dos docentes</h3>
                   
                   </div>
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>


                  <CardContent>

                  </CardContent>
                    </Alert>
                  </div>
                  </div>
            </TabsContent>

            <TabsContent value="tec">
            <div>
                  <Link to={''}  className="inline-flex items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2 mb-3 px-3 py-1 text-sm font-medium"><Info size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Saiba como utilizar a plataforma<ArrowRight size={12}/></Link>
        
        <h1 className=" max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
          Painel dos{" "}
          <strong className="bg-[#709CB6]  rounded-md px-3 pb-2 text-white font-medium">
            {" "}
            técnicos
          </strong>{" "}
          da instituição
        </h1>
        <p className="max-w-[750px]  text-lg font-light text-foreground">Atualize os dados importando o arquivo .xls na plataforma </p>
                  <div className="flex gap-3 mt-3">
                    <Button size={'sm'} 
                    onClick={() => onOpen('import-taes')}><FileXls size={16}/>Importar dados dos técnicos</Button>
                  
                  </div>

                  </div>
            </TabsContent>
            </Tabs>
              </main>
        )}
        </>
    )
}
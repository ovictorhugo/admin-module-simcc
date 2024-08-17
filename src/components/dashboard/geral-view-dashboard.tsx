
import { useModalDashboard } from "../hooks/use-modal-dashboard";

import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../..//components/ui/tabs"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";

import { Button } from "../ui/button";
import { Check, ChevronDown, ChevronLeft, ChevronUp, Copy, GraduationCap, Play, RefreshCcw, Terminal, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../ui/alert";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { toast } from "sonner"
import { ApacheViewDashboard } from "./apache-view-dashboard";
import { Checkbox } from "../ui/checkbox";
import { CargosFuncoes } from "./components/cargos-funcoes";
import { GraficoAnaliseUsuarios } from "./graficos/grafico-analise-usuarios";
import { Label } from "../ui/label";
import { ArrowElbowDownRight, ChartBar, MagnifyingGlass } from "phosphor-react";

import teste from './components/directory.json'

interface TotalPatrimonios {
   count_gp: string,
   count_gpr: string,
   institution_id: string,
   count_r:string
 }

export function GeralViewDashboard() {
    
    const { isOpen: isOpenSidebar } = useModalSidebar();

    console.log(isOpenSidebar)

    const { isOpen, type} = useModalDashboard();
  
    const isModalOpen = isOpen && type === "general";



    ////
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

    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }


    //submit apanhe

    const handleSubmit = async () => {

      const data = [
        {
            state:true
        }
      ]

      let urlProgram = urlGeralAdm + 'sys/requestUpdate'
      const fetchData = async () => {
      try {
        const response = await fetch(urlProgram, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
         
          toast("Apache hop iniciado", {
              description: "Atualizando dados dos pesquisadores",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
         
        } else if (response.status === 423) {
            toast("O Apache hop já está rodando, tente novamente mais tarde", {
                description: "Em processo de atualização dos dados dos pesquisadores",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
        } else {
            toast("Erro ao iniciar o Apache Hop", {
                description: "Tente novamente mais tarde",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
        }
        
      } catch (err) {
        console.log(err);
      } 
     }
    
    fetchData();
};
const [directoryInput, setDirectoryInput] = useState("/");
const [directory, setDirectory] = useState('');

  let urlDiretorio =`${urlGeralAdm}s/directory`

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(urlDiretorio , {
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
          setDirectory(data)
      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchData()

 
}, []);


const handleSubmitDiretorio = async () => {
  try {
    const response = await fetch(`${urlGeralAdm}s/save-directory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ directory }),
    });

    if (response.ok) {
      toast("Diretório alterado", {
        description: "Todos os arquivos necessários serão puxados dessa pasta",
        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
      })
    } else {
      toast("Erro ao alterar diretório", {
        description: "Todos os arquivos necessários serão puxados dessa pasta",
        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
      })
    }
  } catch (error) {
    console.error('Error saving directory:', error);
  }
};


const [tab, setTab] = useState('all')

const [isOpenConsole, setIsOpenConsole] = useState(false)


/// DITEORIO JSON

const [directoryJson, setDirectoryJson] = useState("");

  // Carregar o valor do JSON ao inicializar o componente
  useEffect(() => {
    fetch('public/directory.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDirectoryJson(data[0].directory);
      })
      .catch(error => {
        console.error('Erro ao carregar JSON:', error);
      });
  }, []);
  

  console.log(directoryJson)

    return  (
       <div className="w-full relative">
      
      <main className="flex flex-1 flex-col gap-4  md:gap-8 ">
             <Tabs defaultValue={tab} value={tab} className="h-full" >
            <div className="w-full  gap-4">
            <div className="flex items-center gap-4 p-4 md:p-8 pb-0 md:pb-0">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Módulo administrativo
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" onClick={() => setTab('all')} className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>

              <TabsTrigger value="cargos" onClick={() => setTab('cargos')} className="text-zinc-600 dark:text-zinc-200">Cargos e permissões</TabsTrigger>
                <TabsTrigger value="unread" onClick={() => setTab('unread')}  className="text-zinc-600 dark:text-zinc-200">Configurações</TabsTrigger>
               
                </TabsList>
               
          
             
              </div>
            </div>

            </div>

            <TabsContent value="all" className=" ">
              <div className="p-4 md:p-8 pt-0 md:pt-0 h-auto flex flex-col gap-4 md:gap-8">
            {total.map((props) => {
                  return(
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                  <Link to={"/dashboard/pesquisadores"}>
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
                  </Link>

                 <Link to={'/dashboad/indicadores'}>
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
                  </Link>

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

                 <Link to={'/dashboard/programas'}>
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
                  </Alert></Link>
                    </div>
                  )
                })}

<div className="grid gap-4 h-full md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Alert  className="xl:col-span-2 p-0" x-chunk="dashboard-01-chunk-4" >
                <CardHeader className="flex gap-6 flex-col md:flex-row  justify-between">
              <div className="grid gap-2 ">
              <CardTitle>Usuários ativos por dia</CardTitle>
                <CardDescription>
                Dados do Google Analytics dos últimos 30 dias
                </CardDescription>
                </div>

                <div className="flex gap-3">
                  <ChartBar size={16}/>
                </div>
               </CardHeader>

               <CardContent>
                <GraficoAnaliseUsuarios/>
               </CardContent>

               </Alert>

               <Alert  className=" p-0" x-chunk="dashboard-01-chunk-4" >
                <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
              <CardTitle>Acesso externo</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
             
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Input/>
                <Button ><Copy size={16}/>Copiar link</Button>
              </div>

              <div className="w-full my-4 h-[0.5px] border-neutral-200 border-b dark:border-neutral-800"></div>
           

              <div>
                <p className="font-medium text-sm my-4">Pessoas com acesso</p>

                
                
              </div>
            </CardContent>
                </Alert>
               </div>
               </div>

            </TabsContent>

            <TabsContent value="cargos" className="h-auto flex flex-col gap-6 mt-2">
              <CargosFuncoes/>
            </TabsContent>

            <TabsContent value="unread" className="h-auto flex flex-col gap-4 md:gap-8 mt-2 ">
           <div className=" p-4 md:p-8 pt-0 md:pt-0 flex flex-col md:gap-8 gap-4 " >
           
            <Alert className="p-0">
              <CardHeader>
                <CardTitle>Diretório de arquivos</CardTitle>
                <CardDescription>
                O diretório dentro da plataforma, no qual os documentos e configurações estão
                localizados.
                </CardDescription>
              </CardHeader>
              <CardContent>
               
                 <div className="flex gap-3 items-end">
                 <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Caminho do diretório</Label>
           <Input
           disabled
                    placeholder="Diretório"
                    value={directoryJson}
                   onChange={(e) => setDirectoryJson(e.target.value)}
                  />
           </div>
               

                
                 </div>
                 
               
              </CardContent>
              </Alert>

              <Alert className="p-0 ">
              <CardHeader>
                <CardTitle>Localizar arquivos na API</CardTitle>
                <CardDescription>
                O diretório dentro da plataforma, no qual os documentos e configurações estão
                localizados.
                </CardDescription>
              </CardHeader>
              <CardContent>
               
                 <div className="flex gap-3 items-end">
                 <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Caminho do diretório</Label>
           <Input
                    placeholder="Diretório"
                    value={directoryInput}
                   onChange={(e) => setDirectoryInput(e.target.value)}
                  />
           </div>
               

                  <Button onClick={() => handleSubmitDiretorio()}><MagnifyingGlass size={16}/>Buscar arquivos</Button>
                 </div>

                 <div className="flex flex-col gap-1 mt-6">
                 {Array.from(String(directory).split(',')).map((props, index) => (
                    <p key={index} className="text-sm flex items-center gap-1"><ArrowElbowDownRight size={16}/>{props}</p>
                  ))}

                 </div>
                 
               
              </CardContent>
              </Alert>
              </div>

              {tab == 'unread' && (
              <div className="absolute bottom-0 flex flex-col w-full ">
                <div className=" relative">
                  <div className="h-[50px] w-full border-t dark:border-neutral-800  px-4 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between ">
                      <div className="flex items-center gap-3 font-medium text-sm">
                        <Terminal size={16}/> Terminal Apache Hop
                      </div>

                      <div className="flex items-center gap-3 font-medium text-sm">
                      
                        <Button size={'sm'} onClick={() => handleSubmit()}  className="h-8"><Play size={16}/>Atualizar dados</Button>
                        <Button size={'icon'} variant={'outline'} onClick={() => setIsOpenConsole(!isOpenConsole)} className="h-8 w-8">{isOpenConsole ? (<ChevronDown size={16}/>):(<ChevronUp size={16}/>)}</Button>
                      </div>
                  </div>

                  {isOpenConsole && (
                    <div>
<ApacheViewDashboard/>
                    </div>
                  )}
              </div>
              </div>
            )}

            </TabsContent>

           
            </Tabs>
      </main>



       </div>
    )
}
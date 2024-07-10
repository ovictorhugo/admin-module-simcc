
import { useModalDashboard } from "../hooks/use-modal-dashboard";

import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../..//components/ui/tabs"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";

import { Button } from "../ui/button";
import { Check, ChevronLeft, Copy, GraduationCap, Play, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../ui/alert";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { toast } from "sonner"
import { ApacheViewDashboard } from "./apache-view-dashboard";
import { Checkbox } from "../ui/checkbox";

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

    const [value, setValue] = useState('geral')

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


    return  (
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
                Módulo administrativo
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
             
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Configurações</TabsTrigger>
               
                </TabsList>
               
          
                <Button size="sm"><Check size={16}/>Button</Button>
              </div>
            </div>

            </div>

            <TabsContent value="all" className="h-auto flex flex-col gap-6 mt-2">
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

<div className="grid gap-4 h-full md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Alert  className="xl:col-span-2 p-0" x-chunk="dashboard-01-chunk-4" >
                <CardHeader className="flex gap-6 flex-col md:flex-row items-center justify-between">
              <div className="grid gap-2 ">
              <CardTitle>Titulo</CardTitle>
                <CardDescription>
                O Apache Hop atualiza diariamente os dados de todos os pesquisadores na plataforma. 
                </CardDescription>
                </div>

                <div className="flex gap-3">
                <Button onClick={() => handleSubmit()} className="w-full "><Play size={16}/>Atualizar dados</Button>
                </div>
               </CardHeader>

               <CardContent>
                
               </CardContent>

               </Alert>

               <Alert  className=" p-0" x-chunk="dashboard-01-chunk-4" >
                <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
              <CardTitle>Administradores</CardTitle>
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
                <p className="font-medium text-sm mb-4">Responsável</p>

                <div className="flex gap-3 items-center">
                <Avatar className="cursor-pointer rounded-md  h-[36px] w-[36px]">
                <AvatarImage  className={'rounded-md h-[36px] w-[36px]'} src={``} />
                <AvatarFallback className="flex items-center justify-center"></AvatarFallback>
            </Avatar>

            <div >
            <p className="font-medium text-sm">Responsável</p>
            <p className=" text-sm">Responsável</p>
            </div>
                </div>
              </div>

              <div>
                <p className="font-medium text-sm my-4">Pessoas com acesso</p>

                <div className="flex gap-3 items-center">
                <Avatar className="cursor-pointer rounded-md  h-[36px] w-[36px]">
                <AvatarImage  className={'rounded-md h-[36px] w-[36px]'} src={``} />
                <AvatarFallback className="flex items-center justify-center"></AvatarFallback>
            </Avatar>

            <div >
            <p className="font-medium text-sm">Responsável</p>
            <p className=" text-sm">Responsável</p>
            </div>

            <Select>
  <SelectTrigger className="ml-auto w-[130px]">
    <SelectValue placeholder="" />
  </SelectTrigger>
  <SelectContent>
  <SelectItem value="administrador">Administrador</SelectItem>
    <SelectItem value="colaborador">Colaborador</SelectItem>
  </SelectContent>
</Select>
                </div>
              </div>
            </CardContent>
                </Alert>
               </div>

            </TabsContent>

            <TabsContent value="unread" className="h-auto flex flex-col gap-4 md:gap-8 mt-2">
            <Alert className="p-0">
              <CardHeader>
                <CardTitle>Diretório dos plugins</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Project Name"
                    defaultValue="/content/plugins"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              </Alert>

            <Alert  className="xl:col-span-2 p-0" x-chunk="dashboard-01-chunk-4" >
                <CardHeader className="flex gap-6 flex-col md:flex-row items-center justify-between">
              <div className="grid gap-2 ">
              <CardTitle>Atualizar dados da plataforma</CardTitle>
                <CardDescription>
                O Apache Hop atualiza diariamente os dados de todos os pesquisadores na plataforma. 
                </CardDescription>
                </div>

                <div className="flex gap-3">
                <Button onClick={() => handleSubmit()} className="w-full "><Play size={16}/>Atualizar dados</Button>
                </div>
               </CardHeader>

               <CardContent>
                  <ApacheViewDashboard/>
               </CardContent>

               </Alert>
            </TabsContent>
            </Tabs>
      </main>
       )}
       </>
    )
}
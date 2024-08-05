import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { DisciplinasDepartamentoPage } from "./disciplinas-departamento";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { DocentesDepartamento } from "./docentes-departamento";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

interface Patrimonio {
  dep_id:string
  org_cod: string
  dep_nom: string
  dep_des: string
  dep_email: string
  dep_site: string
  dep_tel: string
  img_data:string
  dep_sigla: string
  }



export function VisualizacaoDepartamento() {
    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const queryUrl = useQuery();
    const type_search = queryUrl.get('dep_id');

    let DepId = type_search || ''

    const {urlGeralAdm} = useContext(UserContext)

    const [total, setTotal] = useState<Patrimonio[]>([]);
    const urlPatrimonioInsert = `${urlGeralAdm}departamentos?dep_id=${DepId}`;

   
 
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


      useEffect(() => {
      fetchData()
     
    }, [urlPatrimonioInsert]);


    

    return(
        <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
    <Tabs defaultValue={'all'} className="h-full" >
    <div className="w-full  gap-4 md:p-8 p-4 pb-0 md:pb-0">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Departamento
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
              <TabsTrigger value="doc" className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Indicadores</TabsTrigger>
                <TabsTrigger value="dis" className="text-zinc-600 dark:text-zinc-200">Disciplinas</TabsTrigger>
              
                </TabsList>
               
          
                <Button size="sm">Button</Button>
              </div>
            </div>

            </div>


            <TabsContent value="all" className="h-auto flex flex-col gap-4 md:gap-8  ">
                Conheça o 
            </TabsContent>

            <TabsContent value="doc" className="h-auto flex flex-col gap-4 md:gap-8  ">
                <DocentesDepartamento/>
            </TabsContent>

            <TabsContent value="dis" className="h-auto flex flex-col gap-4 md:gap-8  ">
               <DisciplinasDepartamentoPage dep_id={DepId}/>
            </TabsContent>
    </Tabs>
        </main>
    )
}
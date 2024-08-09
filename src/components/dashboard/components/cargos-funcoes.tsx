import { useContext, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { UserContext } from "../../../context/context";
import { DisplayCargo } from "./display-cargo";
import { Alert } from "../../ui/alert";
import { CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Plus, UserCheck } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"


interface Disciplinas {
   role:string
   id:string
}


export function CargosFuncoes() {
    const [data, setData] = useState<Disciplinas[]>([]);
    const [dataSelecionado, setDataSelecionado] = useState<Disciplinas | null>(null);

    const { urlGeralAdm, urlGeral } = useContext(UserContext)
    let urlDisciplinas = urlGeralAdm + `s/role`;

        const fetchDataGet = async () => {
            try {
                const response = await fetch(urlDisciplinas, {
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
                    setData(data);
                }
            } catch (err) {
                console.log(err);
            }
        };


   useEffect(() => {
        fetchDataGet();
    }, [urlDisciplinas]);

    console.log(data)

    //

    const [nomePesquisador, setNomePesquisador] = useState('');


    const handleSubmitPesquisador = async () => {
        try {

            const data = [
                {
                    role:nomePesquisador
                  }
              ]

               let urlProgram = urlGeralAdm + 's/role'

               console.log(urlProgram)
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
                   
                    toast("Dados enviados com sucesso", {
                        description: "Cargo adicionado a coleção, adicione as funcionalidades",
                        action: {
                          label: "Fechar",
                          onClick: () => console.log("Undo"),
                        },
                      })
                  
                        setNomePesquisador('')
                        fetchDataGet()
                   
                  } else {
                   
                    toast("Tente novamente!", {
                        description: "Erro ao cadastrar cargo na plataforma",
                        action: {
                          label: "Fechar",
                          onClick: () => console.log("Undo"),
                        },
                      })
                  }
                  
                } catch (err) {
                  console.log(err);
                } 
              };
              fetchData();
              

    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
      }

    }

    return(
        <main className="grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3  pb-4 md:pb-8">
              <div className={`grid auto-rows-max items-start gap-4 md:gap-8 ${dataSelecionado ? ('lg:col-span-2') : ('lg:col-span-3')}`}>
              <Alert
                className="p-0" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Adicionar cargo</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Adicione o cargo, este poderá ser atrelado a um docente ou técnico, possuindo acesso a funcionalidades da plataforma.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                <div className="flex w-full gap-6 items-end">
                <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Nome do cargo</Label>
           <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text"  />
           </div>
                 <Button onClick={() => handleSubmitPesquisador()}><Plus size={16}/>Adicionar cargo</Button>
                 </div>
                </CardFooter>
              </Alert>

              <ResponsiveMasonry
                    columnsCountBreakPoints={{
                        350: 1,
                        720: 2,
                        900: 2,
                        1200: dataSelecionado ? 3 : 4,
                    }}
                >
                    <Masonry gutter="16px">

                        {data.map((props) => (
                            <div className="flex cursor-pointer ">
            
                            <div className={`w-2 min-w-[8px]  flex flex-1 h-full bg-[#719CB8] rounded-l-lg border border-r-0 border-neutral-200 dark:border-neutral-800 ` }></div>
                             <Alert onClick={() => setDataSelecionado(props)}>
                                  <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-md border dark:border-neutral-800 flex items-center justify-center"><UserCheck size={16}/></div>
                                  <p className="font-medium ">{props.role}</p>
                                  </div>
                            </Alert>
                           </div>
                        ))}
                        </Masonry>
                    </ResponsiveMasonry>
              </div>

              {dataSelecionado && (
                <DisplayCargo
                    role={dataSelecionado.role}
                    id={dataSelecionado.id} 
                />
            )}
        </main>
    )
}
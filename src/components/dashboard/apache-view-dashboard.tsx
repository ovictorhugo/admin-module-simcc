import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";
import { toast } from "sonner"
import { Button } from "../ui/button";
import { Play, Terminal } from "phosphor-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface PesquisadorProps {
    message:string
}
export function ApacheViewDashboard() {
    const { urlGeralAdm, user } = useContext(UserContext);
    const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);
    const urlGetApache = urlGeralAdm + `sys/checkHop`;


    const fetchData = async () => {
      try {
        const response = await fetch(urlGetApache, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'text/plain',
          },
        });
        const data = await response.json();
  
        // Ensure data is an array
        const dataArray = Array.isArray(data) ? data : [data];
  
        if (dataArray && dataArray.length > 0) {
          setResearcher((prevResearcher) => {
            // Check if the last item of the current researcher array is different from the new data
            const lastItem = prevResearcher[prevResearcher.length - 1];
            const newItem = dataArray[dataArray.length - 1];
  
            if (JSON.stringify(lastItem) !== JSON.stringify(newItem)) {
              return [...prevResearcher, ...dataArray];
            }
  
            return prevResearcher;
          });
          console.log('data', researcher);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      fetchData(); // Initial fetch
      console.log(researcher);
      const intervalId = setInterval(fetchData, 2000); // Fetch every 2 seconds
  
      return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    

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

    return(
        <div className="w-full h-full">
          <Alert className="mb-6 p-8 min-h-[200px] flex justify-between items-center">
            <div>
            <h1 className=" text-2xl mb-4  font-medium max-w-[200px] ">
         {user.name}
      </h1>
      
            </div>

            <div>
              <img src={user.img_url} className="h-24 w-auto "></img>
            </div>
          </Alert>
            <div className="w-full grid grid-cols-2 gap-6">
            <div className="w-full flex ">
                        <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-blue-700 whitespace-nowrap"></div>

                        <Alert  className="rounded-l-none flex flex-col justify-between ">
                <div>
                <h1 className=" text-2xl mb-4  font-medium max-w-[380px] ">
          Atualizar dados da <strong className="bg-blue-700 font-medium text-white"> plataforma </strong>{" "}
      </h1>
      
      <p className="mt-2 max-w-[420px] text-sm mb-6 text-gray-500 dark:text-gray-300">O Apache Hop atualiza diariamente os dados de todos os pesquisadores na plataforma e adiciona novos registros a partir da meia-noite. Para agilizar esse processo, clique no botão abaixo. Este procedimento pode levar aproximadamente 3 horas.</p>
                </div>
                    <Button onClick={() => handleSubmit()} className="w-full "><Play size={16}/>Atualizar dados dos pesquisadores</Button>
                </Alert>
                </div>

                <Alert className="">
                <div className="flex items-center gap-3 mb-3">
                            <Terminal size={24} className="text-gray-400" />
           <p className="text-sm font-bold">Console Apache Hop</p>
           </div>
                    <ScrollArea className=" bg-neutral-50 dark:bg-neutral-900 rounded-md p-4 h-[250px]">

                  
                        {researcher.map((props) => {
                            return(
                                <p className="text-gray-500 text-sm">{props.message}</p>
                            )
                        })}
                   

                        <ScrollBar/>
                    </ScrollArea>
                </Alert>
            </div>
        </div>
    )
}
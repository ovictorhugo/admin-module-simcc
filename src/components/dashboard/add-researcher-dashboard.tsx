import { Alert } from "../ui/alert"
import bg_popup from '../../assets/bg_popup.png';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft,  Plus, User } from "lucide-react";
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import { UserContext } from "../../context/context";
import { FileXls } from "phosphor-react";
import { PesquisadorProps, columns } from "./columns";
import { useModal } from "../hooks/use-modal-store";
import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";
import { CardContent, CardHeader, CardTitle } from "../ui/card";


export function AddResearcherDashboard() {
    const [nomePesquisador, setNomePesquisador] = useState('');
    const [lattesID, setLattesID] = useState('');


    const { user, urlGeralAdm } = useContext(UserContext);

    const { isOpen, type} = useModalDashboard();
  
    const isModalOpen = isOpen && type === 'researcher';
    const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);

    const handleSubmitPesquisador = async () => {

        const docId = uuidv4();

        try {
          const data = [
            {
                researcher_id: docId,
                name: nomePesquisador,
                lattes_id: lattesID,
                institution_id: user.institution_id,
              }
          ]

          let urlProgram = urlGeralAdm + '/ResearcherRest/Insert'

          const fetchData = async () => {
          
            if(nomePesquisador.length != 0 && lattesID.length > 13) {
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
                      setLattesID('')
                     
                      setNomePesquisador('')
                      fetchDataTable()
                      toast("Dados enviados com sucesso", {
                          description: "Pesquisador cadastrado na instituição",
                          action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                          },
                        })
                    } else {
                      if (response.status === 400) {
                        toast("Pesquisador já existe", {
                          description: "Tente novamente",
                          action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                          },
                        });
                      } else {
                        toast("Erro ao enviar os dados ao servidor", {
                          description: "Tente novamente",
                          action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                          },
                        });
                      }
                    }
                    
                  } catch (err) {
                    console.log(err);
                  } 
            } else {
               if(nomePesquisador.length == 0 && lattesID.length == 0) {
                toast("Parece que os campos estão vazios", {
                    description: "Preencha os campos nome do pesquisador e Lattes Id",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               } else if (lattesID.length < 14) {
                toast("Parece que o Lattes Id está incorreto ou não preenchido", {
                    description: "O Lattes ID teve conter 13 números",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               } else if (nomePesquisador.length == 0) {
                toast("Preencha o nome do pesquisador", {
                    description: "Parece que o campo está vazio",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               }
            }
          };
          fetchData();
    
          
        } catch (error) {
          console.error('Erro ao processar a requisição:', error);
        }
      };


      // upload

      const urlGetResearcher = urlGeralAdm + `ResearcherRest/Query?institution_id=${user.institution_id}`;


      const fetchDataTable = async () => {
        try {
          const response = await fetch(urlGetResearcher, {
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
          if (data) {
            setResearcher(data);
         
          }
        } catch (err) {
          console.log(err);
        }
      };

     

  const {onOpen, isOpen:isOpenModal, type:typeModal} = useModal()

  

  useEffect(() => {
    if (typeModal === 'confirm-delete-researcher' && !isOpenModal) {
      fetchDataTable();
    }

    fetchDataTable();
  }, [isOpenModal, type]);

  const history = useNavigate();

  const handleVoltar = () => {
    history(-1);
  }

  const [onOpenAdd, setIsOpenAdd] = useState(false)

    return  (
<>
{isModalOpen && (
  <main className="flex flex-1 flex-col p-4 md:p-8">

<div className="w-full mb-2  gap-4">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pesquisadores
              </h1>
             

                
            
              <div className="hidden items-center h-10 gap-2 md:ml-auto md:flex">

          
             
              </div>
            </div>

            </div>

     <div className="gap-4 md:gap-8 flex flex-col md:pb-8 pb-4">
     <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
     <Alert className="p-0 bg-cover bg-no-repeat bg-center lg:col-span-3"  style={{ backgroundImage: `url(${bg_popup})` }}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de pesquisadores
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{researcher.length}</div>
                    <p className="text-xs text-muted-foreground">
                      registrados
                    </p>
                  </CardContent>
                  </Alert>

                  <Alert onClick={() => setIsOpenAdd(!onOpenAdd)} className="p-0 hover:bg-[#274B5E] bg-[#719CB8] text-white transition-all cursor-pointer "  >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      
                    </CardTitle>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>

                  <CardContent>
                    <h2 className="font-medium text-xl">Adicionar <br/> pesquisador(a)</h2>
                  </CardContent>
                  </Alert>
     </div>

 
    {onOpenAdd && (
       <fieldset className="grid gap-6 rounded-lg  p-4 bg-white dark:border-neutral-800 border border-neutral-200 dark:bg-neutral-950 bg-cover  bg-center bg-no-repeat "  >
       <legend className="-ml-1 px-1 text-sm font-medium">
         Adicionar pesquisador à instituição
       </legend>

       <div className="flex gap-6 items-end">
           <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Nome completo</Label>
           <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text"  />
           </div>

           <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Lattes Id</Label>
           <Input value={lattesID} onChange={(e) => setLattesID(e.target.value)} type="text" />
           </div>

           <Button onClick={() => handleSubmitPesquisador()} className="text-white dark:text-white"><Plus size={16} className="" /> Adicionar</Button>
           <Button size={'icon'} onClick={() => onOpen('add-researcher-csv')} className="text-white dark:text-white"><FileXls size={16} className="" /></Button>
          
           </div>
       </fieldset>
    )}

        <fieldset className="grid gap-6 rounded-lg  p-4 bg-white dark:border-neutral-800 border border-neutral-200 dark:bg-neutral-950 ">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Todos os pesquisadores
        </legend>

        <DataTable columns={columns} data={researcher} />
        </fieldset>
     </div>

     
  </main>
)}
</>
    )
}
import { ArrowUUpLeft, FileCsv, Trash, User } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { Dialog, DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "../ui/dialog";
import { Plus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { toast } from "sonner"

export interface PesquisadorProps {
  lattes_id: string
  name: string
  type_: string
}

export interface PesquisadorProps2 {
  name: string
  lattes_id: string
  researcher_id: string
  institution_id: string
}

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../../components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { DataTableModal } from "../componentsModal/data-table";
import { columns } from "../componentsModal/columns-researchers-program";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from 'uuid';

interface PesquisadorProps {
  name: string
  lattes_id: string
}

export function ListStudentProgramModal() {
    const { onClose, isOpen, type: typeModal, data: dataModal } = useModal();
    const isModalOpen = isOpen && typeModal === "list-student-program";
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);
    const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
    const { urlGeralAdm, user } = useContext(UserContext);
    const currentYear = new Date().getFullYear();
    const [data, setData] = useState<PesquisadorProps[]>([]);

    useEffect(() => {
      setIdProgram(dataModal.graduate_program_id)
    }, [dataModal]);

    //

    const [nomePesquisador, setNomePesquisador] = useState('');
    const [lattesID, setLattesID] = useState('');

    const handleSubmitPesquisadorUnique = async () => {

        const docId = uuidv4();

        try {
          const data = [
            {
                student_id: uuidv4(),
                name: nomePesquisador,
                lattes_id: lattesID,
                graduate_program_id: id_program,
                institution_id: user.institution_id,
                year: currentYear
              }
          ]

          let urlProgram = urlGeralAdm + '/studentRest/insert'

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
      
                      toast("Dados enviados com sucesso", {
                          description: "Pesquisador cadastrado na instituição",
                          action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                          },
                        })
                    } else {
                      toast("Erro ao enviar os dados ao servidor", {
                          description: "Tente novamenete",
                          action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                          },
                        })
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

  


    //listar todos os pesquisadores popover

    const [researcherSearch, setResearcherSearch] = useState<PesquisadorProps2[]>([]);
  
    const urlGetResearcherSearch = urlGeralAdm + `ResearcherRest/Query?institution_id=${user.institution_id}`;
  
    

    //sdfsf

    const handleSubmit = async (type:string, researcher_id:string) => {
      const currentYear = new Date().getFullYear();

      try {
        const data = [
          {
            graduate_program_id: id_program,
            researcher_id:researcher_id,
            year:String(currentYear),
            type_: type
            }
        ]

        console.log('dataa reesfs', data)

        let urlProgram = urlGeralAdm + 'GraduateProgramResearcherRest/Insert'


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
                  description: "Pesquisador adicionado no programa de pós-graduação",
                  action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo"),
                  },
                })
             
            } else {
              console.error('Erro ao enviar dados para o servidor.');
              toast("Tente novamente!", {
                  description: "Erro ao cadastrar pesquisador ao programa",
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
          toast("Erro ao processar requisição", {
              description: "Tente novamente",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
      }
    };


    ///deteltar
    //sdfsf
    const handleFileUpload = (e: any) => {
      const file = e.target.files[0];
  
      if (file) {
    
  
        Papa.parse(file, {
          complete: (result: any) => {
            const parsedData = result.data;
          

            // Filtrar cabeçalho e linhas vazias
        const filteredData = parsedData.filter((row: any) => Object.values(row).some((value: any) => value !== ""));

        // Transformar os dados filtrados em um array de objetos com a estrutura desejada
        const jsonData = filteredData.map((row: any) => ({
          student_id: uuidv4(),
          name: row.name,
          lattes_id: row.lattes_id,
          graduate_program_id:id_program,
          institution_id: user.institution_id,
          year: currentYear
        }));

        setData(jsonData);
  
   
          },
          header: true,
          skipEmptyLines: true,
          delimiter: ";",
          encoding: "UTF-8",
        });
      }
    };



    //

    const urlGetResearcher =
    urlGeralAdm + `studentRest/query?graduate_program_id=${id_program}`;
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlGetResearcher, {
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
          setResearcher(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlGetResearcher, handleSubmit]);
  


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent className="min-w-[40vw] gap-0">
        <DialogHeader className="pt-8 px-6">
                 <DialogTitle className="text-2xl text-center font-medium">
                 Discentes <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">vinculados</strong> ao programa <br/> {dataModal.name}
                 </DialogTitle>
                 <DialogDescription className="text-center text-zinc-500">
                 Adicione ou remova os pesquisadores permanentes e colaboradores do programa de pós graduação
                 </DialogDescription>
               </DialogHeader>
<Separator/>
               <div>
                <div>
                <div className="flex gap-3 items-end w-full mb-3 mt-4">
             <div className="flex flex-col space-y-1.5 w-1/2">
         
             <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text"  placeholder="Nome completo" />
             </div>
 
             <div className="flex flex-col space-y-1.5 w-1/2">
            
             <Input value={lattesID} onChange={(e) => setLattesID(e.target.value)} type="text"  placeholder="Lattes Id" />
             </div>
 
             <Button onClick={() => handleSubmitPesquisadorUnique()} className="text-white dark:text-white "><Plus size={16} className="" /> Adicionar</Button>

             <label htmlFor="fileInput" onChange={handleFileUpload} className="rounded-md bg-blue-700 text-sm px-4 w-fit font-bold cursor-pointer transition-all gap-3 text-white h-10 whitespace-nowrap flex items-center justify-center hover:bg-blue-800">
                <input onChange={handleFileUpload} id="fileInput" type="file" accept=".csv"  hidden />
                <FileCsv size={16} className="" />
                Importar .csv
                
              </label>
            
             </div>



                <DataTableModal columns={columns} data={researcher}/>


              
                </div>

               


               </div>

               <DialogFooter className=" py-4 ">
        <Button variant={'ghost'}   onClick={() => onClose()}>
            <ArrowUUpLeft size={16} className="" />Voltar
              </Button>

        
            </DialogFooter>

               </DialogContent>

        </Dialog>
    )
}
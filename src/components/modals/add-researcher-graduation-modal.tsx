import { ArrowUUpLeft, Trash, User } from "phosphor-react";
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



export function AddResearcherGraduation() {
    const { onClose, isOpen, type: typeModal, data: dataModal } = useModal();
    const isModalOpen = isOpen && typeModal === "add-researcher-graduation";
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);
    const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
    const { urlGeralAdm, user } = useContext(UserContext);

    useEffect(() => {
      setIdProgram(dataModal.graduate_program_id)
    }, [dataModal]);

  


    //listar todos os pesquisadores popover

    const [researcherSearch, setResearcherSearch] = useState<PesquisadorProps2[]>([]);
  
    const urlGetResearcherSearch = urlGeralAdm + `ResearcherRest/Query?institution_id=${user.institution_id}`;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(urlGetResearcherSearch, {
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
            setResearcherSearch(data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();

      // Lógica para eliminar itens com o mesmo nome de researcher
    const filteredResearcherSearch = researcherSearch.filter(itemSearch => {
      // Verifica se o nome do item de pesquisa não está presente nos pesquisadores
      return !researcher.some(item => item.name === itemSearch.name);
    });
    
    // Define o novo estado de researcherSearch com os itens filtrados
    setResearcherSearch(filteredResearcherSearch);
    }, [urlGetResearcherSearch]);
    

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

    const handleSubmitDelete = async ( researcher_id:string) => {


      try {
        const data = [
          {
            graduate_program_id: id_program,
            lattes_id:researcher_id,
            }
        ]

        console.log('dataa reesfs', data)

        let urlProgram = urlGeralAdm + 'GraduateProgramResearcherRest/Delete'


        const fetchData = async () => {
        
          try {
            const response = await fetch(urlProgram, {
              mode: 'cors',
              method: 'DELETE',
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
                  description: "Pesquisador removido no programa de pós-graduação",
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


    //

    const urlGetResearcher =
    urlGeralAdm + `GraduateProgramResearcherRest/Query?graduate_program_id=${id_program}`;
   

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
  }, [urlGetResearcher, handleSubmit, handleSubmitDelete]);
  


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent>
        <DialogHeader className="pt-8 px-6">
                 <DialogTitle className="text-2xl text-center font-medium">
                 Docentes <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">vinculados</strong> ao programa {dataModal.name}
                 </DialogTitle>
                 <DialogDescription className="text-center text-zinc-500">
                 Adicione ou remova os pesquisadores permanentes e colaboradores do programa de pós graduação
                 </DialogDescription>
               </DialogHeader>
<Separator/>
               <div>
                <div>
                <p className="uppercase font-medium text-xs mb-3">PERMANENTES</p>

                <ScrollArea className="w-full h-32 mb-4">
                  {researcher.map((props) => {
                    if(props.type_ == "PERMANENTE") {
                     return(
                      <div className="w-fyll h-12 border-b hover:bg-neutral-100 px-2 transition-all flex gap-3 items-center text-xs uppercase font-medium ">
                     <div className="flex items-center gap-3">
                     <div className="bg-neutral-200 h-8 w-8 rounded-md flex items-center justify-center"><User size={16} className="" /></div>{props.name}
                     </div>

                    <div className="ml-auto flex gap-3 items-center">
                    <p>{props.lattes_id}</p>
                     <Button  onClick={() => handleSubmitDelete(props.lattes_id)} variant={'destructive'} className="h-8 w-8 p-0 text-white ml-auto dark:text-white">
                      <Trash size={8} className="h-4 w-4" />
                    </Button>
                    </div>
                      </div>
                     )
                    }
                  })}
               
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div className="w-full cursor-pointer h-12 border-b hover:bg-neutral-100 px-2 transition-all flex gap-3 items-center text-xs uppercase font-medium text-blue-700">
                    <div className="w-8 h-8 flex items-center justify-center"><Plus size={16} className="" /></div>ADICiONAR PESQUISADOR
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[200px] p-0">

                  <Command>
                    <CommandInput placeholder="Pesquisar docente..." />
                    <CommandList>
                    <CommandEmpty>Nenhum docente encontrado</CommandEmpty>

                    
  <CommandGroup>
    {researcherSearch.map((props) => (
      <CommandItem key={props.researcher_id} value={props.name}  onSelect={() => {
        handleSubmit('PERMANENTE',props.researcher_id)
        setOpen(false)
      }}>
        <span>{props.name}</span>
      </CommandItem>
    ))}
  </CommandGroup>


  </CommandList>
                  </Command>
                  </PopoverContent>
                </Popover>
                </ScrollArea>
                </div>

                <div>
                <p className="uppercase font-medium text-xs mb-3">COLABORADORES</p>

                <ScrollArea className="w-full h-32">
                  {researcher.map((props) => {
                     if(props.type_ == "COLABORADOR") {
                      return(
                       <div className="w-fyll h-12 border-b hover:bg-neutral-100 px-2 transition-all flex gap-3 items-center text-xs uppercase font-medium ">
                      <div className="flex items-center gap-3">
                      <div className="bg-neutral-200 h-8 w-8 rounded-md flex items-center justify-center"><User size={16} className="" /></div>{props.name}
                      </div>
 
                     <div className="ml-auto flex gap-3 items-center">
                     <p>{props.lattes_id}</p>
                      <Button  onClick={() => handleSubmitDelete(props.lattes_id)} variant={'destructive'} className="h-8 w-8 p-0 text-white ml-auto dark:text-white">
                       <Trash size={8} className="h-4 w-4" />
                     </Button>
                     </div>
                       </div>
                      )
                     }
                  })}
               
                <Popover open={open2} onOpenChange={setOpen2}>
                  <PopoverTrigger asChild>
                    <div className="w-full cursor-pointer h-12 border-b hover:bg-neutral-100 px-2 transition-all flex gap-3 items-center text-xs uppercase font-medium text-blue-700">
                    <Plus size={16} className="" />ADICiONAR PESQUISADOR
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[200px] p-0">

                  <Command>
                    <CommandInput placeholder="Pesquisar docente..." />
                    <CommandList>
                    <CommandEmpty>Nenhum docente encontrado</CommandEmpty>

                    
  <CommandGroup>
  {researcherSearch.map((props) => (
      <CommandItem key={props.researcher_id} value={props.name}  onSelect={() => {
        handleSubmit('COLABORADOR',props.researcher_id)
        setOpen(false)
      }}>
        <span>{props.name}</span>
      </CommandItem>
    ))}
  </CommandGroup>


  </CommandList>
                  </Command>
                  </PopoverContent>
                </Popover>
                </ScrollArea>
                </div>


               </div>

               <DialogFooter className=" py-4 ">
        <Button variant={'ghost'}   onClick={() => onClose()}>
            <ArrowUUpLeft size={16} className="" />Cancelar
              </Button>

              <Button   className="text-white dark:text-white" >
              <Plus size={16} className="" />Adicionar
              </Button>
            </DialogFooter>

               </DialogContent>

        </Dialog>
    )
}
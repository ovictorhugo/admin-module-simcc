import { ArrowUUpLeft, DownloadSimple, FileCsv, Plus } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { Dialog, DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "../ui/dialog";
import Papa from 'papaparse';
import { toast } from "sonner"
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataTableModal } from "../componentsModal/data-table";
import { columns } from "../componentsModal/columns-researchers-program";
import { UserContext } from "../../context/context";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../../components/ui/popover"

  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
  } from "../../components/ui/command"

interface PosGraduationsProps {
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

export function AddResearcherGraduationTwo() {
    const {onOpen, onClose, isOpen, type: typeModal, data: dataModal } = useModal();
    const isModalOpen = isOpen && typeModal === "add-researcher-graduation-two";
    const [data, setData] = useState<PosGraduationsProps[]>([]);
    const {urlGeralAdm, user} = useContext(UserContext)

    const currentYear = new Date().getFullYear();
    const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
    useEffect(() => {
        setIdProgram(dataModal.graduate_program_id)
      }, [dataModal]);
  

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
            graduate_program_id: id_program,
            researcher_id: row.lattes_id,
            year:String(currentYear),
            type_:row.type
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

    console.log('lista csv',data)

    const handleSubmitPesquisador = async () => {
        try {
          let urlProgram = urlGeralAdm + 'GraduateProgramResearcherRest/Insert'
      
          // Filtrar os dados com erros
          const dataWithErrors = [];
          
          // Iterar sobre os itens em data
          for (const item of data) {
            const { name, lattes_id } = item;
      
            if (name.length === 0 && lattes_id.length === 0) {
              toast("Parece que os campos estão vazios", {
                description: "Preencha os campos nome do pesquisador e Lattes Id",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });
            } else if (lattes_id.length < 14) {
              toast("Parece que o Lattes Id está incorreto ou não preenchido", {
                description: "O Lattes ID deve conter 13 números",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });
            } else if (name.length === 0) {
              toast("Preencha o nome do pesquisador", {
                description: "Parece que o campo está vazio",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });
            } else {
              // Se não houver erros, adiciona o item aos dados a serem enviados
              dataWithErrors.push(item);
            }
          }
      
          // Se houver itens com erros, atualiza o estado de data com esses itens
          if (dataWithErrors.length > 0) {
        const validData = data.filter(item => !dataWithErrors.includes(item));
        setData(validData);
      }
      
          // Envia apenas os dados sem erros para o servidor
          if (dataWithErrors.length > 0) {
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
              body: JSON.stringify(dataWithErrors),
            });
      
            if (response.ok) {
              toast("Dados enviados com sucesso", {
                description: "Pesquisadores cadastrados na instituição",
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
        } catch (error) {
          console.error('Erro ao processar a requisição:', error);
        }
      };

      //
      const [researcherSearch, setResearcherSearch] = useState<PesquisadorProps2[]>([]);
      const [open, setOpen] = useState(false)
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
  
     
      }, [urlGetResearcherSearch]);


      //

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

return(
    <Dialog open={isModalOpen} onOpenChange={onClose}> 
    <DialogContent className="min-w-[40vw] ">
    <DialogHeader className="pt-8 px-6">
             <DialogTitle className="text-2xl text-center font-medium">
             <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">Vincule</strong> os discentes ao programa <br/> {dataModal.name}
             </DialogTitle>
            
           </DialogHeader>

           {data.length == 0 && (
                 <div>
                    <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                   <Button className="w-full mb-6" variant={'outline'}><Plus size={16} className="" />Adicionar pesquisador</Button>
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

           <div className="flex mb-4 items-center gap-2 text-gray-300"><div className="w-full h-[0.5px] bg-gray-300"></div>ou<div className="w-full h-[0.5px] bg-gray-300"></div></div>
                 </div>
               )}

           <div>
           <div className="flex gap-3">
              <label htmlFor="fileInput" onChange={handleFileUpload} className="rounded-md bg-blue-700 text-sm font-bold cursor-pointer transition-all gap-3 text-white h-10 w-full flex items-center justify-center hover:bg-blue-800">
    <input onChange={handleFileUpload} id="fileInput" type="file" accept=".csv"  hidden />
    <FileCsv size={16} className="" />
Importar arquivo .csv
    
  </label>

  <a href={'model-add-researcher-to-program.csv'}><Button size={'icon'}><DownloadSimple size={16} className="" /></Button></a>
              </div>
           </div>

           {data.length != 0 ? (
                 <div>
                <DataTableModal columns={columns} data={data}/>
                 </div>
              ):(
                <div className="text-center  text-sm  text-gray-500">Nenhum arquivo importado</div>
              )}

           <DialogFooter className=" py-4 ">
        <Button variant={'ghost'}   onClick={() => onOpen('add-researcher-graduation')}>
            <ArrowUUpLeft size={16} className="" />Voltar
              </Button>

              {data.length != 0 && (
                  <Button onClick={() => handleSubmitPesquisador()}   className="text-white dark:text-white" >
                  <Plus size={16} className="" />Adicionar
                  </Button>
            )}

            </DialogFooter>
    </DialogContent>
    </Dialog>
           )
}

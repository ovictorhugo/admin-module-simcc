import { ArrowUUpLeft, FileCsv, MagnifyingGlass, Trash, User } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { Dialog, DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "../ui/dialog";
import { Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

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

import { DataTableModal } from "../componentsModal/data-table";
import { columns } from "../componentsModal/columns-researchers-program";
import { Alert } from "../ui/alert";
import { Input } from "../ui/input";
interface PosGraduationsProps {
  lattes_id: string
  name: string
  type_: string
}
import Papa from 'papaparse';
import { fetchDataResearcherProgram } from "./function-list-researcher-program";


export function AddResearcherGraduation() {
    const { onClose, isOpen, type: typeModal, data: dataModal } = useModal();
    const isModalOpen = isOpen && typeModal === "add-researcher-graduation";
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const currentYear = new Date().getFullYear();
    const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);
    const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
    const { urlGeralAdm} = useContext(UserContext);
    const [data, setData] = useState<PosGraduationsProps[]>([]);
    const [type, setType] = useState('COLABORADOR');
    const [input, setInput] = useState('')

    useEffect(() => {
      setIdProgram(dataModal.graduate_program_id)
    }, [dataModal]);

    const handleChangeInput = (value:string) => {
     
      setInput(value)
    }

  


    //listar todos os pesquisadores popover

    const [researcherSearch, setResearcherSearch] = useState<PesquisadorProps2[]>([]);
  
    const urlGetResearcherSearch = urlGeralAdm + `ResearcherRest/Query?institution_id=&name=${input}&count=20 `;
  
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

 
  

  const urlGetResearcher =
    urlGeralAdm + `GraduateProgramResearcherRest/Query?graduate_program_id=${id_program}`;
   
    console.log(urlGetResearcher)
    useEffect(() => {
      fetchDataResearcherProgram(urlGeralAdm, id_program, setResearcher);
    }, [urlGeralAdm, id_program]);
  

  console.log(researcher)


  //
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

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent className="min-w-[40vw] gap-0">
        <DialogHeader className="pt-8 px-6 mb-4">
                 <DialogTitle className="text-2xl text-center font-medium">
                 Docentes <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">vinculados</strong> ao programa <br/> {dataModal.name}
                 </DialogTitle>
                 <DialogDescription className="text-center text-zinc-500">
                 Adicione ou remova os pesquisadores permanentes e colaboradores do programa de pós graduação
                 </DialogDescription>
               </DialogHeader>
<Separator/>
               <div>
                <div>

                <div className="flex gap-3 mb-3">
                    <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                   <Button className="w-full flex flex-1" variant={'outline'}><Plus size={16} className="" />Adicionar pesquisador</Button>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[200px] max-w-[30vw] w-full">
                    <div className="flex gap-3 mb-6">
                    <Select defaultValue={type} value={type}  onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-fit">
                <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="COLABORADOR">Colaborador</SelectItem>
                <SelectItem value="PERMANENTE">Permanente</SelectItem>

            </SelectContent>
            </Select>

            <Alert  className="h-10 bg-white p-2 flex w-full items-center gap-3 justify-between">
            <div className="flex items-center gap-2 w-full flex-1">
        <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
        <Input className="rounded-none border-l-0 border-r-0 " onChange={(e) => handleChangeInput(e.target.value)} />
        </div>
            </Alert>
                    </div>
                  <ScrollArea className="h-[200px]">
                  <div className="flex flex-wrap gap-3">
                  {researcherSearch.map((props) => (
      <div className={`flex gap-2 h-8 capitalize cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} 
      key={props.researcher_id}  onClick={() => {
        handleSubmit(type, props.researcher_id)
        setOpen(false)
      }}>
        <span>{props.name}</span>
      </div>
    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                  </ScrollArea>
                  </PopoverContent>
                </Popover>

                <label htmlFor="fileInput" onChange={handleFileUpload} className="rounded-md px-4 w-fit  whitespace-nowrap bg-blue-700 text-sm font-bold cursor-pointer transition-all gap-3 text-white h-10  flex items-center justify-center hover:bg-blue-800">
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
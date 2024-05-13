import { ArrowUUpLeft, DownloadSimple, FileCsv, Plus } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "../ui/dialog";
  import { toast } from "sonner"

  import Papa from 'papaparse';
import { useContext, useState } from "react";
import { DataTableModal } from "../componentsModal/data-table";
import { columns } from "../componentsModal/columns";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import { UserContext } from "../../context/context";
import { Link } from "react-router-dom";

  interface PesquisadorProps {
    name: string
    lattes_id: string
  }

export function AddResearcherCsvModal() {
    const { onClose, isOpen, type: typeModal } = useModal();
    const isModalOpen = isOpen && typeModal === "add-researcher-csv";
    const [data, setData] = useState<PesquisadorProps[]>([]);
     //api rest
     const { user, urlGeralAdm } = useContext(UserContext);

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
          researcher_id: uuidv4(),
          name: row.name,
          lattes_id: row.lattes_id,
          institution_id: user.institution_id,
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
        let urlProgram = urlGeralAdm + '/ResearcherRest/Insert';
    
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
    
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent className="min-w-[40vw] ">
        <DialogHeader className="pt-8 px-6">
                 <DialogTitle className="text-2xl text-center font-medium">
                 <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">Vincule</strong> os pesquisadores <br/> à sua instituição de ensino
                 </DialogTitle>
                
               </DialogHeader>

               <div>
              <div className="flex gap-3">
              <label htmlFor="fileInput" onChange={handleFileUpload} className="rounded-md bg-blue-700 text-sm font-bold cursor-pointer transition-all gap-3 text-white h-10 w-full flex items-center justify-center hover:bg-blue-800">
    <input onChange={handleFileUpload} id="fileInput" type="file" accept=".csv"  hidden />
    <FileCsv size={16} className="" />
Importar arquivo .csv
    
  </label>

  <a href={'model-add-researcher.csv'}><Button size={'icon'}><DownloadSimple size={16} className="" /></Button></a>
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
        <Button variant={'ghost'}   onClick={() => {
          onClose()
          setData([])
        }}>
            <ArrowUUpLeft size={16} className="" />Cancelar
              </Button>

              <Button onClick={() => handleSubmitPesquisador()}   className="text-white dark:text-white" >
              <Plus size={16} className="" />Adicionar
              </Button>
            </DialogFooter>

               </DialogContent>

               </Dialog>
        
    )
}
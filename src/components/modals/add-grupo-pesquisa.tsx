import { ArrowUUpLeft, FileCsv, FileXls, Plus } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import * as XLSX from 'xlsx';
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

import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import { UserContext } from "../../context/context";
import { columns } from "../componentsModal/columns-grupo-pesquisa";

  interface PesquisadorProps {
    nome_grupo:string
    nome_lider:string
    cpf:string
    instituicao:string
    area:string
    ultimo_envio:string
    situacao:string

  }

export function AddGrupoPesquisaModal() {
    const { onClose, isOpen, type: typeModal } = useModal();
    const isModalOpen = isOpen && typeModal === "add-grupo-pesquisa";
    const [data, setData] = useState<PesquisadorProps[]>([]);
     //api rest
     const { user, urlGeralAdm } = useContext(UserContext);

   

    console.log('lista csv',data)

    const [file, setFile] = useState(null);

  const handleFileUpload = (event: any) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      readExcelFile(uploadedFile);
    }
  };

  const readExcelFile = (file:any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the worksheet to JSON, starting from the third row
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      // Extract headers from the third row
      const headers: string[] = json[2] as string[];

      // Remove the first three rows (two rows above headers and headers themselves)
      const rows = json.slice(3);

      // Map headers to your interface keys
      const headerMap = {
        "Nome do Grupo": "nome_grupo",
        "Nome do Líder": "nome_lider",
        "CPF": "cpf",
        "Instituição": "instituicao",
        "Área Predominante": "area",
        "Último Envio": "ultimo_envio",
        "Situação": "situacao"
      };

      // Convert rows to an array of objects
      const jsonData = rows.map((row) => {
        const obj: PesquisadorProps = {
          nome_grupo: '',
          nome_lider: '',
          cpf: '',
          instituicao: '',
          area: '',
          ultimo_envio: '',
          situacao: ''
        };
        headers.forEach((header, index) => {
          const key = headerMap[header];
          if (key) {
            obj[key] = row[index];
          }
        });
        return obj;
      });

      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  console.log(data)

  const handleSubmitPesquisador = async () => {
    try {
      if (!file) {
        // Caso nenhum arquivo tenha sido selecionado
        toast("Erro: Nenhum arquivo selecionado", {
          description: "Por favor, selecione um arquivo para enviar.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        });
        return;
      }

      const urlProgram = urlGeralAdm + 'ResearchGroupRest/Insert';
      const formData = new FormData();
      formData.append('file', file);

     

      const response = await fetch(urlProgram, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'application/vnd.ms-excel'
          },
          mode: 'no-cors',
        body: formData,
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
    } catch (error) {
      console.error('Erro ao processar a requisição:', error);
    }
  };
    
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent className="min-w-[40vw] ">
        <DialogHeader className="pt-8 px-6">
                 <DialogTitle className="text-2xl text-center font-medium">
                 <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">Cadastre</strong> os grupos de pesquisa <br/> à sua instituição de ensino
                 </DialogTitle>
                
               </DialogHeader>

               <div>
               <label htmlFor="fileInputXls" onChange={handleFileUpload} className="rounded-md bg-blue-700 text-sm font-bold cursor-pointer transition-all gap-3 text-white h-10 w-full flex items-center justify-center hover:bg-blue-800">
    <input onChange={handleFileUpload} id="fileInputXls" type="file" accept=".xls"  hidden />
 
Importar arquivo .xls
<FileXls size={16} className="" />
  </label>
               </div>

              {data.length != 0 ? (
                 <div>
                <DataTableModal columns={columns} data={data}/>
                 </div>
              ):(
                <div className="text-center text-gray-500 text-sm ">Nenhum arquivo importado</div>
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
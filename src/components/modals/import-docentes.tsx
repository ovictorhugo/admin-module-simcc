import { ArrowUUpLeft, FileCsv, FileXls, Upload } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useCallback, useContext, useState } from "react";
import { toast } from "sonner"
import { UserContext } from "../../context/context";
import * as XLSX from 'xlsx';
import {useDropzone} from 'react-dropzone'
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Patrimonio {
    matric: string
    inscUFMG: string
    nome: string
    genero: string
    situacao: string
    rt: string
    clas: string
    cargo: string
    classe: string
    ref: string
    titulacao: string
    entradaNaUFMG: string
    progressao: string
    year_charge:string,
    semester:string
}

export function ImportDocentes() {
    const { onClose, isOpen, type: typeModal } = useModal();
    
    const isModalOpen = (isOpen && typeModal === 'import-docentes')

    const {urlGeral} = useContext(UserContext)
    const [fileInfo, setFileInfo] = useState({ name: '', size: 0 });

    const [data, setData] = useState<Patrimonio[]>([]);

    const onDrop = useCallback((acceptedFiles: any) => {
        handleFileUpload(acceptedFiles);
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });
  
    const handleFileUpload = (files: any) => {
        const uploadedFile = files[0];
        if (uploadedFile) {
            setFileInfo({
                name: uploadedFile.name,
                size: uploadedFile.size,
            });
            readExcelFile(uploadedFile);
        }
    };
  
    const readExcelFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
  
            // Convert the worksheet to JSON, starting from the third row
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
  
            // Extract headers from the first row
            const headers: string[] = json[0] as string[];
  
            // Remove the first row (headers themselves)
            const rows = json.slice(1);
  
            // Map headers to your interface keys
            const headerMap: { [key: string]: keyof Patrimonio } = {
                'MATRIC': 'matric',
                'INSC UFMG': 'inscUFMG',
                'NOME': 'nome',
                'GÊNERO': 'genero',
                'SITUAÇÃO': 'situacao',
                'RT': 'rt',
                'CLAS': 'clas',
                'CARGO': 'cargo',
                'CLASSE': 'classe',
                'REF': 'ref',
                'TITULAÇÃO': 'titulacao',
                'ENTRADA NA UFMG': 'entradaNaUFMG',
                'PROGRESSÃO': 'progressao'
            };
  
            // Convert rows to an array of objects
            const jsonData = rows.map((row: any) => {
                const obj: Patrimonio = {
                    matric: '',
                    inscUFMG: '',
                    nome: '',
                    genero: '',
                    situacao: '',
                    rt: '',
                    clas: '',
                    cargo: '',
                    classe: '',
                    ref: '',
                    titulacao: '',
                    entradaNaUFMG: '',
                    progressao: '',
                    year_charge: String(year),
                    semester: String(semester)
                };
                headers.forEach((header, index) => {
                    const key = headerMap[header];
                    if (key) {
                        obj[key] = String(row[index] || ""); // Converte o valor para string
                    }
                });
                return obj;
            });
  
            setData(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };
  
    const handleSubmitPatrimonio = async () => {
        try {
            if (data.length === 0) {
                toast("Erro: Nenhum arquivo selecionado", {
                    description: "Por favor, selecione um arquivo csv para enviar.",
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Fechar"),
                    },
                });
                return;
            }
    
            let urlPatrimonioInsert = `http://150.164.32.238:8484/docentes`;
        
            const response = await fetch(urlPatrimonioInsert, {
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
                    description: "Todos os dados foram enviados.",
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Fechar"),
                    },
                });
            }

            setData([])
            setFileInfo({
                name: '',
                size: 0,
            });
    
        } catch (error) {
            console.error('Erro ao processar a requisição:', error);
            toast("Erro ao processar a requisição", {
                description: "Tente novamente mais tarde.",
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                },
            });
        }
    };
    

    console.log(data)

    const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
    const [semester, setSemester] = useState('1')

    const years = [];
    for (let i = currentYear; i > currentYear - 4; i--) {
      years.push(i);
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
            <DialogContent className="min-w-[40vw] ">
                <DialogHeader className="pt-8 px-6 flex flex-col items-center">
                    <DialogTitle className="text-2xl text-center font-medium">
                        Importar arquivo .xls
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 max-w-[350px]">
                        Atualize os itens do na Vitrine com a planilha .xls gerada no SICPAT
                    </DialogDescription>
                </DialogHeader>

                <div className={`grid gap-8 w-full  sm:grid-cols-2 grid-cols-1 `}>
                <div className="grid gap-3 w-full ">
                        <Label htmlFor="name">Ano</Label>
                        <Select defaultValue={String(year)} value={String(year)} onValueChange={(value) => setYear(Number(value))}>
                            <SelectTrigger className="">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                            {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}

                            </SelectContent>
                          </Select>
                      </div>

                <div className="grid gap-3 w-full ">
                        <Label htmlFor="name">Semestre</Label>
                        <Select defaultValue={semester} value={semester} onValueChange={(value) => setSemester(value)}>
                            <SelectTrigger className="">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value={'1'}>Primeiro</SelectItem>
                            <SelectItem value={'2'}>Segundo</SelectItem>

                            </SelectContent>
                          </Select>
                      </div>
                </div>

                <div className="mb-4">
                    <div {...getRootProps()} className="border-dashed mb-6 flex-col border border-neutral-300 p-6 text-center rounded-md text-neutral-400 text-sm  cursor-pointer transition-all gap-3  w-full flex items-center justify-center hover:bg-neutral-100 mt-4">
                        <input {...getInputProps()} />
                        <div className="p-4  border rounded-md">
                            <FileXls size={24} className=" whitespace-nowrap" />
                        </div>
                        {isDragActive ? (
                            <p>Solte os arquivos aqui ...</p>
                        ) : (
                            <p>Arraste e solte o arquivo .xls aqui ou clique para selecionar o arquivo</p>
                        )}
                    </div>

                    <div>
                        {fileInfo.name && (
                            <div className="justify-center flex items-center gap-3">
                                <FileXls size={16} />
                                <p className=" text-center  text-zinc-500 text-sm">
                                    Arquivo selecionado: <strong>{fileInfo.name}</strong> ({(fileInfo.size / 1024).toFixed(2)} KB)
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onClose()} variant={'ghost'}>
                        <ArrowUUpLeft size={16} className="" />Cancelar
                    </Button>
                    <Button onClick={() => handleSubmitPatrimonio()}>
                        <Upload size={16} className="" />Atualizar dados
                    </Button>
                </DialogFooter>

                <div></div>
            </DialogContent>
        </Dialog>
    )
}

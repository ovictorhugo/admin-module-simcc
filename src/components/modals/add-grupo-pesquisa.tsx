import { ArrowUUpLeft,  FileXls} from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import * as XLSX from 'xlsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

    DialogFooter
  } from "../ui/dialog";
  import { toast } from "sonner"


import { useCallback, useContext, useState } from "react";

import {useDropzone} from 'react-dropzone'

import { UserContext } from "../../context/context";

import { Upload } from "lucide-react";

interface GrupoPesquisa {
  ano_do_censo: string,
  data_inicio_da_coleta: string,
  data_fim_da_coleta: string,
  identificador_do_grupo: string,
  nome_do_grupo: string,
  ano_formacao: string,
  regiao_grupo_pesquisa: string,
  uf_grupo_pesquisa: string,
  cidade_grupo_pesquisa: string,
  grande_area_predominante: string,
  area_predominante: string,
  nome_da_instituicao: string,
  sigla_da_instituicao: string,
  categoria_administrativa: string,
  natureza_juridica: string,
  setor_atividade_economica: string,
  qtd_linha_pesquisa: number,
  qtd_pesquisador_grupo: number,
  qtd_estudantes_grupo: number,
  qtd_tecnico_grupo: number,
  qtd_colaborador_grupo: number,
  quantidadeDePesquisadorDoutor: number,
  quantDoutorandos: number,
  quantMestrandos: number,
  quantGraduandos: number,
  institution_id:string
}

export function AddGrupoPesquisaModal() {
  const { onClose, isOpen, type: typeModal } = useModal();
  const isModalOpen = (isOpen && typeModal === 'add-grupo-pesquisa');

  const { user, urlGeralAdm } = useContext(UserContext);
  const [fileInfo, setFileInfo] = useState({ name: '', size: 0 });

  const [data, setData] = useState<GrupoPesquisa[]>([]);

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

          // Extract headers from the third row
          const headers: string[] = json[2] as string[];

          // Remove the first three rows (two rows above headers and headers themselves)
          const rows = json.slice(3);

          // Map headers to your interface keys
          const headerMap: { [key: string]: keyof GrupoPesquisa } = {
              'ANO_DO_CENSO': 'ano_do_censo',
              'DATA_INICIO_DA_COLETA': 'data_inicio_da_coleta',
              'DATA_FIM_DA_COLETA': 'data_fim_da_coleta',
              'IDENTIFICADOR_DO_GRUPO': 'identificador_do_grupo',
              'NOME_DO_GRUPO': 'nome_do_grupo',
              'ANO_FORMACAO': 'ano_formacao',
              'REGIAO_GRUPO_PESQUISA': 'regiao_grupo_pesquisa',
              'UF_GRUPO_PESQUISA': 'uf_grupo_pesquisa',
              'CIDADE_GRUPO_PESQUISA': 'cidade_grupo_pesquisa',
              'GRANDE_AREA_PREDOMINANTE': 'grande_area_predominante',
              'AREA_PREDOMINANTE': 'area_predominante',
              'NOME_DA_INSTITUICAO': 'nome_da_instituicao',
              'SIGLA_DA_INSTITUICAO': 'sigla_da_instituicao',
              'CATEGORIA_ADMINISTRATIVA': 'categoria_administrativa',
              'NATUREZA_JURIDICA': 'natureza_juridica',
              'SETOR_ATIVIDADE_ECONOMICA': 'setor_atividade_economica',
              'QTD_LINHA_PESQUISA': 'qtd_linha_pesquisa',
              'QTD_PESQUISADOR_GRUPO': 'qtd_pesquisador_grupo',
              'QTD_ESTUDANTES_GRUPO': 'qtd_estudantes_grupo',
              'QTD_TECNICO_GRUPO': 'qtd_tecnico_grupo',
              'QTD_COLABORADOR_GRUPO': 'qtd_colaborador_grupo',
              'QUANTIDADEDEPESQUISADORDOUTOR': 'quantidadeDePesquisadorDoutor',
              'QUANTDOUTORANDOS': 'quantDoutorandos',
              'QUANTMESTRANDOS': 'quantMestrandos',
              'QUANTGRADUANDOS': 'quantGraduandos'
          };

          // Convert rows to an array of objects
          const jsonData = rows.map((row: any) => {
              const obj: GrupoPesquisa = {
                  ano_do_censo: '',
                  data_inicio_da_coleta: '',
                  data_fim_da_coleta: '',
                  identificador_do_grupo: '',
                  nome_do_grupo: '',
                  ano_formacao: '',
                  regiao_grupo_pesquisa: '',
                  uf_grupo_pesquisa: '',
                  cidade_grupo_pesquisa: '',
                  grande_area_predominante: '',
                  area_predominante: '',
                  nome_da_instituicao: '',
                  sigla_da_instituicao: '',
                  categoria_administrativa: '',
                  natureza_juridica: '',
                  setor_atividade_economica: '',
                  qtd_linha_pesquisa: 0,
                  qtd_pesquisador_grupo: 0,
                  qtd_estudantes_grupo: 0,
                  qtd_tecnico_grupo: 0,
                  qtd_colaborador_grupo: 0,
                  quantidadeDePesquisadorDoutor: 0,
                  quantDoutorandos: 0,
                  quantMestrandos: 0,
                  quantGraduandos: 0,
                  institution_id: user.institution_id,
              };
              headers.forEach((header, index) => {
                  const key = headerMap[header];
                  if (key) {
                      obj[key] = row[index] || "";
                  }
              });
              return obj;
          });

          setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
  };

  const handleSubmitGruposPesquisa = async () => {
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
  
          let urlGruposPesquisaInsert = `${urlGeralAdm}researchGroupRest/Insert`;
      
          const response = await fetch(urlGruposPesquisaInsert, {
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

  return (
      <Dialog open={isModalOpen} onOpenChange={onClose}> 
          <DialogContent className="min-w-[40vw] ">
              <DialogHeader className="pt-8 px-6 flex flex-col items-center">
                  <DialogTitle className="text-2xl text-center font-medium">
                      Importar arquivo .xls
                  </DialogTitle>
                  <DialogDescription className="text-center text-zinc-500 max-w-[350px]">
                      Atualize os grupos de pesquisa da instituição com a planilha .xls
                  </DialogDescription>
              </DialogHeader>

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
                  <Button onClick={() => handleSubmitGruposPesquisa()}>
                      <Upload size={16} className="" />Atualizar dados
                  </Button>
              </DialogFooter>

              <div></div>
          </DialogContent>
      </Dialog>
  )
}

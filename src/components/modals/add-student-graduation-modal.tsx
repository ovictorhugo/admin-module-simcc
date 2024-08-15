import { ArrowUUpLeft, DownloadSimple, FileCsv, Plus } from "phosphor-react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,

    DialogFooter
  } from "../ui/dialog";
  import { toast } from "sonner"

  import Papa from 'papaparse';
import { useContext, useEffect, useState } from "react";
import { DataTableModal } from "../componentsModal/data-table";
import { columns } from "../componentsModal/columns";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import { UserContext } from "../../context/context";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


  interface PesquisadorProps {
    name: string
    lattes_id: string
  }

export function AddStudentGraduationModal() {
    const { onClose, isOpen, type: typeModal, data:dataModal } = useModal();
    const isModalOpen = isOpen && typeModal === "add-student-graduation";
    const [data, setData] = useState<PesquisadorProps[]>([]);
     //api rest
     const { user, urlGeralAdm } = useContext(UserContext);
     const [id_program , setIdProgram] = useState(dataModal && dataModal.graduate_program_id)
     useEffect(() => {
        setIdProgram(dataModal.graduate_program_id)
      }, [dataModal]);

     const currentYear = new Date().getFullYear();
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

    console.log('lista csv',data)

   

    const handleSubmitPesquisador = async () => {
      try {
        let urlProgram = urlGeralAdm + '/studentRest/insert';
    
        // Filtrar os dados com erros
        const dataWithErrors = [];
        
        // Iterar sobre os itens em data
        for (const item of data) {
          const { name, lattes_id } = item;
    
          if (name.length === 0 && lattes_id.length === 0) {
            toast("Parece que os campos estão vazios", {
              description: "Preencha os campos nome do discente e Lattes Id",
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
            toast("Preencha o nome do discente", {
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

    const [nomePesquisador, setNomePesquisador] = useState('');
    const [lattesID, setLattesID] = useState('');

    const handleSubmitPesquisadorUnique = async () => {

       

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
    
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent className="min-w-[40vw]">
        <DialogHeader className="pt-8 px-6">
                 <DialogTitle className="text-2xl text-center font-medium">
                 <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">Vincule</strong> os discentes ao programa <br/> {dataModal.name}
                 </DialogTitle>
                
               </DialogHeader>

               <div>

               {data.length == 0 && (
                 <div>
                 <div className="flex gap-6 items-end w-full mb-6">
             <div className="flex flex-col space-y-1.5 w-1/2">
             <Label htmlFor="name">Nome completo</Label>
             <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text"  placeholder="Nome completo" />
             </div>
 
             <div className="flex flex-col space-y-1.5 w-1/2">
             <Label htmlFor="name">Lattes Id</Label>
             <Input value={lattesID} onChange={(e) => setLattesID(e.target.value)} type="text"  placeholder="Lattes Id" />
             </div>
 
             <Button onClick={() => handleSubmitPesquisadorUnique()} className="text-white dark:text-white "><Plus size={16} className="" /> Adicionar</Button>
            
             </div>

             <div className="flex mb-6 items-center gap-2 text-gray-300"><div className="w-full h-[0.5px] bg-gray-300"></div>ou<div className="w-full h-[0.5px] bg-gray-300"></div></div>
                 </div>
               )}

           
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
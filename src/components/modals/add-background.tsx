import { useModal } from "../hooks/use-modal-store";
import { Sheet, SheetContent } from "../../components/ui/sheet";
import {
    DialogHeader,
  } from "../ui/dialog";

  import { Image, LoaderCircle, Plus, Upload, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import { storage } from "../../lib/firebase";
import { v4 as uuidv4 } from 'uuid';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore,  collection, addDoc } from 'firebase/firestore';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDropzone } from "react-dropzone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function AddBackground() {
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = (isOpen && typeModal === "add-background") 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);

    const [fileInfo, setFileInfo] = useState({ name: '', size: 0 });
    const onDrop = useCallback((acceptedFiles: any) => {
        handleFileUpload(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleFileUpload = (files: any) => {
        const uploadedFile = files[0];
        if (uploadedFile) {
            setFileInfo({
                name: uploadedFile.name,
                size: uploadedFile.size,
            });
            setSelectedFile(uploadedFile)
            setTitulo(uploadedFile.name)
          
        }
    };


    const handleSubmit = async (event: any) => {
        try {
          event.preventDefault();
      
          if (!selectedFile) {
            toast("Por favor, selecione a imagem", {
              description: "Nenhuma imagem selecionada",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
            return;
          }

          if (titulo.length == 0) {
            toast("Selecione o título da imagem", {
              description: "Tente novamente",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
            return
          }

          setUploadProgress(true)
      
          const storageRef = ref(storage, `images/${selectedFile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => {
              alert(error);
               toast("Erro ao carregar imagem", {
                    description: "Tente novamente",
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  })

                  setUploadProgress(false)
            },
            async () => {
              try {
                // Aguarde a obtenção da URL de download
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                
                // Atualize o estado com a URL da imagem
                setImgURL(url);
      
                // Aqui você pode adicionar a lógica para tratar os tipos de programa selecionados
                // programTypes é um array com os tipos selecionados
                const docId = uuidv4();
                
                // Crie um objeto com os dados do formulário
                const formData = {
                  id: docId,
                  titulo, 
                  imgURL: url,
                };
      
                // Submeta os dados para o Firestore

               if( titulo != '' ) {
                const db = getFirestore();
                const programRef = collection(db, 'background');
                await addDoc(programRef, formData);
    
                toast("Enviado com sucesso!", {
                  description: "Adicionado ao banco de dados",
                  action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo"),
                  },
                })

                setUploadProgress(false)
    
                  // Limpe os campos após a conclusão
                  setTitulo('');
                  setImgURL('');
                  setProgress(0);
                  onClose()
               } else {
                toast("Falta preencher algum dado", {
                  description: "Revise antes de enviar",
                  action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo"),
                  },
                })

                setUploadProgress(false)
               }

      
              } catch (error) {
                console.error('Erro ao enviar os dados para o Firestore:', error);
                setUploadProgress(false)
              }
            }
          );
      
        } catch (error) {
          console.error('Erro ao enviar os dados:', error);
          setUploadProgress(false)
        }
      };


    return(
        <Sheet open={isModalOpen} onOpenChange={onClose}>
        <SheetContent
          className={`p-0 dark:bg-neutral-900 dark:border-gray-600 min-w-[50vw]`}
        >
          <DialogHeader className="h-[50px] px-4 justify-center border-b dark:border-b-neutral-600">
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="h-8 w-8"
                      variant={"outline"}
                      onClick={() => onClose()}
                      size={"icon"}
                    >
                      <X size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent> Fechar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
  
              <div className="flex ml-auto items-center w-full justify-between">
                <div className="flex ml-auto items-center gap-3"></div>
              </div>
            </div>
          </DialogHeader>

          <div>
          <ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-50px)] p-8 ">
            <div className="mb-8 flex justify-between items-center">
            <div >
              <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
               Configurações
              </p>

              <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                Adicionar background
              </h1>
            </div>

            <div>
       
            </div>
            </div>

            <div className="flex flex-col gap-6 w-full">
            <div className="flex gap-3 items-center w-full">
            <div className="grid items-center gap-1.5 w-full">
                    <Label>Nome da campanha*</Label>
                    <Input
                      type="text"
                      name="dep_nom"
                      value={titulo} 
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <Label>Departamento*</Label>
                    <Select>
  <SelectTrigger className="">
    <SelectValue placeholder="" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="est">Engenharia de Estruturas</SelectItem>
    <SelectItem value="ehr">Engenharia Hidráulica e Recursos Hídricos</SelectItem>
    <SelectItem value="emc">Engenharia de Materiais e Construção</SelectItem>
    <SelectItem value="etg">Engenharia de Transportes e Geotecnia</SelectItem>
    <SelectItem value="em">Engenharia Mecânica</SelectItem>
    <SelectItem value="ene">Engenharia Elétrica</SelectItem>
    <SelectItem value="enq">Engenharia Química</SelectItem>
    <SelectItem value="enp">Engenharia de Produção</SelectItem>
    <SelectItem value="emm">Engenharia Metalúrgica e de Materiais</SelectItem>
 
    <SelectItem value="den">Engenharia Nuclear</SelectItem>
  </SelectContent>
</Select>
</div>
            </div>

<div {...getRootProps()} className="border-dashed mb-3 flex-col border border-neutral-300 p-6 text-center rounded-md text-neutral-400 text-sm  cursor-pointer transition-all gap-3  w-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 ">
                        <input {...getInputProps()} />
                        <div className="p-4  border rounded-md">
                            <Image size={24} className=" whitespace-nowrap" />
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
                                <Image size={16} />
                                <p className=" text-center  text-zinc-500 text-sm">
                                    Arquivo selecionado: <strong>{fileInfo.name}</strong> ({(fileInfo.size / 1024).toFixed(2)} KB)
                                </p>
                            </div>
                        )}
                    </div>
            </div>

            
         

            <Button onClick={handleSubmit} className="mt-3 ml-auto flex ">
            {uploadProgress ? (<LoaderCircle size={16} className="an animate-spin" />):(<Plus size={16} className="" />)}  {uploadProgress ? ('Adicionando background'):('Adicionar background')}  
          </Button>
            </ScrollArea>
          </div>
          </SheetContent>
          </Sheet>
    )
}
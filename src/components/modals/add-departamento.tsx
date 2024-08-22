import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

  DialogFooter
} from "../ui/dialog";



import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { useModal } from "../hooks/use-modal-store";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { ArrowUUpLeft, Plus } from "phosphor-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
  Sheet,
  SheetContent,

} from "../../components/ui/sheet"
import { Building2, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";


export function AddDepartamento() {
  const { onClose, isOpen, type: typeModal, data } = useModal();
  const isModalOpen = (isOpen && typeModal === "add-departamento") ||  (isOpen && typeModal === "edit-departamento")

  const { user, urlGeralAdm } = useContext(UserContext);

  const uuid = uuidv4();

  // Extract numbers from the UUID and join them into a single string
  const id = uuid.replace(/\D/g, '').slice(0, 10);

  const [formData, setFormData] = useState({
    dep_id:  id,
    org_cod:  '',
    dep_nom:'',
    dep_des: '',
    dep_email: '',
    dep_site: '',
    dep_tel: '',
    dep_sigla: ''
  });



  const [fileInfo, setFileInfo] = useState({
    name: '',
    size: 0
  });

  const [pdfs, setPdfs] = useState({
    img_data:  null
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: any) => {
    setPdfs({
      ...pdfs,
      [e.target.name]: e.target.files[0]
    });
    setFileInfo({
      name: e.target.files[0].name,
      size: e.target.files[0].size
    });
  };

  const handleSubmit = () => {
    handleSubmitDepartamento();
  };

  useEffect(() => {

    const idEdit = data.dep_id || ''
    
    setFormData({
      dep_id: (data && typeModal != 'add-departamento') ?idEdit : id,
      org_cod: (data && typeModal != 'add-departamento') ? data.org_cod : '',
      dep_nom: (data &&typeModal != 'add-departamento') ? data.dep_nom : '',
      dep_des: (data && typeModal != 'add-departamento') ? data.dep_des : '',
      dep_email: (data && typeModal != 'add-departamento') ? data.dep_email :'',
      dep_site: (data && typeModal != 'add-departamento') ? data.dep_site : '',
      dep_tel: (data && typeModal != 'add-departamento') ? data.dep_tel : '',
      dep_sigla: (data && typeModal != 'add-departamento') ? data.dep_sigla : ''
    });

    setPdfs({
      img_data: (data && typeModal != 'add-departamento') ? data.img_data: ''
    })

    

    }, [data.dep_id]);

  const updateItem = (field: any, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const formatPhone = (value: any) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    value = value.replace(/^(\d{2})(\d)/, '($1) $2'); // Adiciona parênteses em torno dos dois primeiros dígitos
    value = value.replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3'); // Formata o restante como x xxxx-xxxx
    return value.slice(0, 16); // Limita a 15 caracteres
  }

  const handlePhoneChange = (e: any) => {
    const formattedPhone = formatPhone(e.target.value);
    updateItem('dep_tel', formattedPhone);
  }

  const handleSubmitDepartamento = async () => {
    try {
      if (!pdfs.img_data && typeModal == 'add-departamento') {
        toast("Erro: Nenhuma imagem selecionada", {
          description: "Por favor, selecione uma imagem para enviar.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });
        return;
      }

      let urlDepartamentoInsert = urlGeralAdm + `departamentos`; // Atualize a URL conforme necessário

      if (typeModal == 'edit-departamento') {
        urlDepartamentoInsert = urlGeralAdm + `departamentos/update`; 
      }

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value as string);
      });
      data.append('img_data', pdfs.img_data);

      const response = await axios.post(urlDepartamentoInsert, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '3600',
        }
      });

      if ((response.status === 201) || (response.status === 200)) {
        toast("Dados enviados com sucesso", {
          description: "Todos os dados foram enviados.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });

        setFormData({
          dep_id: '',
          org_cod: '',
          dep_nom: '',
          dep_des: '',
          dep_email: '',
          dep_site: '',
          dep_tel: '',
          dep_sigla: ''
        });
        setFileInfo({
          name: '',
          size: 0
        });
        setPdfs({
          img_data: null
        });

        onClose()
      }
      
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
  console.log(formData)

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose}>
       <SheetContent className={`p-0 dark:bg-neutral-900 dark:border-gray-600 min-w-[50vw]`}>
        <DialogHeader className="h-[50px] px-4 justify-center border-b dark:border-b-neutral-600">

        <div className="flex items-center gap-3">
        <TooltipProvider>
       <Tooltip>
         <TooltipTrigger asChild>
         <Button className="h-8 w-8" variant={'outline'}  onClick={() => onClose()} size={'icon'}><X size={16}/></Button>
         </TooltipTrigger>
         <TooltipContent> Fechar</TooltipContent>
       </Tooltip>
       </TooltipProvider>

        <div className="flex ml-auto items-center w-full justify-between">
        
          <div className="flex ml-auto items-center gap-3">

         
             </div>
        </div>

        </div>
         
        </DialogHeader>

        <div>
        <ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-50px)] p-8 ">
        <div className="mb-8">
                      <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                      Departamentos
                        </p>

                        <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                           {typeModal == 'add-departamento' ? 'Adicionar departamento':'Editar departamento'}
                        </h1>
                      </div>
          <div className="flex gap-3 flex-col">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex w-full gap-3 items-end">
              <div className="grid gap-3 w-full">
                <Label htmlFor="dep_nom">Nome</Label>
                <Input
                  name="dep_nom"
                  value={formData.dep_nom}
                  onChange={(e) => updateItem('dep_nom', e.target.value)}
                  id="dep_nom"
                  type="text"
                  className="flex flex-1"
                />
              </div>

              <div className="grid gap-3 w-full">
                <Label htmlFor="dep_sigla">Sigla</Label>
                <Input
                  name="dep_sigla"
                  value={formData.dep_sigla}
                  onChange={(e) => updateItem('dep_sigla', e.target.value)}
                  id="dep_sigla"
                  type="text"
                  className="flex flex-1"
                />
              </div>

              <div className="grid gap-3 w-full">
                <Label htmlFor="fileInput">Logomarca</Label>
                <label htmlFor="fileInput" onChange={handleFileChange} className="rounded-md text-sm truncate cursor-pointer transition-all gap-3 border h-10 w-full flex items-center px-4 hover:bg-neutral-100">
                  <input
                    id="fileInput"
                    type="file"
                    name="img_data"
                    onChange={handleFileChange}
                    accept="image/*"
                    hidden
                  />
                  {fileInfo.name !== '' ? fileInfo.name : 'Importar arquivo'}
                </label>
              </div>
            </div>

            <div className="flex w-full gap-3">
              <div className="grid gap-3 w-full">
                <Label htmlFor="dep_site">Site</Label>
                <Input
                  name="dep_site"
                  value={formData.dep_site}
                  onChange={(e) => updateItem('dep_site', e.target.value)}
                  id="dep_site"
                  type="text"
                  className="flex flex-1"
                />
              </div>

              <div className="grid gap-3 md:w-[200px] w-full">
                <Label htmlFor="org_cod">Código</Label>
                <Input
                  name="org_cod"
                  value={formData.org_cod}
                  onChange={(e) => updateItem('org_cod', e.target.value)}
                  id="org_cod"
                  type="text"
                  className="flex flex-1"
                />
              </div>
            </div>

            <div className="flex w-full gap-3">
              <div className="grid gap-3 w-full">
                <Label htmlFor="dep_tel">Telefone</Label>
                <Input
                  name="dep_tel"
                  value={formData.dep_tel}
                  onChange={(e) => handlePhoneChange(e)}
                  id="dep_tel"
                  type="text"
                  className="flex flex-1"
                />
              </div>

              <div className="grid gap-3 w-full">
                <Label htmlFor="dep_email">Email</Label>
                <Input
                  name="dep_email"
                  value={formData.dep_email}
                  onChange={(e) => updateItem('dep_email', e.target.value)}
                  id="dep_email"
                  type="text"
                  className="flex flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <Label htmlFor="dep_des" className="h-fit">Descrição</Label>
            <Textarea
              name="dep_des"
              className="h-full"
              value={formData.dep_des}
              onChange={(e) => updateItem('dep_des', e.target.value)}
              id="dep_des"
            />
          </div>

          <Button onClick={() => handleSubmit()} size={'sm'} className="text-white dark:text-white mt-3 ml-auto flex ">
   <Plus size={16} className="" />Adicionar
 </Button>
        </div>


          </ScrollArea>
        </div>

      
      </SheetContent>
    </Sheet>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { useModal } from "../hooks/use-modal-store";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { ArrowUUpLeft, Plus } from "phosphor-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function AddDepartamento() {
  const { onClose, isOpen, type: typeModal } = useModal();
  const isModalOpen = isOpen && typeModal === "add-departamento";

  const { user, urlGeralAdm } = useContext(UserContext);

  const uuid = uuidv4();

  // Extract numbers from the UUID and join them into a single string
  const id = uuid.replace(/\D/g, '').slice(0, 10);

  const [formData, setFormData] = useState({
    dep_id: id,
    org_cod: '',
    dep_nom: '',
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
    img_data: null
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
  };

  const handlePhoneChange = (e: any) => {
    const formattedPhone = formatPhone(e.target.value);
    updateItem('dep_tel', formattedPhone);
  };

  const handleSubmitDepartamento = async () => {
    try {
      if (!pdfs.img_data) {
        toast("Erro: Nenhuma imagem selecionada", {
          description: "Por favor, selecione uma imagem para enviar.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });
        return;
      }

      const urlDepartamentoInsert = urlGeralAdm + `departamentos`; // Atualize a URL conforme necessário

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
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[40vw] ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-medium">
            Cadastrar programa de <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">pós-graduação</strong>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Adicione as informações básicas do programa de pós-graduação como o nome, classificação e modalidade.
          </DialogDescription>
        </DialogHeader>

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
        </div>

        <DialogFooter className="py-4">
          <Button variant={'ghost'} onClick={() => onClose()}>
            <ArrowUUpLeft size={16} className="" />Voltar
          </Button>

          <Button onClick={() => handleSubmit()} className="text-white dark:text-white">
            <Plus size={16} className="" />Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

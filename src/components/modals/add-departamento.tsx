import {
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { useModal } from "../hooks/use-modal-store";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { ArrowUUpLeft, Plus } from "phosphor-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { Sheet, SheetContent } from "../../components/ui/sheet";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";

export function AddDepartamento() {
  const { onClose, isOpen, type: typeModal, data } = useModal();
  const isModalOpen =
    (isOpen && typeModal === "add-departamento") ||
    (isOpen && typeModal === "edit-departamento");

  const { urlGeralAdm } = useContext(UserContext);

  const uuid = uuidv4();

  // Extract numbers from the UUID and join them into a single string
  const id = uuid.replace(/\D/g, "").slice(0, 10);

  const [formData, setFormData] = useState({
    dep_id: "",
    org_cod: "",
    dep_nom: "",
    dep_des: "",
    dep_email: "",
    dep_site: "",
    dep_tel: "",
    dep_sigla: "",
  });

  const [fileInfo, setFileInfo] = useState({
    name: "",
    size: 0,
  });

  const [pdfs, setPdfs] = useState({
    img_data: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Atualiza o valor correspondente no formData
    }));
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfs({
      ...pdfs,
      img_data: e.target.files?.[0] || null,
    });
    setFileInfo({
      name: e.target.files?.[0]?.name || "",
      size: e.target.files?.[0]?.size || 0,
    });
  };

  const handleSubmit = () => {
    handleSubmitDepartamento();
  };

  useEffect(() => {
  if (typeModal === "edit-departamento" && data) {
    setFormData({
      dep_id: data.dep_id || "",
      org_cod: data.org_cod || "",
      dep_nom: data.dep_nom || "",
      dep_des: data.dep_des || "",
      dep_email: data.dep_email || "",
      dep_site: data.dep_site || "",
      dep_tel: data.dep_tel || "",
      dep_sigla: data.dep_sigla || "",
    });

    setPdfs({
      img_data: data.img_data || null,
    });
  } else {
    setFormData({
      dep_id: id,
      org_cod: "",
      dep_nom: "",
      dep_des: "",
      dep_email: "",
      dep_site: "",
      dep_tel: "",
      dep_sigla: "",
    });

    setPdfs({
      img_data: null,
    });
  }
}, [data, typeModal, id]);

  const updateItem = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const formatPhone = (value: string) => {
    value = value.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
    value = value.replace(/^(\d{2})(\d)/, "($1) $2"); // Adiciona parênteses em torno dos dois primeiros dígitos
    value = value.replace(/(\d{1})(\d{4})(\d{4})/, "$1 $2-$3"); // Formata o restante como x xxxx-xxxx
    return value.slice(0, 16); // Limita a 15 caracteres
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    updateItem("dep_tel", formattedPhone);
  };

  const handleSubmitDepartamento = async () => {
    try {
      if (!pdfs.img_data && typeModal === "add-departamento") {
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

      if (typeModal === "edit-departamento") {
        urlDepartamentoInsert = urlGeralAdm + `departamentos/update`;
      }

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value as string);
      });
      if (pdfs.img_data) {
        data.append("img_data", pdfs.img_data);
      }

      const response = await axios.post(urlDepartamentoInsert, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "3600",
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast("Dados enviados com sucesso", {
          description: "Todos os dados foram enviados.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });

        setFormData({
          dep_id: "",
          org_cod: "",
          dep_nom: "",
          dep_des: "",
          dep_email: "",
          dep_site: "",
          dep_tel: "",
          dep_sigla: "",
        });
        setFileInfo({
          name: "",
          size: 0,
        });
        setPdfs({
          img_data: null,
        });

        onClose();
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      toast("Erro ao processar a requisição", {
        description: "Tente novamente mais tarde.",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    }
  };

  return (
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
            <div className="mb-8">
              <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                Departamentos
              </p>

              <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                {typeModal === "add-departamento"
                  ? "Adicionar departamento"
                  : "Editar departamento"}
              </h1>
            </div>
            <div className="flex gap-3 flex-col">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex w-full gap-3 items-end">
                  <div className="grid w-2/3 items-center gap-1.5">
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      name="dep_nom"
                      value={formData.dep_nom}
                      onChange={handleChange}
                      placeholder="Digite o nome do departamento"
                    />
                  </div>
                  <div className="grid w-1/3 items-center gap-1.5">
                    <Label>Sigla</Label>
                    <Input
                      type="text"
                      name="dep_sigla"
                      value={formData.dep_sigla}
                      onChange={handleChange}
                      placeholder="Digite a sigla"
                    />
                  </div>
                </div>
                <div className="flex w-full gap-3">
                  <div className="grid w-1/3 items-center gap-1.5">
                    <Label>Organização</Label>
                    <Input
                      type="text"
                      name="org_cod"
                      value={formData.org_cod}
                      onChange={handleChange}
                      placeholder="Digite o código da organização"
                    />
                  </div>
                  <div className="grid w-2/3 items-center gap-1.5">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="dep_email"
                      value={formData.dep_email}
                      onChange={handleChange}
                      placeholder="Digite o email do departamento"
                    />
                  </div>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label>Descrição</Label>
                  <Textarea
                    name="dep_des"
                    value={formData.dep_des}
                    onChange={handleChange}
                    placeholder="Digite uma descrição para o departamento"
                  />
                </div>
                <div className="flex w-full gap-3">
                  <div className="grid w-1/3 items-center gap-1.5">
                    <Label>Telefone</Label>
                    <Input
                      type="tel"
                      name="dep_tel"
                      value={formData.dep_tel}
                      onChange={handlePhoneChange}
                      placeholder="Digite o telefone"
                    />
                  </div>
                  <div className="grid w-2/3 items-center gap-1.5">
                    <Label>Site</Label>
                    <Input
                      type="text"
                      name="dep_site"
                      value={formData.dep_site}
                      onChange={handleChange}
                      placeholder="Digite o site"
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Imagem</Label>
                  <Input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="flex w-full gap-3 p-4 justify-end items-end">
          <Button onClick={onClose} variant={"ghost"}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {typeModal === "edit-departamento" ? "Editar" : "Adicionar"}
          </Button>
        </DialogFooter>
      </SheetContent>
    </Sheet>
  );
}

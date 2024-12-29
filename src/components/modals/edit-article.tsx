import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { ArrowUUpLeft, Trash } from "phosphor-react";
import { toast } from "sonner";
import { UserContext } from "../../context/context";
import { useCallback, useContext, useState } from "react";
import { useModalSecundary } from "../hooks/use-modal-store-secundary";
import { Switch } from "../ui/switch";
import { Image } from "lucide-react";
import { useDropzone } from "react-dropzone";

export function EditArticle() {
  const { onClose, isOpen, type: typeModal, data } = useModalSecundary();
  const isModalOpen = isOpen && typeModal === "edit-article";

  const { urlGeral } = useContext(UserContext);

  const [relevance, setRelevance] = useState(data.relevance || false);
  const [fileInfo, setFileInfo] = useState({ name: "", size: 0 });

  const handleRelevanceChange = async () => {
    const urlRelevance = `${urlGeral}relevant/${data.id}?type=ARTICLE`;
    try {
      const response = await fetch(urlRelevance, {
        method: relevance ? "DELETE" : "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": relevance ? "DELETE" : "POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "3600",
        'Content-Type': 'application/json',
        
        },
      });

      if (response.ok) {
        toast(`Alterado com sucesso`, {
          description: `Produção ${relevance ? "removida" : "adicionada"} às relevantes com sucesso!`,
          action: {
              label: "Fechar",
              onClick: () => console.log("Fechar"),
          },
      });
      
        setRelevance(!relevance);
      } else {
        toast("Erro ao alterar a relevânica", {
          description: "Por favor, tente novamente.",
          action: {
              label: "Fechar",
              onClick: () => console.log("Fechar"),
          },
      });
      }
    } catch (error) {
      console.error("Erro:", error);
      toast("Erro ao alterar a relevânica", {
        description: "Por favor, tente novamente.",
        action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
        },
    });
    }
  };

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
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="pt-8 px-6 flex flex-col">
          <DialogTitle className="text-2xl font-medium max-w-[450px]">
            <strong className="bg-eng-blue text-white transition duration-500 font-medium">Editar</strong> produção {data.name}
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Você pode atualizar a relevância deste artigo ou fazer upload de arquivos associados.
          </DialogDescription>

          <div {...getRootProps()} className="border-dashed mb-3 flex-col border border-neutral-300 p-6 text-center rounded-md text-neutral-400 text-sm cursor-pointer transition-all gap-3 w-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-4">
            <input {...getInputProps()} />
            <div className="p-4 border rounded-md">
              <Image size={24} className="whitespace-nowrap" />
            </div>
            {isDragActive ? (
              <p>Solte os arquivos aqui...</p>
            ) : (
              <p>Arraste e solte a imagem aqui ou clique para selecionar o arquivo</p>
            )}
          </div>

          <div>
            {fileInfo.name && (
              <div className="justify-center flex items-center gap-3">
                <Image size={16} />
                <p className="text-center text-zinc-500 text-sm">
                  Arquivo selecionado: <strong>{fileInfo.name}</strong> ({(fileInfo.size / 1024).toFixed(2)} KB)
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 items-center mt-4">
            <Switch checked={relevance} onCheckedChange={handleRelevanceChange} />
            <p className="text-sm">{relevance ? "Remover" : "Adicionar"} artigo às produções relevantes</p>
          </div>
        </DialogHeader>

        <DialogFooter className="py-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowUUpLeft size={16} /> Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

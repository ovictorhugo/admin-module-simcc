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
  } from "../../components/ui/select"

  import { useModal } from "../hooks/use-modal-store";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import { toast } from "sonner"
import { Button } from "../ui/button";
import { ArrowUUpLeft, Plus } from "phosphor-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function AddGraduateProgram() {

    const { onClose, isOpen, type: typeModal } = useModal();
    const isModalOpen = isOpen && typeModal === "add-graduate-program";

    const { user, urlGeralAdm } = useContext(UserContext);

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [modality, setModality] = useState('');
    const [type, setType] = useState('');
    const [ranking, setRanking] = useState('');
    const [area, setArea] = useState('');
    const [code, setCode] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async () => {

        const docId = uuidv4();

        try {
          const data = [
            {
                graduate_program_id: docId,
                code: code,
                name: name.toUpperCase(),
                area: area.toUpperCase(),
                modality: modality.toUpperCase(),
                type: type.toUpperCase(),
                rating: ranking.toUpperCase(),
                institution_id: user.institution_id,
                description: descricao,
                url_image: user.img_url,
                city: city,
                visible: false
              }
          ]

          let urlProgram = urlGeralAdm + '/GraduateProgramRest/Insert'


          const fetchData = async () => {
          
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
               
                toast("Dados enviados com sucesso", {
                    description: "Programa de pós-graduação cadastrado na instituição",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               
              } else {
                console.error('Erro ao enviar dados para o servidor.');
                toast("Tente novamente!", {
                    description: "Tente novamente",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
              }
              
            } catch (err) {
              console.log(err);
            } 
          };
          fetchData();
          onClose()
    
          
        } catch (error) {
            toast("Erro ao processar requisição", {
                description: "Tente novamente",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
        }
      };

    return  (
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

        <div>
            <div className="flex flex-col gap-2 mt-4">
                <Label>Nome do programa</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nome do programa"/>
            </div>

            <div className="mt-4 gap-4 grid grid-cols-2">
            <div className="flex flex-col gap-2 w-full">
                <Label>Modalidade</Label>
                <Select  onValueChange={(value) => setModality(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha a modalidade" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ACADÊMICO">Acadêmico</SelectItem>
                <SelectItem value="PROFISSIONAL">Profissional</SelectItem>

            </SelectContent>
            </Select>

            </div>

            <div className="flex flex-col gap-2">
                <Label>Cidade</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Cidade"/>
            </div>
            </div>

            <div className="mt-4 gap-4 flex">
            <div className="flex flex-col gap-2 w-1/2">
                <Label>Tipo de programa</Label>
                <Select  onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha o tipo de programa" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="DOUTORADO">Doutorado</SelectItem>
                <SelectItem value="MESTRADO">Mestrado</SelectItem>

            </SelectContent>
            </Select>

            </div>

           <div className="w-1/2 flex gap-4">
           <div className="flex flex-col gap-2 w-2/3">
                <Label>Área</Label>
                <Input value={area} onChange={(e) => setArea(e.target.value)} type="text" placeholder="Área"/>
            </div>

            <div className="flex flex-col gap-2 w-1/3">
                <Label>Nota</Label>
                <Input value={ranking} onChange={(e) => setRanking(e.target.value)} type="text" placeholder="Nota"/>
            </div>
           </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <Label>Código do programa (Sucupira)</Label>
                <Input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="Código do programa (Sucupira)"/>
            </div>
        </div>

        <DialogFooter className=" py-4 ">
        <Button variant={'ghost'}   onClick={() => onClose()}>
            <ArrowUUpLeft size={16} className="" />Cancelar
              </Button>

              <Button  onClick={handleSubmit} className="text-white dark:text-white" >
              <Plus size={16} className="" />Adicionar
              </Button>
            </DialogFooter>

 </DialogContent>
        </Dialog>
    )
}
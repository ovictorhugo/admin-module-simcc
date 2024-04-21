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
import { ArrowUUpLeft, PencilSimple, Plus } from "phosphor-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function EditGraduateProgram() {

    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = isOpen && typeModal === "edit-graduate-program";

    const { user, urlGeralAdm } = useContext(UserContext);

    const [name, setName] = useState(data && data.name);
    const [city, setCity] = useState( data && data.city);
    const [modality, setModality] = useState(data && data.modality);
    const [type, setType] = useState( data && data.type);
    const [ranking, setRanking] = useState(data && data.rating);
    const [area, setArea] = useState(data && data.area);
    const [code, setCode] = useState(data && data.code);
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async () => {

        const docId = uuidv4();

        try {
          const data = [
            {
                graduate_program_id: docId,
                code: code,
                name: name ? name.toUpperCase() : '',
                area: area ? area.toUpperCase() : '',
                modality: modality ? modality.toUpperCase() : '',
                type: type ? type.toUpperCase() : '',
                rating: ranking ? ranking.toUpperCase() : '',
                institution_id: user.institution_id,
                description: descricao,
                url_image: user.img_url,
                city: city ? city : '',
                visible: false
              }
          ]

          let urlProgram = urlGeralAdm + '/GraduateProgramRest/Fix'


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
                    description: "Programa de pós-graduação atualizado na instituição",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               
              } else {
                console.error('Erro ao enviar dados para o servidor.');
                toast("Tente novamente", {
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
 <DialogContent>
 <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-medium">
          Editar programa de <strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">pós-graduação</strong> {data.name}
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
          Revise as informações básicas do programa de pós-graduação como o nome, classificação e modalidade.
          </DialogDescription>
        </DialogHeader>

        <div>
            <div className="flex flex-col gap-2 mt-4">
                <Label>Nome do programa</Label>
                <Input defaultValue={name} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nome do programa"/>
            </div>

            <div className="mt-4 gap-4 grid grid-cols-2">
            <div className="flex flex-col gap-2 w-full">
                <Label>Modalidade</Label>
                <Select defaultValue={modality}  onValueChange={(value) => setModality(value)}>
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
                <Input defaultValue={city} value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Cidade"/>
            </div>
            </div>

            <div className="mt-4 gap-4 flex">
            <div className="flex flex-col gap-2 w-1/2">
                <Label>Tipo de programa</Label>
                <Select defaultValue={type}  onValueChange={(value) => setType(value)}>
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
                <Input value={area} defaultValue={area} onChange={(e) => setArea(e.target.value)} type="text" placeholder="Área"/>
            </div>

            <div className="flex flex-col gap-2 w-1/3">
                <Label>Nota</Label>
                <Input defaultValue={ranking} value={ranking} onChange={(e) => setRanking(e.target.value)} type="text" placeholder="Nota"/>
            </div>
           </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <Label>Código do programa (Sucupira)</Label>
                <Input defaultValue={code} value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="Código do programa (Sucupira)"/>
            </div>
        </div>

        <DialogFooter className=" py-4 ">
        <Button variant={'ghost'}   onClick={() => onClose()}>
            <ArrowUUpLeft size={16} className="" />Cancelar
              </Button>

              <Button  onClick={handleSubmit} className="text-white dark:text-white" >
              <PencilSimple size={16} className="" />Editar
              </Button>
            </DialogFooter>

 </DialogContent>
        </Dialog>
    )
}
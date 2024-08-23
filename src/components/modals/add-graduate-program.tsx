import {

    DialogHeader,

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
import { Plus, X } from "phosphor-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import {
  Sheet,
  SheetContent,

} from "../../components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

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
    const [site, setSite] = useState('');
    const [sigla, setSigla] = useState('');

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
                institution_id: user?.institution_id,
                description: descricao,
                url_image: ''   ,
                city: city,
                visible: false,
                acronym:sigla,
                site:site
            }
          ]

          let urlProgram = urlGeralAdm + '/GraduateProgramRest/Insert'


          const fetchData = async () => {
          
           if (name == '') {
            toast("Campo 'Nome do programa' vazio", {
              description: "Preencha o campo",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
           } else if (area == '') {
            toast("Campo 'Área' vazio", {
              description: "Preencha o campo",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
           } else if (modality == '') {
            toast("Campo 'Modalidade' vazio", {
              description: "Preencha o campo",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
           } else if (type == '') {
            toast("Campo 'Tipo do programa' vazio", {
              description: "Preencha o campo",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
           } else if (city == '') {
            toast("Campo 'Cidade' vazio", {
              description: "Preencha o campo",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
           } else if (city != '' && type != '' && modality != '' && area != '' && name != '') {
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

                  onClose()
               
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
           }
          };
          fetchData();

          if(city != '' && type != '' && modality != '' && area != '' && name != '') {
            onClose()
            setName('')
            setArea('')
            setCity('')
            setCode('')
            setDescricao('')
            setModality('')
            setRanking('')
            setType('')
            setSigla('')
            setSite('')
          }

          
          
    
          
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

<ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-50px)] p-8 ">
        <div className="mb-8">
                      <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                      Programas de pós-graduação
                        </p>

                        <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                          Adicionar programa
                        </h1>
                      </div>

        <div>
            <div>
            <div className="flex flex-col gap-2 mt-4 w-2/3">
                <Label>Nome do programa*</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
            </div>

            <div className="flex flex-col gap-2 mt-4 w-1/3">
                <Label>Sigla*</Label>
                <Input value={sigla} onChange={(e) => setSigla(e.target.value)} type="text" />
            </div>
            </div>

            <div className="mt-4 gap-4 grid grid-cols-2">
            <div className="flex flex-col gap-2 w-full">
                <Label>Modalidade*</Label>
                <Select  onValueChange={(value) => setModality(value)}>
            <SelectTrigger className="w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ACADÊMICO">Acadêmico</SelectItem>
                <SelectItem value="PROFISSIONAL">Profissional</SelectItem>

            </SelectContent>
            </Select>

            </div>

            <div className="flex flex-col gap-2">
                <Label>Cidade*</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} type="text" />
            </div>
            </div>

            <div className="mt-4 gap-4 flex">
            <div className="flex flex-col gap-2 w-1/2">
                <Label>Tipo de programa*</Label>
                <Select  onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-full">
                <SelectValue  />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="DOUTORADO">Doutorado</SelectItem>
                <SelectItem value="MESTRADO">Mestrado</SelectItem>

            </SelectContent>
            </Select>

            </div>

           <div className="w-1/2 flex gap-4">
           <div className="flex flex-col gap-2 w-2/3">
                <Label>Área*</Label>
                <Input value={area} onChange={(e) => setArea(e.target.value)} type="text" />
            </div>

            <div className="flex flex-col gap-2 w-1/3">
                <Label>Nota</Label>
                <Input value={ranking} onChange={(e) => setRanking(e.target.value)} type="text"/>
            </div>
           </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <Label>Código do programa (Sucupira)</Label>
                <Input value={code} onChange={(e) => setCode(e.target.value)} type="text" />
            </div>

            <div className="flex flex-col gap-2 w-1/3">
                <Label>Site</Label>
                <Input value={site} onChange={(e) => setSite(e.target.value)} type="text"/>
            </div>

            <div className="flex flex-col gap-2 w-full ">
            <Label htmlFor="dep_des" className="h-fit">Descrição</Label>
            <Textarea
              name="dep_des"
              className="h-full"
              value={descricao}
              onChange={(e) => setDescricao( e.target.value)}
              id="dep_des"
            />
          </div>

            <Button onClick={() => handleSubmit()} size={'sm'} className="text-white dark:text-white mt-3 ml-auto flex ">
   <Plus size={16} className="" />Adicionar
 </Button>
        </div>
        </ScrollArea>
     

            </SheetContent>
            </Sheet>
    )
}
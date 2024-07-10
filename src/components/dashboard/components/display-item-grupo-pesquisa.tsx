import { Archive, Barcode, Check, MapPin, MapPinIcon, Star, User, Users, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Eye, EyeSlash, FileCsv, Trash } from "phosphor-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { toast } from "sonner"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import { useModal } from "../../hooks/use-modal-store";
import { DataTableModal } from "../../componentsModal/data-table";
import { columns } from "../../componentsModal/columns-researchers-program";

interface Patrimonio {
  graduate_program_id: string
  code: string
  name: string
  area: string
  modality: string
  type: string
  rating: string
  institution_id: string
  description: string
  url_image: string
  city:string
  created_at:string
  visible: boolean
  updated_at:string
  qtd_discente:string
  qtd_colaborador:string
  qtd_permanente:string
  }

  export interface PesquisadorProps {
    lattes_id: string
    name: string
    type_: string
  }
  
  export interface PesquisadorProps2 {
    name: string
    lattes_id: string
    researcher_id: string
    institution_id: string
  }
  

export function DisplayItemGrupoPesquisa(props:Patrimonio) {
    const qualisColor = {
        'MESTRADO': 'bg-blue-200',
        'DOUTORADO': 'bg-blue-800',
      };
    
      const csvCodToText = {
        'BM': 'Bom',
        'AE': 'Anti-Econômico',
        'IR': 'Irrecuperável',
        'OC': 'Ocioso',
        'BX': 'Baixado',
        'RE': 'Recuperável'
      };
      const [visibleProgram, setVisibleProgram] = useState(false);
      const { urlGeralAdm, user } = useContext(UserContext);
      const { onOpen } = useModal();

      const handleVisibleProgram = (id: string) => {

        const urlVisibleProgram = urlGeralAdm  + `GraduateProgramRest/Update?graduate_program_id=${id}`
        const fetchData = async () => {
         
          try {
            const response = await fetch(urlVisibleProgram, {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
                'Content-Type': 'text/plain'
              }
            });
            if (response.ok) {

              setVisibleProgram(!visibleProgram)
              toast("Visibilidade alterada", {
                description: "Operação realizada com sucesso!",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
            } 
      
          
          } catch (err) {
            toast("Erro ao mudar visibilidade", {
              description: "Tente novamente",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
          } 
        };
        fetchData();

      };


      const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);

      const urlGetResearcher = `${urlGeralAdm}GraduateProgramResearcherRest/Query?graduate_program_id=${props.graduate_program_id}`;

      const fetchDataAll = async () => {
        try {
          const response = await fetch(urlGetResearcher, {
            mode: "cors",
            method: 'GET',
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Max-Age": "3600",
              "Content-Type": "text/plain",
            },
          });
          const data = await response.json();
          if (data) {
            setResearcher(data);
          }
        } catch (err) {
          console.log(err);
        }
      }

      useEffect(() => {
      
        fetchDataAll()

        }, [urlGeralAdm, props.graduate_program_id]);

    return(
      <Tabs defaultValue={'all'} className="h-full" >
        <div className="flex flex-col">
      <div className="flex items-center p-2 px-4 justify-between">
        <div className="flex items-center gap-2">

        <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"  onClick={() =>handleVisibleProgram(props.graduate_program_id)} >
              {props.visible ? (<EyeSlash size={16}/>):(<Eye size={16}/>)}
                <span className="sr-only">Arquivar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mudar visibilidade</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">

        <TabsList >
              <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                <TabsTrigger value="movimentacao-bens" className="text-zinc-600 dark:text-zinc-200">Discentes</TabsTrigger>
                </TabsList>

                <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => onOpen('confirm-delete-pos-graduate-program', {id_delete:props.graduate_program_id , name:props.name})}  variant='destructive' size="icon"   >
             <Trash size={16}/>
                <span className="sr-only">Arquivar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Deletar programa</TooltipContent>
          </Tooltip>
        </div>
        </div>
        <div className="w-full border-b border-neutral-200 dark:border-neutral-800 "></div>

        <div >
        <div className={`w-full h-2 ${qualisColor[props.type.trim() as keyof typeof qualisColor]}`}></div>
      
        </div>
        </div>

        <TabsContent value="all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              {props.code != '' ? (props.code):('Sem código')}
              </CardTitle>
          
            </CardHeader>

            <CardContent className="flex flex-col justify-between h-full">
              <div>
                <div className="text-2xl font-bold">{props.name}</div>
                <p className="text-xs text-muted-foreground">
                 
                </p>
              </div>
              </CardContent>

              <div className="flex mt-8 flex-wrap gap-4 px-6">
              <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12}/>{props.type}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><MapPinIcon size={12}/>{props.city}</div>
            {props.rating != '' && (
                          <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12}/>{props.rating}</div>
                        )}
              </div>
            
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
       <div className=" overflow-y-auto h-[calc(100vh-115px)] elementBarra ">
       <CardContent className="flex flex-col justify-between pt-6 ">
              <div>
                <div className="text-2xl font-bold uppercase">Docentes vinculados ao programa</div>
                <p className="mt-2 text-sm">
                Adicione ou remova os pesquisadores permanentes e colaboradores do programa de pós graduação
                </p>
              </div>
              </CardContent>

              <div className="px-6">
              <DataTableModal columns={columns} data={researcher}/>
              </div>
       </div>
        </TabsContent>
        </Tabs>
    )
}
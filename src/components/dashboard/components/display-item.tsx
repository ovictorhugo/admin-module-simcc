import {  AreaChart,    Globe,  MapPinIcon, PencilLine, Plus, SquareArrowOutUpRight, SquareMenu, Star, User,  Users } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Eye, EyeSlash, Trash } from "phosphor-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { toast } from "sonner"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import { useModal } from "../../hooks/use-modal-store";
import { DataTableModal } from "../../componentsModal/data-table";

import { Alert } from "../../ui/alert";
import { Link } from "react-router-dom";

import { Label } from "../../ui/label";

import { Input } from "../../ui/input";
import { v4 as uuidv4 } from 'uuid';
import { columnsStudent } from "../../componentsModal/columns-student-program";

import { DocentesGraduate } from "./docentes-graduate";
import { DiscentesGraduate } from "./discentes-graduate";
import { Helmet } from "react-helmet";

interface Patrimonio {
  graduate_program_id: string
  menu_state:boolean
  code: string
  name: string
  area: string
  modality: string
  type: string
  rating: string
  institution_id: string
  description?: string
  url_image: string
  city:string
  created_at?:string
  visible: boolean
  updated_at?:string
  qtd_discente:string
  qtd_colaborador:string
  qtd_permanente:string
  site:string 
  acronym:string 
  onMenuState:(newResearcher: boolean) => void;
  }

  export interface PesquisadorProps {
    lattes_id: string
    name: string
    type_: string
    graduate_program_id: string
    years: Array<number>
  }
  
  export interface PesquisadorProps2 {
    name: string
    lattes_id: string
    researcher_id: string
    institution_id: string
  }
  

export function DisplayItem(props:Patrimonio) {
    const qualisColor = {
        'MESTRADO': 'bg-blue-200',
        'DOUTORADO': 'bg-blue-800',
      };
    

 
      const [visibleProgram, setVisibleProgram] = useState(false);
      const { urlGeralAdm, user } = useContext(UserContext);
      const { onOpen, isOpen, type:typeModal } = useModal();

      const [isVisible, setIsVisible] = useState(props.visible)

      useEffect(() => {
        setIsVisible(props.visible);
      
    //    setTab('all')

        }, [urlGeralAdm, props.graduate_program_id, props.visible]);

      
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
              setIsVisible(!isVisible);
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


    



      const [tab, setTab] = useState('all')

     
       //listar todos os pesquisadores popover
    



    //student 



    const {version} = useContext(UserContext)
    return(
<Tabs  defaultValue={tab} value={tab}>
<Helmet>
  <title>{props.name ? `${props.name} | ${version ? 'Conectee': 'Iapós'}` : `${version ? 'Conectee': 'Iapós'} | ${version ? 'Escola de Engenharia UFMG': 'SENAI CIMATEC'}`}</title>
  <meta
    name="description"
    content={props.name ? `${props.name} | ${version ? 'Conectee': 'Iapós'}` : `${version ? 'Conectee': 'Iapós'} | ${version ? 'Escola de Engenharia UFMG': 'SENAI CIMATEC'}`}
  />
  <meta name="robots" content="index, follow" />
</Helmet>

      <div className="flex border dark:border-neutral-800 flex-col sticky top-[68px] z-[3] rounded-lg bg-white dark:bg-black">
      <div className="flex items-center p-2 justify-between">
        <div className="flex items-center gap-2">
       {!props.menu_state && (
         <Tooltip>
         <TooltipTrigger asChild>
           <Button variant="ghost" size="icon"  onClick={() => props.onMenuState(!props.menu_state)} >
           <SquareMenu size={16}/>
           </Button>
         </TooltipTrigger>
         <TooltipContent>Mostrar menu</TooltipContent>
       </Tooltip>
       )}

        <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"  onClick={() =>handleVisibleProgram(props.graduate_program_id)} >
              {isVisible ? (<EyeSlash size={16}/>):(<Eye size={16}/>)}
                <span className="sr-only">Arquivar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mudar visibilidade</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"  onClick={() => onOpen('edit-graduate-program', {
            graduate_program_id:props.graduate_program_id,
            code:props.code,
            name:props.name,
            area:props.area,
            modality:props.modality,
            type:props.type,
            rating:props.rating,
            institution_id:props.institution_id,
            description:props.description,
            url_image:props.url_image,
            city:props.city,
            visible:String(props.visible),
            site:props.site,
            acronym:props.acronym
            
            })} >
              <PencilLine size={16}/>
                <span className="sr-only">Arquivar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Editar</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to={`/pos-graduacao?graduate_program_id=${props.graduate_program_id}`} target="_blank">
              <Button variant="ghost" size="icon"   >
              <SquareArrowOutUpRight size={16}/>
                <span className="sr-only">Arquivar</span>
              </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Visualizar página</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
             <Link to={''}>
             <Button variant="ghost" size="icon"  >
              <AreaChart size={16}/>
                <span className="sr-only">Arquivar</span>
              </Button>
             </Link>
            </TooltipTrigger>
            <TooltipContent>Indicadores</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">

        <TabsList >
              <TabsTrigger value="all" onClick={() => setTab('all')} className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
                <TabsTrigger value="unread" onClick={() => setTab('unread')} className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                <TabsTrigger value="movimentacao-bens" onClick={() => setTab('movimentacao-bens')} className="text-zinc-600 dark:text-zinc-200">Discentes</TabsTrigger>
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
     

        </div>
      <div className="h-full mt-8 border   rounded-lg  relative dark:border-neutral-800" >
        

        <TabsContent value="all" className="mt-0">
        
<div className="md:p-8 p-4  flex flex-col">
  

   <div>
   <h1 className=" max-w-[700px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
          {props.name}
        </h1>
   </div>


   <div className="flex flex-wrap gap-4 mb-4 md:mb-8 ">
   <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12}/>{props.type}</div>
 <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center capitalize"><MapPinIcon size={12}/>{props.city}</div>
 {props.rating != '' && (
               <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12}/>{props.rating}</div>
             )}

<div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">{props.code != '' ? (props.code):('Sem código')}</div>
   </div>


<div className="w-full flex ">
                       <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-[#00A137] dark:bg-[#00A137] whitespace-nowrap"></div>

</div>

<div className="mb-4 md:mb-8">
            <div
                    className={`h-3 w-full rounded-t-md dark:border-neutral-800 border border-neutral-200 border-b-0 ${qualisColor[props.type.trim() as keyof typeof qualisColor]}  `}
                  ></div>
  
              <Alert
                        className="p-0 rounded-t-none"  x-chunk="dashboard-05-chunk-4"
                      >
  
  <CardHeader className="flex flex-row items-start bg-neutral-100 dark:bg-neutral-800">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="group flex items-center w-fit gap-2 text-lg">
                  <div className="w-fit">Informações</div>
              
                </CardTitle>
<div className="flex gap-4 items-center justify-end flex-wrap ">



<Link to={props.site} target="_blank"><div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Globe size={16}/> {props.site}</div></Link>


</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
               
               
              </div>
              
            </CardHeader>

            <CardContent className="p-6 text-sm">
              {props.description}
            </CardContent>
          </Alert>
            </div>
</div>
            
        </TabsContent>

        <TabsContent value="unread" className="mt-0 pb-6">
      <div className="overflow-y-auto ">
      <DocentesGraduate graduate_program_id={props.graduate_program_id}/>
      </div>
        </TabsContent>

        <TabsContent value="movimentacao-bens" className="mt-0">
      <div className="overflow-y-auto ">
        <DiscentesGraduate graduate_program_id={props.graduate_program_id}/>
      </div>
        </TabsContent>
       
        </div>
        </Tabs>
    )
}
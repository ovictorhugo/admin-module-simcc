import {  AreaChart,  ChevronsUpDown,  Globe,  MapPinIcon, Maximize2, PencilLine, Plus, RefreshCcw, SquareArrowOutUpRight, Star, User, UserIcon, Users } from "lucide-react";
import { Button } from "../../ui/button";

import { CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Eye, EyeSlash, MagnifyingGlass, Trash } from "phosphor-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { toast } from "sonner"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import { useModal } from "../../hooks/use-modal-store";

import { Alert } from "../../ui/alert";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Label } from "../../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { v4 as uuidv4 } from 'uuid';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";


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

  interface Props {
    graduate_program_id:string
  }

export function DocentesGraduate(props:Props) {
    const [type, setType] = useState('COLABORADOR');
    const { urlGeralAdm, user, urlGeral } = useContext(UserContext);
    const [input, setInput] = useState('')
    const { onOpen, isOpen, type:typeModal } = useModal();
    const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);

    const urlGetResearcher = `${urlGeralAdm}GraduateProgramResearcherRest/Query?graduate_program_id=${props.graduate_program_id}`;
console.log(urlGetResearcher)
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
          // Certifique-se de que cada researcher tenha o graduate_program_id correto
          const researchersWithGraduateProgramId = data.map((researcher: PesquisadorProps) => ({
            ...researcher,
            graduate_program_id: props.graduate_program_id,
          }));
          setResearcher(researchersWithGraduateProgramId);
        }
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() => {
       
        fetchDataAll()
      

        }, [urlGeralAdm, props.graduate_program_id]);

        useEffect(() => {
          if (typeModal === 'confirm-delete-researcher-graduate-program'  && !isOpen) {
            fetchDataAll()
          } 
      
          fetchDataAll()
        }, [isOpen, typeModal]);

    const permanenteCount = researcher.filter(researcher => researcher.type_ === 'PERMANENTE').length;
  const colaboradorCount = researcher.filter(researcher => researcher.type_ === 'COLABORADOR').length;  


   //listar todos os pesquisadores popover
   const [pesquisadoreSelecionado, setPesquisadorSelecionado] = useState<PesquisadorProps2 | undefined>();


const [researcherSearch, setResearcherSearch] = useState<PesquisadorProps2[]>([]);

const urlGetResearcherSearch = urlGeralAdm + `ResearcherRest/Query?institution_id=&name=&count= `;

console.log(urlGetResearcherSearch)
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(urlGetResearcherSearch, {
        mode: "cors",
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
        setResearcherSearch(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();

 
}, [urlGetResearcherSearch, props.graduate_program_id]);

const [openPopo2, setOpenPopo2] = useState(false)

const normalizeString = (str:any) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const filteredList = researcherSearch.filter((framework) =>
  normalizeString(framework.name).includes(normalizeString(input))
);
const handleSubmit = async () => {
  const currentYear = new Date().getFullYear();



  try {
    const data = [
      {
        graduate_program_id: props.graduate_program_id,
        researcher_id:pesquisadoreSelecionado?.researcher_id,
        year:`${currentYear}`,
        type_: 'COLABORADOR',

        }
    ]



    let urlProgram = urlGeralAdm + 'GraduateProgramResearcherRest/Insert'


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
              description: "Pesquisador adicionado no programa de pós-graduação",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })

            fetchDataAll()
            setPesquisadorSelecionado(undefined);
         
        } else {
          console.error('Erro ao enviar dados para o servidor.');
          toast("Tente novamente!", {
              description: "Erro ao cadastrar pesquisador ao programa",
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


    
  } catch (error) {
      toast("Erro ao processar requisição", {
          description: "Tente novamente!",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        })
  }
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 4 }, (_, i) => currentYear - (3 - i)); // Ordenando os anos em ordem crescente

// Crie estados para os tipos e anos selecionados para cada pesquisador
const [types, setTypes] = useState(researcher.map((props) => props.type_));




const [selectedYears, setSelectedYears] = useState(
    researcher.map((props) => props.years ?? []) // Garantir um array vazio caso 'props.years' seja undefined
  );


useEffect(() => {
       
    setTypes(researcher.map((props) => props.type_))
    setSelectedYears(researcher.map((props) => props.years))

    }, [researcher]);

console.log(selectedYears)

const handleUpdateData = (index: number, id_r:string) => {
  const yearsString = ''
  console.log(`Atualizar dados: Tipo: ${types[index]}, Researcher ID: ${researcher[index].graduate_program_id}, Anos: ${yearsString}`);
  // Implemente aqui a lógica para atualizar os dados com base no tipo, graduate_program_id e anos selecionados


  try {
    const data = [
      {
        graduate_program_id: props.graduate_program_id,
        lattes_id:id_r,
        year:selectedYears[index].join(';'),
        type_: types[index],

        }
    ]

console.log(data)

    let urlProgram = urlGeralAdm + 'GraduateProgramResearcherRest/Update'


    const fetchData = async () => {
    
      try {
        const response = await fetch(urlProgram, {
          mode: 'cors',
          method: 'PUT',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PUT',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
         
          toast("Dados enviados com sucesso", {
              description: "Pesquisador atualizado no programa de pós-graduação",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })

            fetchDataAll()
            setPesquisadorSelecionado(undefined);
         
        } else {
          console.error('Erro ao enviar dados para o servidor.');
          toast("Tente novamente!", {
              description: "Erro ao atualizar pesquisador no programa",
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


    
  } catch (error) {
      toast("Erro ao processar requisição", {
          description: "Tente novamente!",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        })
  }

};

const handleTypeChange = (index: number, value: string) => {
  const newTypes = [...types];
  newTypes[index] = value;
  setTypes(newTypes);
};

const toggleYearSelection = (index: number, year: number) => {
  const newSelectedYears = [...selectedYears];
  if (newSelectedYears[index].includes(year)) {
    newSelectedYears[index] = newSelectedYears[index].filter((y) => y !== year);
  } else {
    newSelectedYears[index].push(year);
  }
  setSelectedYears(newSelectedYears);
};

const handleYearsChange = (index: number, years: string[]) => {
    const newSelectedYears = [...selectedYears];
    // Converte o array de strings para números
    newSelectedYears[index] = years.map((year) => parseInt(year));
    setSelectedYears(newSelectedYears);
  };


  const [nomePesquisador, setNomePesquisador] = useState('');
  const [lattesID, setLattesID] = useState('');

  const handleSubmitPesquisador = async () => {

    const docId = uuidv4();

    try {
      const data = [
        {
            researcher_id: docId,
            name: nomePesquisador,
            lattes_id: lattesID,
            institution_id: import.meta.env.VITE_EXTERNAL_INSTITUTION_ID,
          }
      ]

      console.log(data)

      let urlProgram = urlGeralAdm + '/ResearcherRest/Insert'

      const fetchData = async () => {
      
        if(nomePesquisador.length != 0 && lattesID.length > 13) {
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
                      description: "Pesquisador cadastrado na instituição",
                      action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                      },
                    })

                    const currentYear = new Date().getFullYear();



  try {
    const data = [
      {
        graduate_program_id: props.graduate_program_id,
        lattes_id:lattesID,
        year:`${currentYear}`,
        type_: 'COLABORADOR',

        }
    ]



    let urlProgram = urlGeralAdm + 'GraduateProgramResearcherRest/Insert/Lattes'


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
              description: "Pesquisador adicionado no programa de pós-graduação",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })

            setLattesID('')
                 
            setNomePesquisador('')

            fetchDataAll()
            setPesquisadorSelecionado(undefined);
         
        } else {
          console.error('Erro ao enviar dados para o servidor.');
          toast("Tente novamente!", {
              description: "Erro ao cadastrar pesquisador ao programa",
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


    
  } catch (error) {
      toast("Erro ao processar requisição", {
          description: "Tente novamente!",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        })
  }


                } else {
                  if (response.status === 400) {
                    toast("Pesquisador já existe", {
                      description: "Tente novamente",
                      action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                      },
                    });
                  } else {
                    toast("Erro ao enviar os dados ao servidor", {
                      description: "Tente novamente",
                      action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                      },
                    });
                  }
                }
                
              } catch (err) {
                console.log(err);
              } 
        } else {
           if(nomePesquisador.length == 0 && lattesID.length == 0) {
            toast("Parece que os campos estão vazios", {
                description: "Preencha os campos nome do pesquisador e Lattes Id",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
           } else if (lattesID.length < 14) {
            toast("Parece que o Lattes Id está incorreto ou não preenchido", {
                description: "O Lattes ID teve conter 13 números",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
           } else if (nomePesquisador.length == 0) {
            toast("Preencha o nome do pesquisador", {
                description: "Parece que o campo está vazio",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
           }
        }
      };
      fetchData();

      
    } catch (error) {
      console.error('Erro ao processar a requisição:', error);
    }
  };


const [tab, setTab] = useState('all')

const [input2, setInput2] = useState('')

const filteredTotal = Array.isArray(researcher) ? researcher.filter(item => {
    // Normaliza a string do item e da busca para comparação
    const normalizeString = (str:any) => str
      .normalize("NFD") // Decompõe os caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
      .toLowerCase(); // Converte para minúsculas
  
    const searchString = normalizeString(item.name);
    const normalizedSearch = normalizeString(input2);
  
    return searchString.includes(normalizedSearch);
  }) : [];
  

    return(
        <div>
        <div className="  ">
        <CardContent className="flex flex-col justify-between pt-6 ">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
       <Alert className="p-0 mb-4 md:mb-8">
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                       Total de docentes 
                     </CardTitle>
                     <User className="h-4 w-4 text-muted-foreground" />
                   </CardHeader>
                   <CardContent>
                     <div className="text-2xl font-bold">{permanenteCount}</div>
                     <p className="text-xs text-muted-foreground">
                     permenentes registrados
                     </p>
                   </CardContent>
                   </Alert>
 
                   <Alert className="p-0 mb-4 md:mb-8">
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                       Total de docentes 
                     </CardTitle>
                     <User className="h-4 w-4 text-muted-foreground" />
                   </CardHeader>
                   <CardContent>
                     <div className="text-2xl font-bold">{colaboradorCount}</div>
                     <p className="text-xs text-muted-foreground">
                     colaboradores registrados
                     </p>
                   </CardContent>
                   </Alert>
       </div>
 
    
 <Tabs value={tab} defaultValue={tab}>
 <Alert className="p-0">
               <CardHeader className="flex flex-row items-start bg-neutral-100 rounded-t-md dark:bg-neutral-800">
       <div className="flex items-center justify-between w-full">
         <CardTitle className="group flex items-center w-fit gap-2 text-lg">
           <div className="w-fit">Docentes</div>
         </CardTitle>
         <div className="flex gap-3 items-center ">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setTab('all')}>Docentes da instituição</TabsTrigger>
            <TabsTrigger value="2" onClick={() => setTab('2')}>Docentes externos</TabsTrigger>
          </TabsList>
         </div>
       </div>
     </CardHeader>
 
              <CardContent className="mt-6">

            

             <TabsContent value="all">
             <div className="gap-6 flex  items-end">
 
 
             <div className="flex flex-col space-y-1.5 w-full flex-1">
             <Label htmlFor="name">Pesquisador da Unidade</Label>
 
             <Dialog open={openPopo2}  onOpenChange={setOpenPopo2}>
             <DialogTrigger className="w-full">
             <Button
                   variant="outline"
                   role="combobox"
                   aria-expanded={openPopo2}
                   className="w-full justify-between"
                 >
                   {pesquisadoreSelecionado
                     ? researcherSearch.find((framework) => framework.name === pesquisadoreSelecionado.name)?.name
                     : 'Selecione um pesquisador'}
                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                 </Button>
             </DialogTrigger>
             <DialogContent className="z-[9999]" >
 <DialogHeader>
 <DialogTitle>Escolher pesquisador</DialogTitle>
 <DialogDescription>
 Todos os docentes cadastrado no Módulo Administrativo da instituição
 </DialogDescription>
 </DialogHeader>
 
 <div className="border rounded-md bg-white dark:bg-neutral-950 px-6 h-12 flex items-center gap-1 border-neutral-200 dark:border-neutral-800">
                     <MagnifyingGlass size={16} />
                     <Input
                       className="border-0"
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       placeholder="Buscar pesquisador"
                     />
                   </div>
 
                   <div className={'max-h-[350px] overflow-y-auto elementBarra'}>
                   
                   <div className="flex flex-col gap-1 p-2">
                     {filteredList.length > 0 ? (
                       filteredList.map((props, index) => (
                         <Button
                           variant={'ghost'}
                           key={index}
                           className="text-left justify-start"
                           onClick={() => {
                             setPesquisadorSelecionado(props);
                       
                             setOpenPopo2(false); // Fechar o popover após a seleção
                           }}
                         >
                           {props.name}
                         </Button>
                       ))
                     ) : (
                 <div className="text-center w-full text-sm">Nenhum pesquisador encontrado</div>
                     )}
                   </div>
                 </div>
 </DialogContent>
 
             </Dialog>
     </div>
 
     <Button  onClick={() => handleSubmit()}><Plus size={16}/>Adicionar</Button>
 
   </div>
             </TabsContent>

             <TabsContent value="2">
             <div className="flex gap-6 items-end">
           <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Nome completo</Label>
           <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text"  />
           </div>

           <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Lattes Id</Label>
           <Input value={lattesID} onChange={(e) => setLattesID(e.target.value)} type="text" />
           </div>

           <Button onClick={() => handleSubmitPesquisador()} className="text-white dark:text-white"><Plus size={16} className="" /> Adicionar</Button>
           </div>
                </TabsContent>

             

  
              </CardContent>
               </Alert>
 </Tabs>
            
               </CardContent>
 
               <div className="px-6">
               <Accordion type="single" collapsible className="flex flex-col gap-4">
               <div className="border bg-white dark:bg-neutral-950  rounded-md px-6 h-12 flex items-center gap-1 border-neutral-200 dark:border-neutral-800">
                     <MagnifyingGlass size={16} />
                     <Input
                       className="border-0"
                       value={input2}
                       onChange={(e) => setInput2(e.target.value)}
                       placeholder="Buscar pesquisador"
                     />
                   </div>

       {filteredTotal.map((props, index) => (
         <Alert key={index}>
           <AccordionItem value={String(index)}>
             <div className="flex justify-between items-center h-10 group">
               <div className="h-10">
                 <div className="flex items-center gap-2">
                   <Avatar className="cursor-pointer rounded-md h-8 w-8">
                     <AvatarImage
                       className="rounded-md h-8 w-8"
                       src={`${urlGeral}ResearcherData/Image?name=${props.name}`}
                     />
                     <AvatarFallback className="flex items-center justify-center">
                       <UserIcon size={12} />
                     </AvatarFallback>
                   </Avatar>
                   <div>
                     <p className="font-medium">{props.name}</p>
                     <div className="text-xs text-gray-500">{props.lattes_id}</div>
                   </div>
                 </div>
               </div>
              <div className="flex items-center gap-3">
             <div className=" items-center gap-3 hidden group-hover:flex transition-all">
             <Button size={'icon'}  onClick={() => onOpen('researcher-modal', {name:props.name})} variant={'ghost'} className="h-10 w-10 ">
                   <Maximize2 size={16}  />
             </Button>
 
          <Button size={'icon'}  onClick={() => onOpen('confirm-delete-researcher-graduate-program', {lattes_id:props.lattes_id, graduate_program_id:props.graduate_program_id, nome:props.name})} variant={'destructive'} className=" text-white h-10 w-10 dark:text-white">
                        <Trash size={16} />
                      </Button>
             </div>
 
              <AccordionTrigger></AccordionTrigger>
              </div>
             </div>
 
             <AccordionContent className="p-0">
               <div className="flex w-full gap-4 items-end mt-4">
                 <div className="grid gap-4 w-full">
                   <Label htmlFor="name">Tipo</Label>
                   <Select
                     defaultValue={types[index]}
                     value={types[index]}
                     onValueChange={(value) => handleTypeChange(index, value)}
                   >
                     <SelectTrigger>
                       <SelectValue className="w-full" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="COLABORADOR">Colaborador</SelectItem>
                       <SelectItem value="PERMANENTE">Permanente</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="grid gap-4 w-full">
                   <Label htmlFor="years">Anos de participação</Label>
                   {selectedYears[index] ? (
                    <ToggleGroup
                      type="multiple"
                      className="gap-3 justify-start w-fit"
                      value={selectedYears[index].map(String)}
                    onValueChange={(years) => handleYearsChange(index, years)} 
                    >
                      {years.map((year) => (
                        <ToggleGroupItem
                          key={year}
                          variant={'outline'}
                          value={year.toString()}
                          aria-label={`Toggle ${year}`}
                        >
                          {year}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  ) : (
                    <p className="text-gray-500">Nenhum ano disponível</p>
                  )}
                 </div>
                 <Button
                   onClick={() => handleUpdateData(index, props.lattes_id)}
                 >
                   <RefreshCcw size={16} /> Atualizar dados
                 </Button>
               </div>
             </AccordionContent>
           </AccordionItem>
         </Alert>
       ))}
     </Accordion>
               </div>
 
              
        </div>
         </div>
    )
}
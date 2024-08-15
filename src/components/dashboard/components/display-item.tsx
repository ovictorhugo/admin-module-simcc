import {  AreaChart,  ChevronsUpDown, GraduationCap,  MapPinIcon, PencilLine, Plus, SquareArrowOutUpRight, Star, User, Users } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Eye, EyeSlash, MagnifyingGlass, Trash } from "phosphor-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { toast } from "sonner"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import { useModal } from "../../hooks/use-modal-store";
import { DataTableModal } from "../../componentsModal/data-table";
import { columns } from "../../componentsModal/columns-researchers-program";
import { Alert } from "../../ui/alert";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Label } from "../../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { v4 as uuidv4 } from 'uuid';
import { columnsStudent } from "../../componentsModal/columns-student-program";

interface Patrimonio {
  graduate_program_id: string
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
  }

  export interface PesquisadorProps {
    lattes_id: string
    name: string
    type_: string
    graduate_program_id: string
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
    

      const [type, setType] = useState('COLABORADOR');
      const [visibleProgram, setVisibleProgram] = useState(false);
      const { urlGeralAdm, user } = useContext(UserContext);
      const { onOpen, isOpen, type:typeModal } = useModal();

      const [isVisible, setIsVisible] = useState(props.visible)

      useEffect(() => {
        setIsVisible(props.visible);
        fetchDataAll()
        setTab('all')

        }, [urlGeralAdm, props.graduate_program_id, props.visible]);

        useEffect(() => {
          if (typeModal === 'confirm-delete-researcher-graduate-program'  && !isOpen) {
            fetchDataAll()
          } 
      
          fetchDataAll()
        }, [isOpen, typeModal]);

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



      const [tab, setTab] = useState('all')

      const [input, setInput] = useState('')

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

      if(type == '') {
        toast("Selecione o tipo", {
          description: "Tente novamente!",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        })

        return
      }
  
      try {
        const data = [
          {
            graduate_program_id: props.graduate_program_id,
            researcher_id:pesquisadoreSelecionado?.researcher_id,
            year:String(currentYear),
            type_: type
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


    //student 

    const [student, setStudent] = useState<PesquisadorProps[]>([]);

    let urlGetStudent = urlGeralAdm + `studentRest/query?graduate_program_id=${props.graduate_program_id}`;
  
    const fetchDataStudent = async () => {
      try {
        const response = await fetch(urlGetStudent, {
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
          // Certifique-se de que cada researcher tenha o graduate_program_id correto
          const researchersWithGraduateProgramId = data.map((researcher: PesquisadorProps) => ({
            ...researcher,
            graduate_program_id: props.graduate_program_id,
          }));
          setStudent(researchersWithGraduateProgramId);
          console.log(student)
        }
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      if (typeModal === 'confirm-delete-student-graduate-program'  && !isOpen) {
        fetchDataStudent();
      } 
  
      fetchDataStudent();
    }, [isOpen, typeModal, urlGetStudent, props.graduate_program_id]);


    const [nomePesquisador, setNomePesquisador] = useState('');
    const [lattesID, setLattesID] = useState('');

    const handleSubmitPesquisadorUnique = async () => {
      const currentYear = new Date().getFullYear();


      

      try {
        const data = [
          {
              student_id: uuidv4(),
              name: nomePesquisador,
              lattes_id: lattesID,
              graduate_program_id: props.graduate_program_id,
              institution_id: user.institution_id,
              year: currentYear
            }
        ]

        console.log(data)

        let urlProgram = urlGeralAdm + '/studentRest/insert'

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
                    setLattesID('')
                   
                    setNomePesquisador('')
    
                    toast("Dados enviados com sucesso", {
                        description: "Pesquisador cadastrado na instituição",
                        action: {
                          label: "Fechar",
                          onClick: () => console.log("Undo"),
                        },
                      })

                      fetchDataStudent()
                  } else {
                    toast("Erro ao enviar os dados ao servidor", {
                        description: "Tente novamenete",
                        action: {
                          label: "Fechar",
                          onClick: () => console.log("Undo"),
                        },
                      })
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

    return(
      <Tabs defaultValue={tab} value={tab} className="h-full" >
        <div className="flex flex-col">
      <div className="flex items-center p-2 px-4 justify-between">
        <div className="flex items-center gap-2">

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
            visible:String(props.visible)
            
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
        <div className="w-full border-b border-neutral-200 dark:border-neutral-800 "></div>

        <div >
        <div className={`w-full h-2 ${qualisColor[props.type.trim() as keyof typeof qualisColor]}`}></div>
      
        </div>
        </div>

        <TabsContent value="all" className="mt-0">
        
<div className="p-6 gap-4 md:gap-8 flex flex-col">
  
<Alert>

<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
   <CardTitle className="text-sm font-medium">
   {props.code != '' ? (props.code):('Sem código')}
   </CardTitle>

   <GraduationCap className="h-4 w-4 text-muted-foreground" />
 </CardHeader>
<CardContent className="flex flex-col justify-between h-full">
   <div>
     <div className="text-2xl font-bold">{props.name}</div>
     <p className="text-xs text-muted-foreground">
      
     </p>
   </div>
   </CardContent>

   <div className="flex mb-6 flex-wrap gap-4 px-6">
   <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12}/>{props.type}</div>
 <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center capitalize"><MapPinIcon size={12}/>{props.city}</div>
 {props.rating != '' && (
               <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12}/>{props.rating}</div>
             )}
   </div>
</Alert>

<div className="w-full flex ">
                       <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-[#00A137] dark:bg-[#00A137] whitespace-nowrap"></div>

</div>
</div>
            
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
       <div className=" overflow-y-auto h-[calc(100vh-115px)] elementBarra ">
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

              <Alert className="p-6">
              <div>
                <div className="text-2xl font-bold uppercase">Docentes vinculados ao programa</div>
                <p className="mt-2 text-sm">
                Adicione ou remova os pesquisadores permanentes e colaboradores do programa de pós graduação
                </p>
              </div>

              <div className="gap-6 flex mt-6 items-end">

              <div className="grid gap-3 w-full">
                        <Label htmlFor="name">Tipo</Label>
              <Select defaultValue={type} value={type}  onValueChange={(value) => setType(value)}>
            <SelectTrigger className="">
                <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="COLABORADOR">Colaborador</SelectItem>
                <SelectItem value="PERMANENTE">Permanente</SelectItem>

            </SelectContent>
            </Select>
            </div>

            <div className="grid gap-3 w-full">
                        <Label htmlFor="name">Pesquisador</Label>

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

    <div className="border rounded-md px-6 h-12 flex items-center gap-1 border-neutral-200 dark:border-neutral-800">
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

                <Button onClick={() => handleSubmit()}><Plus size={16}/>Adicionar</Button>

              </div>
              </Alert>
              </CardContent>

              <div className="px-6">
              <DataTableModal columns={columns} data={researcher}/>
              </div>
       </div>
        </TabsContent>

        <TabsContent value="movimentacao-bens" className="mt-0">
        <div className=" overflow-y-auto h-[calc(100vh-115px)] elementBarra ">
        <CardContent className="flex flex-col justify-between pt-6 ">
        <Alert className="p-0 mb-4 md:mb-8">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de discentes
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{student.length}</div>
                    <p className="text-xs text-muted-foreground">
                      registrados
                    </p>
                  </CardContent>
                  </Alert>

                  <Alert className="p-6">
              <div>
                <div className="text-2xl font-bold uppercase">Discentes vinculados ao programa</div>
                <p className="mt-2 text-sm">
                Adicione ou remova os pesquisadores permanentes e colaboradores do programa de pós graduação
                </p>
              </div>

              <div className="gap-6 flex mt-6 items-end">

              <div className="grid gap-3 w-full">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text" />
            </div>

            <div className="grid gap-3 w-full">
                        <Label htmlFor="name">Lattes Id</Label>
                        <Input value={lattesID} onChange={(e) => setLattesID(e.target.value)} type="text"  />
                      
                </div>

                <Button onClick={() => handleSubmitPesquisadorUnique()}><Plus size={16}/>Adicionar</Button>

              </div>
              </Alert>
                  </CardContent>

                  <div className="px-6">
              <DataTableModal columns={columnsStudent} data={student}/>
              </div>
       
        </div>

     
        </TabsContent>
        </Tabs>
    )
}
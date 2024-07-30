import {  AreaChart,  ChevronsUpDown, PencilLine, Plus, SquareArrowOutUpRight, Star, User, Users, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { CardContent, CardHeader, CardTitle } from "../../ui/card";
import {  MagnifyingGlass, Trash } from "phosphor-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { toast } from "sonner"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import { useModal } from "../../hooks/use-modal-store";
import { DataTableModal } from "../../componentsModal/data-table";
import { columns } from "../../componentsModal/columns-researchers-program";
import { Alert } from "../../ui/alert";
import { Link } from "react-router-dom";

import { Label } from "../../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { LinhaTempoDisciplinas } from "./linha-tempo-disciplinas";
import { PainelDisciplinas } from "./painel-disciplinas";




interface YearSemester {
  year:string
  semester:string
}

interface Patrimonio {
  dep_id:string
  org_cod: string
  dep_nom: string
  dep_des: string
  dep_email: string
  dep_site: string
  dep_tel: string
  img_data:string
  dep_sigla: string
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

  function generateYearSemesterArray(startYear: number, startSemester: number, endYear: number, endSemester: number): YearSemester[] {
    const result: YearSemester[] = [];
    for (let year = startYear; year <= endYear; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        if (year === endYear && semester > endSemester) break;
        result.push({ year: year.toString(), semester: semester.toString() });
      }
    }
    return result;
  }
  
  
  
  

export function DisplayItemDepartamento(props:Patrimonio) {

      const { urlGeralAdm } = useContext(UserContext);
      const { onOpen, isOpen, type:typeModal } = useModal();

    

      useEffect(() => {
  
        fetchDataAll()
        setTab('all')

        }, [urlGeralAdm, props.dep_id]);

        useEffect(() => {
          if (typeModal === 'confirm-delete-researcher-graduate-program'  && !isOpen) {
            fetchDataAll()
          } 
      
          fetchDataAll()
        }, [isOpen, typeModal]);

    


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

     
    }, [urlGetResearcherSearch, props.dep_id]);

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
     
  
      try {
        const data = [
          {
            dep_id: props.dep_id,
            researcher_id:pesquisadoreSelecionado?.researcher_id
            }
        ]
  

  
        let urlProgram = urlGeralAdm + 'ResearcherRest/departament'
  
  
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


    //
    const [yearDocentes, setYearDocentes] = useState<YearSemester[]>([]);

    let urlYearDocentes = urlGeralAdm + `tecnicos`

    console.log(urlYearDocentes)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(urlYearDocentes , {
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
              setYearDocentes(data)
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData()

    }, [urlYearDocentes]);

    const currentYear = new Date().getFullYear();
    const currentSemester = new Date().getMonth() < 6 ? 1 : 2;
  
    const yearSemesterArray = generateYearSemesterArray(2010, 1, currentYear, currentSemester);
  
    const items = yearSemesterArray.map(item => ({
      ...item,
      selected: yearDocentes.some(docente => docente.year === item.year && docente.semester === item.semester)
    }));


  

    return(
      <Tabs defaultValue={tab} value={tab} className="h-full" >
        <div className="flex flex-col">
      <div className="flex items-center p-2 px-4 justify-between">
        <div className="flex items-center gap-2">

     

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"  onClick={() => onOpen('edit-departamento', {
          dep_id:props.dep_id,
          org_cod:props.org_cod,
          dep_nom:props.dep_nom,
          dep_des:props.dep_des,
          dep_email:props.dep_email,
          dep_site:props.dep_site,
          dep_tel:props.dep_tel,
          img_data:props.img_data,
          dep_sigla:props.dep_sigla
            
            })} >
              <PencilLine size={16}/>
               
              </Button>
            </TooltipTrigger>
            <TooltipContent>Editar</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to={'/'}>
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
                <TabsTrigger value="dis" onClick={() => setTab('dis')} className="text-zinc-600 dark:text-zinc-200">Disciplinas</TabsTrigger>
                </TabsList>

                <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => onOpen('confirm-delete-departamento', {id_delete:props.dep_id , name:props.dep_nom})}  variant='destructive' size="icon"   >
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

      
        </div>
        </div>

        <TabsContent value="all" className="mt-0">
        
              {props.dep_nom}
            
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
        <div className=" overflow-y-auto h-[calc(100vh-115px)] elementBarra ">
        <CardContent className="flex flex-col justify-between pt-6 ">
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
                    registrados no departamento
                    </p>
                  </CardContent>
                  </Alert>

                  <Alert className="p-6">
              <div>
                <div className="text-2xl font-bold uppercase">Docentes vinculados ao departamento</div>
                <p className="mt-2 text-sm">
                Adicione ou remova os pesquisadores do departamento
                </p>
              </div>

              <div className="gap-6 flex mt-6 items-end">

            

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
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
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
                            <div className="text-center w-full text-sm">Nenhuma sala encontrada</div>
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

        <TabsContent value="dis" className="mt-0">
        
        <div className="grid grid-cols-1">
                 <LinhaTempoDisciplinas items={items} depId={props.dep_id} />
                 </div>

                 <PainelDisciplinas/>
     
        </TabsContent>
        </Tabs>
    )
}
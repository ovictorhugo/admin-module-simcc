import { useContext, useEffect, useState } from "react";
import { useModal } from "../hooks/use-modal-store"
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";
import { ArrowSquareOut, ClockClockwise, DotsThree, Eye, EyeSlash, GraduationCap, Hash, MapPin, PencilSimple, Plus, Rows, SquaresFour, Star, Student, Trash } from "phosphor-react"; 
import {Divide, GraduationCapIcon, UserCheck } from "lucide-react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { toast } from "sonner"



import { DataTable } from "./data-table-grupo-pesquisa";

  interface PosGraduationsProps {
    acronym: null,
    area: string
    institution_id: string
    institution_name: string
    last_date_sent: string
    lattes_id: string
    leader_name: string
    research_group_id: string
    research_group_name: string
    researcher_id: string
    situation: string
  }

  import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { TablePosGraduateViewDashboard } from "./table-pos-graduate-dashboard";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { Skeleton } from "../ui/skeleton";
import { columns } from "./columns-grupos-pesquisa";
  


export function GrupoPesquisaView() {


    const { urlGeralAdm, user } = useContext(UserContext);
    const [posgraduations, setPosgraduations] = useState<PosGraduationsProps[]>([]);
    const [visibleProgram, setVisibleProgram] = useState(false);
    const { onOpen } = useModal();
    const [typeVisu, setTypeVisu] = useState('block')
    const [isLoading, setIsLoading] = useState(true)
    const [count, setCount] = useState(12)

    const urlGetPosGraduations = urlGeralAdm + `researchGroupRest/Query?institution_id=${user.institution_id}`
  
  console.log(urlGetPosGraduations)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(urlGetPosGraduations, {
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
                setPosgraduations(data);
                setIsLoading(false)
            }
          } catch (err) {
            console.log(err);
          }
        };
  

        fetchData()
  
     
      }, [urlGetPosGraduations,visibleProgram]);

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

    return(
      <>
      <Alert className="mb-4 flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-red-500 rounded-sm"></div>Não-atualizado</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-orange-500 rounded-sm"></div>Em preenchimento</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-yellow-500 rounded-sm"></div>Aguardando certificação</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-green-500 rounded-sm"></div>Certificado</div>
        </div>

        <div className="flex items-end flex-col">
          <p className="text-3xl font-bold">{posgraduations.length}</p> <p>Grupos de pesquisa</p>
        </div>
      </Alert>
                          <HeaderResultTypeHome title="Grupos de pesquisa" icon={<GraduationCap size={24} className="text-gray-400" />}>
                        <Button onClick={() => setTypeVisu('rows')}  variant="outline" className={`bg-transparent border-0 ${typeVisu == 'rows' && ('bg-white dark:bg-neutral-800')}`} size={'icon'}>
                            <Rows size={16} className=" whitespace-nowrap" />
                        </Button>

                        <Button  onClick={() => setTypeVisu('block')} variant="outline" className={`bg-transparent border-0 ${typeVisu == 'block' && ('bg-white dark:bg-neutral-800')} `} size={'icon'}>
                            <SquaresFour size={16} className=" whitespace-nowrap" />
                        </Button>
                        </HeaderResultTypeHome>
                        {typeVisu=="block"?(  
                          isLoading ? (
                            <ResponsiveMasonry className="mt-4"
                            columnsCountBreakPoints={{
                                350: 1,
                                750: 2,
                                900: 2,
                                1200: 3
                            }}
                        >
                                         <Masonry gutter="16px">
                                          <Skeleton className="w-full h-[130px] rounded-md"/>
                                          <Skeleton className="w-full h-[150px] rounded-md"/>
                                          <Skeleton className="w-full h-[130px] rounded-md"/>
                                          <Skeleton className="w-full h-[160px] rounded-md"/>
                                          <Skeleton className="w-full h-[130px] rounded-md"/>
                                          <Skeleton className="w-full h-[130px] rounded-md"/>
                                          </Masonry>
                                          </ResponsiveMasonry>
                          ):(
                           <div>
                             <ResponsiveMasonry className="mt-4"
      columnsCountBreakPoints={{
          350: 1,
          750: 2,
          900: 2,
          1200: 3
      }}
  >
                   <Masonry gutter="16px">


                    
       {posgraduations.slice(0, count).map((posgraduation) => (
        
          <div className="flex items-center"
        >
               
               <div
            className={`h-full w-2 min-w-2 rounded-l-md dark:border-neutral-800 border whitespace-nowrap border-neutral-200 border-r-0 ${
              posgraduation.situation && posgraduation.situation.includes('Não-atualizado') 
                ? 'bg-red-500' 
                : posgraduation.situation && posgraduation.situation.includes('Em preenchimento') 
                ? 'bg-orange-500' 
                : posgraduation.situation && posgraduation.situation.includes('Certificado') 
                ? 'bg-green-500' 
                : posgraduation.situation && posgraduation.situation.includes('Aguardando certificação') 
                ? 'bg-yellow-500'
                : 'bg-[#000]'
            }`}
          >

                  
                </div>
            <Alert className="flex flex-1 gap-4 rounded-l-none">
           
          <div className="flex flex-col flex-1 justify-between w-full">
            <div className="flex flex-col justify-between">
           
              <h2 className=" font-medium">{posgraduation.research_group_name}</h2>
             
            </div>
            <div className="flex items-center justify-between mt-4 gap-4">
                        <div className="flex items-center gap-4">
                        
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><ClockClockwise size={12}/>{posgraduation.situation}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><GraduationCap size={12}/>{posgraduation.area}</div>
                       

                        </div>

                        <div className="flex gap-3">
                        
                      
                        </div>
                        
                    </div>
          
          </div>
            </Alert>
          </div>
        

      ))}

     
      </Masonry>
      </ResponsiveMasonry>

{posgraduations.length >= count && (
  <div className="w-full flex justify-center my-8"><Button onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
)}
                           </div>
                          )

                        ):(<div className="mt-2"><DataTable columns={columns} data={posgraduations}/></div>)}
       
    
       </>
   
        
    )
}
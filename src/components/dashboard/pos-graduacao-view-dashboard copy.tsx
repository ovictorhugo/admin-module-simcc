import { useContext, useEffect, useState } from "react";
import { useModal } from "../hooks/use-modal-store"
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";
import { ArrowSquareOut, DotsThree, Eye, EyeSlash, GraduationCap, Hash, MapPin, PencilSimple, Rows, SquaresFour, Star, Student, Trash } from "phosphor-react"; 
import {Divide, GraduationCapIcon, UserCheck } from "lucide-react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { toast } from "sonner"





  interface PosGraduationsProps {
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
import { useModalDashboard } from "../hooks/use-modal-dashboard";
  


export function PosGraducaoView() {
  let qualisColor = {
    'MESTRADO': 'bg-[#006837]',
    'DOUTORADO': 'bg-[#8FC53E]',

}

const { isOpen, type} = useModalDashboard();
  
const isModalOpen = isOpen && type === "graduate-program";

    const { urlGeralAdm, user } = useContext(UserContext);
    const [posgraduations, setPosgraduations] = useState<PosGraduationsProps[]>([]);
    const [visibleProgram, setVisibleProgram] = useState(false);
    const { onOpen } = useModal();
    const [typeVisu, setTypeVisu] = useState('block')
    const [isLoading, setIsLoading] = useState(true)
    const urlGetPosGraduations = urlGeralAdm + `GraduateProgramRest/Query?institution_id=${user.institution_id}`
  
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
  

        const intervalId = setInterval(fetchData, 1000); // Fetch every 5 seconds
  
      return () => clearInterval(intervalId); // Cleanup on component unmount
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
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-blue-900 rounded-sm"></div>Doutorado</div>
          <div className="flex items-center gap-3 text-sm text-gray-500"><div className=" w-4 h-4 bg-blue-300 rounded-sm"></div>Mestrado</div>

        </div>

        <div className="flex items-end flex-col">
          <p className="text-3xl font-bold">{posgraduations.length}</p> <p>Pós-graduações</p>
        </div>
      </Alert>
                          <HeaderResultTypeHome title="Programas de pós graduação" icon={<GraduationCap size={24} className="text-gray-400" />}>
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
                            <ResponsiveMasonry className="mt-4"
      columnsCountBreakPoints={{
          350: 1,
          750: 2,
          900: 2,
          1200: 3
      }}
  >
                   <Masonry gutter="16px">


                    
       {posgraduations.map((posgraduation) => (
        
          <div className="flex items-center"
        >
                 <div
                  
                      className={`h-full w-2 min-w-2 rounded-l-md dark:border-neutral-800 border whitespace-nowrap border-neutral-200 border-r-0 ${posgraduation.modality.includes('ACADÊMICO') ? 'bg-blue-300' : posgraduation.modality.includes('PROFISSIONAL') ? 'bg-blue-900' : 'bg-[#000]'} `}
                    >
                      
                    </div>

            <Alert className="flex flex-1 gap-4 rounded-l-none">
           
          <div className="flex flex-col flex-1 justify-between w-full">
            <div className="flex flex-col justify-between">
           <div className="flex gap-3 mb-3">
          
            <div className="flex flex-col whitespace-nowrap">
            <img className="w-6 hidden lg:flex h-auto object-cover object-center rounded-l-lg whitespace-nowrap" src={posgraduation.url_image} />
           
          </div>

          {posgraduation.code != '' ? (
             <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Hash size={12}/>{posgraduation.code}</div>
           ):(
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Hash size={12}/>Sem código</div>
           )}
           </div>
              <h2 className=" font-medium">{posgraduation.name}</h2>
             
            </div>
            <div className="flex items-center justify-between mt-4 gap-4">
                        <div className="flex items-center gap-4">
                        
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><GraduationCapIcon size={12}/>{posgraduation.type}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><MapPin size={12}/>{posgraduation.city}</div>
                        {posgraduation.rating != '' && (
                          <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12}/>{posgraduation.rating}</div>
                        )}

                        </div>

                        <div className="flex gap-3">
                        <Button variant="outline" size={'icon'} className="ml-auto text-sm text-gray-500 dark:text-gray-300" onClick={() =>handleVisibleProgram(posgraduation.graduate_program_id)}>
            {posgraduation.visible ? (<EyeSlash size={16}/>):(<Eye size={16}/>)}
            </Button>
                        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={'icon'} className="ml-auto text-sm text-gray-500 dark:text-gray-300">
            <DotsThree size={16}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto">
          <Link to={`/pos-graducao/${posgraduation.code}`}><DropdownMenuItem className="flex items-center gap-3"><ArrowSquareOut className="h-4 w-4" />Visualizar página</DropdownMenuItem></Link>
          <DropdownMenuItem className="flex items-center gap-3" onClick={() => onOpen('edit-graduate-program', {
            graduate_program_id:posgraduation.graduate_program_id,
            code:posgraduation.code,
            name:posgraduation.name,
            area:posgraduation.area,
            modality:posgraduation.modality,
            type:posgraduation.type,
            rating:posgraduation.rating,
            institution_id:posgraduation.institution_id,
            description:posgraduation.description,
            url_image:posgraduation.url_image,
            city:posgraduation.city,
            visible:String(posgraduation.visible),
           
            
            })}  ><PencilSimple className="h-4 w-4" />Editar informações</DropdownMenuItem>
               <DropdownMenuItem className="flex items-center gap-3"  onClick={() => onOpen('add-researcher-graduation', {graduate_program_id:posgraduation.graduate_program_id , name:posgraduation.name})}><UserCheck className="h-4 w-4" />
         Docentes do programa
         </DropdownMenuItem>

         <DropdownMenuItem className="flex items-center gap-3"  onClick={() => onOpen('list-student-program', {graduate_program_id:posgraduation.graduate_program_id , name:posgraduation.name})}><Student className="h-4 w-4" />
         Discentes do programa
         </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem  onClick={() => onOpen('confirm-delete-pos-graduate-program', {id_delete:posgraduation.graduate_program_id , name:posgraduation.name})} className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white"><Trash className="h-4 w-4" />
         Deletar programa
         </DropdownMenuItem>
       

          </DropdownMenuContent>
        </DropdownMenu>
                        </div>
                        
                    </div>
          
          </div>
            </Alert>
          </div>
        

      ))}

     
      </Masonry>
      </ResponsiveMasonry>
                          )
                        
                        
                        
                        
                        ):(<div className="mt-2"><TablePosGraduateViewDashboard PosGraduationsProps={posgraduations} /></div>)}
       
    
       </>
   
        
    )
}
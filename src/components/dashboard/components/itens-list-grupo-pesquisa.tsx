import { ComponentProps, useContext, useEffect, useState } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { ScrollArea } from "../../ui/scroll-area"
import { Badge } from "../../ui/badge"
import { cn } from "../../../lib"
import { UserContext } from "../../../context/context"
import { Check, MapPin, User, X } from "phosphor-react"
import { Barcode, GraduationCapIcon, MapPinIcon, Plus, Star, StretchHorizontal, Users } from "lucide-react"


interface Patrimonio {
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

  interface Props {
    onResearcherUpdate: (newResearcher: Patrimonio) => void;
    url:string
    search:string
  }

  import { format, differenceInDays } from 'date-fns';
import { Button } from "../../ui/button"
import { Skeleton } from "../../ui/skeleton"

export function ItensListGrupoPesquisa(props:Props) {
    const [total, setTotal] = useState<Patrimonio[]>([]);

    // Atualize essa função para chamar a propriedade `onResearcherUpdate`
    const updateResearcher = (newResearcher: Patrimonio) => {
        if (props.onResearcherUpdate) {
          props.onResearcherUpdate(newResearcher);
        }
      };
      const [isLoading, setIsLoading] = useState(false)

    const {urlGeral} = useContext(UserContext)

    const urlPatrimonioInsert = props.url;

    useEffect(() => {
        setIsLoading(true)
      const fetchData = async () => {
       
        try {
            
          const response = await fetch(urlPatrimonioInsert , {
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
              setTotal(data)
              setIsLoading(false)
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData()
  
     
    }, [urlPatrimonioInsert]);
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

      console.log(total)
      const [count, setCount] = useState(12)

      const search = props.search

      const filteredTotal = Array.isArray(total) ? total.filter(item => {
        const searchString = `${item.research_group_name}`;
        return searchString.toLowerCase().includes(search.toLowerCase());
      }) : [];
      
      

  return (
    <ScrollArea className="h-[calc(100vh-180px)]">
      {isLoading ? (
        <div className="flex flex-col gap-2 p-4 pt-0">
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>

        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        </div>
      ):(
        <div className="flex flex-col gap-2 p-4 pt-0">
        {filteredTotal.slice(0, count).map((item) => {
          
          return(
<div className="flex" onClick={() => updateResearcher(item)}>
            <div className={`w-2 min-w-2 rounded-l-md dark:border-neutral-800 border min-h-[120px]  border-neutral-200 border-r-0  relative ${
              item.situation && item.situation.includes('Não-atualizado') 
                ? 'bg-red-500' 
                : item.situation && item.situation.includes('Em preenchimento') 
                ? 'bg-orange-500' 
                : item.situation && item.situation.includes('Certificado') 
                ? 'bg-green-500' 
                : item.situation && item.situation.includes('Aguardando certificação') 
                ? 'bg-yellow-500'
                : 'bg-[#000]'
            }`}></div>
  
            <button
       
            className={cn(
              "flex flex-col rounded-lg w-full rounded-l-none bg-white dark:bg-neutral-800 dark:border-neutral-700 items-start gap-2  border p-3 text-left text-sm transition-all hover:bg-accent",
            
            )}
           
          >
            <div className="flex w-full flex-col gap-1">
           <div className="flex justify-between items-center">
           <div className="text-xs font-medium mb-2 flex items-center gap-2">{item.research_group_id != '' ? (item.research_group_id):('Sem código')}
          </div>
           <GraduationCapIcon size={16}/>
           </div>
              <div className="flex items-center">
                
                <div className="flex items-center gap-2">
                    
                  <div className="font-semibold text-lg">{item.research_group_name}</div>
                  
                 
                </div>
                <div
                  
                >
                  
                </div>
              </div>
              
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground flex gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Users size={12}/>{item.situation}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><MapPinIcon size={12}/>{item.research_group_name}</div>
          
            </div>
           
          </button>
          </div>
          )
            })}

    {filteredTotal.length >= count && (
            <Button variant={'outline'} onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button>
        )}
      </div>
      )}
    </ScrollArea>
  )
}


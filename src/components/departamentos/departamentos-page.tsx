import { Link,  useLocation, useNavigate } from "react-router-dom";
import { VisualizacaoDepartamento } from "./visualizacao-departamento";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { MagnifyingGlass } from "phosphor-react";
import { Input } from "../ui/input";
import { ArrowRight, Building, Hash, Info, Mail, Phone } from "lucide-react";
import { cn } from "../../lib"
import { Button } from "../ui/button";
import bg_graduate from '../../assets/bg_graduate.png'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
interface Departamentos {
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

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }


export function DepartamentPage() {

 
    const [total, setTotal] = useState<Departamentos[]>([]);
    const [totalSelecionado, setTotalSelecionado] = useState<Departamentos | null>(null);

    const queryUrl = useQuery();
    const type_search = queryUrl.get('dep_id');
    const [, setIsLoading] = useState(false)


    let departamentoSelecionado = type_search || ''

 

    const {urlGeralAdm} = useContext(UserContext)

    const [search, setSearch] = useState('')

    const urlPatrimonioInsert = `${urlGeralAdm}departamentos`


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

    const filteredTotal = Array.isArray(total) ? total.filter(item => {
        // Normaliza a string do item e da busca para comparação
        const normalizeString = (str:any) => str
          .normalize("NFD") // Decompõe os caracteres acentuados
          .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
          .toLowerCase(); // Converte para minúsculas
      
        const searchString = normalizeString(item.dep_nom);
        const normalizedSearch = normalizeString(search);
      
        return searchString.includes(normalizedSearch);
      }) : [];

      const navigate = useNavigate();

      const handlePesquisaFinal = (dep_id:string) => {
        queryUrl.set('dep_id', dep_id);
          navigate({
            pathname: '/departamentos',
            search: queryUrl.toString(),
          });
      }
    

    return(
        <>
        {departamentoSelecionado.length == 0 ? (
             <div className="w-full">

             
<main className="  gap-4 md:gap-8 flex flex-col  p-4 md:p-8 pt-0 md:pt-0 w-full">

              <div className="bg-cover bg-bottom bg-no-repeat" style={{ backgroundImage: `url(${bg_graduate})` }}>
              <div className="justify-center m w-full  flex max-w-[980px] flex-col items-center lg:items-start  gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20" >
<Link to={'/informacoes'}  className="inline-flex z-[2] w-fit items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2  px-3 py-1 text-sm font-medium"><Info size={12}/><div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>Saiba como utilizar a plataforma<ArrowRight size={12}/></Link>

{totalSelecionado ? (
<h1 className="z-[2] lg:text-left text-center max-w-[600px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
 {totalSelecionado.dep_nom}
</h1>
):(
<h1 className="z-[2] lg:text-left text-center max-w-[600px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
Explore um  {" "}
<strong className="bg-[#82AAC0]  rounded-md px-3 pb-2 text-white font-medium">
  {" "}
  departamento
</strong>{" "}
da Escola de Engenharia
</h1>
)}




{totalSelecionado ? (
<div className="flex items-center gap-2">
 <Button onClick={() => handlePesquisaFinal(totalSelecionado.dep_id)}><ArrowRight size={16}/> Ver informações do departamento</Button>
</div>
):(
<Alert  className="h-14 mt-8 p-2 flex items-center justify-between lg:max-w-[600px] lg:w-[60vw] w-full">
<div className="flex items-center gap-2 w-full flex-1">
<MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
<Input  onChange={(e) => setSearch(e.target.value)} value={search}  type="text" className="border-0 w-full "/>
  </div>

  <div className="w-fit">


</div>
  </Alert>
)}




</div>
</div>


<ResponsiveMasonry
   columnsCountBreakPoints={{
       350: 1,
       750: 2,
       900: 2,
       1200: 3,
       1700: 4
   }}
>
                <Masonry gutter="16px" className="w-full">
     {filteredTotal.map((item) => (
     <div className="flex" onClick={() => handlePesquisaFinal(item.dep_id)} >
     <div className={`w-2 min-w-2 rounded-l-md dark:border-neutral-800 bg-center  bg-[#719CB8]  bg-no-repeat backdrop-blur-xl  border min-h-[120px]  border-neutral-200 border-r-0 bg-  relative `} ></div>
       
                 <button
            
                 className={cn(
                   `flex flex-col rounded-lg w-full rounded-l-none  dark:border-neutral-700 items-start gap-2  border p-3 text-left text-sm transition-all hover:bg-accent`,
                 
                 )}
                
               >
     
     <div className="flex justify-between items-center w-full">
                <div className="text-xs font-medium mb-2 flex items-center gap-2">{item.dep_id}
               </div>
                <Building size={16}/>
                </div>
                
             <div className="flex justify-between w-full items-center">
             <div className="flex w-full flex-col">
                <div className="flex w-full flex-col gap-1">
               
                   <div className="flex items-center">
     
                 
                     
                     <div className="flex items-center gap-2">
                         
                       <div className="font-semibold text-lg">{item.dep_sigla} - {item.dep_nom}</div>
                       
                      
                     </div>
                     <div
                       
                     >
                       
                     </div>
     
                   </div>
                   
                 </div>
                 <div className="line-clamp-2 text-xs text-muted-foreground flex gap-4">
                 <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Hash size={12}/>{item.org_cod}</div>
                 <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Mail size={12}/>{item.dep_email}</div>
                 <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Phone size={12}/>{item.dep_tel}</div>
                 </div>
     
                 
     
                </div>
                <img className="h-12 mix-blend-multiply" src={`data:image/jpeg;base64,${item.img_data}`} />
                 
             </div>
                
               </button>
     
               
               </div>
     ))}
        </Masonry>
      </ResponsiveMasonry>

</main>
             </div>
        ):(
            <VisualizacaoDepartamento/>
        )}
        </>
    )
}
import { Link,  useLocation, useNavigate } from "react-router-dom";
import { VisualizacaoDepartamento } from "./visualizacao-departamento";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { MagnifyingGlass } from "phosphor-react";
import { Input } from "../ui/input";
import { ArrowRight, Info } from "lucide-react";
import bg_popup from '../../assets/bg_home.png'
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

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

             <div className="h-0">
             <div className=" bg-cover bg-no-repeat bg-center h-[calc(100vh-82px)] w-full" style={{ backgroundImage: `url(${bg_popup})` }}></div>
             </div>
              <main className="flex flex-1 flex-col gap-4 md:gap-8 ">

<div className="justify-center m w-full px-4 md:px-8 h-[50vh]  flex max-w-[980px] flex-col items-center lg:items-start  gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20" >
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



<div className="p-4 pt-0 md:p-8 md:pt-0">
 <div className="grid grid-cols-1">
   <ScrollArea>
     {filteredTotal.map((item) => (
       <Alert onClick={() => setTotalSelecionado(item)} className={`w-[300px] cursor-pointer p-8 flex items-center justify-center ${totalSelecionado?.dep_id == item.dep_id && ('border-[#82AAC0] border-2')}`}>
           <img className="h-20" src={`data:image/jpeg;base64,${item.img_data}`} alt={item.dep_nom} />
       </Alert>
     ))}
   </ScrollArea>
 </div>
</div>
</main>
             </div>
        ):(
            <VisualizacaoDepartamento/>
        )}
        </>
    )
}
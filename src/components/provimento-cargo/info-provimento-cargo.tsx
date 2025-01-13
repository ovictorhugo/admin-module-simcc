import { GraduationCap, MapPin, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CalendarBlank, PuzzlePiece } from "phosphor-react"
import { useContext, useMemo, useState } from "react"
import { UserContext } from "../../context/context"
import { Research } from "../researcher/researcher-page"
import { toast } from "sonner"
import { Alert } from "../ui/alert"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
interface Props {
    name:string
    dados:any[]
}
export function InfoPavimentoCargo(props:Props) {
    const { urlGeral, user, itemsSelecionados, setSearchType, setValoresSelecionadosExport,  setItensSelecionadosPopUp, searchType, valoresSelecionadosExport, setPesquisadoresSelecionados, pesquisadoresSelecionados, setItensSelecionados, permission } = useContext(UserContext);

    const [loading, isLoading] = useState(false)
    const [researcher, setResearcher] = useState<Research[]>([]); 
   
    let urlTermPesquisadores = urlGeral + `researcherName?name=${props.name}`;

    useMemo(() => {
        const fetchData = async () => {
            try {
              isLoading(true)
              const response = await fetch(urlTermPesquisadores, {
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
                setResearcher(data);
                isLoading(false)
              } 
              if (data.length == 0 ) {
            
                toast("Pesquisador(a) ainda não cerregado na base", {
                  description: "Tente novamente mais tarde",
                  action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo"),
                  },
                });
              } 

            } catch (err) {
              console.log(err);
            }
          };
          fetchData();
        }, [urlTermPesquisadores]);

        const intersticio_tabela = {
            "4": {1: 730, 2: 365},  
            "5": {1: 730, 2: 730},  
            "6": {1: 730, 2: 730, 3: 730, 4: 730},  
            "7": {1: 730, 2: 730, 3: 730, 4: 730},  
            "8": {1: 730}, 
            }

return(
    <main className="flex gap-8 flex-col">
    
        {researcher.slice(0, 1).map((props) => {
        return(
            <div className="my-8 flex items-center gap-8">
 
            <Avatar className="cursor-pointer rounded-md  h-28 w-28">
                 <AvatarImage  className={'rounded-md h-28 w-28'} src={`${urlGeral}ResearcherData/Image?name=${props.name}`} />
                 <AvatarFallback className="flex items-center justify-center"><User size={16}/></AvatarFallback>
             </Avatar>
                         <div>
                         <h1 className=" max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
                         Provimento de cargo de {props.name}</h1>
                          <div className="flex flex-wrap flex-1 items-center gap-3 mt-2">
                                           {props.area != '' && (
                             props.area.split(';').map((value, index) => (
                               <li
                                 key={index} 
                             className={`py-2 whitespace-nowrap px-4 rounded-md text-xs font-bold flex gap-2 text-white items-center ${value.split("_").join(" ").includes('CIENCIAS AGRARIAS') ? 'bg-red-400' : value.includes('CIENCIAS EXATAS E DA TERRA') ? 'bg-green-400' : value.includes('CIENCIAS DA SAUDE') ? 'bg-[#20BDBE]' : value.includes('CIENCIAS HUMANAS') ? 'bg-[#F5831F]' : value.includes('CIENCIAS BIOLOGICAS') ? 'bg-[#EB008B]' : value.includes('ENGENHARIAS') ? 'bg-[#FCB712]' : value.includes('CIENCIAS SOCIAIS APLICADAS') ? 'bg-[#009245]' : value.includes('LINGUISTICA LETRAS E ARTES') ? 'bg-[#A67C52]' : value.includes('OUTROS') ? 'bg-[#1B1464]' : 'bg-[#000]'}`}
                                      >
                                 <PuzzlePiece size={12} className="text-white" /> {value.trim().split('_').join(' ')}
                               </li>
                             ))
                           )}
           {props.graduation != '' && (
                             <div className={`bg-blue-700 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center`}><GraduationCap size={12} className="textwhite" /> {props.graduation}</div>
                           )}
           
           
                                           {props.city != "None" && (
                               <div className="bg-blue-700 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center"><MapPin size={12} className="textwhite" /> {props.city}</div>
                             )}
           
           
                                           </div>
                         </div>
                  
                                    </div>
        )})}

        <Alert>


        </Alert>

        <h2 className="text-2xl font-medium ">Índices</h2>

        <h2 className="text-2xl font-medium ">Progressores e acelerações</h2>

        <ResponsiveMasonry
    columnsCountBreakPoints={{
        350: 1,
        750: 2,
        900: 3,
        1200: 4
    }}
>
                 <Masonry gutter="16px">
                {props.dados
  .sort((a, b) => {
    // Ordena em ordem crescente pela classe
    if (a.classe !== b.classe) {
      return a.classe - b.classe; // Crescente
    }
    // Ordena em ordem crescente pelo nível, dentro da mesma classe
    return a.nivel - b.nivel; // Crescente
  }).map((item) => {
       // Recupera o tempo de progressão esperado baseado na classe e nível
       const tempoEsperado = intersticio_tabela[item.classe]?.[item.nivel] ?? 0;

       // Converte as datas de início e fim para Date
       const inicioDate = new Date(item.inicio);
       const fimDate = new Date(item.fim);
   
       // Se tempo_acumulado > 0 e tempo_nivel não é null, ajusta as datas
       let inicioCorreto = inicioDate;
       let fimCorreto = new Date(inicioDate.getTime() + tempoEsperado * 24 * 60 * 60 * 1000); // Calcula o fim correto baseado no tempo esperado
   
       if (item.tempo_acumulado > 0 && item.tempo_nivel != null) {
         // Ajusta a data final com base na diferença entre o tempo real e o tempo esperado
         const diferenca = item.tempo_acumulado - tempoEsperado;
         fimCorreto = new Date(fimCorreto.getTime() + diferenca * 24 * 60 * 60 * 1000); // Ajusta o tempo de acordo com a diferença
       }
                    return(
                        <div className="flex w-full group">
                        <div className={`h-full w-2 ${item.tempo_nivel == null && ('bg-blue-600')} ${(item.tempo_acumulado > 0 && item.tempo_nivel != null ) && ('bg-orange-600')} ${(item.tempo_acumulado <= 0 && item.tempo_nivel != null ) && ('bg-green-600')}  rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 `}></div>
                           <Alert className={`rounded-l-none flex flex-col justify-between p-0 `}>
                           <div className="p-4 pb-0">
                               <h3 className="font-semibold mb-1 flex flex-1">
                                {(item.classe == 4 && item.nivel == 1) && ('Auxiliar (G/E) (M)')}

                                {(item.classe == 4 && item.nivel == 2) && ('Auxiliar Adjunto (D)')}
                                {item.classe == 5 && ('Assitente')}
                                {item.classe == 6 && ('Adjunto')}
                                {item.classe == 7 && ('Associado')}
                                {item.classe == 8 && ('Titular')}
                                </h3>
                                <div className="flex flex-wrap items-center  gap-4">
                                <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
 Classe: {item.classe}
</div>

<div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
 Nível: {item.nivel}
</div>
                                </div>
                               </div>

                               <div className="flex flex-wrap items-center mt-4 p-4 gap-3">
                               <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
  <CalendarBlank size={12} />
  Início: {new Date(item.inicio).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}
</div>

<div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
  <CalendarBlank size={12} />
  Fim: {new Date(item.fim).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}
</div>

<div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
  <CalendarBlank size={12} />
  Tempo no cargo: {item.tempo_nivel} dias
</div>


{(item.tempo_acumulado > 0 && item.tempo_nivel != null ) && (
    <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
    <CalendarBlank size={12} />
    Início correto: {inicioCorreto.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
  </div>
)}

{(item.tempo_acumulado > 0 && item.tempo_nivel != null ) && (
    <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center">
    <CalendarBlank size={12} />
    Fim correto: {fimCorreto.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
  </div>
)}

           
                               </div>
                           </Alert>
                        </div>
                    )
                })}
                    </Masonry>
                    </ResponsiveMasonry>
        
    </main>
)
}
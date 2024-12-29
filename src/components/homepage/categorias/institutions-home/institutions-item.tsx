import { useContext } from "react"
import { Alert } from "../../../ui/alert"
import { UserContext } from "../../../../context/context"
import { CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { User } from "lucide-react"

type Institutions = {
    among: string,
    id: string,
    image: string,
    institution: string,
}

export function InstitutionsItem(props: Institutions) {

    const {valoresSelecionadosExport, searchType, itemsSelecionados} = useContext(UserContext)

    return(
        <div className="flex w-full group">
        <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 bg-eng-blue `}></div>
        <Alert className="rounded-l-none flex flex-col p-0 justify-between">
        <CardHeader className="flex  justify-between space-y-0 pb-2">
    
      
        <div className="mb-3">
            <img src={props.image} alt="" className="h-full rounded-sm w-[100px] whitespace-nowrap" />
            </div>
          <CardTitle className="text-lg font-medium">
           {props.institution}
          </CardTitle>
      
       
        </CardHeader>
        <CardContent className="bg-neutral-200 pt-4">
        <CardTitle className="text-sm font-medium">
           Total de ocorrências
          </CardTitle>
          <div className="text-2xl font-bold">{props.among}</div>
          <div className="flex items-center gap-3">
               <p className="text-xs text-muted-foreground">
                  pela pesquisa
                </p>
       
                <div className="flex gap-2">
                {itemsSelecionados.map((valor, index) => {
                 return(
                     <>
                     <div key={index} className={`flex gap-2 items-center w-fit p-2 px-3 capitalize rounded-md text-xs ${searchType == 'article' && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract' && ('bg-yellow-500 dark:bg-yellow-500')} ${searchType == 'speaker' && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book' && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent' && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name' && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area' && ('bg-green-500 dark:bg-green-500')} ${searchType == '' && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} >
                     {valor.term.replace(/[|;]/g, '')}
                         
                         {/* Adicionando a escolha entre "e" ou "ou" */}
                         
                     </div>
       
                     {index < itemsSelecionados.length - 1 && (
         <div className="rounded-full flex items-center justify-center whitespace-nowrap h-8 w-8 bg-neutral-100  dark:bg-neutral-800 transition-all text-xs outline-none" onClick={() => {
          
          
         }} >
           {itemsSelecionados[index].term.endsWith(';') ? "e" : "ou"}
         </div>
       )}
       
                     </>
                 );
             })}
                </div>
               </div>
        </CardContent>
        </Alert>
        </div>
    )
}
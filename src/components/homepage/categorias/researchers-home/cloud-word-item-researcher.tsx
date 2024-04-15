import { useContext } from "react"
import { Alert } from "../../../ui/alert"
import { Badge } from "../../../ui/badge"
import { UserContext } from "../../../../context/context"

interface Props{
    id: string,
    frequency:string,
    name: string
    among: string
    fontSize: number
}

export function CloudWordItemResearcher(props:Props) {
    const { searchType} = useContext(UserContext)
    

    return(
        <li key={props.id} className="list-none list-item w-min">
        <div
         
          className="inline-flex whitespace-nowrap cursor-pointer"
        >
          <Alert
           className={`flex gap-4 font-bold  dark:text-white items-center
           ${
            ( searchType === 'article') && 'text-blue-500 ' ||
            (searchType === 'abstract') && 'text-yellow-500 ' ||
            (searchType === 'speaker') && 'text-orange-500' ||
            (searchType === 'book') && 'text-pink-500 ' ||
            (searchType === 'patent') && 'text-cyan-500 ' ||
            (searchType === 'name') && 'text-red-500' ||
            (searchType=== 'area') && 'text-green-500' ||
            ('')
        }
        `}
            style={{ fontSize: `${props.fontSize}%` }}
          >
            {props.name}
            <Badge className={`text-[10px] text-white dark:text-white ${
            ( searchType === 'article') && 'bg-blue-500 dark:bg-blue-500 text-white' ||
            (searchType === 'abstract') && 'bg-yellow-500 dark:bg-yellow-500 text-white' ||
            (searchType === 'speaker') && 'bg-orange-500 dark:bg-orange-500 text-white' ||
            (searchType === 'book') && 'bg-pink-500 dark:bg-pink-500 text-white' ||
            (searchType === 'patent') && 'bg-cyan-500 dark:bg-cyan-500 text-white' ||
            (searchType === 'name') && 'bg-red-500 dark:bg-red-500 text-white' ||
            (searchType=== 'area') && 'bg-green-500 dark:bg-green-500 text-white' ||
            ('hover:bg-blue-700 dark:bg-white')
        }`}>{props.among} ocorrências</Badge>
          </Alert>
        </div>
      </li>
    )
}
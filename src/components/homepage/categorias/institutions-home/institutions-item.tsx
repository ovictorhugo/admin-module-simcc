import { useContext } from "react"
import { Alert } from "../../../ui/alert"
import { UserContext } from "../../../../context/context"

type Institutions = {
    among: string,
    id: string,
    image: string,
    institution: string,
}

export function InstitutionsItem(props: Institutions) {

    const {valoresSelecionadosExport, searchType} = useContext(UserContext)

    return(
        <Alert className="flex gap-3 items-center min-h-[140px]">
            <div>
            <img src={props.image} alt="" className="h-full rounded-sm w-[100px] whitespace-nowrap" />
            </div>

            <div>
            <h3 className="font-semibold mb-2 ">{props.institution}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300 font-normal">O termo {valoresSelecionadosExport} aparece <strong className={` ${
            (searchType=== 'article') && 'text-blue-500 ' ||
            (searchType === 'abstract') && 'text-yellow-500 ' ||
            (searchType === 'speaker') && 'text-orange-500 ' ||
            (searchType === 'book') && 'text-pink-500 ' ||
            (searchType === 'patent') && 'text-cyan-500 ' ||
            (searchType === 'name') && 'text-red-500' ||
            (searchType === 'area') && 'text-green-500 ' ||
            (!searchType && 'hover:bg-gray-200 dark:hover:bg-black')
        }`}>{props.among == '1' ?(`${props.among} vez`):(`${props.among} vezes`)}</strong> na instituição</p>
            </div>
        </Alert>
    )
}
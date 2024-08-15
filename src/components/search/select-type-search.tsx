import { useContext } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select"
import { UserContext } from "../../context/context"

export function SelectTypeSearch() {

   



    const {searchType, setSearchType} = useContext(UserContext)

        return(
        <div className="max-sm:max-w-[98px]">
            <Select defaultValue={searchType} value={searchType} onValueChange={(value) => setSearchType(value)}>
            <SelectTrigger className="w-full whitespace-nowrap">
                <SelectValue placeholder="Escolha o tipo de pesquisa" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem  value="article"> <div className="flex gap-4 items-center mr-2"><div className="bg-blue-500 flex rounded-sm h-4 w-4"></div> Artigos</div></SelectItem>
                <SelectItem value="book"><div className="flex gap-4 items-center mr-2"><div className="bg-pink-500 flex rounded-sm h-4 w-4"></div>Livros e capítulos</div></SelectItem>
                <SelectItem value="patent"><div className="flex gap-4 items-center mr-2"><div className="bg-cyan-500 flex rounded-sm h-4 w-4"></div>Patentes</div></SelectItem>
                <SelectItem value="name"><div className="flex gap-4 items-center mr-2"><div className="bg-red-500 flex rounded-sm h-4 w-4"></div> Nome</div></SelectItem>
                <SelectItem value="area"><div className="flex gap-4 items-center mr-2"><div className="bg-green-500 flex rounded-sm h-4 w-4"></div> Áreas</div></SelectItem>
                <SelectItem value="abstract"><div className="flex gap-4 items-center mr-2"><div className="bg-yellow-500 flex rounded-sm h-4 w-4"></div> Resumo</div></SelectItem>
                <SelectItem value="speaker"><div className="flex gap-4 items-center mr-2"><div className="bg-orange-500 flex rounded-sm h-4 w-4"></div> Participação em eventos</div></SelectItem>
            </SelectContent>
            </Select>
        </div>
    )
}
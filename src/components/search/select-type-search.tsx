import { useContext } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select"
import { UserContext } from "../../context/context"
import { useModalResult } from "../hooks/use-modal-result"
import { useLocation, useNavigate } from "react-router-dom"

export function SelectTypeSearch() {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
      }

      const location = useLocation();
      const navigate = useNavigate();
const posGrad = location.pathname == '/pos-graduacao'

const resultados = location.pathname == '/resultados'

const {onOpen} = useModalResult()
const queryUrl = useQuery()
    const {searchType, setSearchType} = useContext(UserContext)

        return(
        <div className="max-sm:max-w-[98px]">
            <Select defaultValue={searchType} value={searchType} onValueChange={(value) => setSearchType(value)}>
            <SelectTrigger className="w-full whitespace-nowrap">
                <SelectValue placeholder="Escolha o tipo de pesquisa" />
            </SelectTrigger>
            <SelectContent className="z-[9999]">
                <SelectItem onClick={() => onOpen('researchers-home')}  value="article" className="cursor-pointer"> <div className="flex gap-4 items-center mr-2"><div className="bg-blue-500 flex rounded-sm h-4 w-4"></div> Artigos</div></SelectItem>
                <SelectItem onClick={() => {
                   
                   onOpen('researchers-home')

                }}  value="book" className="cursor-pointer"><div className="flex gap-4 items-center mr-2"><div className="bg-pink-500 flex rounded-sm h-4 w-4"></div>Livros e capítulos</div></SelectItem>
                <SelectItem onClick={() => onOpen('researchers-home')}  value="patent" className="cursor-pointer"><div className="flex gap-4 items-center mr-2"><div className="bg-cyan-500 flex rounded-sm h-4 w-4"></div>Patentes</div></SelectItem>
                <SelectItem onClick={() => onOpen('researchers-home')}  value="name" className="cursor-pointer"><div className="flex gap-4 items-center mr-2"><div className="bg-red-500 flex rounded-sm h-4 w-4"></div> Nome</div></SelectItem>
                <SelectItem onClick={() => onOpen('researchers-home')} value="area" className="cursor-pointer"><div className="flex gap-4 items-center mr-2"><div className="bg-green-500 flex rounded-sm h-4 w-4"></div> Áreas</div></SelectItem>
                <SelectItem onClick={() => onOpen('researchers-home')}  value="abstract" className="cursor-pointer"><div className="flex gap-4 items-center mr-2"><div className="bg-yellow-500 flex rounded-sm h-4 w-4"></div> Resumo</div></SelectItem>
                <SelectItem onClick={() => onOpen('researchers-home')} value="speaker" className="cursor-pointer"><div className="flex gap-4 items-center mr-2"><div className="bg-orange-500 flex rounded-sm h-4 w-4"></div> Participação em eventos</div></SelectItem>
            </SelectContent>
            </Select>
        </div>
    )
}
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../components/ui/select"

export function SelectInstitution() {
    return(
        <div>
            <Select >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha o tipo de pesquisa" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="article">Universidade Estadual de Santa Cruz</SelectItem>
                <SelectItem value="article">Universidade Estadual de Feira de Santana</SelectItem>
                <SelectItem value="article">Universidade Estadual do Sudoeste da Bahia</SelectItem>
                <SelectItem value="article">Universidade do Estado da Bahia</SelectItem>
                <SelectItem value="article">Universidade Federal do Sul da Bahia</SelectItem>
            </SelectContent>
            </Select>
        </div>
    )
}
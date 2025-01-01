import { TabelaQualisQuantidade } from "./graficos-tabelas/tabela-qualis-quantidade"

interface Props {
    graduate_program_id:string
}

export function AdminGraficoGraduateProgram(props:Props) {
    return(
        <div>
            <TabelaQualisQuantidade graduate_program_id={props.graduate_program_id}/>
        </div>
    )
}
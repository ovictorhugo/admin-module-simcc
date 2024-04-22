import { useContext, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select"
import { UserContext } from "../../context/context"

export function SelectTypeInstitutionSearch() {

   
    const [uni] = useState([
        { id: 2, itens: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Bras%C3%A3o_da_UNEB.png', name: `Universidade do Estado da Bahia`, value:'68125729-c357-4830-ba4d-ec3ca757c323' },
        { id: 3, itens: 'https://lh3.googleusercontent.com/proxy/x-DWPZNR1RB8hpv3JoHsDyTavChQ-1ufYICYyromKWP-TNdemnwPw9v_eCaL2Ai1rIR2duPPjfY8', name: `Universidade Estadual de Santa Cruz`, value:' 2a643ff4-5a18-4d87-8c3d-6c3f7091e001'  },
        { id: 5, itens: 'https://www.gov.br/participamaisbrasil/blob/ver/15486?w=0&h=0', name: `Universidade Federal do Sul da Bahia`, value:'498cadc8-b8f6-4008-902e-76281109187d' },
        { id: 8, itens: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Bras%C3%A3o_da_UEFS.png', name: `Universidade Estadual de Feira de Santana`, value: '7d367bc2-5c74-4648-a637-7f5c3f4fac81' },
        { id: 10, itens: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Bras%C3%A3o-uesb.jpg', name: `Universidade Estadual do Sudoeste da Bahia`, value: '08aa6e17-f9ae-4979-a399-5b32a506a15e' },
      ]);


    const {searchType, setSearchType} = useContext(UserContext)

        return(
        <div >
            <Select defaultValue={searchType} onValueChange={(value) => setSearchType(value)}>
            <SelectTrigger className="w-full whitespace-nowrap">
                <SelectValue placeholder="Selecione a instituição" />
            </SelectTrigger>
            <SelectContent>
                {uni.map((props) => {
                    return(
                        <SelectItem value={props.value}> <div className="flex gap-4 items-center mr-2"><div className="bg-cover bg-center bg-no-repeat flex rounded-sm h-4 w-4" style={{ backgroundImage: `url(${props.itens}) ` }}></div> {props.name}</div></SelectItem>
                    )
                })}
               
            </SelectContent>
            </Select>
        </div>
    )
}
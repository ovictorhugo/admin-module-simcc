import { Info, Plus } from "lucide-react"
import { Alert } from "../../ui/alert"
import { CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"

import bg_popup from '../../../assets/bg_popup.png';

interface Props {
    id:string
    name:string
    type:string
}
export function Keepo(props:Props) {
    return(
        <div>

            <div>
            <Alert className=" bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bg_popup})` }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Crie e edite
                  </CardTitle>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <div className="flex gap-6 justify-between">

                  <CardContent>
                    <div className="text-2xl font-bold">Você também pode baixar o Power Bi e criar seus próprios indicadores</div>
                    <div className="flex gap-3 mt-3">

                      <Button size={'sm'} ><Plus size={16} />Ver manual</Button>
                    </div>
                  </CardContent>

                  <div></div>
                </div>
              </Alert>
            </div>


            <div>

            </div>

        </div>
    )
}
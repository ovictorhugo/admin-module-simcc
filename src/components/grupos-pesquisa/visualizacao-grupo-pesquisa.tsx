import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export function VisualizacaoGrupo() {
    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    return(
        <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
<div className="w-full  gap-4 md:p-8 p-4 pb-0 md:pb-0">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Grupo de pesquisa
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
            
               
          
                <Button size="sm">Exporta informações do grupo</Button>
              </div>
            </div>

            </div>

        </main>
    )
}
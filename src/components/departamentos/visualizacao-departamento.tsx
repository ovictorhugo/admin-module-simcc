import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export function VisualizacaoDepartamento() {
    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    return(
        <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
    <Tabs defaultValue={'all'} className="h-full" >
    <div className="w-full  gap-4 md:p-8 p-4 pb-0 md:pb-0">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pós-graduação
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>
              <TabsTrigger value="doc" className="text-zinc-600 dark:text-zinc-200">Docentes</TabsTrigger>
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Indicadores</TabsTrigger>

              
                </TabsList>
               
          
                <Button size="sm">Button</Button>
              </div>
            </div>

            </div>


            <TabsContent value="all" className="h-auto flex flex-col gap-4 md:gap-8  ">
                Conheça o 
            </TabsContent>
    </Tabs>
        </main>
    )
}
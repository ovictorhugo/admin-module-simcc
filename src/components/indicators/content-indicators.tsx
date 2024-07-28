import {  Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronLeft, SquareArrowOutUpRight } from "lucide-react";

export function ContentIndicators() {
    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const url = 'https://app.powerbi.com/view?r=eyJrIjoiNTEwMjUxMzktMzZjYS00ZjM1LWJhYzYtZDY3Y2I2YzE1ZGRiIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9'

 
    return (
        <main className="flex flex-1 flex-col gap-4  p-4 md:p-8 ">
                 <div className="w-full  gap-4">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
             Indicadores gerais
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
            
               
          
                <Button size="sm">Enviar emails</Button>
              </div>
            </div>

            </div>

            <div className="lg:max-w-[900px]  mt-2">
            

            <h1 className="max-w-[550px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block mb-3">
               Confira as {" "}
                <strong className="bg-[#709CB6] rounded-md px-3 pb-2 text-white font-medium">
                estatísticas de produção
                </strong>{" "}
                da Escola de Engenharia
            </h1>
            <p className="max-w-[600px] text-lg font-light text-foreground">
            Para ajudar a sua pesquisa, fornecemos uma lista extensa de revistas e suas classificações.
            </p>
            
        </div>

            <div>
            <div className="flex w-full justify-between items-center mb-4 mt-8">
                <div></div>

                <div>
                   <Link target="_blank" to={url}> <Button size={'sm'}><SquareArrowOutUpRight size={12}/> Abrir em outra página</Button></Link>
                </div>
            </div>
            <div className="w-full h-screen flex  rounded-md">
                <iframe
                title="Report Section"
                className="w-full h-screen rounded-md mb-8 border dark:border-neutral-800 "
                src={url}
            ></iframe>
            </div>
                
            </div>

     </main>
    )
}
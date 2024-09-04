import {  Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronLeft, SquareArrowOutUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";

export function ContentIndicators() {
    const history = useNavigate();

    const {version} = useContext(UserContext)

    const handleVoltar = () => {
      history(-1);
    }

    let url = 'https://app.powerbi.com/view?r=eyJrIjoiNTBjNmQ3NWQtODNmZC00MWZkLThjNWEtZjU5YmE2ZDkwMjVkIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9'

    if (!version) {
      url = 'https://app.powerbi.com/view?r=eyJrIjoiOTMwMGE2ODAtYTNkYy00MDI1LWIyZjQtYTgwNjIwM2IzNzgyIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9'
    }

    const [value, setValue] = useState('article')
  const url2 = 'https://app.powerbi.com/view?r=eyJrIjoiNTEwMjUxMzktMzZjYS00ZjM1LWJhYzYtZDY3Y2I2YzE1ZGRiIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9'
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
             

                
            
              <div className="hidden items-center h-10 gap-2 md:ml-auto md:flex">
            
               
          
              
              </div>
            </div>

            </div>

            <div className="lg:max-w-[900px]  mt-2">
            

            <h1 className="max-w-[550px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block mb-3">
               Confira as {" "}
                <strong className="bg-[#709CB6] rounded-md px-3 pb-2 text-white font-medium">
                estatísticas de produção
                </strong>{" "}
                {version ? ('da Escola de Engenharia'):('do SENAI CIMATEC')}
            </h1>
            <p className="max-w-[600px] text-lg font-light text-foreground">
           Produção bibliográfica e técnica, grupos de pesquisa, bolsistas de proatividade e dados sociais da instituição.
            </p>
            
        </div>

        <Tabs defaultValue="article" value={value} className="pb-4 md:pb-8">
            <div className="flex w-full justify-between items-center mb-4 mt-8">
              
                <TabsList className="">
                <TabsTrigger
      value="article"
      onClick={() => setValue('article')}
      className="flex gap-2 items-center"
    >
Produção geral
</TabsTrigger>

{version && (
  <TabsTrigger
  value="2"
  onClick={() => setValue('2')}
  className=" gap-2 items-center"
>
Painel da instituição
</TabsTrigger>
)}
                </TabsList>
                

                <div>
                   <Link target="_blank" to={value == 'article' ? url : url2}> <Button size={'sm'}><SquareArrowOutUpRight size={12}/> Abrir em outra página</Button></Link>
                </div>
            </div>
            <TabsContent value="article">
            <div className="w-full h-screen flex  rounded-md">
                <iframe
                title="Report Section"
                className="w-full h-screen rounded-md mb-8 border dark:border-neutral-800 "
                src={url}
            ></iframe>
            </div>
            </TabsContent>

            <TabsContent value="2">
            <div className="w-full h-screen flex  rounded-md">
                <iframe
                title="Report Section"
                className="w-full h-screen rounded-md mb-8 border dark:border-neutral-800 "
                src={url2}
            ></iframe>
            </div>
            </TabsContent>
           
                
            </Tabs>

     </main>
    )
}
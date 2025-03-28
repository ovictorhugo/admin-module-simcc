import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronLeft, Component, SquareArrowOutUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { Helmet } from "react-helmet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function ContentIndicators() {
  const history = useNavigate();

  const { version } = useContext(UserContext)

  const handleVoltar = () => {
    history(-1);
  }

  const url = 'https://app.powerbi.com/view?r=eyJrIjoiYTk2YmEwNjctMGM5Zi00Mzg5LTlhNjItYzA1NWM1YWMxMjNjIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9'



  const [value, setValue] = useState('article')
  const url2 = 'https://app.powerbi.com/view?r=eyJrIjoiOTVmZjM2ZWUtMzliOS00Y2RkLTllYjItMmU3MDg4MjQxOTI5IiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9'

   const url3 = 'https://app.powerbi.com/view?r=eyJrIjoiNmU0MzhlYTAtZGVmZi00NTAxLThhN2UtOTU2NWJkMzNmZjA5IiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9'

   const getUrl = () => {
    if (value === "article") {
      return url;
    } else if (value === "2") {
      return url2;
    } else if (value === "3") {
      return url3;
    }
    return "#"; // Caso nenhuma condição seja atendida
  };
  
  return (
    <main className="flex flex-1 flex-col gap-4  p-4 md:p-8 ">
      <Helmet>
        <title>Indicadores | {version ? ('Conectee') : ('Simcc')}</title>
        <meta name="description" content={`Indicadores | ${version ? ('Conectee') : ('Simcc')}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="w-full  gap-4">
        <div className="flex items-center gap-4">

          <Button onClick={handleVoltar} variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>

          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Indicadores gerais
          </h1>




          <div className="hidden items-center h-10 gap-2 md:ml-auto md:flex">
          <DropdownMenu>
  <DropdownMenuTrigger className="p-0">
    <Button> <Component size={16} />Incites</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="min-w-[250px]">
    
   <Link target="_blank" to={`https://simcc.uesc.br/incite/industria4/`}> <DropdownMenuItem >Indústria 4.0</DropdownMenuItem></Link>
  
  </DropdownMenuContent>
</DropdownMenu>

          </div>
        </div>

      </div>

      <div className="lg:max-w-[900px]  mt-2">


        <h1 className="max-w-[550px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block mb-3">
          Confira as {" "}
          <strong className="bg-eng-blue rounded-md px-3 pb-2 text-white font-medium">
            estatísticas 
          </strong>{" "}
          de produção {version ? ('da Escola de Engenharia') : ('do Simcc')}
        </h1>
        <p className="max-w-[600px] text-lg font-light text-foreground">
          Produção bibliográfica e técnica, grupos de pesquisa, bolsistas de proatividade e dados das universidades públicas da Bahia.
        </p>

      </div>

      <Tabs defaultValue="article" value={value} className="pb-4 md:pb-8">
        <div className="flex w-full flex-wrap gap-3 justify-between content-end items-center mb-4 mt-8">
          <TabsList className=" ">
            <TabsTrigger
              value="article"
              onClick={() => setValue('article')}
              className="flex gap-2 items-center"
            >
             Indicadores de produção
            </TabsTrigger>

           
              <TabsTrigger
                value="2"
                onClick={() => setValue('2')}
                className=" gap-2 items-center"
              >
              Busca de informações
              </TabsTrigger>

                 <TabsTrigger
                value="3"
                onClick={() => setValue('3')}
                className=" gap-2 items-center"
              >
              Programas de pós-graduação
              </TabsTrigger>
       
          </TabsList>


          <div className="">
            <Link target="_blank" to={getUrl()}> <Button size={'sm'}><SquareArrowOutUpRight size={12} /> Abrir em outra página</Button></Link>
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

        <TabsContent value="3">
          <div className="w-full h-screen flex  rounded-md">
            <iframe
              title="Report Section"
              className="w-full h-screen rounded-md mb-8 border dark:border-neutral-800 "
              src={url3}
            ></iframe>
          </div>
        </TabsContent>
      </Tabs>

    </main>
  )
}
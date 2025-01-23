import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Button } from "../../ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Alert } from "../../ui/alert";
import { UserContext } from "../../../context/context";
import { Helmet } from "react-helmet";

export function SessaoPessoal() {
       const history = useNavigate();
    
        const handleVoltar = () => {
          history(-1);
        }

        
        const [tab, setTab] = useState('all')
        
        //images
const [images, setImages] = useState<string[]>([]);

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files) {
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  }
};

const {version} = useContext(UserContext)
    
    return(
        <main className="flex flex-1 flex-col gap-4  md:gap-8 ">
           <Helmet>
          <title>Seção de pessoal | Módulo administrativo | {version ? ('Conectee'):('Iapós')} </title>
          <meta name="description" content={`Seção de pessoal | Módulo administrativo | ${version ? ('Conectee'):('Iapós')}`} />
          <meta name="robots" content="index, follow" />
        </Helmet>
             <Tabs defaultValue={tab} value={tab} className="h-full" >
             <div className="w-full mb-8  gap-4">
            <div className="flex items-center gap-4 p-4 md:p-8 pb-0 md:pb-0">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Seção de pessoal
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" onClick={() => setTab('all')} className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>

             
                </TabsList>
               
          
             
              </div>
            </div>

            </div>

            <TabsContent value="all" className="px-8 flex flex-col gap-8 ">
            <Alert className="p-0">
                <CardHeader>
                    <CardTitle>Gerenciamento de documentos</CardTitle>
                    <CardDescription>
                      Adicione os documentos para atualizar o banco de dados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex mt-6 flex-col gap-4">
                    <Button className="w-fit">
                    <input
                  type="file"
                  accept=".pdf"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="upload"
                  multiple={true}
                />
                <label htmlFor="upload" className="cursor-pointer w-full h-full gap-2 flex items-center justify-center">
                <Plus size={16}/>
                  Adicionar documentos
                </label>
                    </Button>

                  </CardContent>
                </Alert>


                {images.length > 0 && (
                  <Alert>
                      {images.map((props) => (
                        <div>
                         
                        </div>
                      ))}
                  </Alert>
                )}


            </TabsContent>
             </Tabs>
        </main>
    )
}
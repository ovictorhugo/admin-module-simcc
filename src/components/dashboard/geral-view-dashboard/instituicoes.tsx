import { Building2, Copy, Plus } from "lucide-react";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { v4 as uuidv4 } from 'uuid';
import { CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { HeaderResultTypeHome } from "../../homepage/categorias/header-result-type-home";
import { Rows, SquaresFour } from "phosphor-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Skeleton } from "../../ui/skeleton";
import { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { toast } from "sonner";
import { DataTable } from "../data-table";
import { UserContext } from "../../../context/context";
import { columnsInstitution } from "./columns-institutions";

export interface Props {
    name: string
    institution_id: string
    acronym:string
    lattes_id:string
  }


export function Instituicoes() {
        const [loading, setLoading] = useState(false);
      const { user, urlGeralAdm, permission } = useContext(UserContext);
    
    const [nome, setNome] = useState('')
    const [sigla, setSigla] = useState('')
    const [lattesId, setLattesId] = useState('')

        const [count, setCount] = useState(24)
        
        const [typeVisu, setTypeVisu] = useState('block');
    
 const [researcher, setResearcher] = useState<Props[]>([]);
    
 const items = Array.from({ length: 12 }, (_, index) => (
        <Skeleton key={index} className="w-full rounded-md h-[200px]" />
      ));

       const handleSubmitPesquisador = async () => {
      
              const docId = uuidv4();
      
              try {
                const data = [
                  {
                    institution_id: docId,
                      name: nome,
                      lattes_id: lattesId,
                      acronym: sigla,
                    }
                ]
      
                console.log(data)
      
                let urlProgram = urlGeralAdm + '/InstitutionRest/Insert'
      
                const fetchData = async () => {
                
                  if(sigla.length != 0 && nome.length !=0) {
                      try {
                          const response = await fetch(urlProgram, {
                            mode: 'cors',
                            method: 'POST',
                            headers: {
                              'Access-Control-Allow-Origin': '*',
                              'Access-Control-Allow-Methods': 'POST',
                              'Access-Control-Allow-Headers': 'Content-Type',
                              'Access-Control-Max-Age': '3600',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                          });
            
                          if (response.ok) {
                            setLattesId('')
                           
                            setNome('')
                            fetchDataTable()
                            toast("Dados enviados com sucesso", {
                                description: "Instituição cadastrada na plataforma",
                                action: {
                                  label: "Fechar",
                                  onClick: () => console.log("Undo"),
                                },
                              })
                          } else {
                            if (response.status === 400) {
                              toast("Pesquisador já existe", {
                                description: "Tente novamente",
                                action: {
                                  label: "Fechar",
                                  onClick: () => console.log("Undo"),
                                },
                              });
                            } else {
                              toast("Erro ao enviar os dados ao servidor", {
                                description: "Tente novamente",
                                action: {
                                  label: "Fechar",
                                  onClick: () => console.log("Undo"),
                                },
                              });
                            }
                          }
                          
                        } catch (err) {
                          console.log(err);
                        } 
                  } else {
                      if (sigla.length == 0) {
                        toast("Preencha o acronônimo da instituição", {
                            description: "Parece que o campo está vazio",
                            action: {
                              label: "Fechar",
                              onClick: () => console.log("Undo"),
                            },
                          })
                       } else if (nome.length == 0) {
                      toast("Preencha o nome da instituição", {
                          description: "Parece que o campo está vazio",
                          action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                          },
                        })
                     }
                  }
                };
                fetchData();
          
                
              } catch (error) {
                console.error('Erro ao processar a requisição:', error);
              }
            };
      
      
      // upload

      const urlGetResearcher = urlGeralAdm + `InstitutionRest`;
      console.log(urlGetResearcher)

      const fetchDataTable = async () => {
        setLoading(true)
        try {
          const response = await fetch(urlGetResearcher, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Max-Age': '3600',
              'Content-Type': 'text/plain',
            },
          });
          const data = await response.json();
          if (data) {
            setResearcher(data);
            setLoading(false)
         
          }
        } catch (err) {
          console.log(err);
          setLoading(false)
        }
      };

      
    return(
        <div className="px-8 flex flex-col gap-8">
                <Alert className="p-0">
                <CardHeader>
                    <CardTitle>Gerenciamento de instituições</CardTitle>
                    <CardDescription>
                      Adicione os documentos para atualizar o banco de dados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex mt-6 flex-col gap-4">
                    <Button className="w-fit">
                    <Plus size={16}/> Adicionar instituição
                    </Button>

                  </CardContent>
                </Alert>

                <Accordion defaultValue="item-1" type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="flex mb-2">
                    <HeaderResultTypeHome title="Todas as instituições" icon={<Building2 size={24} className="text-gray-400" />}>
                      <div className="hidden md:flex gap-3 mr-3">
                        <Button onClick={() => setTypeVisu('rows')} variant={typeVisu === 'block' ? 'ghost' : 'outline'} size={'icon'}>
                          <Rows size={16} className="whitespace-nowrap" />
                        </Button>
                        <Button onClick={() => setTypeVisu('block')} variant={typeVisu === 'block' ? 'outline' : 'ghost'} size={'icon'}>
                          <SquaresFour size={16} className="whitespace-nowrap" />
                        </Button>
                      </div>
                    </HeaderResultTypeHome>
                    <AccordionTrigger>

                    </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    {typeVisu === 'block' ? (
                      loading ? (
                        <ResponsiveMasonry
                          columnsCountBreakPoints={{
                            350: 1,
                            750: 1,
                            900: 2,
                            1200:  3,
                            1500: 4,
                            1700: 4
                          }}
                        >
                          <Masonry gutter="16px">
                            {items.map((item, index) => (
                              <div key={index}>{item}</div>
                            ))}
                          </Masonry>
                        </ResponsiveMasonry>
                      ) : (
                       <div>
 <ResponsiveMasonry
    columnsCountBreakPoints={{
        350: 1,
        750: 1,
        900: 2,
        1200:  3,
        1500: 4,
        1700: 4
    }}
>

                     <Masonry gutter="16px">
             {researcher.slice(0, count).map((item: any) => {

                return (
                  <Alert>
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex gap-3">
                       

                      <div>
                        <h1>{item.name}</h1>
                        <p className="text-gray-500 text-xs">{item.lattes_id}</p>
                      </div>
                        </div>

                        <div className="flex gap-2 items-center" > 
      <div className={` rounded-md h-4 w-4 ${item.status ? ('bg-green-500'):('bg-red-500')}`}></div>
       <div className="flex-1 flex">{item.status ? ('Ativo'):('Inativo')}</div></div>
                      </div>

                      <Separator className="my-4"/>

                     <div className="items-center flex justify-between gap-3">
                      <div className="text-gray-500 text-xs">{item.create_at}</div>

                      <div className="flex gap-3 justify-end w-full ">
                     



                    
                      <Button   onClick={() => {
  navigator.clipboard.writeText(item.lattes_id)

  toast("Operação realizada", {
    description: "Id da instituição copiado para área de transferência",
    action: {
      label: "Fechar",
      onClick: () => console.log("Undo"),
    },
  })

}} variant={'outline'} className="h-8 w-8 p-0 ">
<Copy size={16} />
</Button>
                      </div>
                     </div>
                  </Alert>
                )
             })}
             </Masonry>
             </ResponsiveMasonry>

             {researcher.length > count && (
            <div className="w-full flex justify-center mt-8"><Button onClick={() => setCount(count + 24)}><Plus size={16} />Mostrar mais</Button></div>
        )}
                       </div>
                      )
                    ) : (
                      loading ? (
                        <Skeleton className="w-full rounded-md h-[400px]" />
                      ) : (
                        <DataTable columns={columnsInstitution} data={researcher} />
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
        </div>
    )
}
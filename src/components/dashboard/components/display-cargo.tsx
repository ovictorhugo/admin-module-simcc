import { ChevronLeft, ChevronRight, Copy, CreditCard, Hash, MoreVertical, PenLineIcon, Trash, Truck } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { toast } from "sonner"
import { Alert } from "../../ui/alert";
import { Progress } from "../../ui/progress";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import axios from 'axios';
import { useModal } from "../../hooks/use-modal-store";
import { useNavigate } from "react-router-dom";
import { ChartBar } from "phosphor-react";

interface Disciplinas {
    role:string
    id:string
  }

  interface ProfessorImageProps {
    name: string;
  }


export function DisplayCargo(props:Disciplinas) {

    const {urlGeralAdm} = useContext(UserContext)
   
    const handleSubmitPesquisador = async () => {
      try {

          const data = [
              {
                  role:props.role
                }
            ]

             let urlProgram = urlGeralAdm + 's/role'

             console.log(urlProgram)
             const fetchData = async () => {
       
              try {
                const response = await fetch(urlProgram, {
                  mode: 'cors',
                  method: 'DELETE',
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '3600',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data),
                });
    
                if (response.ok) {
                 
                  toast("Dados enviados com sucesso", {
                      description: "Cargo deletado da coleção",
                      action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                      },
                    })
                
                 
                } else {
                 
                  toast("Tente novamente!", {
                      description: "Erro ao cadastrar cargo na plataforma",
                      action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                      },
                    })
                }
                
              } catch (err) {
                console.log(err);
              } 
            };
            fetchData();
            

  } catch (error) {
      console.error('Erro ao processar a requisição:', error);
    }

  }
 
    return(
        <div className=" sticky top-8">
              <div
                  className={`h-3 w-full rounded-t-md dark:border-neutral-800 border border-neutral-200 border-b-0 bg-[#719CB8] `}
                ></div>
        <Alert
          className="p-0 rounded-t-none"  x-chunk="dashboard-05-chunk-4"
        >
          <CardHeader className="flex flex-row items-start bg-neutral-100 dark:bg-neutral-800">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center w-fit gap-2 text-lg">
                <div className="w-fit">{props.role}</div>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription className="flex gap-2 items-center"><Hash size={12}/>{props.id}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
             
            <Button size="icon" onClick={() => handleSubmitPesquisador()}  variant='destructive' className="h-8 w-8">
                    <Trash className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <PenLineIcon className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
            </div>
            
          </CardHeader>
          
          <CardContent className="p-6 text-sm">
      
           
            <div className="grid gap-3">
              <div className="font-semibold">Funcionalidades</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Carga horária
                  </span>
                  <span>h</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Status
                  </span>
                  <span></span>
                </li>

                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Departamento
                  </span>
                  <span className="text-right"></span>
                </li>
              </ul>
            
            </div>
            <div className="my-6 border-b dark:border-b-neutral-800" />
            <div className="grid  gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Cursos demandantes</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                 
                
                </address>
              </div>
             
            </div>

            
            
            
            <div className="grid gap-3">
            <div className="font-semibold">Docentes</div>
              <dl className="grid gap-3">
              
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Ano e semestre: 
            </div>

            
          
          </CardFooter>
        </Alert>
      </div>
    )
}
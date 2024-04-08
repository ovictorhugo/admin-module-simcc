
import { Plus } from "phosphor-react"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"

import {
    AlertDialog,
 
    AlertDialogContent,
    AlertDialogDescription,
 
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../ui/alert-dialog"
import { AddNew } from "./AddNew"


import { Toaster } from "../ui/sonner";
import { GridTable } from "./GridTable";





  
export function TableView() {


    return(
        <div className="w-full h-screen max-h-screen">
            <div className="md:px-16 px-6 py-24">
           <div className="flex items-center gap-4 mb-4">
           <h1 className="text-5xl  font-medium">Dashboard</h1>
           <AlertDialog>
           <AlertDialogTrigger>
           <div className="bg-black flex items-center justify-center h-12 w-12 rounded-3xl hover:rounded-2xl transition-all">
            <Plus size={20} className="text-white"/>
           </div>
           </AlertDialogTrigger>

           <AlertDialogContent>
           <AlertDialogHeader>
      <AlertDialogTitle>Adicionar nova obra</AlertDialogTitle>
      <AlertDialogDescription>
        Preencha os campos e faça upload da imagem
      </AlertDialogDescription>
    </AlertDialogHeader>
            <div className="w-full ">
                <AddNew/>
            </div>
           
           </AlertDialogContent>
           </AlertDialog>
           
           </div>
            <Alert className="mb-8">
  <AlertTitle>Bem-vindo!</AlertTitle>
  <AlertDescription>
    Aqui estão todos os dados do site, você pode adicionar ou atualizar os itens.
  </AlertDescription>
</Alert>

      <div>
        <GridTable/>
      </div>
            </div>

            <Toaster/>
        </div>
    )
}
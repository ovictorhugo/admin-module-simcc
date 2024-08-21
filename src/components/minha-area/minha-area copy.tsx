

import { ArrowLeftFromLine, ArrowRightFromLine, Building2, TrendingUp, User, X } from "lucide-react";
import {
  Sheet,
  SheetContent,

} from "../../components/ui/sheet"
import bg_popup from '../../assets/bg-minha-area.png'
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { SymbolEE } from "../svg/SymbolEE";
import { useTheme } from "next-themes";
import { SymbolEEWhite } from "../svg/SymbolEEWhite";
import { Alert } from "../ui/alert";
import { ChartLine } from "phosphor-react";

export function MinhaArea() {
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = (isOpen && typeModal === "minha-area") 
    const [expand, setExpand] = useState(false)
    const { theme, setTheme } = useTheme()

    return(
        <Sheet open={isModalOpen} onOpenChange={() => {
          onClose()
          setExpand(false)
        }}>
         <SheetContent className={`p-0 dark:bg-neutral-900 dark:border-gray-600 ${expand ? ('min-w-[80vw]'):('min-w-[50vw]')}`}>
         <DialogHeader className="h-16 p-4 border-b dark:border-gray-600">
 
         <div className="flex items-center gap-3">

         <TooltipProvider>
       <Tooltip>
         <TooltipTrigger asChild>
         <Button className="h-8 w-8" onClick={() => setExpand(!expand)} variant={'outline'} size={'icon'}>{expand ? (<ArrowRightFromLine size={16}/>):(<ArrowLeftFromLine size={16}/>)}</Button>
         </TooltipTrigger>
         <TooltipContent> Expandir</TooltipContent>
       </Tooltip>
       </TooltipProvider>

         <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          <Button className="h-8 w-8" variant={'outline'}  onClick={() => {
            onClose()
            setExpand(false)
          }} size={'icon'}><X size={16}/></Button>
          </TooltipTrigger>
          <TooltipContent> Fechar</TooltipContent>
        </Tooltip>
        </TooltipProvider>
 
         <div className="flex items-center w-full justify-between">
           <DialogTitle className="text-xl font-medium flex items-center gap-3">
           <User size={24}/> Minha área
           </DialogTitle>
 
           <div className="flex items-center gap-3">
 
          
              </div>
         </div>
 
         </div>
          
         </DialogHeader>
 
         <div>
         <ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-64px)] p-8 ">
          <div className="h-[300px] w-full flex items-center bg-cover bg-top bg-no-repeat" style={{ backgroundImage: `url(${bg_popup})` }}>
            <div>
            <DialogTitle className="text-3xl font-medium flex items-center gap-3">
            <div className="h-8 ">{(theme ==  'dark' ) ? (<SymbolEEWhite />):(<SymbolEE />)}</div> Olá,
           </DialogTitle>
            </div>
          </div>

          <div>

            <h5 className="font-medium text-2xl mb-6">Acesso rápido</h5>

            <div className={`grid gap-6  md:grid-cols-2 ${expand ? ('lg:grid-cols-4'):('lg:grid-cols-3')}`}>
                <Alert className="h-[100px] gap-3 flex font-medium items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all ">
                    Meu perfil
                </Alert>

                <Alert className="h-[100px] gap-3 flex font-medium items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all ">
                 <div className="flex items-center gap-2">
                 <TrendingUp size={16}/>  Linha do tempo
                 </div>
                </Alert>

                <Alert className="h-[100px] p-6 gap-3 flex font-medium items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all ">
                 <div className="flex items-center gap-2">
                 <TrendingUp size={16}/>  Meus bens patrimoniados
                 </div>
                </Alert>


                <Alert className="h-[100px] p-6 gap-3 flex font-medium items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all ">
                 <div className="flex items-center gap-2">
                 <TrendingUp size={16}/>  Página do pesquisador
                 </div>
                </Alert>
            </div>
          </div>
            </ScrollArea>
        
        </div>

        </SheetContent>
    </Sheet>
    )
}
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Sheet, SheetContent } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useModalSecundary } from "../hooks/use-modal-store-secundary";

export function CoautoresModal() {
     const { onClose, isOpen, type: typeModal, data } = useModalSecundary();
    const isModalOpen = (isOpen && typeModal === "coautores") 

    return(
        <Sheet open={isModalOpen} onOpenChange={onClose}>
       
       <SheetContent
          className={`p-0 dark:bg-neutral-900 dark:border-gray-600 min-w-[50vw]`}
        >
        <DialogHeader className="h-[50px] px-4 justify-center border-b dark:border-b-neutral-600">
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="h-8 w-8"
                      variant={"outline"}
                      onClick={() => onClose()}
                      size={"icon"}
                    >
                      <X size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent> Fechar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
  
              <div className="flex ml-auto items-center w-full justify-between">
                <div className="flex ml-auto items-center gap-3"></div>
              </div>
            </div>
          </DialogHeader>
      
          <ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-50px)] p-8 ">
            <div className="mb-8 flex justify-between items-center">
            <div >
              <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
              Coautores de
              </p>

              <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                {data.name}
              </h1>
            </div>

            <div>
       
            </div>
            </div>

            <div className="flex flex-wrap gap-4">
        <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-md bg-yellow-400"></div>
            <p className="text-sm text-gray-500">Mesma instituição</p>
        </div>

        <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-md bg-orange-400"></div>
            <p className="text-sm text-gray-500">Externo</p>
        </div>

        <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-md bg-red-400"></div>
            <p className="text-sm text-gray-500">Não identificado</p>
        </div>
      </div>
            </ScrollArea>
                              </SheetContent>
                              </Sheet>
    )
}
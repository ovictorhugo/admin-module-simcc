import { useModal } from "../hooks/use-modal-store";
import { Sheet, SheetContent } from "../../components/ui/sheet";
import { ClipboardIcon, Download, Eye, Trash, UserIcon, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { PencilSimple, Plus } from "phosphor-react";
import { DialogHeader } from "../ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function PesquisadoresSelecionadosModal() {
  const { onClose, isOpen, type: typeModal, data, onOpen } = useModal();
  const { pesquisadoresSelecionados, urlGeral } = useContext(UserContext)
  const isModalOpen = (isOpen && typeModal === "pesquisadores-selecionados")

  const history = useNavigate();

  const handleVoltar = () => {
    history(-1);
  }

  const close = () => {
    handleVoltar()
    onClose()
  }


  return (
    <Sheet open={isModalOpen} onOpenChange={close}>
      <SheetContent
        className={`p-0 dark:bg-neutral-900 dark:border-gray-600 w-full lg:w-[50vw]`}
      >
        <DialogHeader className="h-[50px] px-4 justify-center border-b dark:border-b-neutral-600">
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-8 w-8"
                    variant={"outline"}
                    onClick={() => {
                      handleVoltar()
                      onClose()
                    }}
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


        <div>
          <ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-50px)] p-8 ">
            <div className="mb-8 flex justify-between items-center">
              <div >
                <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                  Barema de avaliação
                </p>

                <h1 className="max-w-[500px] whitespace-pre-wrap flex-wrap text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                  Pesquisadores selecionados
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {pesquisadoresSelecionados.map((props, index) => (
                <Alert key={index}>
                  <div className="flex justify-between items-center h-10 group">
                    <div className="h-10">
                      <div className="flex items-center gap-2">
                        <Avatar className="cursor-pointer rounded-md h-8 w-8">
                          <AvatarImage
                            className="rounded-md h-8 w-8"
                            src={`${urlGeral}ResearcherData/Image?name=${props.name}`}
                          />
                          <AvatarFallback className="flex items-center justify-center">
                            <UserIcon size={12} />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{props.name}</p>
                          <div className="text-xs text-gray-500">{props.university}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className=" items-center gap-3 hidden group-hover:flex transition-all">


                        <Button size={'icon'} variant={'destructive'} className=" text-white h-10 w-10 dark:text-white">
                          <Trash size={16} />
                        </Button>
                      </div>


                    </div>
                  </div>
                </Alert>
              ))}
            </div>

            {pesquisadoresSelecionados.length == 0 && (
              <div></div>
            )}

            {pesquisadoresSelecionados.length > 0 && (
              <div className="flex items-center gap-3 w-full justify-end">
                <Button variant={'ghost'} size={'sm'} className=" mt-3  flex ">
                  <Download size={16} className="" />Baixar dados
                </Button>

                <Link to={'/dashbaord'}>
                  <Button size={'sm'} className="text-white dark:text-white mt-3 flex ">
                    <ClipboardIcon size={16} className="" />Criar barema de avaliação
                  </Button></Link>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
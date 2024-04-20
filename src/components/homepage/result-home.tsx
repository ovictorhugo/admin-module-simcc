import { useContext, useEffect } from "react";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { useModalResult } from "../hooks/use-modal-result";
import { ResultProvider } from "../provider/result-provider";
import { CategoriasPesquisaHome } from "./categorias-pesquisa-home";
import { UserContext } from "../../context/context";
import { ChatItem } from "../chat/chat-item";

export function ResultHome() {
    const { isOpen, type} = useModalHomepage();
    const { onOpen, type: typeResult } = useModalResult();
    const { mapModal, maria, messagesMaria} = useContext(UserContext)

    useEffect(() => {
        if (typeResult === null) {
          onOpen('researchers-home');
        }
      }, []);
  
    const isModalOpen = isOpen && type === "result-home";

    return(
        <>
        {isModalOpen && (
            <div className="h-full w-full flex flex-col mr-[72px]">
               {messagesMaria.length != 0 && (
                <div className="flex flex-col gap-6">
                     {messagesMaria.map((message, index) => (
            <ChatItem
                key={index}
                sender={'maria'}
                message={message}
            />
            ))}
                </div>
               )}
                {!maria && (
                    <div className={`w-full items-center flex justify-center ${mapModal && ('pr-[450px]')}`}><CategoriasPesquisaHome/></div>
                )}

                <ResultProvider/>
            </div>
        )}
        </>
    )
}
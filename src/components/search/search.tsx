import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { Chat, Chats, FadersHorizontal, Funnel, MagnifyingGlass } from "phosphor-react";


import { Button } from "../ui/button";
import { useModal} from "../hooks/use-modal-store";
import { UserContext } from "../../context/context";
import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { SelectTypeSearch } from "./select-type-search";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useModalHomepage } from "../hooks/use-modal-homepage";

const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Retorne APENAS um json com o campo type (abstract, article, book, patent, name, area, speaker) e term a partir da frase que o usuário digitar. Caso o type não for identificado, por padrão será article "
  }
export function Search() {




    const { onOpen } = useModal();
    const { onOpen: onOpenHomepage } = useModalHomepage();
    const {navbar, searchType, setSearchType, setInputMaria, inputMaria, maria, setMaria, valoresSelecionadosExport, setValoresSelecionadosExport} = useContext(UserContext)

    const { isOpen: isOpenSidebar, onOpen: onOpenSidebar, onClose } = useModalSidebar();
    const [input, setInput] = useState("");
    const [dataModificacao, setDataModificacao] = useState('');

  useEffect(() => {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

    
    setDataModificacao(dataFormatada);
    
  }, []);

  const [filterState, setFilterState] = useState("");

  const handleButtonClickInfo = () => {
    if (filterState === "filter") {
      onClose();
      setFilterState("");
    } else {
      onOpenSidebar("filter");
      setFilterState("filter");
    }
  };

  useEffect(() => {
    setInputMaria(input)
    
    if(maria) {
        
    } 
    else if (valoresSelecionadosExport.length > 0) {
        onOpenHomepage('result-home')
    } else {
        onOpenHomepage('initial-home')
    }
  }, [input, maria]);

const handlePopUppesquisa = () => {
    if(!maria) {
        onOpen('search')
    } 
}


//

const [messages, setMessages] = useState([]);
const [isTyping, setIsTyping] = useState(false);

const handleSend = async (message: any) => {
  const newMessage = {
    message,
    direction: 'outgoing',
    sender: "user"
  };

  setMessages([newMessage]); // Substituir todas as mensagens antigas pela nova mensagem

  // Iniciar uma nova conversa
  setIsTyping(true);
  await processMessageToChatGPT(newMessage);
};

async function processMessageToChatGPT(messageObject:any) {
  const apiRequestBody = {
    "model": "gpt-3.5-turbo",
    "messages": [
        systemMessage,
      { role: "user", content: messageObject.message },
      { role: "assistant", content: "" } // Defina a mensagem vazia para reiniciar a conversa
    ]
  }

  await fetch("https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      const chatGptMessage = data.choices[0].message;
  const { content } = chatGptMessage;
  const parsedContent = JSON.parse(content);
  const { type, term } = parsedContent;
      console.log('chatGptMessage',chatGptMessage)
     
    
      // Defina os valores nas variáveis
      setSearchType(type);
      setValoresSelecionadosExport(term);

      setMessages(prevMessages => [...prevMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
      
    })
}

const handlePesquisa = () => {
    if(maria && inputMaria.length > 1) {
        handleSend(inputMaria)
        onOpenHomepage('result-home')
    } else {
        onOpenHomepage('initial-home')
    }
}

console.log(messages)
console.log(valoresSelecionadosExport)
    return  (
        <div className="bottom-0 right-0 fixed w-full  bg-gradient-to-t from-white dark:from-neutral-900 to-transparent flex flex-col">
        <div className={`pb-3 px-[72px] ${navbar && !isOpenSidebar && 'pl-[278px]'} ${isOpenSidebar && !navbar && 'pl-[368px]'} ${isOpenSidebar && navbar && 'pl-[574px]'}`}>
        <div className="mb-4">
        <div className="flex gap-4">
        <Alert onClick={() => handleButtonClickInfo()} className="h-14 p-2 flex items-center w-fit whitespace-nowrap gap-3 px-6 text-sm font-medium"><div><FadersHorizontal size={16} className="" /></div> Filtros</Alert>
            <Alert  className="h-14 p-2 flex items-center justify-between">
            <div className="flex items-center gap-2 w-full flex-1">
                <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />

                <div className="flex gap-2 w-full items-center">
                <div className="flex items-center gap-2">
                <Switch
                     checked={maria}
                     onCheckedChange={(value) => setMaria(value)}

                />
                     <Label className="flex gap-2 items-center">MarIA<Chats size={16} className="" /></Label>
                </div>

                {!maria && (
                    <SelectTypeSearch/>
                )}

                

                <Input onClick={() => handlePopUppesquisa()} onChange={(e) => setInput(e.target.value)} value={input}  type="text" className="border-0 w-full "/>
                </div>

    
                
            </div>

            <div className="w-fit">
            <Button onClick={() => handlePesquisa()} variant="outline" className={`${searchType == 'article'  && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract'  && ('bg-yellow-500 dark:bg-yellow-500')} ${maria && searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} ${searchType == 'speaker'  && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book'  && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent'  && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name'  && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area'  && ('bg-green-500 dark:bg-green-500')} ${searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} size={'icon'}>
       <Funnel size={16} className="" /> 
       <span className="sr-only">Pesquisadores selecionados</span>
        </Button>
            </div>
            </Alert>
        </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
        <p className="text-xs  md:flex hidden">Sistema de Mapeamento de Competências da Bahia | versão 2.0.5 (beta) </p>
        <p className="text-xs flex">Atualizado em {dataModificacao}</p>
        </div>
        </div>
        </div>
    )
}
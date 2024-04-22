import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { Chat, Chats, FadersHorizontal, Funnel, MagnifyingGlass, X } from "phosphor-react";


import { Button } from "../ui/button";
import { useModal} from "../hooks/use-modal-store";
import { UserContext } from "../../context/context";
import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { SelectTypeSearch } from "./select-type-search";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { useLocation } from "react-router-dom";
import { SelectTypeInstitutionSearch } from "./select-type-institution-search";
const API_KEY = import.meta.env.VITE_API_KEY

const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": `
    Retorne APENAS um json com:
    1. o campo "type" (abstract, article, book, patent, name, area, speaker). Se o tipo não for identificado, por padrão será definido como "article".
    2. o campo "term" contendo uma ÚNICA palavra que representa o tema da frase. Se o tipo for "name", o nome completo será extraído e colocado em "term".
    3. o campo "message" contendo um array com: 1. uma mensagem bastante longa sobre o term retornado, 2. Uma mensagem com variações, informando que os 'resultados podem ser filtrados utilizando filtros de instituições, área, qualis e ano'
    `
  }

  interface ItemsSelecionados {
    term:string
  }
export function Search() {

    const location = useLocation();

    const posGrad = location.pathname == '/pos-graduacao'


    const { onOpen } = useModal();
    const { onOpen: onOpenHomepage } = useModalHomepage();
    const {navbar, searchType, setSearchType, setInputMaria, inputMaria, maria, setMaria, valoresSelecionadosExport, setValoresSelecionadosExport, setMessagesMaria, itemsSelecionados , setItensSelecionados} = useContext(UserContext)

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
  const { type, term, message } = parsedContent;
      console.log('chatGptMessage',chatGptMessage)
     
    
      // Defina os valores nas variáveis
      setSearchType(type);
      setMessagesMaria(message)
      
      setItensSelecionados(prevItems => [...prevItems, { term }]);

      
      setIsTyping(false);
      
    })
}

const handlePesquisa = () => {
    if(maria && inputMaria.length > 1 && !posGrad) {
        handleSend(inputMaria)
        onOpenHomepage('result-home')
    } else if (posGrad) {
        onOpenHomepage('graduation-home')
    } else {
      onOpenHomepage('initial-home')
    }
}

console.log(messages)
console.log(valoresSelecionadosExport)

console.log(itemsSelecionados)

const handleRemoveItem = (indexToRemove: any) => {
  setItensSelecionados(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
}



useEffect(() => {
  const joinedTerms = itemsSelecionados.map(item => item.term).join('');
  // Verifica se o último caractere é ponto e vírgula ou barra vertical
  const lastChar = joinedTerms.slice(-1);
  if (lastChar === ';' || lastChar === '|') {
    // Remove o último caractere da concatenação
    const editedTerms = joinedTerms.slice(0, -1);
    setValoresSelecionadosExport(editedTerms);
  } else {
    setValoresSelecionadosExport(joinedTerms);
  }
}, [itemsSelecionados]);


//conectores 
const handleConnectorChange = (index: number, connector: string) => {
  // Crie uma cópia do array de itens selecionados
  const updatedItems = [...itemsSelecionados];
  // Substitua o último caractere pelo novo conector
  updatedItems[index].term = updatedItems[index].term.slice(0, -1) + connector;
  // Atualize o estado com os itens atualizados
  setItensSelecionados(updatedItems);
};



    return  (
        <div className="bottom-0 right-0 fixed w-full h-[150px] justify-end bg-gradient-to-t from-white dark:from-neutral-900 to-transparent flex flex-col max-sm:flex  max-sm:flex-row">
        <div className={`pb-3 px-[72px] max-sm:px-[5px] ${navbar && !isOpenSidebar && 'pl-[278px]'} ${isOpenSidebar && !navbar && 'pl-[368px]'} ${isOpenSidebar && navbar && 'pl-[574px]'}`}>
        <div className="mb-4">
        <div className="flex gap-4">
        <Alert onClick={() => handleButtonClickInfo()} className="h-14 p-2 flex items-center w-fit whitespace-nowrap gap-3 px-6 text-sm font-medium cursor-pointer max-sm:w-[80px]"><div><FadersHorizontal size={16} className="" /></div> <div className="max-sm:hidden">Filtros</div></Alert>
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

                {!maria && !posGrad && (
                    <SelectTypeSearch/>
                )}

            {posGrad && (
                    <SelectTypeInstitutionSearch/>
                )}

              <div className='flex gap-2 mx-2 items-center'>
              {itemsSelecionados.map((valor, index) => {
          return(
              <>
              <div key={index} className={`flex gap-2 items-center h-10 p-2 px-4 capitalize rounded-md text-xs ${searchType == 'article' && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract' && ('bg-yellow-500 dark:bg-yellow-500')} ${searchType == 'speaker' && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book' && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent' && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name' && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area' && ('bg-green-500 dark:bg-green-500')} ${searchType == '' && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} >
              {valor.term.replace(/[|;]/g, '')}
                  <X size={12} onClick={() => handleRemoveItem(index)} className="cursor-pointer"/>
                  {/* Adicionando a escolha entre "e" ou "ou" */}
                  
              </div>

              {index < itemsSelecionados.length - 1 && (
  <button className="rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap h-8 w-8 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 transition-all text-xs outline-none" onClick={() => {
    const connector = itemsSelecionados[index].term.endsWith('|') ? ';' : '|'; // Alterna entre "|" e ";" conforme necessário
    handleConnectorChange(index, connector);
  }} >
    {itemsSelecionados[index].term.endsWith(';') ? "e" : "ou"}
  </button>
)}

              </>
          );
      })}
                </div>

                <Input onClick={() => handlePopUppesquisa()} onChange={(e) => setInput(e.target.value)} value={input}  type="text" className="border-0 w-full "/>
                </div>

    
                
            </div>

            <div className="w-fit">
            <Button onClick={() => handlePesquisa()} variant="outline" className={`${searchType == 'article'  && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract'  && ('bg-yellow-500 dark:bg-yellow-500')} ${maria && searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} ${searchType == 'speaker'  && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book'  && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent'  && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name'  && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area'  && ('bg-green-500 dark:bg-green-500')} ${searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} size={'icon'}>
       <Funnel size={16} className="" /> 
       
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
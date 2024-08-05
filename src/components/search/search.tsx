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
import { useLocation, useNavigate } from "react-router-dom";
import { SelectTypeInstitutionSearch } from "./select-type-institution-search";
const API_KEY = import.meta.env.VITE_API_KEY

const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system",
  "content": `
  Retorne APENAS um JSON com os seguintes campos:
  1. Identificar o Tipo:  "type": Identifique o tipo do termo. Os tipos possíveis são "abstract", "article", "book", "patent", "name", "area", "speaker". Se o tipo não for identificado, defina-o como "article" por padrão.
  2. Formatação de Termos "term": Precisamos concatenar os termos com ; para representar "E" e | para representar "OU", além de adicionar parênteses para agrupar os termos associados por "E". Atenção ao pegar o termo principal da frase.  (exemplo: (matematica;evolucionaria)|robotica, Bioactive|educational. Se o tipo for "name", extraia e coloque o nome completo em "term".
  3. "message": Contenha um array com duas mensagens:
      1. Uma mensagem detalhada sobre o "term" retornado.
      2. Uma mensagem com variações, informando que 'os resultados podem ser filtrados utilizando filtros de instituições, área, qualis e ano'.
  `
  }

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

export function Search() {

  
   //retorna url
   const queryUrl = useQuery();
   const navigate = useNavigate();
const type_search = queryUrl.get('type_search');
const terms = queryUrl.get('terms');

   


    const { onOpen } = useModal();
    const { onOpen: onOpenHomepage } = useModalHomepage();
    const {navbar, searchType, setSearchType, setInputMaria, inputMaria, maria, setMaria, valoresSelecionadosExport, setValoresSelecionadosExport, setMessagesMaria, itemsSelecionados , setItensSelecionados, setSugestoes, sugestoes} = useContext(UserContext)

    const { isOpen: isOpenSidebar } = useModalSidebar();
    const [input, setInput] = useState("");
    const [dataModificacao, setDataModificacao] = useState('');

  useEffect(() => {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

    
    setDataModificacao(dataFormatada);
    
  }, []);




  useEffect(() => {
    setInputMaria(input)
    
   
   
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

let TypeSearch = type_search ?? ''
  let Terms = terms ?? ''

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
  const { type, term, message, sugestion } = parsedContent;
      
  console.log('chatGptMessage',chatGptMessage)
    
      // Defina os valores nas variáveis
      setSearchType(type);
      setMessagesMaria(message)
      const termsArray = term // Split the string into an array of terms

      // Map over the terms array and create an array of objects with the 'term' property set
     
      setItensSelecionados(prevItems => [...prevItems, { term }]);

      setIsTyping(false);
    

      queryUrl.set('type_search', searchType);
      queryUrl.set('terms', termsArray);
      navigate({
        pathname: '/resultados',
        search: queryUrl.toString(),
      });
      
      
      
    })
}

const location = useLocation();

const posGrad = location.pathname == '/pos-graduacao'

const history = useNavigate();

const handlePesquisa = () => {
  if(maria && inputMaria.length > 1 && posGrad ) {
    handleSend(inputMaria)
 
}  
   else if(maria && inputMaria.length > 1 ) {
        handleSend(inputMaria)
        history('/resultados')
    } 
}






const handleRemoveItem = (index: number) => {
  const newItems = [...itemsSelecionados];
  newItems.splice(index, 1);
  setItensSelecionados(newItems);
};



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
  const newItems = [...itemsSelecionados];
  let term = newItems[index].term.trim();
  term = term.replace(/[|;]$/, ''); // Remove qualquer conector existente no final
  newItems[index].term = term + connector;
  setItensSelecionados(newItems);

  
  if( itemsSelecionados.length > 0 && posGrad) {
    queryUrl.set('terms', formatTerms(itemsSelecionados));
    navigate({
      pathname: '/pos-graduacao',
      search: queryUrl.toString(),
    });
  } else if (itemsSelecionados.length > 0 && !posGrad) {
    queryUrl.set('terms', formatTerms(itemsSelecionados));
    navigate({
      pathname: '/resultados',
      search: queryUrl.toString(),
    });
  }
};

function formatTerms(valores: { term: string }[]): string {
  let result = '';
  let tempTerms: string[] = [];

  valores.forEach(item => {
    let term = item.term.trim();

    if (term.endsWith(';')) {
      tempTerms.push(term.slice(0, -1));
    } else if (term.endsWith('|')) {
      tempTerms.push(term.slice(0, -1));

      if (tempTerms.length > 0) {
        result += '(' + tempTerms.join(';') + ')' + '|';
        tempTerms = [];
      }
    } else {
      if (tempTerms.length > 0) {
        result += '(' + tempTerms.join(';') + ')' + '|';
        tempTerms = [];
      }
      result += term + '|';
    }
  });

  if (tempTerms.length > 0) {
    result += '(' + tempTerms.join(';') + ')';
  } else {
    if (result.endsWith('|')) {
      result = result.slice(0, -1);
    }
  }

  return result;
}

useEffect(() => {
  

  if( itemsSelecionados.length > 0 && posGrad) {
    queryUrl.set('terms', formatTerms(itemsSelecionados));
    navigate({
      pathname: '/pos-graduacao',
      search: queryUrl.toString(),
    });
  } else if (itemsSelecionados.length > 0 && !posGrad) {
    queryUrl.set('terms', formatTerms(itemsSelecionados));
    navigate({
      pathname: '/resultados',
      search: queryUrl.toString(),
    });
  }
}, [itemsSelecionados]);


console.log(itemsSelecionados)
    return  (
        <div className="bottom-0 mt-4 mb-2  w-full flex flex-col max-sm:flex  max-sm:flex-row">
        <div className={` max-sm:px-[5px] `}>
        <div className="">
        <div className="flex gap-4">
      
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

                {!maria  && (
                    <SelectTypeSearch/>
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

                <Input onClick={() => handlePopUppesquisa()} onChange={(e) => setInput(e.target.value)} value={input}  type="text" className="border-0 w-full flex flex-1 "/>
                </div>

    
                
            </div>

            <div className="w-fit">
            <Button onClick={() => handlePesquisa()} variant="outline" className={`${searchType == 'article'  && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract'  && ('bg-yellow-500 dark:bg-yellow-500')} ${maria && ('bg-[#82AAC0]   dark:bg-[#82AAC0]  ')} ${searchType == 'speaker'  && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book'  && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent'  && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name'  && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area'  && ('bg-green-500 dark:bg-green-500')} ${searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} size={'icon'}>
       <Funnel size={16} className="" /> 
       
        </Button>
            </div>
            </Alert>
        </div>
        </div>

       
        </div>
        </div>
    )
}
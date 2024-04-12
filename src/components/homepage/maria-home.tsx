import { useContext, useState } from "react"
import { useModalHomepage } from "../hooks/use-modal-homepage"
import { UserContext } from "../../context/context"
import { Button } from "../ui/button"



const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Retorne APENAS um json com o campo type (abstract, article, book, patent, name, area, speaker) e term a partir da frase que o usário digitar "
  }

export function MariaHome() {
    const {inputMaria} = useContext(UserContext)

    const { isOpen, type} = useModalHomepage();
  
    const isModalOpen = isOpen && type === "maria-home";

    //asdcb\sdjk\se

    const [messages, setMessages] = useState([
        {
          message: "Oi, Eu sou a MarIA. Em que posso te ajudar?",
          sentTime: "just now",
          sender: "ChatGPT"
        }
      ]);
      const [isTyping, setIsTyping] = useState(false);
    
      const handleSend = async (message:any) => {
        const newMessage = {
          message,
          direction: 'outgoing',
          sender: "user"
        };
    
        const newMessages = [...messages, newMessage];
        
        setMessages(newMessages);
    
        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
      };
    
      async function processMessageToChatGPT(chatMessages:any) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat
    
        let apiMessages = chatMessages.map((messageObject:any) => {
          let role = "";
          if (messageObject.sender === "ChatGPT") {
            role = "assistant";
          } else {
            role = "user";
          }
          return { role: role, content: messageObject.message}
        });
    
    
        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            systemMessage,  // The system message DEFINES the logic of our chatGPT
            ...apiMessages // The messages from our chat with ChatGPT
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
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }]);
          setIsTyping(false);
        });
      }

    return(
        <>
        {isModalOpen && (
            <div className="h-full w-full flex flex-col mr-[72px]">
                    <div>
                        {messages.map((message, i) => {
                            return (
                                <div className="flex gap-2">
                                    <div></div>
                                    <div>
                                        <p className="mb-1">{message.sender}</p>
                                        <p className="text-sm">{message.message}</p>
                                    </div>
                                <Button onClick={() => handleSend(inputMaria)}></Button>
                                </div>
                            )
                        })}
                    </div>
            </div>
        )}
        </>
    )
}
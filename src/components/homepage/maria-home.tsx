import { useState } from "react"
import { useModalHomepage } from "../hooks/use-modal-homepage"



export function MariaHome() {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: 'Hello',
            sender: "ChatGTP"
        }
    ])

    const handleSend = async (message: any) => {
        const newMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        }

        const newMessages = [...messages, newMessage]

        setMessages(newMessages)

        setTyping(true)
    }

    const { isOpen, type} = useModalHomepage();
  
    const isModalOpen = isOpen && type === "maria-home";

    return(
        <>
        {isModalOpen && (
            <div className="h-full w-full flex flex-col mr-[72px]">
                    <div>
                        {messages.map((message, i) => {
                            return (
                                <div>{message.message}</div>
                            )
                        })}
                    </div>
            </div>
        )}
        </>
    )
}
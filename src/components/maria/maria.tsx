import { CornerDownLeft, Info, Mic, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import axios from 'axios';
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "next-themes";
import { SymbolEE } from "../svg/SymbolEE";
import { SymbolEEWhite } from "../svg/SymbolEEWhite";

export function Maria() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const {theme} = useTheme()

    const handleAskQuestion = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8484/ask', {
                question: question
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error asking the question:', error);
        }
    };

    return(
        <main className="w-full p-4 md:p-8">
             <main className="grid h-full flex-1 gap-4 overflow-auto  md:grid-cols-2 lg:grid-cols-4">
             <div
            className="relative w-full hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <fieldset className="grid w-full gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Configurações
                  </legend>
                  <div className="grid gap-3">
                </div>
            </fieldset>
            </div>

            <div className="relative  flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50  lg:col-span-3">
            
         <ScrollArea className="flex flex-col flex-1 h-full  ">
         <div className="flex flex-col flex-1 h-full gap-3">
          <div className="h-[200px] flex items-center">
              <div className="flex gap-3">
                <div className="h-12">{theme == 'dark '? (<SymbolEEWhite/>):(<SymbolEE/>)}</div>
              <h2 className="font-bold text-5xl text-neutral-400 dark:text-neutral-700"><strong className="bg-gradient-to-r from-[#719CB8]  to-[#1B1464] text-transparent bg-clip-text">Olá,</strong> <br/>como posso ajudar?</h2>
              </div>
              
            </div>

            <div className="flex flex-col gap-4">
                <Skeleton className="h-4 rounded-md w-full"/>
                <Skeleton className="h-4 rounded-md w-[90%]"/>
                <Skeleton className="h-4 rounded-md w-[95%]"/>
                <Skeleton className="h-4 rounded-md w-1/2"/>
            </div>
          </div>
         </ScrollArea>
            <div>
            <div
              className="relative  border bg-white dark:bg-neutral-950 rounded-lg dark:border-neutral-800  " x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
               value={question}
               onChange={(e) => setQuestion(e.target.value)}
                id="message"
                placeholder="Escreva sua mensagem aqui.."
                className="min-h-12 resize-none border-0 p-3 "
              />
              <div className="flex items-center p-3 pt-0">
               
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
                <Button onClick={handleAskQuestion} type="submit" size="sm" className="ml-auto gap-1.5">
                 Enviar mensagem
                  <Send size={16}/>
                </Button>
              </div>
            </div>
            <p className="flex justify-center text-xs w-full mt-2 text-gray-500">A MarIA pode apresentar informações imprecisas, inclusive sobre pessoas. Por isso, cheque as respostas</p>
            </div>
            </div>
            </main>
        </main>
    )
}
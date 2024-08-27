import { CornerDownLeft, Info, Mic, Send, User } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "next-themes";
import { SymbolEE } from "../svg/SymbolEE";
import { SymbolEEWhite } from "../svg/SymbolEEWhite";
import { UserContext } from "../../context/context";
import { SelectTypeSearch } from "../search/select-type-search";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Alert } from "../ui/alert";


interface Query {
  query:string
  researcher:Research[]
}

type Research = {
  among: number,
  articles: number,
  book: number,
  book_chapters: number,
  id: string,
  name: string,
  university: string,
  lattes_id: string,
  area: string,
  lattes_10_id: string,
  abstract: string,
  city: string,
  orcid: string,
  image: string
  graduation: string,
  patent: string,
  software: string,
  brand: string,
  lattes_update: Date,
  entradanaufmg:Date
 
  h_index:string,
  relevance_score:string,
  works_count:string,
  cited_by_count:string,
  i10_index:string,
  scopus:string,
  openalex:string,

  subsidy:Bolsistas[]
  graduate_programs:GraduatePrograms[]
  departments:Departments[]
  research_groups:ResearchGroups[]

  cargo:string
  clas:string
  classe:string
  rt:string
  situacao:string
}

interface Bolsistas {
  aid_quantity:string
  call_title:string
  funding_program_name:string
  modality_code:string
  category_level_code:string
  institute_name:string
  modality_name:string
  scholarship_quantity:string
  }

  interface  GraduatePrograms {
    graduate_program_id:string
    name:string
  }

  interface Departments {
    dep_des:string
    dep_email:string
    dep_nom:string
    dep_id:string
    dep_sigla:string
    dep_site:string
    dep_tel:string
    img_data:string
  }

  interface ResearchGroups {
    area:string
    group_id:string
    name:string
  }


interface Message {
  query:string
  user:string 
  time: string; 
  researcher?:Research[]
}

export function Maria() {
    const [question, setQuestion] = useState('');
    const {urlGeral, searchType, user} = useContext(UserContext)
 
    const {theme} = useTheme()

    const [load, setLoad] = useState(false)
    const [maria, setMaria] = useState<Query| null>(null);;

    const [message, setMessage] = useState<Message[]>([]);

    const usuario = user?.display_name || 'Usuário'

    const getCurrentTime = (): string => {
      const now = new Date();
      return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };


    let urlTermPesquisadores = ``;

    if (searchType === 'name') {
      urlTermPesquisadores = `${urlGeral}maria/researcher?query=${question}`;
    } else if (searchType === 'article') {
      urlTermPesquisadores = `${urlGeral}maria/researcher/articlequery=${question}`;
    } else if (searchType === 'book') {
      urlTermPesquisadores = `${urlGeral}maria/researcher/book?query=${question}`; //
    } else if (searchType === 'area') {
      urlTermPesquisadores = `${urlGeral}maria/researcher/`;
    } else if (searchType === 'speaker') {
      urlTermPesquisadores = `${urlGeral}maria/researcher/event?query=${question}`; //
    } else if (searchType === 'patent') {
      urlTermPesquisadores = `${urlGeral}maria/researcher/patent?query=${question}`;
    } else if (searchType === 'abstract') {
      urlTermPesquisadores = `${urlGeral}maria/researcher/abstract?query=${question}`;
    }


  const fetchData = async () => {
    try {
      setLoad(true);
     
      const response = await fetch(urlTermPesquisadores, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "3600",
          "Content-Type": "text/plain",
        },
      });
      const data = await response.json();
      if (data) {
     
        console.log(data)
        setMaria(data)

        setMessage((prevMessages) => [
          ...prevMessages,
          {
            user: 'MarIA',
            query: data.query || '',
            time: getCurrentTime(),
            researcher:data.researcher || []
          },
        ]);

        setLoad(false)
      } 
     
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

  const handleAskQuestion = async () => {
    fetchData();
};


    return(
        <main className="w-full p-4 md:p-8 backgroundMaria">
             <main className="grid h-full flex-1 gap-4 md:gap-8 overflow-auto  md:grid-cols-2 lg:grid-cols-4">
             <div
            className="relative w-full hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <fieldset className="grid w-full gap-6 rounded-lg border dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Configurações
                  </legend>
                  <div className="grid gap-3">
                </div>
            </fieldset>

            <fieldset className="grid w-full h-full gap-6 rounded-lg border dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Exemplos
                  </legend>
                  <div className="grid gap-3">
                </div>
            </fieldset>
            </div>

            <div className="relative  flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50  lg:col-span-3">
            
        {message.length == 0 ? (
 <div className="h-full">
<div className="flex flex-col flex-1 h-full gap-3 justify-center">
          <div className="h-full flex items-center">
             <div>
             <div className="flex gap-3">
                <div className="h-12">{theme == 'dark '? (<SymbolEEWhite/>):(<SymbolEE/>)}</div>
              <h2 className="font-bold text-5xl text-neutral-400 dark:text-neutral-300"><strong className="bg-gradient-to-r from-[#719CB8]  to-[#1B1464] text-transparent bg-clip-text">Olá,</strong> <br/>como posso ajudar?</h2>
             
              </div>
              <p className="ml-12 mt-2  max-w-[550px]">Faça perguntas relacionadas as produções de artigos, resumo cadastrado no Lattes, livros, capítulos e patentes dos docentes vinculados na plataforma </p>
             </div>
            </div>

           
          </div>
          </div>
        ):(
 <ScrollArea className="flex flex-col flex-1 h-full  ">
            <div>
              {message.map((props, index) => {
                return(
                  <div className={`flex gap-3 ${index % 2 == 0 ? ('ml-auto flex-row-reverse text-right'):('')}`}>
                      <Avatar className="cursor-pointer rounded-md  h-6 w-6">
                      <AvatarImage  className={'rounded-md h-6 w-6'} src={`${user?.photo_url}`} />
                      <AvatarFallback className="flex items-center justify-center"><User size={16}/></AvatarFallback>
                  </Avatar>

                 <div className={`flex flex-col`}>
                 <Alert className={`p-4 px-6 border dark:border-neutral-800 max-w-[500px] rounded-md ${index % 2 == 0 ? ('rounded-tr-none'):('rounded-tl-none')}`}>
                    <p className="font-medium">{props.user}</p>
                    <p className="text-gray-500 text-sm">{props.query}</p>
                  </Alert>

                  {props.user == 'MarIA' && (
                    <div className="flex fles-wrap gap-3">
                      
                    </div>
                  )}
                  <p className="text-xs text-gray-500 pt-3">{props.time}</p>
                 </div>
               
                  </div>
                )
              })}

              {load && (
                <div className="flex flex-col gap-4">
                <Skeleton className="h-4 rounded-md w-full"/>
                <Skeleton className="h-4 rounded-md w-[90%]"/>
                <Skeleton className="h-4 rounded-md w-[95%]"/>
                <Skeleton className="h-4 rounded-md w-1/2"/>
            </div>
              )}
            </div>
         </ScrollArea>
        )}
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
               
               <div className="flex items-center gap-3">
                
               <Tooltip>
                  <TooltipTrigger asChild>
                   <Link to={'/informacoes'}>
                   <Button variant="outline" size="icon">
                      <Info className="size-4" />
                      <span className="sr-only">Informações</span>
                    </Button></Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">Informações</TooltipContent>
                </Tooltip>

                <SelectTypeSearch/>
               </div>
               <Button
              onClick={() => {
                handleAskQuestion();
                setMessage((prevMessages) => [
                  ...prevMessages,
                  {
                    user: usuario,
                    query: question,
                    time: getCurrentTime(),
                  },
                ]);
                setQuestion(''); // Limpa o campo de texto após o envio
              }}
              type="submit"
              size="sm"
              className="ml-auto gap-1.5"
            >
              Enviar mensagem
              <Send size={16} />
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
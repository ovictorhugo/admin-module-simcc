import { Label } from "@radix-ui/react-dropdown-menu";
import { Circle } from "../svg/Circle";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/context";
import { ItemHome } from "./item-home";
import {
  Book,
  Books,
  CaretRight,
  Chats,
  Code,
  Copyright,
  Funnel,
  MagnifyingGlass,
  Quotes,
  StripeLogo,
} from "phosphor-react";
import { User } from "lucide-react";
import { Alert } from "../ui/alert";
import { GraficoHome } from "./grafico-home";
import { useModalHomepage } from "../hooks/use-modal-homepage";

interface VisaoPrograma {
  article: number;
  book: number;
  book_chapter: number;
  brand: number;
  patent: number;
  researcher: string;
  software: number;
  work_in_event: number;
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "../hooks/use-modal-store";
import { Switch } from "../ui/switch";
import { SelectTypeSearch } from "../search/select-type-search";

export function InitialHome() {
  const [VisaoPrograma, setVisaoPrograma] = useState<VisaoPrograma[]>([]);
  const { urlGeral, maria, setMaria,  searchType } = useContext(UserContext);

  let urlVisaoPrograma = `${urlGeral}/graduate_program_production?graduate_program_id=0&year=1900`;
  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlVisaoPrograma, {
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
          setVisaoPrograma(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlVisaoPrograma]);

  const [enable, setEnable] = useState(false);

  const { isOpen, type } = useModalHomepage();
  const {onOpen } = useModal()

  const isModalOpen = isOpen && type === "initial-home";
  const [input, setInput] = useState("");

  const posGrad = location.pathname == '/pos-graduacao'

  return (
    <>
      {isModalOpen && (
        <div className="h-full items-center w-full flex flex-col justify-center mr-[72px] max-sm:ml-4">
          <div className="flex flex-col justify-center ">
        
            <h1 className="z-[2] text-3xl  font-medium max-w-[750px] mb-6 ">
              Experimente{" "}
              <strong className="bg-red-700 text-white font-medium">
                {" "}
                pesquisar um tema
              </strong>{" "}
              e veja o que a plataforma pode filtrar para você.
            </h1>


            <Alert  className="h-14 p-2 flex items-center justify-between max-w-[60vw]">
            <div className="flex items-center gap-2 w-full flex-1">
            <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
            <div className="flex gap-3  items-center">
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
                </div>
              
            <Input onClick={() => {
              if(maria) {

              }else {
                onOpen('search')
              }
            }}  onChange={(e) => setInput(e.target.value)} value={input}  type="text" className="border-0 w-full flex flex-1 "/>
                </div>

                <div className="w-fit">
                <Button  variant="outline" className={`${searchType == 'article'  && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract'  && ('bg-yellow-500 dark:bg-yellow-500')} ${maria && searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} ${searchType == 'speaker'  && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book'  && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent'  && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name'  && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area'  && ('bg-green-500 dark:bg-green-500')} ${searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} size={'icon'}>
       <Funnel size={16} className="" /> 
       
        </Button>
            </div>
                </Alert>

                <div className="max-w-[60vw] flex gap-3 mt-3">
                {VisaoPrograma.map((props) => {
              return (
         <ScrollArea className="w-full ">
     
         <div className="flex gap-4  w-max">
                 
                      <div className="flex rounded-md p-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 justify-center items-center gap-3">
                      <User size={20} className=" whitespace-nowrap mb-2" />
                      <div className="flex  text-sm">{String(props.researcher)} <br/> pesquisadores</div>
                      </div>

                      <div className="flex rounded-md p-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 justify-center items-center gap-3">
                      <Book size={20} className=" whitespace-nowrap mb-2" />
                      <div className="flex  text-sm">{String(props.book)} <br/> Livros</div>
                      </div>

                      <div className="flex rounded-md p-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 justify-center items-center gap-3">
                      <Copyright size={20} className=" whitespace-nowrap mb-2" />
                      <div className="flex  text-sm">{String(props.patent)} <br/> Patentes</div>
                      </div>

                      <div className="flex rounded-md p-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 justify-center items-center gap-3">
                      <Quotes size={20} className=" whitespace-nowrap mb-2" />
                      <div className="flex  text-sm">{String(props.article)} <br/> Artigos</div>
                      </div>

                      <div className="flex rounded-md p-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 justify-center items-center gap-3">
                      <Code size={20} className=" whitespace-nowrap mb-2" />
                      <div className="flex  text-sm">{String(props.software)} <br/> Softwares</div>
                      </div>

                      <div className="flex rounded-md p-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 justify-center items-center gap-3">
                      <Books size={20} className=" whitespace-nowrap mb-2" />
                      <div className="flex  text-sm">{String(props.book_chapter)} <br/> Capítulos</div>
                      </div>

                      <div className="flex rounded-md p-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 justify-center items-center gap-3">
                      <StripeLogo size={20} className=" whitespace-nowrap mb-2" />
                      <div className="flex  text-sm">{String(props.brand)} <br/> Marcas</div>
                      </div>
               
                  
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
       );
      })}

                </div>
          </div>

          <div className=" w-full ">

          
          </div>
        </div>
      )}
    </>
  );
}

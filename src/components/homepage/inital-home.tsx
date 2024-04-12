import { Label } from "@radix-ui/react-dropdown-menu";
import { Circle } from "../svg/Circle";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/context";
import { ItemHome } from "./item-home";
import { Book, Books, CaretRight, Code, Copyright, Quotes, StripeLogo } from "phosphor-react";
import { User } from "lucide-react";
import { Alert } from "../ui/alert";
import { GraficoHome } from "./grafico-home";
import { useModalHomepage } from "../hooks/use-modal-homepage";

interface VisaoPrograma {
    article: number,
    book: number,
    book_chapter: number,
    brand: number,
    patent: number,
    researcher: string,
    software: number,
    work_in_event: number
  }


  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../../components/ui/carousel"
  
  

export function InitialHome() {

    const [VisaoPrograma, setVisaoPrograma] = useState<VisaoPrograma[]>([]); 
    const { urlGeral } = useContext(UserContext);

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


      const [enable, setEnable] = useState(false)
      
      const { isOpen, type} = useModalHomepage();
  
      const isModalOpen = isOpen && type === "initial-home";

    return  (
      <>
      {isModalOpen && (
          <div className="h-full w-full flex flex-col justify-center mr-[72px]">
         
          <div className="flex flex-col justify-center">
          <div className="h-[350px] absolute  ml-16 "><Circle/></div>
          <h1 className="z-[9] text-3xl mb-2 font-medium max-w-[750px] ">Experimente <strong className="bg-red-700 text-white font-medium"> pesquisar um tema</strong>{" "}e veja o que a plataforma pode filtrar para você.</h1>
          <Label className=" z-[9] max-w-[620px] mb-8 ">O principal objetivo desse sistema é identificar as competências individuais e coletivas dos profissionais na Bahia. </Label>

          
        
          </div>

          <div className=" w-full ">
       
         {VisaoPrograma.map(props => {
            return(
              <Carousel
              opts={{
                align: "start",
              }}
              className="w-full gap-4  "
            >

<CarouselContent className="md:basis-1/2 lg:basis-1/4">  
<CarouselItem>
<ItemHome
                    title="Pesquisadores"
                    url=""
                    value={String(props.researcher)}
                    ><User size={16} className="" /> </ItemHome>
</CarouselItem>
                   

                   
<CarouselItem >
<ItemHome
                    title="Livros"
                    url=""
                    value={String(props.book)}
                    > <Book size={16} className="" /></ItemHome>
</CarouselItem>
                    
<CarouselItem >
<ItemHome
                    title="Patentes"
                    url=""
                    value={String(props.patent)}
                    ><Copyright size={16} className="" /> </ItemHome>
</CarouselItem>
                   
<CarouselItem >
<ItemHome
                         title="Softwares"
                         url=""
                         value={String(props.software)}
                         ><Code size={16} className="" /> </ItemHome>
</CarouselItem>
                 
<CarouselItem >
<ItemHome
                         title="Capítulos de livro"
                         url=""
                         value={String(props.book_chapter)}
                         ><Books size={16} className="" /> </ItemHome>
</CarouselItem>
<CarouselItem >

<ItemHome
                         title="Marcas"
                         url=""
                         value={String(props.brand)}
                         ><StripeLogo size={16} className="" /> </ItemHome>
  </CarouselItem> 

                     </CarouselContent>
               <CarouselPrevious />
      <CarouselNext />
    </Carousel>
            )
          })}
         </div>
         
        </div>
      )}
      </>
    )
}
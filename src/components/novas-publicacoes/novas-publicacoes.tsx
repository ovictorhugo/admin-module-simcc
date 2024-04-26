import { useContext, useMemo, useState } from "react";
import { Label } from "../ui/label";
import { UserContext } from "../../context/context";
import { ArticleItem } from "./article-item-news";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type Publicacao = {
    id: string,
    doi: string,
    name_periodical: string,
    qualis: "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "SQ" | "NP",
    title: string,
    year: string,
    color: string,
    researcher: string,
    lattes_id: string,
    magazine: string,
    lattes_10_id: string,
    jcr_link: string,
    jif: string
    researcher_id: string
  }


export function NovasPublicacoes() {

    const {urlGeral} = useContext(UserContext)
    const [loading, isLoading] = useState(false)
    const [count, setCount] = useState(12)
    const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);

    const urlTermPublicacoes = urlGeral + 'recently_updated?year=2024&university='

    useMemo(() => {
        const fetchData = async () => {
            try {
              isLoading(true)
              const response = await fetch( urlTermPublicacoes, {
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
                setPublicacoes(data);
                isLoading(false)
              }
            } catch (err) {
              console.log(err);
            }
          };
          fetchData();
        }, [ urlTermPublicacoes]);

    return (
      <div className="flex items-center">
         <ScrollArea className=" inset-0 pr-16" style={{ width: 'calc(100vw - 72px)' }}>
         <div className="flex gap-6 flex-col  items-center  sm:h-full  sm:flex-row">
             <div className="sm:max-w-[400px]   flex-shrink-0">
              
                <h1 className="z-[2] text-3xl mb-2 font-medium max-w-[750px] ">
              Experimente{" "}
              <strong className="bg-red-700 text-white font-medium">
                {" "}
                pesquisar um tema
              </strong>{" "}
              e veja o que a plataforma pode filtrar para você.
            </h1>
            <Label className=" z-[2] max-w-[620px] mb-8 ">
              O principal objetivo desse sistema é identificar as competências
              individuais e coletivas dos profissionais na Bahia.{" "}
            </Label>
              
            </div>

            <div className=" elementBarra w-full flex-1 h-full flex items-center ">
                <div className="flex-1 flex gap-6 elementBarra overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 w-full">
                {publicacoes.slice(0, count).map((props: any) => {

return (
    <ArticleItem
    id={props.id}
            doi={props.doi}
            name_periodical={props.name_periodical}
            qualis={props.qualis}
            title={props.title.toUpperCase()}
            year={props.year}
            color={props.color}
            researcher={props.researcher}
            lattes_id={props.lattes_id}
            magazine={props.magazine}
            lattes_10_id={props.lattes_10_id}
            jcr_link={props.jcr_link}
            jif={props.jif}
            researcher_id={props.researcher_id}
            distinct={props.distinct}
    />
);
})}
                </div>
           </div>
        </div>
        <ScrollBar orientation="horizontal" />
       </ScrollArea>
      </div>
    )
}
import { useModal } from "../hooks/use-modal-store";

  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../../components/ui/drawer"
import { Button } from "../ui/button";
import { useMemo, useState } from "react";

import { InformationResearcher } from "../popup/information-researcher";
import { useContext } from "react";
import { UserContext } from "../../context/context";


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
  }

  import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { File, Files, Quotes, Stamp, Student, Ticket } from "phosphor-react";
import { NuvemPalavras } from "../popup/nuvem-palavras";
import { ScrollArea } from "../ui/scroll-area";
import { TotalViewResearcher } from "../popup/total-view-researcher";
import { InformacoesGeraisResearcher } from "../popup/informacoes-gerais-researcher";
import { ArticlesResearcherPopUp } from "../popup/articles-researcher";

type ResearchOpenAlex = {
  h_index: number;
  relevance_score: number;
  works_count: number;
  cited_by_count: number;
  i10_index: number;
  scopus: string;
  orcid:string
  openalex:string
  
}


export function ResearcherModal() {
   
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = isOpen && typeModal === "researcher-modal";
    const [researcher, setResearcher] = useState<Research[]>([]); 
    const [loading, isLoading] = useState(false)
    const {name} = data
    const { urlGeral } = useContext(UserContext);
    console.log("Context:", useContext(UserContext));

    const [researcherData, setResearcherData] = useState<ResearchOpenAlex[]>([]);

    // Função para lidar com a atualização de researcherData
    const handleResearcherUpdate = (newResearcherData: ResearchOpenAlex[]) => {
      setResearcherData(newResearcherData);
    };


    const urlTermPesquisadores = urlGeral + `researcherName?name=${name != null && (name.split(' ').join(';'))}`;


    useMemo(() => {
        const fetchData = async () => {
            try {
              isLoading(true)
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
                setResearcher(data);
                isLoading(false)
              }
            } catch (err) {
              console.log(err);
            }
          };
          fetchData();
        }, [urlTermPesquisadores]);

        const [value, setValue] = useState('articles')

        console.log('reseracher DATAAA', researcherData)

    return(
        <>
        <Drawer open={isModalOpen} onClose={onClose} snapPoints={[0.43, 0.88]} fadeFromIndex={0}  >
        <DrawerContent onInteractOutside={onClose} >
        {researcher.slice(0, 1).map((user) => {
                return(
                  <div className="w-full flex justify-center ">
            <div className="bg-cover bg-center bg-no-repeat h-28 w-28 bg-white dark:bg-neutral-950 rounded-2xl mb-3 border-4 border-white dark:border-neutral-950  relative  top-[-75px] " style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${user.id}) ` }}></div>
          </div>
                  )
                })}
        <ScrollArea className="h-screen px-16 top-[-75px]" >
        <DrawerHeader className="p-0">
            {researcher.slice(0, 1).map((user) => {
                return(
                   <div>

                     <InformationResearcher
                    among={user.among}
                    articles={user.articles}
                    book={user.book}
                    book_chapters={user.book_chapters}
                    id={user.id}
                    name={user.name}
                    university={user.university}
                    lattes_id={user.lattes_id}
                    area={user.area}
                    abstract={user.abstract}
                    lattes_10_id={user.lattes_10_id}
                    city={user.city}
                    orcid={user.orcid}
                    image={user.image}
                    graduation={user.graduation}
                    patent={user.patent}
                    software={user.software}
                    brand={user.brand}
                    lattes_update={user.lattes_update}
                    onResearcherUpdate={handleResearcherUpdate}
                    />

                   </div>
                )
            })}

<div className="flex gap-6">
<div className="w-full flex-1">
        <Tabs defaultValue="articles" value={value} className="">
  <TabsList className="mb-6">
    <TabsTrigger value="articles" onClick={() => setValue('articles')} className="flex gap-2 items-center"> <Quotes size={16} className="" />Artigos</TabsTrigger>
    <TabsTrigger value="book" onClick={() => setValue('book')} className="flex gap-2 items-center"><File size={16} className="" />Livros e capítulos</TabsTrigger>
    <TabsTrigger value="producao-tecnica" onClick={() => setValue('producao-tecnica')} className="flex gap-2 items-center"><Stamp size={16} className="" />Produção técnica</TabsTrigger>
    <TabsTrigger value="relatorio-tecnico" onClick={() => setValue('relatorio-tecnico')} className="flex gap-2 items-center"><Files size={16} className="" />Relatório técnico</TabsTrigger>
    <TabsTrigger value="orientacoes" onClick={() => setValue('orientacoes')} className="flex gap-2 items-center"><Student size={16} className="" />Orientações</TabsTrigger>
    <TabsTrigger value="participacao-eventos" onClick={() => setValue('participacao-eventos')} className="flex gap-2 items-center"><Ticket size={16} className="" />Participação em eventos</TabsTrigger>
  </TabsList>
  <TabsContent value="articles">
  {researcher.slice(0, 1).map((user) => {
                return(
                  <ArticlesResearcherPopUp name={String(user.id)}/>
                  )
                })}
  </TabsContent>
  <TabsContent value="book">Change your password here.</TabsContent>
</Tabs>
        </div>

        <div className="w-[350px] gap-12 flex flex-col sticky"> 

        {researcherData.map((user) => {
                      return(
                        <InformacoesGeraisResearcher
                        h_index={user.h_index}
                        relevance_score={user.relevance_score}
                        works_count={user.works_count}
                        cited_by_count={user.cited_by_count}
                        i10_index={user.i10_index}
                        scopus={user.scopus}
                        orcid={user.orcid}
                        openalex={user.openalex}
                        />
                      )
            })}

        {researcher.slice(0, 1).map((user) => {
                      return(
                        <TotalViewResearcher
                        among={user.among}
                        articles={user.articles}
                        book={user.book}
                        book_chapters={user.book_chapters}
                        patent={user.patent}
                        software={user.software}
                        brand={user.brand}
                        />
                      )
            })}

      {researcher.slice(0, 1).map((user) => {
                      return(
                        <NuvemPalavras
                        id={user.id}
                        />
                      )
            })}


        </div>
</div>
        </DrawerHeader>

       


        <DrawerFooter>
          
        </DrawerFooter>
        </ScrollArea>
        
        </DrawerContent>
        </Drawer>
        </>
    )
}
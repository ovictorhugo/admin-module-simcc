

import { ArrowLeftFromLine, ArrowRightFromLine, Box, Building2, GraduationCap, Lock, Menu, TrendingUp, User, X } from "lucide-react";
import {
  Sheet,
  SheetContent,

} from "../../components/ui/sheet"
import bg_popup from '../../assets/bg-minha-area.png'
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { useContext, useMemo, useState } from "react";
import { SymbolEE } from "../svg/SymbolEE";
import { useTheme } from "next-themes";
import { SymbolEEWhite } from "../svg/SymbolEEWhite";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ChartLine, Cube, Shield, SignOut } from "phosphor-react";
import { UserContext } from "../../context/context";
import { Tabs, TabsContent } from "../ui/tabs";
import { SegurancaMinhaArea } from "./seguranca-minha-area";
import { LinhaTempoMinhaArea } from "./linha-tempo-minha-area";
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";

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


export function MinhaArea() {
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = (isOpen && typeModal === "minha-area") 
    const [expand, setExpand] = useState(true)
    const { theme, setTheme } = useTheme()

    const {user, setUser, setLoggedIn, urlGeral} = useContext(UserContext)

    const [tab, setTab] = useState('all')

    const logOut = async () => {
      try {
        await signOut(auth);
        setUser(null);
        setLoggedIn(false);
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    };

    



    let urlTermPesquisadores = urlGeral + `researcherName?name=${user?.researcger_name}`;
console.log(urlTermPesquisadores)
    const [researcher, setResearcher] = useState<Research[]>([]); 
    const [loading, isLoading] = useState(false)

    const history = useNavigate();

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

    return(
        <Sheet open={isModalOpen} onOpenChange={() => {
          onClose()
          setExpand(true)
        }}>
         <SheetContent className={`p-0 dark:bg-neutral-900 dark:border-gray-600 ${expand ? ('min-w-[80vw]'):('min-w-[50vw]')}`}>
         <DialogHeader className="h-[50px] px-4 justify-center border-b dark:border-gray-600">
 
         <div className="flex items-center gap-3">

         <TooltipProvider>
       <Tooltip>
         <TooltipTrigger asChild>
         <Button className="h-8 w-8" onClick={() => setExpand(!expand)} variant={'outline'} size={'icon'}>{expand ? (<ArrowRightFromLine size={16}/>):(<ArrowLeftFromLine size={16}/>)}</Button>
         </TooltipTrigger>
         <TooltipContent> {expand ? ('Recolher'):('Expandir')}</TooltipContent>
       </Tooltip>
       </TooltipProvider>

         <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          <Button className="h-8 w-8" variant={'outline'}  onClick={() => {
            onClose()
            setExpand(true)
          }} size={'icon'}><X size={16}/></Button>
          </TooltipTrigger>
          <TooltipContent> Fechar</TooltipContent>
        </Tooltip>
        </TooltipProvider>
 
       
 
         </div>
          
         </DialogHeader>
 
         <div className="relative">
         <ScrollArea className="relative pb-4 whitespace-nowrap h-[calc(100vh-50px)] p-8 ">
              <div className="flex gap-6 relative">
                  <Tabs defaultValue={tab} value={tab} className="w-full flex flex-1">
                    <TabsContent value="all" className="w-full">
                    <div className="flex flex-col flex-1 w-full">
                      <div>
                      <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                      Olá, {user?.display_name}
                        </p>

                        <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                           Minha área
                        </h1>
                      </div>

                      <div className="my-6 border-b dark:border-b-neutral-800"></div>

                      <div className="bg-blue-50 flex gap-3 dark:bg-blue-200/70 w-full p-8 rounded-md">
                      <div>  <Lock size={24}/></div>
    <div>
    <AlertTitle className="whitespace-normal">Solicitar acesso para edição das produções</AlertTitle>
      <AlertDescription className="whitespace-normal mb-6">
     Sendo um perfil verificado, você pode adicionar mídia as suas produções entre outras ferramentas. Solicite a verificação da conta para obter acesso.
      </AlertDescription>

      <Button>Solicitar acesso</Button>
      </div></div>
                  </div>
                    </TabsContent>

                    <TabsContent value="seg" className="w-full">
                    <SegurancaMinhaArea/>
                    </TabsContent>

                    <TabsContent value="lin" className="w-full">
                    {researcher.slice(0,1).map((user) => (
                      <LinhaTempoMinhaArea
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
  
                      h_index={user.h_index}
                      relevance_score={user.relevance_score}
                      works_count={user.works_count}
                      cited_by_count={user.cited_by_count}
                      i10_index={user.i10_index}
                      scopus={user.scopus}
                      openalex={user.openalex}
  
                      subsidy={user.subsidy}
                      graduate_programs={user.graduate_programs}
                      departments={user.departments}
                      research_groups={user.research_groups}
                  
                      cargo={user.cargo}
                      clas={user.clas}
                      classe={user.classe}
                      rt={user.rt}
                      situacao={user.situacao}
  
                      entradanaufmg={user.entradanaufmg}
                      />
                    ))}
                    </TabsContent>
                  </Tabs>
                  

                
                   <div className={`flex flex-col sticky top-8 ${expand ? ('w-[300px]'):('')}`}>
                    {expand && (<p className="text-gray-500 uppercase text-xs font-medium mb-2">PÁGINAS</p>)}
                    <div className="flex flex-col gap-2 mb-8">
                    <Button onClick={() => setTab('all')} variant={'ghost'} className={`  ${!expand ? ('w-10'):('justify-start')} ${tab == 'all' && ('bg-neutral-100 dark:bg-neutral-800')}`} size={expand ? ('default'):('icon')}><Menu size={16}/>{expand && ('Minha área')}</Button>
                    <Button onClick={() => setTab('seg')} variant={'ghost'} className={` ${!expand ? ('w-10'):('justify-start')} ${tab == 'seg' && ('bg-neutral-100 dark:bg-neutral-800')}`} size={expand ? ('default'):('icon')}><Shield size={16}/>{expand && ('Perfil e segurança')}</Button>
                   {user?.researcger_name != '' && (
                     <Button onClick={() => setTab('lin')} variant={'ghost'} className={` ${!expand ? ('w-10'):('justify-start')} ${tab == 'lin' && ('bg-neutral-100 dark:bg-neutral-800')}`} size={expand ? ('default'):('icon')}><ChartLine size={16}/>{expand && ('Linha do tempo')}</Button>
                   )}
                    </div>

                    {(expand && (user && Array(user.graduate_program).length > 0 )) && ( <p className="text-gray-500 uppercase text-xs font-medium mb-2">PROGRAMAS DE PÓS-GRADUAÇÃO</p>)}

                    {(user && Array(user.graduate_program).length > 0) && (
                      <div className="flex flex-col gap-2 mb-8">
                   
                     {
                      Array(user.graduate_program).map((program) => (
                        <Link className="w-full" target="_blank" to={`/pos-graduacao?graduate_program_id=${program.graduate_program_id}`}><Button variant={'ghost'} className={` ${!expand ? ('w-10'):('justify-start w-full')} ${tab == '' && ('bg-neutral-100 dark:bg-neutral-800')}`} size={expand ? ('default'):('icon')}><GraduationCap size={16}/>{expand && (program.name)}</Button></Link>
                      ))
                     }
                    
                      </div>
                    )}

                   {expand && ( <p className="text-gray-500 uppercase text-xs font-medium mb-2">LINKS EXTERNOS</p>)}
                    <div className="flex flex-col gap-2 mb-8">
                    {user?.researcger_name != '' && (
                      <Button variant={'ghost'} className={` ${!expand ? ('w-10'):('justify-start w-full')} ${tab == '' && ('bg-neutral-100 dark:bg-neutral-800')}`} size={expand ? ('default'):('icon')}><Cube size={16}/>{expand && ('Meus bens patrimoniados')}</Button>
                    )}
                  {user?.researcger_name != '' && (  <Link className="w-full" target="_blank" to={`/researcher?researcher_name=${user?.researcger_name}&search_type=&terms=`}><Button variant={'ghost'} className={` ${!expand ? ('w-10'):('justify-start w-full')} ${tab == '' && ('bg-neutral-100 dark:bg-neutral-800')}`} size={expand ? ('default'):('icon')}><User size={16}/>{expand && ('Página pública do pesquisador')}</Button></Link>)}
                   
                    </div>

                    {expand && ( <p className="text-gray-500 uppercase text-xs font-medium mb-2">OUTRAS AÇÕES</p>)}
                    <div className="flex flex-col gap-2">
                    <Button onClick={() => {
                      onClose()
                      logOut()
                      history(`/`)
                      localStorage.removeItem('permission');
                      localStorage.removeItem('role');
                    }} variant={'destructive'} className={` ${!expand ? ('w-10'):('justify-start')} ${tab == '' && ('bg-neutral-100 dark:bg-neutral-800')}`} size={expand ? ('default'):('icon')}><SignOut size={16}/>{expand && ('Encerrar sessão')}</Button>
                   
                    </div>
                   </div>
                
              </div>
            </ScrollArea>
        
        </div>

        </SheetContent>
    </Sheet>
    )
}
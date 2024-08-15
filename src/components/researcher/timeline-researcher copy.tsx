import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/context"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Alert } from "../ui/alert"

type Dados = {
    count_article:number
    count_book:number
    count_book_chapter:number,
    count_guidance:number
    count_patent:number
    count_report:number
    count_software:number
    count_guidance_complete:number
    count_guidance_in_progress:number
    count_patent_granted:number
    count_patent_not_granted:number
    count_brand:number
    graduantion:string
    year:number

    A1:number
  A2:number
  A3:number 
  A4:number
  B1:number 
  B2:number
  B3:number
  B4:number 
  C:number
  SQ:number
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
  
  
  

  
export function TimeLineResearcher(props:Research) {
    const [loading, isLoading] = useState(false)
    
  const [dados, setDados] = useState<Dados[]>([]);

  const {urlGeral} = useContext(UserContext)

  let urlDados = `${urlGeral}ResearcherData/DadosGerais?year=2000`

  const qualisColor = {
    'A1': 'bg-[#006837]',
    'A2': 'bg-[#8FC53E]',
    'A3': 'bg-[#ACC483]',
    'A4': 'bg-[#BDC4B1]',
    'B1': 'bg-[#F15A24]',
    'B2': 'bg-[#F5831F]',
    'B3': 'bg-[#F4AD78]',
    'B4': 'bg-[#F4A992]',
    'B5': 'bg-[#F2D3BB]',
    'C': 'bg-[#EC1C22]',
    'None': 'bg-[#560B11]',
    'SQ': 'bg-[#560B11]'
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
          isLoading(true)
          const response = await fetch(urlDados, {
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
            setDados(data);
            isLoading(false)
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [urlDados]);

    console.log(urlDados)

    const filteredDados = dados.filter((item) =>
        Object.entries(item).some(
          ([key, value]) => key !== 'year' && value !== 0 && value !== ""
        )
      );

    return(
        <div className="w-full">
          <div className="grid  grid-cols-1">
                <ScrollArea className="relative pb-4 whitespace-nowrap ">
                <div className="h-screen flex  items-center justify-center">
                {filteredDados.map((item, index) => (
       <div>

        <div className={`flex w-[300px] h-[200px]  flex-col items-center gap-3 z-[1] ${index % 2 == 0 ? ('flex-col justify-end '):('flex-col top-[232px]  relative')}`}>
       {item.A1 != 0 && (
         <div className="flex w-full group" >
         <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 bg-[#34663C] `}></div>
         <Alert className="rounded-l-none p-2 flex flex-col justify-between  ">
          
          <p className="text-xs  text-gray-500 dark:text-gray-300 font-normal">
          <strong>{item.A1} </strong> {item.A1 == 1 ? ('artigo'):('artigos')} A1
            </p>
           </Alert>
              </div>
       )}

{item.A2 != 0 && (
         <div className="flex w-full group" >
         <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 bg-[#9DC356] `}></div>
         <Alert className="rounded-l-none p-2 flex flex-col justify-between  ">
          
          <p className="text-xs  text-gray-500 dark:text-gray-300 font-normal">
          <strong>{item.A2} </strong> {item.A2 == 1 ? ('artigo'):('artigos')} A2
            </p>
           </Alert>
              </div>
       )}

{item.A3 != 0 && (
         <div className="flex w-full group" >
         <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 bg-[#B1C38A] `}></div>
         <Alert className="rounded-l-none p-2 flex flex-col justify-between  ">
          
          <p className="text-xs  text-gray-500 dark:text-gray-300 font-normal">
          <strong>{item.A3} </strong> {item.A3 == 1 ? ('artigo'):('artigos')} A3
            </p>
           </Alert>
              </div>
       )}

{item.A4 != 0 && (
         <div className="flex w-full group" >
         <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 bg-[#BEC4B3] `}></div>
         <Alert className="rounded-l-none p-2 flex flex-col justify-between  ">
          
          <p className="text-xs  text-gray-500 dark:text-gray-300 font-normal">
          <strong>{item.A4} </strong> {item.A4 == 1 ? ('artigo'):('artigos')} A4
            </p>
           </Alert>
              </div>
       )}

{item.B1 != 0 && (
         <div className="flex w-full group" >
         <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 bg-[#D56438] `}></div>
         <Alert className="rounded-l-none p-2 flex flex-col justify-between  ">
          
          <p className="text-xs  text-gray-500 dark:text-gray-300 font-normal">
          <strong>{item.B1} </strong> {item.B1 == 1 ? ('artigo'):('artigos')} B1
            </p>
           </Alert>
              </div>
       )}

{item.B2 != 0 && (
         <div className="flex w-full group" >
         <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 bg-[#DD883D] `}></div>
         <Alert className="rounded-l-none p-2 flex flex-col justify-between  ">
          
          <p className="text-xs  text-gray-500 dark:text-gray-300 font-normal">
          <strong>{item.B2} </strong> {item.B2 == 1 ? ('artigo'):('artigos')} B2
            </p>
           </Alert>
              </div>
       )}

{item.B3 != 0 && (
         <div className="flex w-full group" >
         <div className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 bg-[#E3B081] `}></div>
         <Alert className="rounded-l-none p-2 flex flex-col justify-between  ">
          
          <p className="text-xs  text-gray-500 dark:text-gray-300 font-normal">
          <strong>{item.B3} </strong> {item.B3 == 1 ? ('artigo'):('artigos')} B3
            </p>
           </Alert>
              </div>
       )}
        </div>
         <div key={index} className={`flex w-[300px] flex-col items-center gap-3 z-[1] ${index % 2 == 0 ? ('flex-col '):('flex-col-reverse top-[-32px] relative')}`}>
          
          <div className="flex items-center w-full">
            <div className="border-b w-full flex flex-1"></div>
            <div className="w-8 h-8 rounded-full border whitespace-nowrap flex items-center justify-center text-xl font-bold"></div>
            <div className="border-b w-full flex flex-1"></div>
          </div>
     
           <div className={`flex ${index % 2 == 0 ? ('flex-col '):('flex-col-reverse ')}`}>
           <p className="text-sm text-center font-medium">{item.year}</p>

           </div>
        
        </div>
       </div>
      ))}
           </div>

           <ScrollBar orientation="horizontal"/>
                </ScrollArea>
          </div>
        </div>
    )
}
import { useContext, useMemo, useState } from "react";


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
    abstract:string,
    article_institution:string,
    authors:string
    authors_institution:string
    citations_count:string 
    issn:string 
    keywords:string 
    landing_page_url:string 
    language:string 
    pdf:string
  }



  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    
  } from "../../components/ui/accordion"
  import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Skeleton } from "../ui/skeleton";

import { ChartBar, Quotes, SquaresFour, Rows, X, ArrowUDownLeft } from "phosphor-react";

import { Button } from "../ui/button";

import { UserContext } from "../../context/context";

import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { GraficoArticleHome } from "../homepage/categorias/articles-home/grafico-articles-home";
import { FilterArticlePopUp } from "./filters-articles-popup";
import { ArticleBlockPopUp } from "./articles-block-popup";
import { TableReseracherArticlesPopup } from "./columns/table-articles-popup";


type Filter = {
  year: number[]
  qualis: string[]
}

type Props = {
  name:string
}

export function ArticlesResearcherPopUp(props:Props) {
  

    const {urlGeral, setItensSelecionadosPopUp, itemsSelecionadosPopUp, searchType, itemsSelecionados} = useContext(UserContext)
  
   
    const [loading, isLoading] = useState(false)
    const [distinct] = useState(false)
    const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
    const [typeVisu, setTypeVisu] = useState('block')

    const [filters, setFilters] = useState<Filter[]>([]);

    // Função para lidar com a atualização de researcherData
    const handleResearcherUpdate = (newResearcherData: Filter[]) => {
      setFilters(newResearcherData);
    };

    const yearString = filters.length > 0 ? filters[0].year.join(';') : '';
    const qualisString = filters.length > 0 ? filters[0].qualis.join(';') : '';
    console.log('qualis',qualisString)

    function formatTerms(valores: { term: string }[]): string {
      let result = '';
      let tempTerms: string[] = [];
    
      valores.forEach(item => {
        let term = item.term.trim();
    
        if (term.endsWith(';')) {
          // Remove the final ';' and add the term to the temporary array
          tempTerms.push(term.slice(0, -1));
        } else if (term.endsWith('|')) {
          // Remove the final '|' and add the term to the temporary array
          tempTerms.push(term.slice(0, -1));
    
          // Add the temporary array to the result as a group and clear the array
          if (tempTerms.length > 0) {
            result += '(' + tempTerms.join(';') + ')' + '|';
            tempTerms = [];
          }
        } else {
          // Handle terms that don't end with ';' or '|'
          if (tempTerms.length > 0) {
            result += '(' + tempTerms.join(';') + ')' + '|';
            tempTerms = [];
          }
          result += term + '|';
        }
      });
    
      // Handle any remaining terms in the tempTerms array
      if (tempTerms.length > 0) {
        result += '(' + tempTerms.join(';') + ')';
      } else {
        // Remove the last '|' if it exists
        if (result.endsWith('|')) {
          result = result.slice(0, -1);
        }
      }
    
      return result;
    }
  
  
    const resultadoFormatado = formatTerms(itemsSelecionadosPopUp);

    let urlTermPublicacoes = `${urlGeral}bibliographic_production_researcher?terms=&researcher_id=${props.name}&type=ARTICLE&qualis=${qualisString}&year=${yearString}`;

    if (searchType == 'article') {
      urlTermPublicacoes = `${urlGeral}bibliographic_production_researcher?terms=${resultadoFormatado}&researcher_id=${props.name}&type=ARTICLE&qualis=${qualisString}&year=${yearString}`;
    }

    console.log(urlTermPublicacoes)

    console.log('urlTermPublicacoes', urlTermPublicacoes)
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

        const items = Array.from({ length: 12 }, (_, index) => (
            <Skeleton key={index} className="w-full rounded-md h-[170px]" />
          ));

                    //conectores 
const handleConnectorChange = (index: number, connector: string) => {
  // Crie uma cópia do array de itens selecionados
  const updatedItems = [...itemsSelecionadosPopUp];
  // Substitua o último caractere pelo novo conector
  updatedItems[index].term = updatedItems[index].term.slice(0, -1) + connector;
  // Atualize o estado com os itens atualizados
  setItensSelecionadosPopUp(updatedItems);
};

const handleRemoveItem = (indexToRemove: any) => {
  setItensSelecionadosPopUp(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
}


         

    return(
        <>
  
            <div className="">

                <FilterArticlePopUp
                onFilterUpdate={handleResearcherUpdate}/>
              
                        <Accordion  type="single" collapsible >
                <AccordionItem value="item-1" >
                <div className="flex mb-2">
                   <HeaderResultTypeHome title="Gráfico de quantidade total por Qualis" icon={<ChartBar size={24} className="text-gray-400" />}>
                        </HeaderResultTypeHome>
                   <AccordionTrigger>
                  
                    </AccordionTrigger>
                   </div>
                    <AccordionContent >
                    {loading ? (
                      <Skeleton className="w-full rounded-md h-[300px]"/>
                    ):(
                      <GraficoArticleHome
                      articles={publicacoes}
                      />
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>

                <Accordion defaultValue="item-1"  type="single" collapsible >
                <AccordionItem value="item-1" >
                <div className="flex mb-2">
                <div className="flex gap-4 w-full justify-between items-center ">
<div className="flex gap-4 items-center">
<Quotes size={24} className="text-gray-400" />
{searchType != 'article' || itemsSelecionadosPopUp.length == 0 ? (
<p className="text-sm font-bold">Todos os artigos</p>
):(
<div className="text-sm font-bold flex items-center gap-2">
<span className="">{publicacoes.length} </span> ocorrências de

<div className='flex gap-2 items-center'>
{itemsSelecionadosPopUp.map((valor, index) => {
return(
<>
<div key={index} className={`flex gap-2 items-center h-10 p-2 px-4 capitalize rounded-md text-xs bg-blue-500 dark:bg-blue-500 text-white border-0 `} >
{valor.term.replace(/[|;]/g, '')}
<X size={12} onClick={() => handleRemoveItem(index)} className="cursor-pointer"/>
{/* Adicionando a escolha entre "e" ou "ou" */}

</div>

{index < itemsSelecionadosPopUp.length - 1 && (
<button className="rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap h-8 w-8 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 transition-all text-xs outline-none" onClick={() => {
const connector = itemsSelecionadosPopUp[index].term.endsWith('|') ? ';' : '|'; // Alterna entre "|" e ";" conforme necessário
handleConnectorChange(index, connector);
}} >
{itemsSelecionadosPopUp[index].term.endsWith(';') ? "e" : "ou"}
</button>
)}

</>
);
})}

em artigos
</div>
</div>
)}
</div>

<div className="flex gap-3 mr-3  items-center h-full">

{(itemsSelecionadosPopUp != itemsSelecionados && searchType == 'article') && (
<div className="flex gap-3  items-center">
<Button onClick={() => setItensSelecionadosPopUp(itemsSelecionados)}  variant="ghost"  size={'icon'}>
        <ArrowUDownLeft size={16} className=" whitespace-nowrap" />
    </Button>

<div className="w-[0.5px] h-6 dark:bg-neutral-800 bg-neutral-200"></div>
</div>
)}

<Button onClick={() => setTypeVisu('rows')}  variant={typeVisu == 'block' ? 'ghost' : 'outline' } size={'icon'}>
        <Rows size={16} className=" whitespace-nowrap" />
    </Button>

    <Button  onClick={() => setTypeVisu('block')} variant={typeVisu == 'block' ? 'outline' : 'ghost' }  size={'icon'}>
        <SquaresFour size={16} className=" whitespace-nowrap" />
    </Button>
</div>

</div>

                <AccordionTrigger>

              </AccordionTrigger>
                </div>
                  
                    <AccordionContent >

{typeVisu == 'block' ? (
                    loading ? (
                        <ResponsiveMasonry
                        columnsCountBreakPoints={{
                            350: 1,
                            750: 1,
                            900: 2,
                            1200: 3
                        }}
                    >
                                     <Masonry gutter="16px">
                        {items.map((item, index) => (
                                <div key={index}>{item}</div>
                              ))}
                        </Masonry>
        </ResponsiveMasonry>
                      ):(
                        <ArticleBlockPopUp
                        articles={publicacoes}
                        distinct={distinct}
                        />
                      )
                    ):(
                      loading ? (
                        
                        <Skeleton className="w-full rounded-md h-[400px]"/>
                      ):(
                        <TableReseracherArticlesPopup
                        articles={publicacoes}
                        />
                      )
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
                       
            </div>

        </>
    )
}
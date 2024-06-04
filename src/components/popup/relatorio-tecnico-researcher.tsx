import { useContext, useEffect, useMemo, useState } from "react";



  type Livros = {

    id: string,
    grant_date: string,
    title: string,
    year: string,
    financing: string,
    project_name: string
  }

  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    
  } from "../../components/ui/accordion"
  import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Skeleton } from "../ui/skeleton";

import { ChartBar,  SquaresFour, Rows, Book, X, ArrowUDownLeft, Books } from "phosphor-react";

import { Button } from "../ui/button";
import { UserContext } from "../../context/context";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";
import { GraficoArticleHome } from "../homepage/categorias/articles-home/grafico-articles-home";
import { TableReseracherArticleshome } from "../homepage/categorias/articles-home/table-articles";

import { BookBlockPopUp } from "./book-block-popup";
import { FilterYearPopUp } from "./filters-year-popup";


type Filter = {
  year: number[]
  qualis: string[]
}

type Props = {
  name:string
}

interface ItemsSelecionados {
  term:string
}

export function RelatorioTecnicoResearcherPopUp(props:Props) {
  const [itemsSelecionadosCap , setItensSelecionadosCap] = useState<ItemsSelecionados[]>([])

    const {urlGeral, valoresSelecionadosExport, navbar, searchType, itemsSelecionadosPopUp, setItensSelecionadosPopUp, itemsSelecionados} = useContext(UserContext)
  
   
    const [loading, isLoading] = useState(false)
  
    const [distinct, setDistinct] = useState(false)
    const [publicacoes, setPublicacoes] = useState<Livros[]>([]);
    const [typeVisu, setTypeVisu] = useState('block')
    const [capLivros, setCapLivros] = useState<Livros[]>([]);
    const [filters, setFilters] = useState<Filter[]>([]);

    // Função para lidar com a atualização de researcherData
    const handleResearcherUpdate = (newResearcherData: Filter[]) => {
      setFilters(newResearcherData);


    };

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
    
         

    const yearString = filters.length > 0 ? filters[0].year.join(';') : '';
    const qualisString = filters.length > 0 ? filters[0].qualis.join(';') : '';
    let urlTermPublicacoes = `${urlGeral}researcher_report?researcher_id=${props.name}&year=${yearString}`;

   
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

          useEffect(() => {
            setItensSelecionadosCap(itemsSelecionadosPopUp)
          }, []);


          //conectores 
const handleConnectorChange = (index: number, connector: string) => {
  // Crie uma cópia do array de itens selecionados
  const updatedItems = [...itemsSelecionadosPopUp];
  // Substitua o último caractere pelo novo conector
  updatedItems[index].term = updatedItems[index].term.slice(0, -1) + connector;
  // Atualize o estado com os itens atualizados
  setItensSelecionadosPopUp(updatedItems);
};

const handleConnectorChangeCap = (index: number, connector: string) => {
  // Crie uma cópia do array de itens selecionados
  const updatedItems = [...itemsSelecionadosPopUp];
  // Substitua o último caractere pelo novo conector
  updatedItems[index].term = updatedItems[index].term.slice(0, -1) + connector;
  // Atualize o estado com os itens atualizados
  setItensSelecionadosCap(updatedItems);
};

const handleRemoveItem = (indexToRemove: any) => {
  setItensSelecionadosPopUp(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
}

const handleRemoveItemCap = (indexToRemove: any) => {
  setItensSelecionadosCap(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
}

    

    return(
        <>
  
            <div className="mb-[150px]">

                <FilterYearPopUp
                onFilterUpdate={handleResearcherUpdate}/>
              
                        <Accordion  type="single" collapsible >
                <AccordionItem value="item-1" >
                    <AccordionTrigger>
                    <HeaderResultTypeHome title="Gráfico de orientações em andamento e concluídas " icon={<ChartBar size={24} className="text-gray-400" />}>
                        </HeaderResultTypeHome>
                    </AccordionTrigger>
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
                    <AccordionTrigger>
                    <div className="flex gap-4 w-full justify-between items-center ">
            <div className="flex gap-4 items-center">
            <Book size={24} className="text-gray-400" />
            <p className="text-sm font-bold">Todos os relatórios técnicos</p>
            </div>

            <div className="flex gap-3  items-center h-full">
            {itemsSelecionadosPopUp != itemsSelecionados && (
              <div className="flex gap-3  items-center">
                <Button onClick={() => setItensSelecionadosPopUp(itemsSelecionados)}  variant="outline" className={`bg-transparent border-0 ${typeVisu == 'rows' && ('bg-white dark:bg-neutral-800')}`} size={'icon'}>
                            <ArrowUDownLeft size={16} className=" whitespace-nowrap" />
                        </Button>

              <div className="w-[0.5px] h-6 dark:bg-neutral-800 bg-neutral-200"></div>
              </div>
            )}

            <Button onClick={() => setTypeVisu('rows')}  variant="outline" className={`bg-transparent border-0 ${typeVisu == 'rows' && ('bg-white dark:bg-neutral-800')}`} size={'icon'}>
                            <Rows size={16} className=" whitespace-nowrap" />
                        </Button>

                        <Button  onClick={() => setTypeVisu('block')} variant="outline" className={`bg-transparent border-0 ${typeVisu == 'block' && ('bg-white dark:bg-neutral-800')} `} size={'icon'}>
                            <SquaresFour size={16} className=" whitespace-nowrap" />
                        </Button>
            </div>

          </div>
                   
                    </AccordionTrigger>
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
                        publicacoes.length == 0 ? (
                          <div className="items-center justify-center w-full flex text-center pt-6">Sem resultados para essa pesquisa</div>
                         ):(
                        <BookBlockPopUp
                        articles={publicacoes}
                        distinct={distinct}
                        type={'relatorio-tecnico'}
                        />
                         )
                      )
                    ):(
                      loading ? (
                        
                        <Skeleton className="w-full rounded-md h-[400px]"/>
                      ):(
                        <TableReseracherArticleshome
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
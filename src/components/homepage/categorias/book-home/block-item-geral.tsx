import { useEffect, useState } from "react";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Button } from "../../../ui/button";
import { Plus } from "phosphor-react";
import { BookItem } from "./Livro";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "../../../dashboard/builder-page/tabelas/tabela-artigos";



type Articles = {
    articles: any[];
    distinct: boolean
    type: string
}




export function BlockItemGeral(propsGeral: Articles) {

  const queryUrl = useQuery();
     const navigate = useNavigate();

     const initialPage =  queryUrl.get('page') || '1';
     const initialLength =  queryUrl.get('length') || '12';
   
    const [page, setPage] = useState(Number(initialPage));
    const [length, setLength] = useState(Number(initialLength));
     const location = useLocation();
    const handleNavigate = (newPage: number, newLength: number) => {
    
      queryUrl.set("page", newPage.toString());
      queryUrl.set("length", newLength.toString());
      navigate({
        pathname: location.pathname,
        search: queryUrl.toString(),
      });
    };
  
    useEffect(() => {
      handleNavigate(page, length);
    }, [page, length]);

    const isFirstPage = page === 1;
    const isLastPage = propsGeral.articles.length < length



    return (
        <div>
            <ResponsiveMasonry
                columnsCountBreakPoints={{
                    350: 1,
                    750: 2,
                    900: 3,
                    1200: 3,
                    1700: 4
                }}
            >
                <Masonry gutter="16px">
                    {propsGeral.articles.map((props: any) => {

                        return (
                            <BookItem
                                id={props.id}
                                title={props.title}
                                year={props.year}
                                isbn={props.isbn}
                                publishing_company={props.publishing_company}
                                name={props.name}

                                type={propsGeral.type}

                                event_name={props.event_name}

                                nature={props.nature}
                                participation={props.participation}

                                distinct={propsGeral.distinct}


                                grant_date={props.grant_date}

                                financing={props.financing}
                                project_name={props.project_name}


                                oriented={props.oriented}
                                status={props.status}

                            />
                        );
                    })}
                </Masonry>
            </ResponsiveMasonry>

            <div className="w-full flex  justify-between items-center gap-4 mt-8">
     <div>

     </div>

      {/* Botões de navegação */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-4">
        <Button
          variant="outline"
          onClick={() => setPage(prev => prev - 1)}
          disabled={isFirstPage}
        >
          <ChevronLeft size={16} className="mr-2" />
          Anterior
        </Button>

        <Button
          onClick={() => setPage(prev => prev + 1)}
          disabled={isLastPage}
        >
          Próximo
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>

       {/* Select de itens por página */}
       <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Itens por página:</span>
        <Select value={length.toString()} onValueChange={(value) => {
          setPage(1); // resetar para a primeira página
          setLength(parseInt(value));
        }}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Itens" />
          </SelectTrigger>
          <SelectContent>
            {[12, 24, 36, 48, 84, 162].map(val => (
              <SelectItem key={val} value={val.toString()}>{val}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

        </div>
    )
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";

  import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "../ui/command"
  
  
import { useModal } from "../hooks/use-modal-store";
import { SelectTypeSearch } from "../search/select-type-search";
import { useContext, useEffect, useState } from "react";

import Papa from 'papaparse';
import unorm from 'unorm';
import { UserContext } from "../../context/context";

interface Csv {
    great_area: string
    term: string
    frequency: string
    type_: string
  }


export function SearchModal() {

    const { onClose, isOpen, type } = useModal();
    const isModalOpen = isOpen && type === "search";
    const {setValoresSelecionadosExport, valoresSelecionadosExport, searchType, setSearchType} = useContext(UserContext)

    const [input, setInput] = useState('')

    const handleClickTermos = (type: string, value: string) => {
        setValoresSelecionadosExport(value)
        setSearchType(type)
      }


    const [filteredItems, setFilteredItems] = useState<Csv[]>([]);
    const [chartOptions, setChartOptions] = useState({});
    
    useEffect(() => {
        const filePath = "../dicionario.csv";

        const fetchData = async () => {
          try {
            const response = await fetch(filePath);
            const text = await response.text();
    
            Papa.parse(text, {
              complete: (result: any) => {
                const parsedData = result.data;
            
                setFilteredItems(parsedData); 

              },
              header: true,
              skipEmptyLines: true,
              delimiter: ',',
              encoding: 'UTF-8',
            });
          } catch (error) {
            console.error('Erro ao carregar o arquivo:', error);
          }
        };
    
        fetchData();
      }, []);

      const filteredResultsArticle = []
      const filteredResultsBook = []
      const filteredResultsResearcher = []
      const filteredResultsPatent = []
      const filteredResultsSpeaker = []
      const filteredResultsAbstract = []



      //Article
      const pesquisaInputNormalizado = unorm.nfkd(input).replace(/[^\w\s]/gi, '').toLowerCase();


      //Article
      for (const item of filteredItems) {
        // Verifica se o tipo do item é "ARTICLE"
        if (item.type_ === "ARTICLE") {
          const termoNormalizado = unorm.nfkd(item.term).replace(/[^\w\s]/gi, '').toLowerCase();
      
          if (termoNormalizado.startsWith(pesquisaInputNormalizado)) {
            filteredResultsArticle.push(item);
          }
        }
      
      }

      //Abstract
for (const item of filteredItems) {
    if (item.type_ === "ABSTRACT") {
      const termoNormalizado = unorm.nfkd(item.term).replace(/[^\w\s]/gi, '').toLowerCase();
  
      if (termoNormalizado.startsWith(pesquisaInputNormalizado)) {
        filteredResultsAbstract.push(item);
  
      }
    }
  
  }

      console.log(input)

    return  (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="p-0 border-0">
        <Command>
       <div className="flex gap-4">
       <SelectTypeSearch/>
  <CommandInput className="w-full" onValueChange={(value) => setInput(value)} placeholder="Type a command or search..." />
       </div>
 
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Artigos">
      {filteredResultsArticle.slice(0, 3).map((resultado) => {
        if(resultado.type_ == "ARTICLE") {
            return(
                <CommandItem onClick={()=> handleClickTermos('article', resultado.term)}>{resultado.term}</CommandItem>
            ) 
        }
      })}
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Resumo">
      {filteredResultsAbstract.slice(0, 3).map((resultado) => {
        if(resultado.type_ == "ABSTRACT") {
            return(
                <CommandItem>{resultado.term}</CommandItem>
            )
        }
      })}
    </CommandGroup>
  </CommandList>
</Command>

        </DialogContent>
        </Dialog>
    )
}
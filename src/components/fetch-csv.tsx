import { useEffect, useState } from "react";
import Papa from 'papaparse';
import unorm from 'unorm';

interface Csv {
    great_area: string
    term: string
    frequency: string
    type_: string
  }

export function FetchCsv() {
    const [filteredItems, setFilteredItems] = useState<Csv[]>([]);

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
                console.log(parsedData);
                
                      
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

      const filteredSugestoes = filteredItems
    .sort((a, b) => Number(b.frequency) - Number(a.frequency))
    .filter(resultado => resultado.type_ === "ARTICLE")
    .slice(0, 20);

}


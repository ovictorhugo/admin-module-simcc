import { useEffect, useState } from "react";
import Papa from 'papaparse';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Csv {
    great_area: string
    term: string
    frequency: string
    type_: string
  }

export function GraficoHome() {
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

      const filteredSugestoes = filteredItems
    .sort((a, b) => Number(b.frequency) - Number(a.frequency))
    .filter(resultado => resultado.type_ === "ARTICLE")
    .slice(0, 20);

    useEffect(() => {
        // ...
        if (filteredSugestoes) {
          const categories = filteredSugestoes.map((d) => d.term);
          const amongValues = filteredSugestoes.map((d) => Number(d.frequency));

    
          setChartOptions({
            chart: {
              type: "area",
              backgroundColor: "transparent",
              fontFamily: "Ubuntu, sans-serif",
              height: '700px', // Define a altura como 100% da tela
              position: "relative",
              border: 'none'
            },
            exporting: {
              enabled: false, // Remove a opção de menu para baixar o gráfico
            },
            title: {
              text: "",
            },
            legend: {
              enabled: false, // Defina esta propriedade como false para remover a legenda
            },
            xAxis: {
              categories,
              labels: {
                enabled: false, // Remove as legendas do eixo x
              },
              lineColor: 'transparent', // Torna a linha do eixo x transparente
      lineWidth: 0,
      gridLineWidth: 0
            },
            yAxis: {
              labels: {
                enabled: false, // Remove as legendas do eixo y
              },
              gridLineWidth: 0, // Remove as linhas de referência do eixo y
            },
            series: [
              {
                data: amongValues,
              },
            ],
    
            credits: {
              enabled: false,
            },
            plotOptions: {
              area: {
                color: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                  },
                  stops: [
                    [0, "#7D96FF"],   // Cor inicial (transparente)
                    [1, "#ffffff"],       // Cor final (#005399)
                  ],
                },
                lineWidth: 0,
              },
            },
            animation: {
              duration: 100000, // Duração da animação em milissegundos
            },
          });
        }
      }, [filteredItems]);


    return (
<div className=" w-[120%] h-screen absolute bottom-0 left-[-200px]">
         <HighchartsReact highcharts={Highcharts} options={chartOptions} />
       </div>
    )

}


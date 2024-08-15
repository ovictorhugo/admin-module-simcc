import { useContext, useMemo, useState } from "react";


type Grafico = {
    id: string
}

interface PalavrasChaves {
    term: string;
    among: number;
  }

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import HC_wordcloud from 'highcharts/modules/wordcloud';

HC_wordcloud(Highcharts);


export function NuvemPalavras(props:Grafico) {
    // gráfico
    const [words, setWords] = useState<PalavrasChaves[]>([]);
    const {urlGeral} = useContext(UserContext)
    let urlPalavrasChaves = `${urlGeral}lists_word_researcher?researcher_id=${props.id}`
   
 
    useMemo(() => {
      const fetchData = async () => {
  
        try {
          const response = await fetch(urlPalavrasChaves, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Max-Age': '3600',
              'Content-Type': 'text/plain'
            }
          });
          const data = await response.json();
          if (data) {
            setWords(data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [urlPalavrasChaves]);


  const options2 = {
    chart: {
      backgroundColor: 'transparent',
      height: '300px',
      display: 'flex',
      position: 'relative'
    },
    exporting: {
        enabled: false, // Remove a opção de menu para baixar o gráfico
      },
    credits: {
      enabled: false
    },
    series: [
      {
        type: 'wordcloud',
        data: words.map((word) => ({
          name: word.term,
          weight: word.among,
        })),

        style: {
          fontFamily: 'Ubuntu, sans-serif',
        },
      },
    ],
    title: {
      text: '',
    },
    plotOptions: {
      wordcloud: {
        borderRadius: 3,
        borderWidth: "1px",
        borderColor: 'blue',
        BackgroundColor: 'red',
        colors: ['#9CBCCE', '#284B5D', '#709CB6'],

      },
    },
  }





    return(
        <div>
            <div className="mb-6 font-medium text-2xl">Palavras-chaves mais recorrentes</div>
            <Alert>
            <HighchartsReact highcharts={Highcharts} options={options2} />
            </Alert>
        </div>
    )
}
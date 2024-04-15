import { useEffect, useState } from "react";
import { Alert } from "../../../ui/alert";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

type Articles = {
    articles: any[];
}


export function GraficoArticleHome(props:Articles) {
    type Qualis = "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "SQ" | "NP";

    const [chartOptions, setChartOptions] = useState({});

  type CountResult = {
    [key: string]: number;
  };

  useEffect(() => {
    if (props.articles) {
      const counts = props.articles.reduce((result: CountResult, publicacao) => {
        const qualis = publicacao.qualis;
        result[qualis] = (result[qualis] || 0) + 1;
        return result;
      }, {});

      const data = Object.entries(counts).map(([name, count]) => {
        return { name, y: count };
      });

      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      const categories = sortedData.map((item) => item.name);

      setChartOptions({
        chart: {
          type: 'column',
          backgroundColor: 'transparent',
          fontFamily: 'Ubuntu, sans-serif',
          height: '280px',
          display: 'flex',
          position: 'relative',
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'category',
          categories,
          title: {
            text: 'Tipo de Qualis',
            fontFamily: 'Ubuntu, sans-serif',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Quantidade',
          },
        },
        series: [
          {
            name: 'Qualis',
            data: sortedData.map((item) => {
              let qualis: Qualis = item.name as Qualis; // converte para o tipo Qualis
              return { y: item.y, color: getColorForInstitution(qualis) };
            }),
          },
        ],
        plotOptions: {
          series: {
            colorByPoint: false,
            pointWidth: null,
            dataLabels: {
              enabled: true,
              inside: true,
              style: {
                color: 'white',
                fontSize: '18px',
                textOutline: '0px contrast',
                fontFamily: 'Ubuntu, sans-serif',
              },
            },
          },
          column: {},
        },
      });
    }
  }, [props.articles]);

  function getColorForInstitution(qualis: Qualis) {
    const colors = {
      A1: '#006837',
      A2: '#8FC53E',
      A3: '#ACC483',
      A4: '#BDC4B1',
      B1: '#F15A24',
      B2: '#F5831F',
      B3: '#F4AD78',
      B4: '#F4A992',
      B5: '#F2D3BB',
      C: '#EC1C22',
      SQ: '#560B11',
      NP: '#560B11',
    };
    return colors[qualis] || '#000000';
  }


    return(
        <Alert className="pt-12">
           
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Alert>
    )
}
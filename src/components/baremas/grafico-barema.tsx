import { useContext, useMemo, useState } from "react";


type Institutions = {
    pesquisadores: any[]
}

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export function GraficoBarema(props: Institutions) {
    // gráfico
  const [chartOptions, setChartOptions] = useState({});


  useMemo(() => {
    // ...
    if (props.pesquisadores) {
      const categories = props.pesquisadores.map((d) => d.name);
      const amongValues = props.pesquisadores.map((d) => Number(d.total));
      const sumAmongValues = amongValues.reduce((acc, cur) => acc + cur, 0);

      setChartOptions({
        chart: {
          type: "column",
          backgroundColor: 'transparent',
          fontFamily: 'Ubuntu, sans-serif',
          height: '300px',

          display: 'flex',
          position: 'relative'
        },
        title: {
          text: "",
        },
        xAxis: {
          categories,
        },
        yAxis: {
          title: {
            text: "Quantidade",
          },
        },
        series: [
          {
            name: "Pesquisadores",
            data: amongValues,
          },
        ],
        tooltip: {
          pointFormat: "<b>{point.y}</b> ocorrências",
        },
        
        credits: {
          enabled: false
        },
        plotOptions: {
          column: {
            color: "#173DFF",
            dataLabels: {
              enabled: true,
              inside: true,
              style: {
                color: 'white', // cor do texto dentro da barra
                fontSize: '18px', // tamanho da fonte
                textOutline: '0px contrast', // cor da borda do texto
                fontFamily: 'Ubuntu, sans-serif'
              },
            },
          },
        },
      });
    }
  }, [props.pesquisadores]);

    return(
        
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        
    )
}
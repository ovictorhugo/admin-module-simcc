import { useContext, useMemo, useState } from "react";
import { Alert } from "../../../ui/alert";

type Institutions = {
    institutions: any[];
}

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { UserContext } from "../../../../context/context";

export function GraficoInstitutionsHome(props: Institutions) {
    // gráfico
  const [chartOptions, setChartOptions] = useState({});
  const {navbar} = useContext(UserContext)

  useMemo(() => {
    // ...
    if (props.institutions) {
      const categories = props.institutions.map((d) => d.institution);
      const amongValues = props.institutions.map((d) => Number(d.among));
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
            name: "Instituições",
            data: amongValues,
          },
        ],
        tooltip: {
          pointFormat: "<b>{point.y}</b> ocorrências",
        },
        subtitle: {
          text: `Total: ${sumAmongValues}`,
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
  }, [props.institutions, navbar]);

    return(
        <Alert className="pt-12">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Alert>
    )
}

import Highcharts from 'highcharts';
import Highmaps from 'highcharts/highmaps';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

import { UserContext } from '../../context/context'
import { useEffect, useState, useContext } from "react";
import { useTheme } from "next-themes"

// Initialize Highcharts modules
HighchartsAccessibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsOfflineExporting(Highcharts);

interface GraduateProgram {
  graduatePrograms: any[]
}

// Importar dados GeoJSON do Brasil

import brazilStatesGeoJSON from './ba_state.json'; // Substitua pelo caminho correto

function BahiaMap(props:GraduateProgram) {
  const { urlGeral } = useContext(UserContext);
  const { theme } = useTheme()
  const { idGraduateProgram, setIdGraduateProgram } = useContext(UserContext);

  const { estadoSelecionado, setEstadoSelecionado } = useContext(UserContext);

   // Defina as cores do mapa
   const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026'];


  // UseEffect para inicializar o gráfico quando o componente for montado
  useEffect(() => {
    // Assumindo que você já tenha os dados dos programas de pós-graduação em graduatePrograms

// Crie um objeto para armazenar a contagem de programas por estado
const cityProgramCount: Record<string, number> = {};
  props.graduatePrograms.forEach((program) => {
    const city = program.city;
    if (cityProgramCount[city]) {
      cityProgramCount[city] += 1;
    } else {
      cityProgramCount[city] = 1;
    }
  });

// Agora você pode criar o array brazilStateData com base na contagem
const brazilCityData = Object.entries(cityProgramCount).map(([city, count]) => ({
  name: city.toString(),
  value: parseFloat(String(count)) || 0,
}));


    // Inicialize o gráfico
    const chart = Highmaps.mapChart( {
      chart: {
        renderTo: 'containerone',
        map: brazilStatesGeoJSON,
        backgroundColor: 'transparent',
     
        
     
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
     
      
   
      legend: {
        enabled: false, // Defina esta propriedade como false para remover a legenda
      },
      colorAxis: {
        tickPixelInterval: 100,
      },
      series: [
        {
          type: 'map',
          data: brazilCityData,
          keys: ['name', 'value'],
          joinBy: 'name',
          
       
          // Habilitar drilldown para estados
          allowPointSelect: false,
          cursor: 'pointer',
       
          point: {
            events: {
              // Lidar com o evento de clique para os estados
              click: function () {
                const city = (this.options as { name: string })['name'];

                // Implementar lógica de zoom ou drilldown aqui

                if (cityProgramCount[city] === 1) {
                  
                  // Procurar pelo programa de pós-graduação com o estado correspondente e obter o ID
                  const programWithState = props.graduatePrograms.find(program => program.city === city);
                  if (programWithState) {
                
                    const programId = programWithState.graduate_program_id;
                   
                    // Definir o ID do programa selecionado em selectedGraduateProgramId
                    setIdGraduateProgram(programId);
                    console.log(idGraduateProgram)
                  }
                }

                setEstadoSelecionado(city);

                if (cityProgramCount[city] > 1) {
                  setIdGraduateProgram('0');
                }
           
               
                console.log(`Estado clicado: ${city}`);
                // Dar zoom no estado clicado
               
              },
            },

            
          },
          color: colors,

        
        },
      ],
    });


    // Limpar o gráfico quando o componente for desmontado
    return () => {
      chart.destroy();
    };
  }, [props.graduatePrograms]); // O array vazio garante que o useEffect seja executado apenas uma vez na montagem

  return <div className={` absolute w-[140%] h-[130%] left-[-20px]`} id="containerone" />;
}

export default BahiaMap;

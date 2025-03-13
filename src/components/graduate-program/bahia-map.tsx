
import Highcharts from 'highcharts';
import Highmaps from 'highcharts/highmaps';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';


import { useEffect, useState, useContext } from "react";

// Initialize Highcharts modules
HighchartsAccessibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsOfflineExporting(Highcharts);

interface GraduateProgram {
  area: string;
  code: string;
  graduate_program_id: string;
  modality: string;
  name: string;
  rating: string;
  type: string;
  city: string
  state: string
  instituicao: string
  url_image: string
  region: string
  sigla: string
  latitude: string
  longitude: string
}
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

// Importar dados GeoJSON do Brasil

import brazilStatesGeoJSON from './ba_state.json';
import mgStateGeoJSON from './mg_state.json'; // Substitua pelo caminho correto
import { UserContext } from '../../context/context';
import { useLocation, useNavigate } from 'react-router-dom';

function BahiaMap() {
  const { urlGeral, setUrlGeral, simcc } = useContext(UserContext);
  const { idGraduateProgram, setIdGraduateProgram } = useContext(UserContext);
  const [graduatePrograms, setGraduatePrograms] = useState<GraduateProgram[]>([]);

   const navigate = useNavigate();
  const queryUrl = useQuery();

   
  const urlGraduateProgram = `${urlGeral}/graduate_program_profnit?id=`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlGraduateProgram, {
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
          setGraduatePrograms(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [urlGraduateProgram]);

  console.log(urlGraduateProgram)

  // UseEffect para inicializar o gráfico quando o componente for montado
  useEffect(() => {
    // Assumindo que você já tenha os dados dos programas de pós-graduação em graduatePrograms

// Crie um objeto para armazenar a contagem de programas por estado
const cityProgramCount: Record<string, number> = {};
  graduatePrograms.forEach((program) => {
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
        map: simcc ? brazilStatesGeoJSON : mgStateGeoJSON,
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
                queryUrl.set('cities', city);
                navigate({
                  pathname: '/pos-graduacao',
                  search: queryUrl.toString(),
                });
              },
            },

            
          },
        
        },
      ],
    });


    // Limpar o gráfico quando o componente for desmontado
    return () => {
      chart.destroy();
    };
  }, [graduatePrograms]); // O array vazio garante que o useEffect seja executado apenas uma vez na montagem

  return <div className={` absolute w-[140%] z-[3] h-full left-[-20px]`} id="containerone" />;
}

export default BahiaMap;

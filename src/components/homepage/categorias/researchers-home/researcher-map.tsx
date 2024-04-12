import { useContext, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer,  Popup, CircleMarker, Tooltip } from 'react-leaflet';
import municipios from './municipios.json';
import { MapPin } from 'lucide-react';
import unorm from 'unorm';
import "leaflet/dist/leaflet.css"
import { UserContext } from '../../../../context/context';
import { useModal } from '../../../hooks/use-modal-store';

type Research = {
    researcher: any[];
}

type CityData = {
    nome: string;
    latitude: number;
    longitude: number;
    pesquisadores: number;
    professores: string[];
    lattes_10_id: string,
  };

export function ResearcherMap(props:Research) {
  const { onOpen } = useModal();
    const [cityData, setCityData] = useState<CityData[]>([]);
    const mapRef = useRef(null);
    const {urlGeral} = useContext(UserContext)
    const [mapFocused, setMapFocused] = useState(false);

    const [defaultZoom] = useState(5.5);
    const [positionInit ] = useState({lat: -13.29, lng: -41.71 })

    const normalizeCityName = (cityName: string) => {
        // Normaliza o nome da cidade (ex: "Ilhéus" -> "Ilheus")
        return cityName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

    useEffect(() => {
         // Contar a quantidade de pesquisadores por cidade
         const counts: { [city: string]: number } = {};
         const cityProfessors: { [city: string]: string[] } = {}; // Armazena os nomes dos professores por cidade
         const cityLattess1Ids: { [city: string]: string } = {};

         const normalizedData = props.researcher.map((research: any) => ({
           ...research,
           city: normalizeCityName(research.city),
         }));

         normalizedData.forEach((research: any) => {
           const city = research.city;
           const codigoUf = municipios.find(
             (municipio: any) => normalizeCityName(municipio.nome) === city
           )?.codigo_uf;

           if (codigoUf === 29) {
             counts[city] = (counts[city] || 0) + 1;

             // Adiciona o nome do professor à lista da cidade
             if (!cityProfessors[city]) {
               cityProfessors[city] = [];
             }
             cityProfessors[city].push(research.name);

             // Adiciona o lattess_1_id à lista da cidade
             if (!cityLattess1Ids[city]) {
               cityLattess1Ids[city] = research.lattes_10_id;
             }
           }
         });

         const updatedCityData: CityData[] = [];
         municipios.forEach((municipio: any) => {
           const cityName = normalizeCityName(municipio.nome);
           const pesquisadores = counts[cityName] || 0;

           if (pesquisadores > 0 && municipio.codigo_uf === 29) {
             updatedCityData.push({
               nome: municipio.nome,
               latitude: municipio.latitude,
               longitude: municipio.longitude,
               pesquisadores: pesquisadores,
               professores: cityProfessors[cityName] || [], // Adiciona a lista de professores
               lattes_10_id: cityLattess1Ids[cityName] || '',
             });
           }
         });

         setCityData(updatedCityData);
}, [props.researcher]);

    return(
        <div onClick={() => setMapFocused(true)} className="h-[400px] rounded-md mb-8">
      <MapContainer 
      ref={mapRef} 
      center={positionInit} 
      style={{ fontFamily: 'Ubuntu, sans-serif' }} 
      zoom={defaultZoom} 
      scrollWheelZoom={false}
      
     
      
      className="w-full h-full rounded-md">
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {cityData.map((city) => (
    <CircleMarker
      center={[city.latitude, city.longitude]}
      key={city.nome}
      radius={Math.sqrt(city.pesquisadores) * 4}
      fillColor="#173DFF"
      fillOpacity={0.5}
      color="blue"
      style={`outline: "none"`}
      onClick={() => {onOpen('map-researchers-modal', cityData)}}
    >
      
     
    </CircleMarker>
  ))}
</MapContainer>

    </div>
    )
}
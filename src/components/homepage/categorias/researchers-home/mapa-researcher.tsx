import Map, { Marker, Popup } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { useState, useRef } from 'react';


const defaultCenter = {
  latitude: -14.235, // Centro aproximado do Brasil
  longitude: -51.9253,
};
const defaultZoom = 4;

// Tipagem para os dados das cidades
type CityData = {
  nome: string;
  latitude: number;
  longitude: number;
  pesquisadores: number;
  professores: string[];
  lattes_10_id: string;
};

interface Props {
    cityData:CityData[]
}

export default function MapaResearcher(props:Props) {
  const [cityData, setCityData] = useState<CityData[]>(props.cityData || []);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const mapRef = useRef(null);

  if (!import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN) {
    return <div>Mapbox token não encontrado</div>;
  }

  return (
    <div className="relative h-[350px] w-full rounded-md mb-8" onClick={() => setSelectedCity(null)}>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: defaultCenter.latitude,
          longitude: defaultCenter.longitude,
          zoom: defaultZoom,
        }}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN}
        reuseMaps={true}
        attributionControl={true}
        cursor="pointer"
      
        interactive={true}
        renderWorldCopies={false}>
        {Array.isArray(cityData) && cityData.map((city) => (
          <Marker
            key={city.nome}
            latitude={city.latitude}
            longitude={city.longitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation(); // Evitar conflitos no clique
              setSelectedCity(city);
            }}
          >
            <div className="relative flex justify-center items-center w-8 h-8 bg-blue-500 text-white rounded-full">
              {city.pesquisadores}
            </div>
          </Marker>
        ))}

        {selectedCity && (
          <Popup
            latitude={selectedCity.latitude}
            longitude={selectedCity.longitude}
            onClose={() => setSelectedCity(null)}
            closeButton={true}
            closeOnClick={false}
            className="rounded-lg shadow-lg bg-white">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{selectedCity.nome}</h3>
              <div className="text-sm text-gray-600 mb-4">
                Pesquisadores: {selectedCity.pesquisadores}
              </div>
              <div className="text-sm max-h-32 overflow-y-auto">
                {selectedCity.professores.map((professor, index) => (
                  <div key={index} className="p-2 border-b border-gray-200">
                    {professor}
                  </div>
                ))}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

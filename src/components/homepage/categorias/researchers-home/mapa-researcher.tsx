import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useRef, useEffect } from 'react';

const defaultCenter = {
  latitude: -14.235, // Centro aproximado do Brasil
  longitude: -51.9253,
};
const defaultZoom = 4;

type CityData = {
  nome: string;
  latitude: number;
  longitude: number;
  pesquisadores: number;
  professores: string[];
  lattes_10_id: string;
};

interface Props {
  cityData: CityData[];
}

export default function MapaResearcher(props: Props) {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const mapRef = useRef(null);

  if (!import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN) {
    return <div>Mapbox token não encontrado</div>;
  }

  useEffect(() => {
    console.log(selectedCity)
  }, [selectedCity]);


  return (
    <div className="h-[350px] w-full rounded-md mb-8" onClick={() => setSelectedCity(null)}>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: defaultCenter.latitude,
          longitude: defaultCenter.longitude,
          zoom: defaultZoom,
        }}
        style={{ top: 0, bottom: 0, left: 0, right: 0, width: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN}
        reuseMaps={true}
        attributionControl={true}

        interactive={true}
        renderWorldCopies={false}>
        {props.cityData.map((city) => {
          const markerSize = Math.max(20, Math.log2(city.pesquisadores + 1) * 6); // Tamanho proporcional

          return (
            <Marker
              key={city.nome}
              latitude={city.latitude}
              longitude={city.longitude}
              style={{
                zIndex: selectedCity?.nome === city.nome ? 10 : 5, // Destaca o marcador ativo
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.originalEvent.stopPropagation(); // Evitar conflitos no clique
                setSelectedCity(city);

              }}
            >
              <div
                className="flex  z-[-1] justify-center items-center bg-eng-blue/70 border-4 border-eng-blue text-white rounded-full"
                style={{
                  width: `${markerSize}px`,
                  height: `${markerSize}px`,
                  lineHeight: `${markerSize}px`,
                  fontSize: `${markerSize / 4}px`,
                }}
                onClick={(e) => {

                  setSelectedCity(city);

                }}
              >
                {city.pesquisadores}
              </div>
            </Marker>
          );
        })}

        {selectedCity?.longitude != 0 && (
          <Popup
            latitude={selectedCity?.latitude || 0}
            longitude={selectedCity?.longitude || 0}
            onClose={() => setSelectedCity(null)}
            closeButton={true}
            closeOnClick={false}
            className="rounded-lg bg-white"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{selectedCity?.nome}</h3>
              <div className="text-sm text-gray-600 mb-4">
                Pesquisadores: {selectedCity?.pesquisadores}
              </div>
              <div className="text-sm max-h-32 overflow-y-auto">
                {selectedCity?.professores.map((professor, index) => (
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

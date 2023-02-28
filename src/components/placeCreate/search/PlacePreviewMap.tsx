import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { PlacePreviewMapProps } from '@/types/place';

const PlacePreviewMap = ({
  latitude,
  longitude,
  width = '100%',
  height = '200px',
  level = 5,
  draggable = false,
  mapMarkers,
}: PlacePreviewMapProps) => {
  return (
    <Map
      center={{
        lat: latitude,
        lng: longitude,
      }}
      isPanto={true}
      draggable={draggable}
      level={level}
      style={{
        width,
        height,
      }}>
      {mapMarkers ? (
        mapMarkers.map(({ id, latitude, longitude }) => (
          <MapMarker key={id} position={{ lat: latitude, lng: longitude }} />
        ))
      ) : (
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      )}
    </Map>
  );
};

export default PlacePreviewMap;

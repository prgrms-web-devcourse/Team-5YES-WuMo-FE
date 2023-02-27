import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { PlacePreviewMapProps } from '@/types/place';

const PlacePreviewMap = ({
  latitude,
  longitude,
  width = '100%',
  height = '15.625rem',
  level = 3,
}: PlacePreviewMapProps) => {
  return (
    <Map
      center={{
        lat: latitude,
        lng: longitude,
      }}
      isPanto={true}
      draggable={false}
      level={level}
      style={{
        width,
        height,
      }}>
      <MapMarker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
};

export default PlacePreviewMap;

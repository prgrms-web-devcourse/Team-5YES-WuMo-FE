import { Map, MapMarker } from 'react-kakao-maps-sdk';

type Props = {
  latitude: number;
  longitude: number;
  width?: string;
  height?: string;
  level?: number;
};

const PlacePreviewMap = ({
  latitude,
  longitude,
  width = '100%',
  height = '250px',
  level = 3,
}: Props) => {
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

import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Map, MapMarker, useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import { Link, useParams } from 'react-router-dom';

import Loading from '@/components/base/Loading';
import { PlacePreviewMapProps } from '@/types/place';
import { getGitEmoji } from '@/utils/constants/emoji';

const PlacePreviewMap = ({
  latitude,
  longitude,
  width = '100%',
  height = '12.5rem',
  level = 5,
  draggable = false,
  mapMarkers,
}: PlacePreviewMapProps) => {
  const { partyId } = useParams();
  const [selectedMarker, setSelectedMarker] = useState<number | null>();

  const { loading, error } = useInjectKakaoMapApi({
    appkey: import.meta.env.VITE_KAKAO_API_JS_KEY,
  });

  if (loading) return <Loading />;
  if (error) return <></>;

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
        mapMarkers.map(({ id, name, latitude, longitude, category }) => (
          <MapMarker
            position={{ lat: latitude, lng: longitude }}
            key={id}
            image={{
              src: getGitEmoji(category), // TODO: 좀 더 눈에 띄는 마커로 개선
              size: {
                width: 40,
                height: 40,
              },
            }}
            onClick={() => setSelectedMarker(id === selectedMarker ? null : id)}>
            {selectedMarker === id && (
              <Link to={`/place/${id}`} state={{ partyId: Number(partyId) }}>
                <Box
                  display='inline-block'
                  width='150px'
                  height='43px'
                  padding='0.7rem'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  fontWeight='bold'
                  textOverflow='ellipsis'
                  textAlign='center'>
                  {name}
                </Box>
              </Link>
            )}
          </MapMarker>
        ))
      ) : (
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      )}
    </Map>
  );
};

export default PlacePreviewMap;

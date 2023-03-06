import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';

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
  const [selectedMarker, setSelectedMarker] = useState<number>();

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
            onClick={() => setSelectedMarker(id)}>
            {selectedMarker === id && (
              <Link to={`/place/${id}`}>
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

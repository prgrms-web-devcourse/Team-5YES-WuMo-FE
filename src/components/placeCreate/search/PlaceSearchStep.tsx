import { Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import useMapPlaces from '@/hooks/useMapPlaces';
import { description } from '@/utils/constants/place';

import PlaceList from './PlaceList';
import PlacePreviewMap from './PlacePreviewMap';
import PlaceSearchForm from './PlaceSearchForm';

const PlaceSearchStep = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem>();
  const { result, searchPlaces, resetResult } = useMapPlaces();

  return (
    <>
      <PlaceSearchForm
        searchPlaceHandler={searchPlaces}
        resetPlaceHandler={() => {
          setSelectedPlace(undefined);
          resetResult();
        }}
      />
      {result ? (
        <>
          {selectedPlace && (
            <PlacePreviewMap
              latitude={Number(selectedPlace.y)}
              longitude={Number(selectedPlace.x)}
            />
          )}
          <PlaceList
            selectedPlace={selectedPlace?.id || null}
            places={result}
            selectPlaceHandler={setSelectedPlace}
          />
        </>
      ) : (
        <Stack spacing='8' marginLeft='0' paddingTop='5'>
          <Text size='sm'>멤버들과 공유하고 싶은 장소를 검색해 보세요.</Text>
          {description.map(({ subtitle, example }, id) => (
            <Stack key={id} spacing='2'>
              <Text fontWeight='bold' size='xs' color='gray.600'>
                {subtitle}
              </Text>
              <Text size='xs'>예: {example}</Text>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default PlaceSearchStep;

import { Container, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import useMapPlaces from '@/src/hooks/useMapPlaces';

import PlaceList from './PlaceList';
import PlacePreviewMap from './PlacePreviewMap';
import PlaceSearchForm from './PlaceSearchForm';

const PlaceSearchStep = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem>();
  const { result, searchPlaces, resetResult } = useMapPlaces();

  return (
    <>
      <Flex gap='1' align='center' padding='2.5' paddingBottom='4'>
        <PlaceSearchForm
          searchPlaceHandler={searchPlaces}
          resetPlaceHandler={() => {
            setSelectedPlace(undefined);
            resetResult();
          }}
        />
      </Flex>
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
        <Container maxW='full' paddingTop='3'>
          파티원과 공유하고 싶은 장소를 검색해 보세요.
        </Container>
      )}
    </>
  );
};

export default PlaceSearchStep;

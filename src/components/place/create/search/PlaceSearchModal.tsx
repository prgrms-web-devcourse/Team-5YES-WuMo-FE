import { ModalBody, ModalFooter, Stack, Text } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import ModalButton from '@/components/base/ModalButton';
import Toast from '@/components/base/toast/Toast';
import {
  createPlaceState,
  createPlaceStepState,
  placeSearchState,
} from '@/store/recoilPlaceState';
import { description } from '@/utils/constants/place';
import { processStep } from '@/utils/constants/processStep';

import PlaceList from './PlaceList';
import PlacePreviewMap from './PlacePreviewMap';
import PlaceSearchForm from './PlaceSearchForm';

const PlaceSearchModal = () => {
  const searchState = useRecoilValue(placeSearchState);
  const [step, setStep] = useRecoilState(createPlaceStepState);
  const [createPlaceBody, setCreatePlaceBody] = useRecoilState(createPlaceState);

  const handleClick = () => {
    if (!searchState.selectedPlace.id) {
      Toast.show({
        message: '장소를 선택해 주세요.',
        type: 'warning',
      });
      return;
    }

    if (step < processStep.placeCreateMax) {
      setStep(step + 1);
      setCreatePlaceBody({
        ...createPlaceBody,
        name: searchState.selectedPlace.place_name,
        address:
          searchState.selectedPlace.road_address_name ||
          searchState.selectedPlace.address_name,
        longitude: parseFloat(searchState.selectedPlace.x),
        latitude: parseFloat(searchState.selectedPlace.y),
      });
    }
  };

  return (
    <>
      <ModalBody>
        <PlaceSearchForm />
        {searchState.result.length > 0 ? (
          <>
            {searchState.selectedPlace.id && (
              <PlacePreviewMap
                latitude={
                  searchState.selectedPlace?.y
                    ? parseFloat(searchState.selectedPlace.y)
                    : createPlaceBody.latitude
                }
                longitude={
                  searchState.selectedPlace?.x
                    ? parseFloat(searchState.selectedPlace.x)
                    : createPlaceBody.longitude
                }
              />
            )}
            <PlaceList />
          </>
        ) : (
          <Stack spacing='8' marginLeft='0' paddingTop='5'>
            <Text size='sm'>파티원과 공유하고 싶은 장소를 검색해 보세요.</Text>
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
      </ModalBody>
      <ModalFooter>
        <ModalButton
          text='다음'
          isDisabled={!searchState.selectedPlace.id}
          clickButtonHandler={handleClick}
        />
      </ModalFooter>
    </>
  );
};

export default PlaceSearchModal;

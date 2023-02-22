import {
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import useMapPlaces from '@/src/hooks/useMapPlaces';

import PlaceListTable from './PlaceListTable';
import PlacePreviewMap from './PlacePreviewMap';
import PlaceSearchForm from './PlaceSearchForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PlaceSearchModal = ({ isOpen, onClose }: Props) => {
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem>();
  const initialRef = useRef(null);
  const { searchPlaces, result } = useMapPlaces();

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
      size='full'>
      <ModalOverlay />
      <ModalContent backgroundColor='white'>
        <ModalBody>
          <Flex gap='1' align='center' padding='10px 0'>
            <ModalCloseButton position='initial' />
            <PlaceSearchForm initialRef={initialRef} searchHandler={searchPlaces} />
          </Flex>
          {result ? (
            <>
              {selectedPlace && (
                <PlacePreviewMap
                  latitude={Number(selectedPlace.y)}
                  longitude={Number(selectedPlace.x)}
                />
              )}
              <PlaceListTable
                selectedPlace={selectedPlace?.id || null}
                places={result}
                placeHandler={setSelectedPlace}
              />
            </>
          ) : (
            <Container maxW='full' paddingTop='3'>
              파티원과 공유하고 싶은 장소를 검색해 보세요.
            </Container>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlaceSearchModal;

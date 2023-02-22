import {
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useRef } from 'react';

import useMapPlaces from '@/src/hooks/useMapPlaces';

import PlaceListTable from './PlaceListTable';
import PlaceSearchForm from './PlaceSearchForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PlaceSearchModal = ({ isOpen, onClose }: Props) => {
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
          <Flex gap='1' align='center'>
            <ModalCloseButton position='initial' />
            <PlaceSearchForm initialRef={initialRef} searchHandler={searchPlaces} />
          </Flex>
          {result ? (
            <PlaceListTable places={result} />
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

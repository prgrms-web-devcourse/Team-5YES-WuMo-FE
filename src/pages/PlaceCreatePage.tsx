import { Button, useDisclosure } from '@chakra-ui/react';

import PlaceCreateModal from '@/components/party/place/PlaceCreateModal';

const PlaceCreatePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>장소 검색</Button>

      <PlaceCreateModal isOpen={isOpen} closeModalHandler={onClose} />
    </>
  );
};

export default PlaceCreatePage;

import { Button, useDisclosure } from '@chakra-ui/react';

import PlaceSearchModal from '@/components/party/place/PlaceSearchModal';

const PlaceCreatePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>장소 검색</Button>

      <PlaceSearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PlaceCreatePage;

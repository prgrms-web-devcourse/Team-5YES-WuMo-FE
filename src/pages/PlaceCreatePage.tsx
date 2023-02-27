import { Button, useDisclosure } from '@chakra-ui/react';

const PlaceCreatePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(isOpen, onClose);
  return (
    <>
      <Button onClick={onOpen}>장소 검색</Button>
    </>
  );
};

export default PlaceCreatePage;

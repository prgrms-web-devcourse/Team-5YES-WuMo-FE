import { Button, useDisclosure } from '@chakra-ui/react';

const PlaceCreatePage = () => {
  const { onOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>장소 검색</Button>
    </>
  );
};

export default PlaceCreatePage;

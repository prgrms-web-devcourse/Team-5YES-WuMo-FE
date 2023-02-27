import { Button, useDisclosure } from '@chakra-ui/react';

import PlaceCreatePage from '../components/party/place/PlaceCreateModal';

const PartyPlanPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>PartyPlanPage</div>
      <Button onClick={onOpen}>후보지 추가</Button>
      <PlaceCreatePage isOpen={isOpen} closeModalHandler={onClose} />
    </>
  );
};

export default PartyPlanPage;

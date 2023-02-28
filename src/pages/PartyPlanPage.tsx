import { Button, useDisclosure } from '@chakra-ui/react';

import PlaceCreateModal from '@/components/party/place/create/PlaceCreateModal';

const PartyPlanPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>PartyPlanPage</div>
      <Button onClick={onOpen}>후보지 추가</Button>
      <PlaceCreateModal isOpen={isOpen} closeModalHandler={onClose} />
    </>
  );
};

export default PartyPlanPage;

import { Modal, ModalCloseButton, ModalContent, ModalHeader } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '@/components/base/Loading';
import PlaceEditModal from '@/components/place/edit/PlaceEditModal';

const PlaceEditPage = () => {
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  console.log(state);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const onCloseModal = () => {
    setIsOpen(false);
    navigate(-1);
  };

  if (!state) return <Loading></Loading>;

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size='full'>
      <ModalContent w='maxWidth.mobile'>
        <ModalCloseButton position='initial' size='sm' margin='0.5rem' />
        <ModalHeader>후보지 수정</ModalHeader>
        <PlaceEditModal place={state.place} partyId={state.partyId} />
      </ModalContent>
    </Modal>
  );
};

export default PlaceEditPage;

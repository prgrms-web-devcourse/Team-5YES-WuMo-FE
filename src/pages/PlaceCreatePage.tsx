import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Progress,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';

import { createPlaceStepState } from '@/store/recoilPlaceState';
import { placeCreateStepItems, processStep } from '@/utils/constants/processStep';
import ROUTES from '@/utils/constants/routes';

const PlaceCreatePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useRecoilState<number>(createPlaceStepState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = () => {
    if (step > processStep.min) setStep(step - 1);
    else {
      setIsOpen(false);
      navigate(ROUTES.PLAN);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size='full'>
      <ModalContent w='maxWidth.mobile'>
        <ModalCloseButton position='initial' size='lg'>
          <MdKeyboardArrowLeft />
        </ModalCloseButton>
        <Progress value={processStep.process * step} colorScheme='red' size='sm' />
        <ModalHeader>{placeCreateStepItems[step - 1].title}</ModalHeader>
        {placeCreateStepItems[step - 1].component}
      </ModalContent>
    </Modal>
  );
};

export default PlaceCreatePage;

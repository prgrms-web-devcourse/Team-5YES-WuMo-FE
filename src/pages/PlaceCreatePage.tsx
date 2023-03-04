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
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  createPlaceState,
  createPlaceStepState,
  initialPlaceSearchState,
  initialPlaceState,
  placeSearchState,
} from '@/store/recoilPlaceState';
import { placeCreateStepItems, processStep } from '@/utils/constants/processStep';
import ROUTES from '@/utils/constants/routes';

const PlaceCreatePage = () => {
  const navigate = useNavigate();
  const setCreatePlaceBody = useSetRecoilState(createPlaceState);
  const setPlaceSearchState = useSetRecoilState(placeSearchState);
  const [step, setStep] = useRecoilState<number>(createPlaceStepState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = () => {
    if (step > processStep.min) setStep(step - 1);
    else {
      const canClose = confirm('후보지 추가를 취소하시겠습니까?'); // TODO: 값 선택한 경우에만 하도록 처리
      if (!canClose) return;

      setCreatePlaceBody(initialPlaceState);
      setPlaceSearchState(initialPlaceSearchState);
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

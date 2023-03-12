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

const PlaceCreatePage = () => {
  const navigate = useNavigate();
  const setCreatePlaceBody = useSetRecoilState(createPlaceState);
  const setPlaceSearchState = useSetRecoilState(placeSearchState);
  const [step, setStep] = useRecoilState<number>(createPlaceStepState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const isFirstStep = () => step === processStep.min;

  const onCloseModal = () => {
    if (!isFirstStep()) setStep(step - 1);
    else {
      const canClose = confirm('후보지 추가를 취소하시겠습니까?'); // TODO: 값 선택한 경우에만 하도록 처리
      if (!canClose) return;

      setCreatePlaceBody(initialPlaceState);
      setPlaceSearchState(initialPlaceSearchState);
      setIsOpen(false);
      navigate(-1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size='full'>
      <ModalContent w='maxWidth.mobile'>
        <ModalCloseButton
          position='initial'
          size={isFirstStep() ? 'sm' : 'lg'}
          margin={isFirstStep() ? '0.5rem' : 0}>
          {!isFirstStep() && <MdKeyboardArrowLeft />}
        </ModalCloseButton>
        <Progress value={processStep.process * step} colorScheme='red' size='sm' />
        <ModalHeader>{placeCreateStepItems[step - 1].title}</ModalHeader>
        {placeCreateStepItems[step - 1].component}
      </ModalContent>
    </Modal>
  );
};

export default PlaceCreatePage;

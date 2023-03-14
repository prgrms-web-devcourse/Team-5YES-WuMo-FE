import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useRecoilState, useResetRecoilState } from 'recoil';

import ConfirmModal from '@/components/base/ConfirmModal';
import {
  createPlaceState,
  createPlaceStepState,
  placeSearchState,
} from '@/store/recoilPlaceState';
import { placeCreateStepItems, processStep } from '@/utils/constants/processStep';

const PlaceCreatePage = () => {
  const navigate = useNavigate();
  const resetCreatePlaceBody = useResetRecoilState(createPlaceState);
  const resetPlaceSearchState = useResetRecoilState(placeSearchState);
  const resetCreatePlaceStep = useResetRecoilState(createPlaceStepState);
  const [step, setStep] = useRecoilState<number>(createPlaceStepState);
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose,
  } = useDisclosure();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const isFirstStep = () => step === processStep.min;

  const onCloseModal = () => {
    !isFirstStep ? setStep(step - 1) : onConfirmModalOpen();
  };

  return (
    <>
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
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        hasCloseButton
        closeModalHandler={onConfirmModalClose}
        body={
          <Box textAlign='center'>
            <Text>후보지 추가를 취소하시겠습니까?</Text>
          </Box>
        }
        buttonText={{ primary: '확인', secondary: '취소' }}
        clickButtonHandler={{
          primary: () => {
            resetCreatePlaceBody();
            resetPlaceSearchState();
            resetCreatePlaceStep();
            setIsOpen(false);
            navigate(-1);
          },
          secondary: () => onConfirmModalClose(),
        }}
      />
    </>
  );
};

export default PlaceCreatePage;

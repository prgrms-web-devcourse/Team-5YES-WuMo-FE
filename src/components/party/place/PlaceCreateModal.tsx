import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { PlaceCreateModalProps } from '@/types/place';

import { placeCreateStep, placeCreateStepItems } from './PlaceCreateStepItem';

const PlaceCreateModal = ({ isOpen, closeModalHandler }: PlaceCreateModalProps) => {
  const [step, setStep] = useState<number>(placeCreateStep.min);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() =>
        step > placeCreateStep.min ? setStep(step - 1) : closeModalHandler()
      }
      size='full'>
      <ModalContent w='maxWidth.mobile'>
        <ModalCloseButton position='initial' size='lg'>
          <MdKeyboardArrowLeft />
        </ModalCloseButton>
        <Progress value={placeCreateStep.size * step} colorScheme='red' size='sm' />
        <ModalHeader>{placeCreateStepItems[step - 1].title}</ModalHeader>
        <ModalBody>{placeCreateStepItems[step - 1].content}</ModalBody>
        <ModalFooter>
          <Button
            w='full'
            onClick={() => {
              if (step !== placeCreateStep.max) setStep(step + 1);
            }}>
            {step === placeCreateStep.max ? '후보지 추가' : '다음'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlaceCreateModal;

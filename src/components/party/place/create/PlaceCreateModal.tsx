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
import { placeCreateStepItems, processStep } from '@/utils/constants/processStep';

const PlaceCreateModal = ({ isOpen, closeModalHandler }: PlaceCreateModalProps) => {
  const [step, setStep] = useState<number>(processStep.min);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => (step > processStep.min ? setStep(step - 1) : closeModalHandler())}
      size='full'>
      <ModalContent w='maxWidth.mobile'>
        <ModalCloseButton position='initial' size='lg'>
          <MdKeyboardArrowLeft />
        </ModalCloseButton>
        <Progress value={placeCreateStep.size * step} colorScheme='red' size='sm' />
        <ModalHeader>{placeCreateStepItems[step].title}</ModalHeader>
        <ModalBody>{placeCreateStepItems[step].content}</ModalBody>
        <ModalFooter>
          <Button
            bg='primary.red'
            color='#ffffff'
            _hover={{
              bg: 'primary.redHover',
            }}
            w='full'
            onClick={() => {
              if (step !== processStep.placeCreateMax) setStep(step + 1);
            }}>
            {step === processStep.placeCreateMax ? '후보지 추가' : '다음'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlaceCreateModal;

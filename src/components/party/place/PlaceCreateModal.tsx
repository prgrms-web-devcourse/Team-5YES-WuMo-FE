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

import { PlaceCreateModalProps, StepInfo } from '@/types/place';

import PlaceCategoryStep from './PlaceCategoryStep';
import PlaceInfoStep from './PlaceInfoStep';
import PlaceSearchStep from './PlaceSearchStep';

const stepInfo: StepInfo[] = [
  {
    title: '후보지의 장소를 선택해 주세요.',
    content: <PlaceSearchStep />,
  },
  {
    title: '여기서 무엇을 하나요?',
    content: <PlaceCategoryStep />,
  },
  {
    title: '부가 정보를 입력해 주세요.',
    content: <PlaceInfoStep />,
  },
];

const placeCreateStep = {
  size: 30,
  min: 1,
  max: Object.keys(stepInfo).length,
} as const;

const PlaceCreateModal = ({ isOpen, closeModalHandler }: PlaceCreateModalProps) => {
  const [step, setStep] = useState<number>(placeCreateStep.min);

  return (
    <>
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
          <ModalHeader>{stepInfo[step - 1].title}</ModalHeader>
          <ModalBody>{stepInfo[step - 1].content}</ModalBody>
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
    </>
  );
};

export default PlaceCreateModal;

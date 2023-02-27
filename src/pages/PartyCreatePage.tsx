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
import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { partyCreateStepItems, processStep } from '@/utils/constants/processStep';
import ROUTES from '@/utils/constants/routes';

const PartyCreatePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(processStep.min);

  const onClosePartyCreateModal = () => {
    setIsOpen(false);
    navigate(ROUTES.MAIN);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() =>
        step > processStep.min ? setStep(step - 1) : onClosePartyCreateModal()
      }
      size='full'>
      <ModalContent w='maxWidth.mobile'>
        <ModalCloseButton position='initial' size='lg'>
          <MdKeyboardArrowLeft />
        </ModalCloseButton>
        <Progress value={processStep.process * step} colorScheme='red' size='sm' />
        <ModalHeader>{partyCreateStepItems[step - 1].title}</ModalHeader>
        <ModalBody>{partyCreateStepItems[step - 1].component}</ModalBody>
        <ModalFooter>
          <Button
            bg='primary.red'
            color='#ffffff'
            _hover={{
              bg: 'primary.redHover',
            }}
            w='full'
            onClick={() => {
              if (step !== processStep.partyCreateMax) setStep(step + 1);
            }}>
            {step === processStep.partyCreateMax ? '파티 생성' : '다음'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PartyCreatePage;

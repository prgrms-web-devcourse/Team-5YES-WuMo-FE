import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Progress,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import useDocumentTitle from '@/hooks/useDocumentTitle';
import { stepState } from '@/store/recoilPartyState';
import { partyCreateStepItems, processStep } from '@/utils/constants/processStep';
import ROUTES from '@/utils/constants/routes';

const PartyCreatePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useRecoilState<number>(stepState);
  useDocumentTitle('WuMoㅤ|ㅤ새 모임 만들기');

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
        {partyCreateStepItems[step - 1].component}
      </ModalContent>
    </Modal>
  );
};

export default PartyCreatePage;

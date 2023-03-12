import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '@/components/base/Loading';
import { PlacePatchBody } from '@/types/place';
import { PlaceEditInformationItems } from '@/utils/constants/processStep';

const PlaceEditPage = () => {
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState<PlacePatchBody>(state.place);

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
        <ModalBody>
          <Accordion allowToggle>
            {PlaceEditInformationItems.map(({ type, icon, text, content }) => (
              <AccordionItem key={type}>
                <AccordionButton justifyContent='space-between'>
                  <Flex gap='1.5' align='center'>
                    <AccordionIcon />
                    {icon}
                    {text}
                  </Flex>
                </AccordionButton>
                <AccordionPanel>{content}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlaceEditPage;

import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';

import { ConfirmModalProps } from '@/types/confirmModal';

const ConfirmModal = ({
  isOpen,
  hasCloseButton = false,
  closeModalHandler,
  body,
  buttonText,
  clickButtonHandler,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModalHandler} isCentered>
      <ModalOverlay />
      <ModalContent w='90%' pt='8' pb='5' borderRadius='3xl'>
        {hasCloseButton && <ModalCloseButton />}
        <ModalBody fontSize='lg' pt='4'>
          {body}
        </ModalBody>
        <ModalFooter justifyContent='center'>
          <ButtonGroup gap='8' mt='4'>
            {buttonText.secondary && (
              <Button
                backgroundColor='gray'
                color='white'
                size='lg'
                p='1.5rem 2.5rem'
                onClick={clickButtonHandler?.secondary || closeModalHandler}>
                {buttonText.secondary}
              </Button>
            )}
            {buttonText.primary && (
              <Button
                backgroundColor='primary.red'
                color='white'
                size='lg'
                p='1.5rem 2.5rem'
                onClick={clickButtonHandler?.primary}>
                {buttonText.primary}
              </Button>
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;

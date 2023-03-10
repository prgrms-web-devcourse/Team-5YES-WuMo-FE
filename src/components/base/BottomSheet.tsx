import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { BottomSheetProps } from '@/types/bottomSheet';

const BottomSheet = ({ isOpen, onClose, modal }: BottomSheetProps) => {
  return (
    <>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay height='100vh' maxW='35rem' left='0' right='0' margin='0 auto' />
        <ModalContent
          as={motion.div}
          position='fixed'
          bottom='0'
          mb='0'
          borderRadius='1.75rem 1.75rem 0 0'
          maxW='35rem'
          initial={{ y: 100 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            y: 300,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.5,
            },
          }}>
          <ModalHeader fontSize='2xl'>{modal.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center flexDir='column'>{modal.content}</Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BottomSheet;

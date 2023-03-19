import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import Toast from '@/components/base/toast/Toast';
import { InvitationCodeModalType } from '@/types/party';

const InvitationCodeModal = ({
  invitationCode,
  onClose,
  isOpen,
}: InvitationCodeModalType) => {
  const onCopyInvitationCode = () => {
    navigator.clipboard.writeText(invitationCode);
    Toast.show({
      title: '초대링크 복사가 완료되었어요!',
      message: '모임에 초대하고 싶은 친구에게 링크를 전달해보세요!',
      type: 'success',
    });
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w='85%'>
        <ModalHeader>초대 링크 공유</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex mb='1rem'>
            <Input defaultValue={invitationCode} readOnly mr='0.625rem' />
            <Button onClick={onCopyInvitationCode}>복사</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InvitationCodeModal;

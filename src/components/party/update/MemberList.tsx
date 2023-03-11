import { Avatar, Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';

import { deleteMemberBanish } from '@/api/party';
import ConfirmModal from '@/components/base/ConfirmModal';
import { isUpdateData } from '@/store/recoilPartyState';
import { PartyMemberProps } from '@/types/party';

const MemberList = ({
  members,
  partyId,
}: {
  members: PartyMemberProps[];
  partyId: number;
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const setUpdated = useSetRecoilState(isUpdateData);
  const [targetBanishMember, setTargetBanishMember] = useState('');
  const [memberId, setMemberId] = useState(0);

  const handleBanishMember = (nickname: string, memberId: number) => {
    setMemberId(memberId);
    setTargetBanishMember(nickname);
    onOpen();
  };

  return (
    <Box mb='10' maxH='240px' overflowY='scroll'>
      {members.map(({ memberId, nickname, role, profileImage, isLeader }) => (
        <Flex
          key={memberId}
          p='0.75rem'
          alignItems='center'
          borderBottom='1px solid #eeeeee'
          justify='space-between'
          borderRadius='0.5rem'>
          <Flex alignItems='center' gap='1rem'>
            <Avatar src={profileImage} w='38px' height='38px' />
            <Box>
              <Text>{nickname}</Text>
              <Text fontSize='0.75rem' color='#808080'>
                {role} {isLeader && '(파티장)'}
              </Text>
            </Box>
          </Flex>
          {isLeader ? (
            ''
          ) : (
            <Button
              fontSize='1rem'
              color='primary.red'
              p='0.5rem'
              onClick={() => handleBanishMember(nickname, memberId)}>
              <MdLogout />
            </Button>
          )}
        </Flex>
      ))}
      <ConfirmModal
        isOpen={isOpen}
        closeModalHandler={onClose}
        body={
          <Flex direction='column' align='center' pt='0'>
            {targetBanishMember}님을 모임에서 내보낼까요?
          </Flex>
        }
        clickButtonHandler={{
          primary: () => {
            deleteMemberBanish(partyId, memberId);
            setUpdated(true);
            onClose();
          },
        }}
        buttonText={{
          secondary: '취소',
          primary: '확인',
        }}
      />
    </Box>
  );
};

export default MemberList;

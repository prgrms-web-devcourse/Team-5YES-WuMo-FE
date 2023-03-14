import { Avatar, Box, Button, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { TbCrown } from 'react-icons/tb';

import { deleteMemberBanish } from '@/api/party';
import ConfirmModal from '@/components/base/ConfirmModal';
import { PartyMemberListProps, PartyMemberProps } from '@/types/party';

const MemberList = ({
  partyId,
  partyMemberList,
  partyMemberMeInfo,
}: {
  partyId: number;
  partyMemberList: PartyMemberListProps;
  partyMemberMeInfo: PartyMemberProps;
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [targetBanishMember, setTargetBanishMember] = useState('');
  const [otherMemberId, setOtherMemberId] = useState(0);

  const queryClient = useQueryClient();
  const { mutate: onClickBanishMember } = useMutation(deleteMemberBanish);

  const { isLeader, memberId } = partyMemberMeInfo;
  const myMemberId = memberId;
  const isLeaderMe = isLeader;

  const handleBanishMember = (nickname: string, otherMemberId: number) => {
    setOtherMemberId(otherMemberId);
    setTargetBanishMember(nickname);
    onOpen();
  };

  const isMemberMe = (myMemberId: number, otherMemberId: number) => {
    return myMemberId === otherMemberId;
  };

  return (
    <Box mb='10' maxH='240px' overflowY='scroll'>
      {partyMemberList.members.map(
        ({ memberId, nickname, role, profileImage, isLeader }) => (
          <Flex
            key={memberId}
            p='0.75rem'
            alignItems='center'
            borderBottom='1px solid #eeeeee'
            justify='space-between'
            borderRadius='0.5rem'>
            <Flex alignItems='center' gap='1rem'>
              <Avatar
                src={profileImage ? profileImage : undefined}
                w='38px'
                height='38px'
              />
              <Box>
                <Text>{nickname}</Text>
                <Flex fontSize='0.75rem' color='#808080' alignItems='center'>
                  {role}&nbsp;
                  {isLeader ? (
                    <Icon as={TbCrown} boxSize={4} color='#ebcf29' />
                  ) : isMemberMe(myMemberId, memberId) ? (
                    '(나)'
                  ) : (
                    ''
                  )}
                </Flex>
              </Box>
            </Flex>
            {isLeaderMe ? (
              <>
                {isLeaderMe && isMemberMe(myMemberId, memberId) ? (
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
              </>
            ) : (
              ''
            )}
          </Flex>
        )
      )}
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
            onClickBanishMember(
              { partyId, otherMemberId },
              {
                onSuccess: () => {
                  return queryClient.invalidateQueries(['partyUserList']);
                },
              }
            );
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

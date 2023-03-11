import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { fetchPartyMembers } from '@/api/party';
import { PartyMemberProps } from '@/types/party';

const PartyUserList = () => {
  const { partyId } = useParams();
  const {
    data: partyUserList,
    isLoading,
    isError,
  } = useQuery<{ members: PartyMemberProps[]; lastID: number }>(
    ['partyUserList', partyId],
    () => fetchPartyMembers(Number(partyId))
  );

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <Flex direction='row'>
      {partyUserList.members.map((user) => (
        <Flex key={user.memberId} direction='column' align='center' marginLeft='0.625rem'>
          <Avatar
            src={user.profileImage === null ? undefined : user.profileImage}
            size='sm'
          />
          <Text fontSize='sm'>{user.nickname}</Text>
          <Text fontSize='xs'>{user.role}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default PartyUserList;

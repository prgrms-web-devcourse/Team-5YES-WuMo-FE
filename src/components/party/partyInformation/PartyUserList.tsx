import { Avatar, AvatarGroup, Flex } from '@chakra-ui/react';
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
  } = useQuery<{ members: PartyMemberProps[]; lastId: number; totalMembers: number }>(
    ['partyUserList', partyId],
    () => fetchPartyMembers(Number(partyId))
  );

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <Flex px='4'>
      <AvatarGroup max={4} size='sm' spacing='-1'>
        {partyUserList.members.map((user) => (
          <Avatar
            name='프로필 이미지'
            key={user.memberId}
            src={user.profileImage === null ? undefined : user.profileImage}
            size='sm'
          />
        ))}
      </AvatarGroup>
    </Flex>
  );
};

export default PartyUserList;

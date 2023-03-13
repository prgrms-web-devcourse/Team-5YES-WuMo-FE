import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchPartyMembers } from '@/api/party';
import { isUpdateData, partyMemberListState } from '@/store/recoilPartyState';
import { PartyMemberProps } from '@/types/party';

const PartyUserList = () => {
  const { partyId } = useParams();
  const updated = useRecoilValue(isUpdateData);

  const {
    data: partyUserList,
    isLoading,
    isError,
  } = useQuery<{ members: PartyMemberProps[]; lastId: number; totalMembers: number }>(
    ['partyUserList', partyId, updated],
    () => fetchPartyMembers(Number(partyId))
  );

  const setPartyMemberList = useSetRecoilState(partyMemberListState);

  useEffect(() => {
    if (partyUserList) {
      setPartyMemberList(partyUserList);
    }
  }, [partyUserList]);

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

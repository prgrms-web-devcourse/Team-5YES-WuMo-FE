import { Avatar, Flex, Text } from '@chakra-ui/react';

import { PartyMemberProps } from '@/types/party';

const PartyUserList = ({ userList }: { userList: PartyMemberProps }) => {
  return (
    <Flex direction='row'>
      {userList && (
        <>
          {userList.map(({ memberId, nickname, role, profileImage }) => (
            <Flex key={memberId} direction='column' align='center' marginLeft='0.625rem'>
              <Avatar src={profileImage} size='sm' />
              <Text fontSize='sm'>{nickname}</Text>
              <Text fontSize='xs'>{role}</Text>
            </Flex>
          ))}
        </>
      )}
    </Flex>
  );
};

export default PartyUserList;

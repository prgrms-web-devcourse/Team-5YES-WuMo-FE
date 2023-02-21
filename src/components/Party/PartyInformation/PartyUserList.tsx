import { Avatar, Flex, Text } from '@chakra-ui/react';

const userRole = [
  {
    nickname: '오예스',
    profileImage: 'https://via.placeholder.com/50',
    role: '방장',
  },
  {
    nickname: '육예스',
    profileImage: 'https://via.placeholder.com/50',
    role: '총무',
  },
  {
    nickname: '칠예스',
    profileImage: 'https://via.placeholder.com/50',
    role: '김기사',
  },
];

const PartyUserList = () => {
  return (
    <Flex direction='row'>
      {userRole.map((user) => (
        <Flex key={user.role} direction='column' align='center' marginLeft='0.625rem'>
          <Avatar src={user.profileImage} size='sm' />
          <Text fontSize='sm'>{user.nickname}</Text>
          <Text fontSize='xs'>{user.role}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default PartyUserList;

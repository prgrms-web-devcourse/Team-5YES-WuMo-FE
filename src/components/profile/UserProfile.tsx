import { Avatar, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import ROUTES from '@/utils/constants/routes';

const member_dummy_data = {
  id: 1,
  email: '5yes@gmail.com',
  nickname: '오예스',
  password: '!5yes1234',
  profileImage: 'https://~',
};

const UserProfile = () => {
  const navigate = useNavigate();

  const toProfileEdit = () => {
    navigate(ROUTES.PROFILE_EDIT);
  };

  return (
    <Flex direction='column' alignItems='center'>
      <Avatar
        size='2xl'
        bg='gray'
        name={member_dummy_data.nickname}
        src={member_dummy_data.profileImage}
      />
      <Stack mt='6' spacing='2' alignItems='center'>
        <Text fontSize='2xl' fontWeight='extrabold'>
          {member_dummy_data.nickname}
        </Text>
        <Text>{member_dummy_data.email}</Text>
      </Stack>
      <Stack mt='6' spacing='4' w='full' alignItems='center'>
        <Button size='lg' w='full' onClick={toProfileEdit}>
          프로필 수정
        </Button>
        <Button size='lg' w='full' colorScheme='red'>
          로그아웃
        </Button>
      </Stack>
    </Flex>
  );
};

export default UserProfile;

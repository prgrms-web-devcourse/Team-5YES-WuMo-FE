import { Avatar, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { fetchMyProfileInfo, logout } from '@/api/user';
import { UserProps } from '@/types/user';
import ROUTES from '@/utils/constants/routes';

const UserProfile = () => {
  const navigate = useNavigate();
  const {
    data: myProfileInfo,
    isLoading,
    isError,
  } = useQuery<UserProps>(['myProfileInfo'], () => fetchMyProfileInfo());

  const toProfileEdit = () => {
    navigate(ROUTES.PROFILE_EDIT, { replace: true });
  };

  const toLanding = () => {
    navigate(ROUTES.LANDING, { replace: true });
  };

  const handleLogout = async () => {
    await logout();
    toLanding();
  };

  if (isLoading) return <></>;
  if (isError) return <></>;

  const { email, nickname, profileImage } = myProfileInfo;

  return (
    <Flex direction='column' alignItems='center'>
      <Avatar
        size='2xl'
        bg='#D9D9D9'
        name={nickname}
        src={profileImage === null ? undefined : profileImage}
      />
      <Stack mt='6' spacing='2' alignItems='center'>
        <Text fontSize='2xl' fontWeight='extrabold'>
          {nickname}
        </Text>
        <Text>{email}</Text>
      </Stack>
      <Stack mt='6' spacing='4' w='full' alignItems='center'>
        <Button size='lg' w='full' onClick={toProfileEdit}>
          프로필 수정
        </Button>
        <Button onClick={handleLogout} size='lg' w='full' colorScheme='red'>
          로그아웃
        </Button>
      </Stack>
    </Flex>
  );
};

export default UserProfile;

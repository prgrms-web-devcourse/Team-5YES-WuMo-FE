import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { fetchMyProfileInfo } from '@/api/user';
import { UserProps } from '@/types/user';
import ROUTES from '@/utils/constants/routes';

import Loading from '../base/Loading';

const PartCreateGuide = () => {
  const navigate = useNavigate();

  const {
    data: myProfileInfo,
    isLoading,
    isError,
  } = useQuery<UserProps>(['myProfileInfo'], () => fetchMyProfileInfo());

  if (isLoading) return <Loading></Loading>;
  if (isError) return <></>;

  return (
    <Box px='1.875rem' pt='24px'>
      <Box>
        <Heading size='lg' mb='0.5rem'>
          {myProfileInfo.nickname}님,
        </Heading>
        <Heading size='md'>모임을 위한 일정관리가 필요하신가요?</Heading>
      </Box>
      <Box onClick={() => navigate(ROUTES.PARTY_CREATE)} pt='24px'>
        <Flex align='center'>
          <Flex
            justify='center'
            align='center'
            w='80px'
            h='80px'
            bg='gray.100'
            fontSize='3xl'
            color='blue.400'
            borderRadius='50%'>
            <MdAdd />
          </Flex>
          <Flex direction='column' pl='14px'>
            <Text fontSize='lg' fontWeight='bold'>
              모임 만들기
            </Text>
            <Text fontSize='sm'>새로운 모임을 만들어 일정을 관리해보세요!</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default PartCreateGuide;

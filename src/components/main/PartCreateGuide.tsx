import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ROUTES from '@/utils/constants/routes';

const USERDUMMYDATA = {
  id: 1,
  email: '5yes@gmail.com',
  nickname: '오예스',
  profileImage: 'https://ifh.cc/g/kQckLH.png',
};

const PartCreateGuide = () => {
  const navigate = useNavigate();

  return (
    <Box px='1.875rem'>
      <Box>
        <Heading size='lg'>{USERDUMMYDATA.nickname}님,</Heading>
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
            +
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

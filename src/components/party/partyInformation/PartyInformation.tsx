import { Box, Button, Container, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { BsFillShareFill } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';

import BackNavigation from '@/components/navigation/BackNavigation';

import PartyMenuTabList from './PartyMenuTabList';
import PartyUserList from './PartyUserList';

const PartyInformation = () => {
  return (
    <Box>
      <BackNavigation />
      <Image src='https://via.placeholder.com/560x200' pt='4.75rem' />
      <Flex justify='space-between'>
        <Container p='0.625rem' m='0'>
          <Heading size='md'>파티 명</Heading>
          <Text>기간</Text>
        </Container>
        <Flex p='0.625rem' textAlign='right' align='center'>
          <Button colorScheme='teal' size='xs' marginRight='0.625rem'>
            영수증
          </Button>
          <Button bg='transparent' size='xs'>
            <BsFillShareFill />
          </Button>
        </Flex>
      </Flex>
      <PartyUserList />
      <Text margin='0.625rem' h='3.125rem'>
        파티 소개
      </Text>
      <PartyMenuTabList />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PartyInformation;

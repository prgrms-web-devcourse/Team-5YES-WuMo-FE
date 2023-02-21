import { Button, Container, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { BsFillShareFill } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';

import PartyMenuTabList from './PartyMenuTabList';
import PartyUserList from './PartyUserList';

const PartyInformation = () => {
  return (
    <>
      <Image src='https://via.placeholder.com/500x200' />
      <Flex justify='space-between'>
        <Container p='0.625rem' m='0'>
          <Heading size='md'>파티 명</Heading>
          <Text>기간</Text>
        </Container>
        <Flex p='10px' textAlign='right' align='center'>
          <Button colorScheme='teal' size='xs' marginRight='0.625rem'>
            영수증
          </Button>
          <button>
            <BsFillShareFill />
          </button>
        </Flex>
      </Flex>
      <PartyUserList />
      <Text margin='0.625rem'>파티 소개</Text>
      <PartyMenuTabList />
      <Outlet />
    </>
  );
};

export default PartyInformation;

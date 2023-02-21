import { Button, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { BsFillShareFill } from 'react-icons/bs';
import PartyUserList from './PartyUserList';
import PartyMenuTabList from './PartyMenuTabList';

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

import { Flex, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';

const MainHeader = () => {
  return (
    <Flex justify='center' h='4.0625rem' mt='1rem'>
      <Logo src='/logo.svg' />
    </Flex>
  );
};

export default MainHeader;

const Logo = styled(Img)`
  -webkit-user-drag: none;
`;

import { Flex, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';

const MainHeader = () => {
  return (
    <Flex justify='space-between' align='center' h='4.0625rem'>
      <Logo src='/logo.svg' p='0.3125rem 0 0 0.625rem' />
    </Flex>
  );
};

export default MainHeader;

const Logo = styled(Img)`
  -webkit-user-drag: none;
`;

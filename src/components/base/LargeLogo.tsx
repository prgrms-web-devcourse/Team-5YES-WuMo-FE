import { Center, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';

const LargeLogo = () => {
  return (
    <Center>
      <Logo src='/logo-lg.svg' p='5px 0 0 10px' />
    </Center>
  );
};

const Logo = styled(Img)`
  -webkit-user-drag: none;
`;

export default LargeLogo;

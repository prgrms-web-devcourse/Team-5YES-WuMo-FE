import { Center, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';

type LargeLogoProps = {
  src: string;
};

const LargeLogo = ({ src }: LargeLogoProps) => {
  return (
    <Center>
      <Logo src={src} p='5px 0 0 10px' />
    </Center>
  );
};

const Logo = styled(Img)`
  -webkit-user-drag: none;
`;

export default LargeLogo;

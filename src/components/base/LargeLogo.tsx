import { Center, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';

type LargeLogoProps = {
  src: string;
};

const LargeLogo = ({ src }: LargeLogoProps) => {
  return (
    <Center>
      <Logo src={src} w='12.5rem' />
    </Center>
  );
};

const Logo = styled(Img)`
  -webkit-user-drag: none;
`;

export default LargeLogo;

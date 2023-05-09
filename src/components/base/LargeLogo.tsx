import { Center, Image } from '@chakra-ui/react';

type LargeLogoProps = {
  src: string;
};

const LargeLogo = ({ src }: LargeLogoProps) => {
  return (
    <Center>
      <Image src={src} w='12.5rem' alt='우모 로고' />
    </Center>
  );
};

export default LargeLogo;

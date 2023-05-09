import { Flex, Image } from '@chakra-ui/react';

const MainHeader = () => {
  return (
    <Flex justify='center' h='4.0625rem' mt='1rem'>
      <Image src='/logo.svg' alt='우모 로고' />
    </Flex>
  );
};

export default MainHeader;

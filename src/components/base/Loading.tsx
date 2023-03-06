import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex
      justify='center'
      align='center'
      pos='fixed'
      w='100%'
      h='100%'
      top='0'
      bottom='0'
      left='0'
      right='0'
      zIndex='100'
      bg='whiteAlpha.900'
      overflow='hidden'>
      <Spinner
        thickness='5px'
        speed='0.65s'
        emptyColor='gray.200'
        color='primary.red'
        size='xl'
      />
    </Flex>
  );
};

export default Loading;

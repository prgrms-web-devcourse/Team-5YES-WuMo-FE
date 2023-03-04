import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import LargeLogo from '@/components/base/LargeLogo';
import ROUTES from '@/utils/constants/routes';

const NotFoundPage = () => {
  return (
    <Flex
      h='100vh'
      flexDirection='column'
      justify='center'
      alignItems='center'
      gap='0.5rem'>
      <LargeLogo src='/notfound-logo.svg' />
      <Box>
        <Text fontSize='1.4rem' fontWeight='bold'>
          잘못된 접근입니다.
        </Text>
      </Box>
      <Box>
        <Link to={ROUTES.MAIN}>
          <Button bg='primary.red' color='white' fontWeight='normal' px='2rem'>
            홈으로
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default NotFoundPage;

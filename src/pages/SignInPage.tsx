import { Box, Flex } from '@chakra-ui/react';

import LargeLogo from '@/components/base/LargeLogo';
import BackNavigation from '@/components/navigation/BackNavigation';
import SignInForm from '@/components/signIn/SignInForm';
import ToSignUp from '@/components/signIn/ToSignUp';

const SignInPage = () => {
  return (
    <Box pt='16'>
      <BackNavigation />
      <Flex height='100%' flexDirection='column' justifyContent='center'>
        <Box>
          <LargeLogo src='/logo-lg.svg' />
          <SignInForm />
          <ToSignUp />
        </Box>
      </Flex>
    </Box>
  );
};

export default SignInPage;

import { Box, Flex } from '@chakra-ui/react';

import LargeLogo from '@/components/base/LargeLogo';
import BackNavigation from '@/components/navigation/BackNavigation';
import SignInForm from '@/components/userSign/signIn/SignInForm';
import ToOtherSign from '@/components/userSign/ToOtherSign';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const SignInPage = () => {
  useDocumentTitle('WuMoㅤ|ㅤ로그인');
  return (
    <Box py='4rem'>
      <BackNavigation />
      <Flex height='100%' flexDirection='column' justifyContent='center'>
        <Box>
          <LargeLogo src='/logo-lg.svg' />
          <SignInForm />
          <ToOtherSign />
        </Box>
      </Flex>
    </Box>
  );
};

export default SignInPage;

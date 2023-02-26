import { Box, Flex } from '@chakra-ui/react';

import LargeLogo from '../components/base/LargeLogo';
import BackNavigation from '../components/navigation/BackNavigation';
import FindUserInfo from '../components/signIn/FindUserInfo';
import SignInForm from '../components/signIn/SignInForm';
import ToSignUp from '../components/signIn/ToSignUp';

const SignInPage = () => {
  return (
    <>
      <BackNavigation />
      <Flex height='100%' flexDirection='column' justifyContent='center'>
        <Box>
          <LargeLogo />
          <SignInForm />
          <ToSignUp />
          <FindUserInfo />
        </Box>
      </Flex>
    </>
  );
};

export default SignInPage;

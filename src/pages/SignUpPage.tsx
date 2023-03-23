import { Box } from '@chakra-ui/react';

import LargeLogo from '@/components/base/LargeLogo';
import BackNavigation from '@/components/navigation/BackNavigation';
import SignUpForm from '@/components/userSign/signUp/SignUpForm';
import ToOtherSign from '@/components/userSign/ToOtherSign';

const SignUpPage = () => {
  return (
    <Box py='4rem'>
      <BackNavigation />
      <LargeLogo src='/logo-lg.svg' />
      <SignUpForm />
      <ToOtherSign />
    </Box>
  );
};

export default SignUpPage;

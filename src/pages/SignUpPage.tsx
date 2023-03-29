import { Box } from '@chakra-ui/react';

import LargeLogo from '@/components/base/LargeLogo';
import BackNavigation from '@/components/navigation/BackNavigation';
import SignUpForm from '@/components/userSign/signUp/SignUpForm';
import ToOtherSign from '@/components/userSign/ToOtherSign';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const SignUpPage = () => {
  useDocumentTitle('WuMo | 회원가입');
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

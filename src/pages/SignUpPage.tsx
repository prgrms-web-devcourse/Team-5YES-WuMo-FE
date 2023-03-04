import { Box, Center, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import LargeLogo from '@/components/base/LargeLogo';
import BackNavigation from '@/components/navigation/BackNavigation';
import SignUpForm from '@/components/signUp/SignUpForm';
import ROUTES from '@/utils/constants/routes';

const SignUpPage = () => {
  return (
    <Box pt='16'>
      <BackNavigation />
      <LargeLogo src='/logo-lg.svg' />
      <SignUpForm />
      <Center>
        <Text mt='2rem' fontSize='md' fontWeight='medium' color='gray'>
          이미 회원이신가요?
          <StyledLink style={{ color: 'blue' }} to={ROUTES.SIGNIN}>
            로그인
          </StyledLink>
        </Text>
      </Center>
    </Box>
  );
};

const StyledLink = styled(Link)`
  color: blue;
  margin-left: 0.5rem;
`;

export default SignUpPage;

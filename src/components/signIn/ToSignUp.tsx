import { Center, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from '@/utils/constants/routes';

const ToSignUp = () => {
  return (
    <Center mt='6'>
      <Text fontSize='md' fontWeight='medium' color='gray'>
        아직 회원이 아니신가요?
        <StyledLink style={{ color: 'blue' }} to={ROUTES.SIGNUP}>
          회원가입
        </StyledLink>
      </Text>
    </Center>
  );
};

const StyledLink = styled(Link)`
  color: blue;
  margin-left: 0.5rem;
`;

export default ToSignUp;

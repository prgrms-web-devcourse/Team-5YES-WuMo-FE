import { Center, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

import ROUTES from '@/utils/constants/routes';

const ToOtherSign = () => {
  const { pathname } = useLocation();
  return (
    <Center>
      {pathname === ROUTES.SIGNUP ? (
        <Text mt='2rem' fontSize='md' fontWeight='medium' color='gray'>
          이미 회원이신가요?
          <StyledLink to={ROUTES.SIGNIN} replace={true}>
            로그인
          </StyledLink>
        </Text>
      ) : (
        <Text mt='2rem' fontSize='md' fontWeight='medium' color='gray'>
          아직 회원이 아니신가요?
          <StyledLink to={ROUTES.SIGNUP} replace={true}>
            회원가입
          </StyledLink>
        </Text>
      )}
    </Center>
  );
};

export default ToOtherSign;

const StyledLink = styled(Link)`
  color: blue;
  margin-left: 0.5rem;
  :hover {
    text-decoration: underline;
  }
`;

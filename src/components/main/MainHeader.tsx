import { Button, Flex, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import ROUTES from '@/utils/constants/routes';

const MainHeader = () => {
  const navigate = useNavigate();

  const onMoveSignInPage = () => {
    navigate(ROUTES.SIGNIN);
  };

  return (
    <Flex justify='space-between' align='center' h='4.0625rem'>
      <Logo src='/logo.svg' p='0.3125rem 0 0 0.625rem' />
      <Button onClick={onMoveSignInPage} marginRight='0.625rem' variant='ghost'>
        로그인
      </Button>
    </Flex>
  );
};

export default MainHeader;

const Logo = styled(Img)`
  -webkit-user-drag: none;
`;

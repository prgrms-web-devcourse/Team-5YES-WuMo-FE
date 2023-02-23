import { Button, Flex, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import ROUTES from '@/src/utils/routes';

const MainHeader = () => {
  const navigate = useNavigate();

  const onMoveLoginPage = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Flex justify='space-between' align='center' h='65px'>
      <Logo src='/logo.svg' p='5px 0 0 10px' />
      <Button onClick={onMoveLoginPage} marginRight='10px' variant='ghost'>
        로그인
      </Button>
    </Flex>
  );
};

export default MainHeader;

const Logo = styled(Img)`
  -webkit-user-drag: none;
`;

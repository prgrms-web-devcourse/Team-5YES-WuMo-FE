import { Center, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import ROUTES from '@/utils/constants/routes';

const FindUserInfo = () => {
  return (
    <Center mt={2} fontSize='sm'>
      <StyledLink style={{ color: 'blue' }} to={ROUTES.SIGNUP}>
        Email 찾기
      </StyledLink>
      <Text pl={2}>/</Text>
      <StyledLink style={{ color: 'blue' }} to={ROUTES.SIGNUP}>
        비밀번호 찾기
      </StyledLink>
    </Center>
  );
};

const StyledLink = styled(Link)`
  color: blue;
  margin-left: 0.5rem;
`;
export default FindUserInfo;

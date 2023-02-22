import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Common } from '@/src/styles/common';
import ROUTES from '@/src/utils/routes';

const BottomNavigation = () => {
  return (
    <Navigation>
      <Flex justify='space-between'>
        <Link to={ROUTES.MAIN}>
          <NavigationItem>홈</NavigationItem>
        </Link>
        <Link to={ROUTES.LIKE}>
          <NavigationItem>관심목록</NavigationItem>
        </Link>
        <Link to={ROUTES.PARTY_CREATE}>
          <NavigationItem>파티 생성</NavigationItem>
        </Link>
        <Link to={ROUTES.NOTICE}>
          <NavigationItem>내 파티</NavigationItem>
        </Link>
        <Link to={ROUTES.MY_INFO}>
          <NavigationItem>내 정보</NavigationItem>
        </Link>
      </Flex>
    </Navigation>
  );
};

export const Navigation = styled.nav`
  position: fixed;
  max-width: ${Common.wideSize.mobile};
  width: 100%;
  bottom: 0;
  background-color: antiquewhite;
  padding: 1rem;
`;

export const NavigationItem = styled.div`
  font-size: ${Common.fontSize.md};
`;

export default BottomNavigation;

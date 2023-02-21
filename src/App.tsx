import { Center, Flex, Spacer } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';

import { Common } from './styles/common';
import globalStyle from './styles/globalStyle';

function App() {
  return (
    <GlobalLayout className='App'>
      <Global styles={globalStyle} />
      <div>
        <h1>WuMo</h1>
      </div>
      <Navigation>
        <Flex>
          <Center>
            <NavigationItem>홈</NavigationItem>
          </Center>
          <Spacer />
          <Center>
            <NavigationItem>관심</NavigationItem>
          </Center>
          <Spacer />
          <Center>
            <NavigationItem>파티 생성</NavigationItem>
          </Center>
          <Spacer />
          <Center>
            <NavigationItem>내 파티</NavigationItem>
          </Center>
          <Spacer />
          <Center>
            <NavigationItem>내 정보</NavigationItem>
          </Center>
        </Flex>
      </Navigation>
    </GlobalLayout>
  );
}

export const GlobalLayout = styled.div`
  max-width: ${Common.wideSize.mobile};
  width: 100%;
  height: 100%;
  background-color: ${Common.colors.light_gray};
  margin: 0 auto;
`;

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

export default App;

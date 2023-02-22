import { Global } from '@emotion/react';
import styled from '@emotion/styled';

import Router from './Router';
import { Common } from './styles/common';
import globalStyle from './styles/globalStyle';

function App() {
  return (
    <GlobalLayout className='App'>
      <Global styles={globalStyle} />
      <Router />
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

export default App;

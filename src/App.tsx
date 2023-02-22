import { Global } from '@emotion/react';
import styled from '@emotion/styled';

import Router from './Router';
import { Common } from './styles/common';
import globalStyle from './styles/globalStyle';

function App() {
  return (
    <GlobalLayout className='App'>
      <Router />
      <Global styles={globalStyle} />
      <div>
        <h1>WuMo</h1>
      </div>
    </GlobalLayout>
  );
}

export const GlobalLayout = styled.div`
  max-width: ${Common.wideSize.mobile};
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export default App;

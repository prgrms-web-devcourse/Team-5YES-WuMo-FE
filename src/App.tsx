import { Box } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';

import Router from './Router';
import globalStyle from './styles/globalStyle';

function App() {
  return (
    <GlobalLayout className='App' bg='white' maxW='maxWidth.mobile'>
      <Router />
      <Global styles={globalStyle} />
    </GlobalLayout>
  );
}

export const GlobalLayout = styled(Box)`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export default App;

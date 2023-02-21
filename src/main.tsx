import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';

const { Avatar, Button, FormLabel, Input } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Avatar,
    Button,
    FormLabel,
    Input,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </RecoilRoot>
  </React.StrictMode>
);

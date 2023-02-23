import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';

const { Avatar, Button, Container, Divider, Input, FormLabel, Heading, Tabs } =
  chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Avatar,
    Button,
    Container,
    Divider,
    Input,
    FormLabel,
    Heading,
    Tabs,
  },
  colors: {
    primary: {
      red: '#ea5148',
      yellow: '#f4cf47',
    },
  },
  sizes: {
    maxWidth: {
      mobile: '560px',
    },
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

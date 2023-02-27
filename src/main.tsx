import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';

const {
  Avatar,
  Button,
  CloseButton,
  Container,
  Divider,
  FormLabel,
  Heading,
  Input,
  Table,
  Tabs,
  Modal,
  Progress,
} = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Avatar,
    Button,
    CloseButton,
    Container,
    Divider,
    FormLabel,
    Heading,
    Input,
    Table,
    Tabs,
    Modal,
    Progress,
  },
  colors: {
    primary: {
      red: '#ea5148',
      redHover: '#cc4942',
      yellow: '#f4cf47',
    },
  },
  sizes: {
    maxWidth: {
      mobile: '35rem',
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

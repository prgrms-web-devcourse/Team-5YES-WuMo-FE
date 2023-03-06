import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { AxiosInterceptor } from './api/api';
import App from './App';

const {
  Accordion,
  Avatar,
  Button,
  Card,
  CloseButton,
  Container,
  Divider,
  FormLabel,
  Heading,
  Input,
  Table,
  Tabs,
  Modal,
  NumberInput,
  Progress,
  List,
  Menu,
  Spinner,
} = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Accordion,
    Avatar,
    Button,
    Card,
    CloseButton,
    Container,
    Divider,
    FormLabel,
    Heading,
    Input,
    Table,
    Tabs,
    Modal,
    Menu,
    NumberInput,
    Progress,
    List,
    Spinner,
  },
  fonts: {
    heading: `'Pretendard-Regular', sans-serif`,
    body: `'Pretendard-Regular', sans-serif`,
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
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </ChakraBaseProvider>
    </RecoilRoot>
  </React.StrictMode>
);

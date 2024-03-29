import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
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
  Tag,
  Textarea,
  Modal,
  NumberInput,
  Progress,
  List,
  Menu,
  Spinner,
  Switch,
  Select,
  PinInput,
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
    Tag,
    Textarea,
    Modal,
    Menu,
    NumberInput,
    Progress,
    List,
    Spinner,
    Switch,
    Select,
    PinInput,
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

const queryClient = new QueryClient();

const gaTrackingId = import.meta.env.VITE_GA_ID;
ReactGA.initialize(gaTrackingId);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ChakraBaseProvider theme={theme}>
          <AxiosInterceptor>
            <App />
          </AxiosInterceptor>
          <ReactQueryDevtools panelPosition='top' />
        </ChakraBaseProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

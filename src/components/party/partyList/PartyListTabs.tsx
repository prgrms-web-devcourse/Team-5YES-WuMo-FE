import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import PartyList from './PartyList';

const PartyListTabs = () => {
  return (
    <Box pt='14'>
      <Tabs isLazy isFitted colorScheme='red'>
        <TabList pos='fixed' maxW='maxWidth.mobile' w='100%' zIndex='10' bg='white'>
          <Tab>진행중인 모임</Tab>
          <Tab>완료된 모임</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p='2'>
            <PartyList partyType='onGoing' />
          </TabPanel>
          <TabPanel p='2'>
            <PartyList partyType='completed' />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PartyListTabs;

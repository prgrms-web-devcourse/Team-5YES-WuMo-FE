import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const PartyMenuTabList = () => {
  const { partyId } = useParams();
  const { pathname } = useLocation();

  let now = 0;

  if (pathname.includes('/plan')) now = 1;

  const partyTab = [
    {
      name: '일정',
      to: `/party/${partyId}`,
    },
    {
      name: '계획',
      to: `/party/${partyId}/plan`,
    },
  ];

  return (
    <Tabs index={now} pos='sticky' top='3.75rem' bg='white' zIndex='20' colorScheme='red'>
      <TabList aria-label='일정과 계획'>
        {partyTab.map((tab) => (
          <Tab key={tab.name} w='100%'>
            <Link to={tab.to} style={{ width: '100%' }}>
              {tab.name}
            </Link>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {partyTab.map((tab) => (
          <TabPanel key={tab.name} w='100%' p='0'>
            <Outlet />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default PartyMenuTabList;

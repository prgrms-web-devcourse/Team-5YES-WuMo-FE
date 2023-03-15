import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router-dom';

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
      <TabList>
        {partyTab.map((tab) => (
          <Link key={tab.name} to={tab.to} style={{ width: '100%' }}>
            <Tab w='100%'>{tab.name}</Tab>
          </Link>
        ))}
      </TabList>
    </Tabs>
  );
};

export default PartyMenuTabList;

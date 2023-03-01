import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import ROUTES from '@/utils/constants/routes';

const partyTab = [
  {
    name: '일정',
    to: ROUTES.SCHEDULE,
  },
  {
    name: '계획',
    to: ROUTES.PLAN,
  },
  {
    name: '앨범',
    to: ROUTES.ALBUM,
  },
];

const PartyMenuTabList = () => {
  return (
    <Tabs pos='sticky' top='10' bg='white' zIndex='20'>
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

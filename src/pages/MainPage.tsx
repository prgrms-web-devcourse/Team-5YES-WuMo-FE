import { Divider } from '@chakra-ui/react';

import BestLouteList from '../components/main/BestLouteList';
import TotalPartyNoticeList from '../components/main/TotalPartyNoticeList';
import UserPartyList from '../components/main/UserPartyList';

const MainPage = () => {
  return (
    <>
      <BestLouteList />
      <Divider marginTop='40px' borderTopWidth='10px' />
      <UserPartyList />
      <Divider marginTop='40px' borderTopWidth='10px' />
      <TotalPartyNoticeList />
    </>
  );
};

export default MainPage;

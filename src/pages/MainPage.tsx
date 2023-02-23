import { Divider } from '@chakra-ui/react';

import BestLouteList from '../components/main/BestLouteList';
import MainHeader from '../components/main/MainHeader';
import TotalPartyNoticeList from '../components/main/TotalPartyNoticeList';
import UserPartyList from '../components/main/UserPartyList';

const MainPage = () => {
  return (
    <>
      <MainHeader />
      <BestLouteList />
      <Divider marginTop='40px' borderTopWidth='10px' />
      <UserPartyList />
      <Divider marginTop='40px' borderTopWidth='10px' />
      <TotalPartyNoticeList />
    </>
  );
};

export default MainPage;

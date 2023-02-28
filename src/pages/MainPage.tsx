import { Divider } from '@chakra-ui/react';

import BestRouteList from '@/components/main/BestRouteList';
import MainHeader from '@/components/main/MainHeader';
import TotalPartyNoticeList from '@/components/main/TotalPartyNoticeList';
import UserPartyList from '@/components/main/UserPartyList';

const MainPage = () => {
  return (
    <>
      <MainHeader />
      <BestRouteList />
      <Divider marginTop='2.5rem' borderTopWidth='0.625rem' />
      <UserPartyList />
      <Divider marginTop='2.5rem' borderTopWidth='0.625rem' />
      <TotalPartyNoticeList />
    </>
  );
};

export default MainPage;

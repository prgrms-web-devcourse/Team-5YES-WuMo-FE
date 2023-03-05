import { Divider } from '@chakra-ui/react';

import BestRouteList from '@/components/main/BestRouteList';
import MainHeader from '@/components/main/MainHeader';
import PartCreateGuide from '@/components/main/PartCreateGuide';
import UserPartyList from '@/components/main/UserPartyList';

const MainPage = () => {
  return (
    <>
      <MainHeader />
      <PartCreateGuide />
      <Divider marginTop='2.5rem' borderTopWidth='0.625rem' />
      <BestRouteList />
      <Divider marginTop='2.5rem' borderTopWidth='0.625rem' />
      <UserPartyList />
    </>
  );
};

export default MainPage;

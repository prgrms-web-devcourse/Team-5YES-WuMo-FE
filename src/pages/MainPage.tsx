import { Divider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Toast from '@/components/base/toast/Toast';
import BestRouteList from '@/components/main/BestRouteList';
import MainHeader from '@/components/main/MainHeader';
import PartCreateGuide from '@/components/main/PartCreateGuide';
import UserPartyList from '@/components/main/UserPartyList';
import useLocalStorage from '@/hooks/useLocalStorage';

const MainPage = () => {
  const [storedValue] = useLocalStorage('invitation', {});
  const navigate = useNavigate();

  useEffect(() => {
    if (storedValue.roomId) {
      Toast.show({
        message: '초대받은 모임이 있어요.',
        type: 'info',
      });
      navigate(`/invitation/${storedValue.roomId}`);
      localStorage.removeItem('invitation');
    }
  }, []);

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

import useDocumentTitle from '@/hooks/useDocumentTitle';

import BackNavigation from '../components/navigation/BackNavigation';
import PartyList from '../components/party/partyList/PartyList';

const PartyListPage = () => {
  useDocumentTitle('WuMo | 내 모임');
  return (
    <>
      <BackNavigation title='내 모임 목록' />
      <PartyList />
    </>
  );
};

export default PartyListPage;

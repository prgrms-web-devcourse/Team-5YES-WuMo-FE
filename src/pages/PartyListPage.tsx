import BackNavigation from '@/components/navigation/BackNavigation';
import PartyListTabs from '@/components/party/partyList/PartyListTabs';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const PartyListPage = () => {
  useDocumentTitle('WuMoㅤ|ㅤ내 모임');
  return (
    <>
      <BackNavigation title='내 모임 목록' />
      <PartyListTabs />
    </>
  );
};

export default PartyListPage;

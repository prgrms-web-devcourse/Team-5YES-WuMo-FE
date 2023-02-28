import BackNavigation from '../components/navigation/BackNavigation';
import PartyList from '../components/party/partyList/PartyList';

const PartyListPage = () => {
  return (
    <>
      <BackNavigation title='내 모임 목록' />
      <PartyList />
    </>
  );
};

export default PartyListPage;

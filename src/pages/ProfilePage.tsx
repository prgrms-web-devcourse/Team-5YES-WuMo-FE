import { Container } from '@chakra-ui/react';

import BackNavigation from '@/components/navigation/BackNavigation';
import PartyListGrid from '@/components/party/partyList/PartyListGrid';
import UserProfile from '@/components/profile/UserProfile';

const ProfilePage = () => {
  return (
    <>
      <BackNavigation title='내 프로필' />
      <Container mt='28' px='10'>
        <UserProfile />
        <PartyListGrid />
      </Container>
    </>
  );
};

export default ProfilePage;

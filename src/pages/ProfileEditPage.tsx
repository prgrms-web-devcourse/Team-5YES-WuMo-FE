import BackNavigation from '@/components/navigation/BackNavigation';
import ProfileEditForm from '@/components/profile/profileEdit/ProfileEditForm';

const ProfileEditPage = () => {
  return (
    <>
      <BackNavigation title='프로필 수정' />
      <ProfileEditForm />
    </>
  );
};

export default ProfileEditPage;

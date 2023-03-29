import BackNavigation from '@/components/navigation/BackNavigation';
import ProfileEditForm from '@/components/profile/profileEdit/ProfileEditForm';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const ProfileEditPage = () => {
  useDocumentTitle('WuMo | 내 정보 수정');
  return (
    <>
      <BackNavigation title='프로필 수정' />
      <ProfileEditForm />
    </>
  );
};

export default ProfileEditPage;

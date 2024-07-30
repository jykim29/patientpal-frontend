import ProfileModifyForm from '@/components/MyPage/Profile/ProfileModifyForm';
import Button from '@/components/common/Button';

function ProfilePage() {
  return (
    <>
      <h1 className="text-title-small">프로필 관리</h1>
      <ProfileModifyForm />
    </>
  );
}

export default ProfilePage;

import ProfileModifyForm from '@/components/MyPage/Profile/ProfileModifyForm';

export function Component() {
  return (
    <>
      <h1 className="text-title-small">프로필 관리</h1>
      <ProfileModifyForm />
    </>
  );
}

Component.displayName = 'ProfilePage';

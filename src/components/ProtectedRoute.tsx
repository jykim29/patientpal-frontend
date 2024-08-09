import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';
import { useModal } from '@/hooks/useModal';

const unneedProfilePathArray: string[] = [
  '/mypage/profile',
  '/community/notice',
];

export default function ProtectedRoute() {
  const { isLoggedIn, user } = useAuthStore();
  const { alert } = useModal();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isNeedProfilePath = unneedProfilePathArray.every(
    (value) =>
      user &&
      user.isCompleteProfile === false &&
      pathname.includes(value) === false
  );

  useEffect(() => {
    if (!user && !isLoggedIn) {
      alert(
        'warning',
        '로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.'
      ).then((res) => {
        if (res) navigate('/auth/signin', { replace: true });
      });
    }
    if (isNeedProfilePath) {
      alert(
        'warning',
        '서비스 이용을 위해서 먼저 프로필 작성이 필요합니다.'
      ).then((res) => {
        if (res) navigate('/mypage/profile', { replace: true });
      });
    }
  }, [pathname]);

  return <>{isLoggedIn && !isNeedProfilePath && <Outlet />}</>;
}

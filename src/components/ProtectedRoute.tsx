import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';

export default function ProtectedRoute() {
  const { isLoggedIn, user } = useAuthStore();
  const { pathname } = useLocation();

  if (!isLoggedIn) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to={'/auth/signin'} replace />;
  }
  if (user && !user.isCompleteProfile && pathname !== '/mypage/profile') {
    alert('서비스 이용을 위해서 먼저 프로필 작성이 필요합니다.');
    return <Navigate to={'/mypage/profile'} replace />;
  }

  return <Outlet />;
}

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to={'/auth/signin'} replace />;
  }
  return <Outlet />;
}

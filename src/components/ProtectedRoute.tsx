import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';
import { useModal } from '@/hooks/useModal';

const loginBypassList = [
  '/search/city',
  '/search/map',
  '/community/notice',
  '/community/notice/view/:postId',
  '/community/forum',
];
const profileBypassList = ['/mypage/profile', '/community/forum/view/:postId'];

const matchExactPathname = (pathname: string, currentPathname: string) => {
  const regexPath = pathname.replace(/:\w+/g, '[^/]+');
  const regex = new RegExp(`^${regexPath}$`);
  return regex.test(currentPathname);
};

export function Component() {
  const { isLoggedIn, user } = useAuthStore();
  const { alert } = useModal();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginBypass = loginBypassList.some((value) =>
    matchExactPathname(value, pathname)
  );
  const isProfileBypass = profileBypassList.some((value) =>
    matchExactPathname(value, pathname)
  );
  const isHideOutlet =
    !isLoginBypass &&
    (!isLoggedIn ||
      (!isProfileBypass && isLoggedIn && !user?.isCompleteProfile));

  useEffect(() => {
    if (!isLoginBypass) {
      // 로그인 필요 페이지인데 로그인 안했을 경우
      if (!isLoggedIn)
        alert(
          'warning',
          '로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.'
        ).then(() => navigate('/auth/signin'));
      // 로그인 및 프로필 필요 페이지인데 로그인 했는데 프로필 없을 경우
      if (isLoggedIn && !isProfileBypass && !user?.isCompleteProfile)
        alert(
          'warning',
          '서비스 이용을 위해 먼저 프로필 작성이 필요합니다. '
        ).then(() => navigate('/mypage/profile'));
    }
  }, [pathname]);

  return <>{isHideOutlet ? null : <Outlet />}</>;
}

Component.displayName = 'ProtectedRoute';

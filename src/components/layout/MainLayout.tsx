import { useCallback, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuthStore } from '@/store/useAuthStore';

export function Component() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const firstDepthPathname = pathname.split('/').filter(Boolean)[0];
  const user = useAuthStore((state) => state.user);
  const opponentRole = user?.role === 'CAREGIVER' ? '환자' : '간병인';
  const layoutTitles: { [key: string]: string } = useMemo(
    () => ({
      '': '',
      search: `${opponentRole} 찾기`,
      community: '커뮤니티',
      mypage: '마이페이지',
    }),
    []
  );
  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, []);
  return (
    <main className="min-w-0 flex-1 px-[52px] py-8">
      <div className="mb-[52px] flex items-center gap-2">
        <IoIosArrowBack
          onClick={handleClickBack}
          className="h-8 w-8 cursor-pointer"
        />
        <h2 className="relative inline-block from-secondary to-tertiary text-title-medium after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r">
          {layoutTitles[firstDepthPathname]}
        </h2>
      </div>
      <Outlet />
    </main>
  );
}

Component.displayName = 'MainLayout';

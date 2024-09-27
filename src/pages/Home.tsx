import { useMemo } from 'react';

import { useAuthStore } from '@/store/useAuthStore';
import {
  Card,
  MainTitleIndex,
  NoticePreview,
  TopRatedCaregivers,
  UserRecommendation,
} from '../components/Home';

type ShortcutNavigationItem = {
  id: number;
  buttonImageUrl: string;
  label: string;
  path: string;
};

export function Component() {
  const user = useAuthStore((state) => state.user);
  const myRole = user && user.role;
  const shortcutNavigation: ShortcutNavigationItem[] = useMemo(
    () => [
      {
        id: 0,
        buttonImageUrl:
          myRole === 'CAREGIVER'
            ? '/assets/images/patient_both.png'
            : '/assets/images/caregiver_both.png',
        label: myRole === 'CAREGIVER' ? '환자 찾기' : '간병인 찾기',
        path: '/search/city',
      },
      {
        id: 1,
        buttonImageUrl: 'assets/images/icon-contract.png',
        label: '매칭 기록',
        path: '/mypage/match-record',
      },
      {
        id: 2,
        buttonImageUrl: 'assets/images/icon-notice.png',
        label: '자유게시판',
        path: '/community/forum',
      },
    ],
    [myRole]
  );
  return (
    <main className="flex w-[1190px] flex-col items-center gap-8 px-[52px] py-8">
      <img
        className="w-full"
        src="assets/images/main-banner.png"
        alt="페이션트팔 메인 배너"
      />

      <NoticePreview />

      <MainTitleIndex text="서비스 바로가기" size="medium">
        <div className="flex gap-4">
          {shortcutNavigation.map((item) => (
            <Card.Shortcut key={item.id} {...item} />
          ))}
        </div>
      </MainTitleIndex>

      <MainTitleIndex text="맞춤 추천" size="medium">
        <p className="absolute left-[140px] top-3 text-gray-medium-dark">
          ※등록된 주소지를 기준으로 추천됩니다.
        </p>
        <UserRecommendation />
      </MainTitleIndex>

      <MainTitleIndex text="이달의 우수 간병인" size="medium">
        <div className="flex items-center justify-center gap-4">
          <TopRatedCaregivers />
        </div>
      </MainTitleIndex>
    </main>
  );
}

Component.displayName = 'Home';

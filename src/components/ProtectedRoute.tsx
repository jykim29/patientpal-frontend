import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';
import { useModal } from '@/hooks/useModal';
import { FeedbackModal } from './Modal';

const unneedProfilePathArray: string[] = [
  '/mypage/profile',
  '/community/notice',
];

export default function ProtectedRoute() {
  const { isLoggedIn, user } = useAuthStore();
  const { createModal, openModal } = useModal();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isNeedProfilePath = unneedProfilePathArray.every(
    (value) =>
      user &&
      user.isCompleteProfile === false &&
      pathname.includes(value) === false
  );
  const authRequiredModal = createModal(
    { modalName: 'auth-required', closeOnOverlayClick: true },
    <FeedbackModal
      iconType="warning"
      buttonType="confirm"
      onConfirm={() => navigate('/auth/signin', { replace: true })}
    >
      <p className="break-words text-center font-semibold">
        로그인이 필요한 페이지입니다.
        <br />
        로그인 페이지로 이동합니다.
      </p>
    </FeedbackModal>
  );
  const profileRequiredModal = createModal(
    { modalName: 'profile-required', closeOnOverlayClick: true },
    <FeedbackModal
      iconType="warning"
      buttonType="confirm"
      onConfirm={() => navigate('/mypage/profile', { replace: true })}
    >
      <p className="break-words text-center font-semibold">
        서비스 이용을 위해서 먼저 프로필 작성이 필요합니다.
      </p>
    </FeedbackModal>
  );

  useEffect(() => {
    if (!user && !isLoggedIn) openModal('auth-required');
    if (isNeedProfilePath) openModal('profile-required');
  }, [pathname]);

  return (
    <>
      {isLoggedIn && !isNeedProfilePath && <Outlet />}
      {authRequiredModal}
      {profileRequiredModal}
    </>
  );
}

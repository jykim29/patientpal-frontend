import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import { useAuthStore } from '@/store/useAuthStore';
import { API_FAILED } from '@/constants/api';
import { authService } from '@/services';
import { useNotificationStore } from '@/store/useNotificationStore';
import Button from './Button';
import { NotificationModal } from '../Modal';

type InitialIsShowState = {
  notification: boolean;
  shortcut: boolean;
};
type ShortcutMenuList = {
  path: string;
  label: string;
};
const initialIsShowState = {
  notification: false,
  shortcut: false,
};

const shortcutMenuArray: [ShortcutMenuList[], ShortcutMenuList[]] = [
  [
    {
      path: '/mypage/profile',
      label: '프로필 작성',
    },
  ],
  [
    {
      path: '/mypage/profile',
      label: '프로필 관리',
    },
    {
      path: '/mypage/match-record',
      label: '매칭 기록',
    },
  ],
];

function Header() {
  const { isLoggedIn, user } = useAuthStore();
  const [isShow, setIsShow] = useState<InitialIsShowState>(initialIsShowState);
  const { pathname } = useLocation();
  const isCompleteProfile = user?.isCompleteProfile || false;
  let accountSectionContent = (
    <Link
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-3 text-text-medium text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
      to="/auth/signin"
    >
      로그인
    </Link>
  );
  const handleClickToggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.id as keyof typeof isShow;
    setIsShow((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  if (user && isLoggedIn)
    accountSectionContent = isCompleteProfile ? (
      <>
        <Notification
          isShow={isShow.notification}
          onClick={handleClickToggleButton}
        />
        <UserProfile
          isShow={isShow.shortcut}
          onClick={handleClickToggleButton}
        />
      </>
    ) : (
      <UnknownProfile
        isShow={isShow.shortcut}
        onClick={handleClickToggleButton}
      />
    );
  useEffect(() => {
    if (isShow.shortcut || isShow.notification)
      setIsShow({ notification: false, shortcut: false });
  }, [pathname]);

  return (
    <header className="mx-auto flex h-[70px] w-[1440px] items-center justify-between border-b-[2px] px-9 py-2">
      <h1 className="h-full">
        <Link to={'/'}>
          <img
            className="max-h-full"
            src="/assets/images/logo-main.png"
            alt="페이션트팔"
          />
        </Link>
      </h1>
      <div className="flex h-full items-center gap-[52px]">
        {accountSectionContent}
      </div>
    </header>
  );
}

function UserProfile({
  isShow,
  onClick: handleClick,
}: {
  isShow: InitialIsShowState['shortcut'];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center">
      <div className="flex select-none items-center gap-3">
        <img
          className="h-10 w-10 overflow-hidden rounded-full"
          src={user?.image || '/assets/images/default_profile.jpg'}
          alt="프로필 사진"
        />
        <p>
          <strong>{user?.name || ''}</strong>님 안녕하세요.
        </p>
      </div>
      <div className="relative flex items-center">
        <button
          id="shortcut"
          title="메뉴 펼치기"
          className={`h-6 w-6 bg-[length:12px_12px] bg-center bg-no-repeat hover:bg-gray-light ${isShow ? "bg-[url('/assets/images/chevron_up.svg')]" : "bg-[url('/assets/images/chevron_down.svg')]"}`}
          type="button"
          onClick={handleClick}
        >
          <span className="sr-only">메뉴 펼치기</span>
        </button>
        {user && isShow && (
          <ShortcutMenu
            className="right-[-10px] top-[140%] w-32"
            menuList={shortcutMenuArray[Number(user.isCompleteProfile)]}
          />
        )}
      </div>
    </div>
  );
}

function UnknownProfile({
  isShow,
  onClick: handleClick,
}: {
  isShow: InitialIsShowState['shortcut'];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { user } = useAuthStore();
  return (
    <div className="relative">
      <button
        id="shortcut"
        className="flex items-center gap-2 text-primary hover:underline"
        type="button"
        onClick={handleClick}
      >
        <img
          className="h-10 w-10 overflow-hidden rounded-full"
          src="/assets/images/unknown_profile.jpg"
          alt="프로필 사진"
        />
        <span>프로필을 먼저 등록해주세요.</span>
      </button>
      {user && isShow && (
        <ShortcutMenu
          className="left-[50px] top-[120%] w-[120px]"
          menuList={shortcutMenuArray[Number(user.isCompleteProfile)]}
        />
      )}
    </div>
  );
}

function Notification({
  isShow,
  onClick: handleToggleModal,
}: {
  isShow: InitialIsShowState['notification'];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { notificationList } = useNotificationStore();
  const unreadCount = notificationList.length;
  return (
    <div className="relative">
      <button
        id="notification"
        title="알림 목록"
        className="relative cursor-pointer"
        onClick={handleToggleModal}
      >
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-negative text-text-small text-white">
            {unreadCount}
          </span>
        )}
        <FaBell
          className="h-6 w-6"
          color={unreadCount > 0 ? '#4166F5' : '#d8d8d8'}
        />
      </button>

      {unreadCount > 0 && (
        <motion.div
          className="absolute left-1/2 top-[120%] w-[180px] -translate-x-1/2 rounded-md bg-black p-1 text-text-small font-semibold text-white before:absolute before:left-1/2 before:top-[-12px] before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-b-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="break-keep text-center">{`읽지않은 알림이 ${unreadCount}건 있습니다.`}</p>
        </motion.div>
      )}

      {isShow && <NotificationModal onClick={handleToggleModal} />}
    </div>
  );
}

function ShortcutMenu({
  menuList,
  className = '',
  ...restProps
}: {
  menuList: ShortcutMenuList[];
  className?: string;
  [key: string]: any;
}) {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const combinedClassName = twMerge(
    'absolute px-3 py-2 text-text-small text-gray-dark [&>li:hover]:bg-gray-100 [&>*]:p-1 border border-gray-medium bg-white z-10',
    className
  );
  const handleClickSignOut = async () => {
    const { status } = await authService.signOut({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (status === API_FAILED) return;
    return navigate(0);
  };
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={combinedClassName}
      {...restProps}
    >
      {menuList.map(({ path, label }) => (
        <li key={label}>
          <Link to={path}>{label}</Link>
        </li>
      ))}
      <Button
        className="mt-2 w-full bg-negative"
        type="button"
        onClick={handleClickSignOut}
      >
        로그아웃
      </Button>
    </motion.ul>
  );
}

export default Header;

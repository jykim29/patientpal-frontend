import { useState } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import {
  NotificationItem,
  useNotificationStore,
} from '@/store/useNotificationStore';
import { notificationService } from '@/services';
import { useAuthStore } from '@/store/useAuthStore';

export default function NotificationModal({
  className = '',
  onClick: handleToggleModal,
}: {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const notificationList = useNotificationStore(
    (state) => state.notificationList
  );
  const [filter, setFilter] = useState<string>('ALL');
  const combinedClassName = twMerge(
    'absolute -left-[150px] top-[120%] z-10 w-[450px] border border-gray-light-medium rounded-sm bg-white shadow-lg',
    className
  );
  const filteredNotificationList =
    filter === 'ALL'
      ? notificationList
      : notificationList.filter((value) => value.type === filter);
  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.currentTarget.value);
  };
  const handleClickReadAllNotification = async () => {
    await notificationService.readAllNotification({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
  return (
    <div className={combinedClassName}>
      <div className="flex w-full items-center border-b border-gray-light-medium px-5 py-2">
        <span className="text-text-large font-semibold">알림</span>
        <span className="ml-1 text-orange">{`(${filteredNotificationList.length}건)`}</span>
        <select
          aria-label="알림 종류"
          className="ml-2 rounded-md border border-gray-medium text-text-small"
          name="type"
          id="type"
          onChange={handleChangeFilter}
        >
          <option value="ALL">전체</option>
          <option value="MATCH">매칭</option>
          <option value="CHAT">채팅</option>
          <option value="REVIEW">리뷰</option>
        </select>
        {filteredNotificationList.length > 0 && (
          <button
            type="button"
            className="ml-3 rounded-md p-1 text-text-small text-primary hover:bg-gray-light hover:underline"
            onClick={handleClickReadAllNotification}
          >
            모두 읽음처리
          </button>
        )}
        <button
          id="notification"
          className="ml-auto h-4 w-4 bg-[url('/assets/images/cross_black.svg')] bg-center bg-no-repeat"
          type="button"
          onClick={handleToggleModal}
        ></button>
      </div>
      <NotificationList listData={filteredNotificationList} />
    </div>
  );
}

function NotificationList({ listData }: { listData: NotificationItem[] }) {
  return (
    <div className="max-h-[300px] w-full overflow-auto">
      <ul className="flex w-full flex-col">
        {listData.length === 0 && (
          <li className="px-3 py-6 text-center text-gray-dark">
            <p>현재 도착한 알림이 없습니다.</p>
          </li>
        )}
        {listData.map((items) => (
          <NotificationListItem key={items.id} {...items} />
        ))}
      </ul>
    </div>
  );
}

function NotificationListItem({ name, type, createdDate }: NotificationItem) {
  let notificationMessage = '';
  let destinationPath = '/';
  switch (type) {
    case 'MATCH': {
      notificationMessage = `${name} 님으로부터 매칭 신청이 도작하였습니다.`;
      destinationPath = '/mypage/match-record';
      break;
    }
    case 'CHAT': {
      notificationMessage = `${name} 님이 1대1 채팅 신청을 하였습니다.`;
      destinationPath = '/mypage/chat/lobby';
      break;
    }
    case 'REVIEW': {
      notificationMessage = `${name} 님이 후기를 작성하였습니다.`;
      destinationPath = '/mypage/review';
      break;
    }
    default:
      break;
  }
  return (
    <li className="flex select-none items-center justify-between gap-3 border-b border-gray-light-medium px-3 py-2 hover:bg-yellow-50">
      <img
        className="h-10 w-10 overflow-hidden rounded-full"
        src="/assets/images/default_profile.jpg"
        alt="프로필"
      />
      <div className="flex-1 text-text-small">
        <p>{notificationMessage}</p>
        <time className="block text-gray-medium">
          {format(createdDate, 'yyyy-MM-dd HH:mm:ss')}
        </time>
      </div>
      <div className="w-12">
        <Link
          to={destinationPath}
          className="w-full rounded-md bg-primary px-2 py-1 text-sm text-white"
          type="button"
        >
          이동
        </Link>
      </div>
    </li>
  );
}

import { twMerge } from 'tailwind-merge';
import Button from '../common/Button';

export default function NotificationModal({
  className = '',
}: {
  className?: string;
}) {
  const combinedClassName = twMerge(
    'absolute -left-[100px] top-[120%] z-10 w-[400px] border border-gray-medium bg-white shadow-lg',
    className
  );
  return (
    <div className={combinedClassName}>
      <div className="flex w-full items-center border-b border-gray-light-medium px-5 py-2">
        <span className="text-text-large font-semibold">알림</span>
        <span className="ml-1 text-orange">(0건)</span>
        <select
          aria-label="알림 종류"
          className="ml-2 rounded-md border border-gray-medium text-text-small"
          name="type"
          id="type"
        >
          <option value="all">전체</option>
          <option value="match">매칭</option>
          <option value="chat">채팅</option>
          <option value="review">리뷰</option>
        </select>
        <button
          type="button"
          className="ml-auto rounded-md p-1 text-text-small text-gray-medium-dark hover:bg-gray-light"
        >
          전체 삭제
        </button>
      </div>
      <NotificationList />
    </div>
  );
}

function NotificationList() {
  return (
    <div className="max-h-[300px] w-full overflow-auto">
      <ul className="flex w-full flex-col">
        <NotificationListItem />
        <NotificationListItem />
        <NotificationListItem />
        <NotificationListItem />
        <NotificationListItem />
        <NotificationListItem />
        <NotificationListItem />
        <NotificationListItem />
        <NotificationListItem />
        <NotificationListItem />
      </ul>
    </div>
  );
}

function NotificationListItem() {
  return (
    <li className="flex select-none items-center justify-between gap-3 border-b border-gray-light-medium px-3 py-2 hover:bg-yellow-50">
      <img
        className="h-10 w-10 overflow-hidden rounded-full"
        src="/assets/default_profile.jpg"
        alt="프로필"
      />
      <div className="flex-1 text-text-small">
        <p>
          <strong className="mr-1">김환자</strong>님으로부터 매칭 신청이
          도착하였습니다.
        </p>
        <time className="block text-gray-medium">2024-08-15 23:21:12</time>
      </div>
      <div className="w-12">
        <Button className="w-full px-0 py-1 text-sm" type="button">
          이동
        </Button>
      </div>
    </li>
  );
}

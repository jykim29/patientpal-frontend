import { Link } from 'react-router-dom';

interface ChatRoomCardProps {
  roomId: string;
  username: string;
  lastMessage: string;
  lastReceiveDate: string;
  unreadMessageCount: string;
  profileImageUrl?: string;
}

export default function ChatRoomCard({
  roomId,
  username,
  lastMessage,
  lastReceiveDate,
  unreadMessageCount,
  profileImageUrl = '/assets/default_profile_woman.png',
}: ChatRoomCardProps) {
  const date = lastReceiveDate.slice(0, 10);
  const messageCount =
    Number(unreadMessageCount) > 100 ? '100+' : unreadMessageCount;
  return (
    <Link
      className="rounded-2xl border border-tertiary bg-white p-10 px-7 py-6 shadow-[0px_0px_8px_4px_#a2bffe40] transition-all hover:bg-blue-100"
      to={`../chat/room/${roomId}`}
    >
      <li className="flex items-center gap-5">
        <img
          className="h-14 w-14 flex-grow-0 rounded-full"
          src={profileImageUrl}
          alt={username}
        />

        <div className="min-w-0">
          <span className="text-text-large font-semibold">{username}</span>
          <p className="truncate text-gray-medium-dark">{lastMessage}</p>
        </div>

        <div className="ml-auto flex flex-col items-center justify-center">
          <time dateTime={new Date().toISOString()}>{date}</time>
          <span className="rounded-full bg-negative px-1.5 font-semibold text-white">
            {messageCount}
          </span>
        </div>
      </li>
    </Link>
  );
}

import { Link } from 'react-router-dom';

interface ChatRoomCardProps {
  roomId: number;
  username: string;
  lastMessage: string;
  lastReceiveDate?: string;
  profileImageUrl: string;
}

export default function ChatRoomListItem({
  roomId,
  username,
  lastMessage,
  lastReceiveDate = '',
  profileImageUrl,
}: ChatRoomCardProps) {
  return (
    <Link
      className="rounded-2xl border border-tertiary bg-white p-10 px-4 py-3 shadow-[0px_0px_8px_4px_#a2bffe40] transition-all hover:bg-blue-100"
      to={`../room/${roomId}`}
    >
      <li className="flex items-center gap-5">
        <img
          className="h-14 w-14 flex-grow-0 rounded-full"
          src={profileImageUrl}
          alt={username}
        />

        <div className="min-w-0 flex-1">
          <span className="text-text-large font-semibold">{username}</span>
          <p className="truncate text-gray-medium-dark">{lastMessage}</p>
        </div>

        <div className="ml-auto flex w-24 flex-col items-center justify-center">
          <time dateTime={new Date().toISOString()}>{lastReceiveDate}</time>
        </div>
      </li>
    </Link>
  );
}

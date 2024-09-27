import { format } from 'date-fns';
import { useAuthStore } from '@/store/useAuthStore';
import { MessageItem } from '@/types/api/chat';
import { toLocaleISOString } from '@/utils/toLocaleISOString';

export default function ChatListItem({
  data: { content, createdDate, senderId, profileImageUrl },
}: {
  data: Partial<MessageItem>;
}) {
  const myId = useAuthStore((state) => state.user?.memberId);
  return (
    <li
      className={`chat-list-item ${senderId === myId ? 'me' : 'other-person'}`}
    >
      <img
        className="profile-image"
        src={profileImageUrl ?? '/assets/images/default_profile.jpg'}
        alt="프로필"
      />
      <p className="chat-text">{content}</p>
      <time
        className="self-end text-text-small text-gray-medium-dark"
        dateTime={toLocaleISOString(new Date(createdDate as string))}
      >
        {format(createdDate as string, 'yyyy-MM-dd HH:mm')}
      </time>
    </li>
  );
}

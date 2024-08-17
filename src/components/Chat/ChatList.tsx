import { useRef, useEffect } from 'react';
import { useChatContext } from '@/hooks/useChatContext';
import ChatListItem from './ChatListItem';

export default function ChatList() {
  const {
    currentRoomMessagesState: [currentRoomMessages],
  } = useChatContext();
  const chatListRef = useRef<HTMLUListElement>(null);
  const scrollToBottom = () => {
    if (chatListRef.current)
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [currentRoomMessages]);
  console.log(currentRoomMessages);
  return (
    <ul
      className="flex h-full flex-col items-center gap-7 overflow-y-auto px-6 py-8"
      ref={chatListRef}
    >
      {currentRoomMessages.length > 0 ? (
        currentRoomMessages.map(
          ({ content, createdDate, id, senderId, profileImageUrl }) => (
            <ChatListItem
              key={id}
              data={{ content, createdDate, senderId, profileImageUrl }}
            />
          )
        )
      ) : (
        <span className="text-text-large font-semibold">
          표시할 내용이 없습니다.
        </span>
      )}
    </ul>
  );
}

import { useRef, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { differenceInCalendarDays, format } from 'date-fns';
import { useChatContext } from '@/hooks/useChatContext';
import ChatListItem from './ChatListItem';

export default function ChatList() {
  const {
    currentRoomMessagesState: [currentRoomMessages],
    getMessages,
  } = useChatContext();
  const chatListRef = useRef<HTMLUListElement>(null);
  const viewRef = useRef(null);
  const isInView = useInView(viewRef, { amount: 0.6 });
  const { roomId } = useParams();
  const scrollToBottom = () => {
    if (chatListRef.current)
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  };
  useEffect(() => {
    if (chatListRef.current && isInView && !currentRoomMessages.last) {
      setTimeout(() => {
        getMessages(Number(roomId), currentRoomMessages.pageNumber + 1);
      }, 300);
    }
  }, [isInView]);
  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <ul
      className="flex h-[400px] flex-col-reverse items-center gap-7 overflow-y-auto px-6 py-8 [overflow-anchor:none]"
      ref={chatListRef}
    >
      {currentRoomMessages.messages.length > 0 ? (
        currentRoomMessages.messages.map(
          (
            { content, createdDate, id, senderId, profileImageUrl },
            index,
            array
          ) => {
            const nextCreatedDate =
              index === array.length - 1 ? null : array[index + 1].createdDate;
            const isDayChange = nextCreatedDate
              ? differenceInCalendarDays(createdDate, nextCreatedDate) !== 0
              : true;
            const dayChangeText = format(createdDate, 'yyyy년 MM월 dd일');
            return (
              <Fragment key={id}>
                <ChatListItem
                  data={{ content, createdDate, senderId, profileImageUrl }}
                />
                {isDayChange && (
                  <li className="select-none rounded-full bg-gray-light-medium p-2 text-text-small text-gray-dark">
                    {dayChangeText}
                  </li>
                )}
              </Fragment>
            );
          }
        )
      ) : (
        <span className="text-text-large font-semibold">
          표시할 내용이 없습니다.
        </span>
      )}
      {!currentRoomMessages.last && (
        <li
          className="flex items-center gap-2 font-semibold text-secondary"
          ref={viewRef}
        >
          <span className="animate-spin rounded-full border-4 border-gray-light border-t-secondary p-1"></span>
          <p>이전 메세지 불러오는 중...</p>
        </li>
      )}
    </ul>
  );
}

import { Link } from 'react-router-dom';
import { useChatContext } from '@/hooks/useChatContext';
import ChatList from './ChatList';
import ChatMessageForm from './ChatMessageForm';

function ChatMessenger() {
  const {
    currentRoomDataState: [currentRoomData],
  } = useChatContext();

  return (
    <div>
      {/* Title */}
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">
          {currentRoomData?.partnerInfo?.name ?? ''} 님과의 채팅
        </h3>
      </div>

      {/* Messenger Container */}
      <div className="mt-3 flex w-full flex-col overflow-hidden rounded-md border border-gray-medium bg-white">
        {/* Messenger Header */}
        <div className="flex items-center gap-5 border-b border-gray-medium bg-gray-light px-5 py-3">
          <Link to="/mypage/chat/lobby">
            <img
              src="/assets/images/chevron_left.svg"
              alt="이전 페이지로 이동"
            />
          </Link>
          <img
            className="h-14 w-14 rounded-full"
            src={
              currentRoomData?.partnerInfo?.profileImageUrl ??
              '/assets/images/default_profile.jpg'
            }
            alt="상대방 프로필 사진"
          />
          <span className="text-text-large font-semibold">
            {currentRoomData?.partnerInfo?.name ?? ''}
          </span>
        </div>

        {/* Messenger Body */}
        <div className="h-[400px]">
          <ChatList />
        </div>

        {/* Messenger Footer */}
        <div className="border-t border-t-gray-medium bg-gray-light px-6 py-2">
          <ChatMessageForm />
        </div>
      </div>
    </div>
  );
}

export default ChatMessenger;

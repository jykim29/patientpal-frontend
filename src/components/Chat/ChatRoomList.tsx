import { useChatContext } from '@/hooks/useChatContext';

import ChatRoomListItem from './ChatRoomListItem';

export default function ChatRoomList() {
  const {
    roomListState: [roomList],
  } = useChatContext();

  return (
    <ul className="mt-5 flex max-h-[500px] flex-col gap-2 overflow-y-auto rounded-2xl border border-tertiary p-5 shadow-[0px_0px_8px_4px_#a2bffe40]">
      {roomList && roomList.length > 0 ? (
        roomList.map((value) => (
          <ChatRoomListItem
            key={value.chatId}
            roomId={value.chatId}
            lastMessage="현재 메세지 미리보기 기능은 지원되지 않습니다."
            username={value.partnerInfo?.name ?? ''}
            profileImageUrl={
              value.partnerInfo?.profileImageUrl ??
              '/assets/images/default_profile.jpg'
            }
          />
        ))
      ) : (
        <p className="w-full text-center text-text-large font-semibold">
          현재 채팅중인 방이 없습니다.
        </p>
      )}
    </ul>
  );
}

import { ChatRoomList } from '@/components/Chat';
import { useChatContext } from '@/hooks/useChatContext';

export function Component() {
  const {
    loadingState: [isLoading],
  } = useChatContext();

  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">채팅 목록</h3>
      </div>

      {!isLoading && <ChatRoomList />}
    </section>
  );
}

Component.displayName = 'ChatLobby';

import { ChatRoomList } from '@/components/Chat';
import { useChatContext } from '@/hooks/useChatContext';

export default function ChatLobby({ title }: { title: string }) {
  const {
    loadingState: [isLoading],
  } = useChatContext();

  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
      </div>

      {!isLoading && <ChatRoomList />}
    </section>
  );
}

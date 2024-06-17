import { ChatRoomList } from '@/components/Chat';

export default function ChatLobby({ title }: { title: string }) {
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
      </div>

      <ChatRoomList />
    </section>
  );
}

import ChatRoomCard from './ChatRoomCard';

export default function ChatRoomList() {
  return (
    <ul className="mt-5 flex max-h-[500px] flex-col gap-2 overflow-y-auto rounded-2xl border border-tertiary p-10 shadow-[0px_0px_8px_4px_#a2bffe40]">
      <ChatRoomCard
        roomId="1"
        username="김영희"
        lastMessage="안녕하세요. 반갑습니다."
        lastReceiveDate={new Date('2024-05-13').toISOString()}
        unreadMessageCount="38"
      />
      <ChatRoomCard
        roomId="2"
        username="김철수"
        lastMessage="안녕하세요. 반갑습니다."
        lastReceiveDate={new Date('2024-02-23').toISOString()}
        unreadMessageCount="158"
      />
      <ChatRoomCard
        roomId="3"
        username="박진수"
        lastMessage="안녕하세요. 반갑습니다."
        lastReceiveDate={new Date('2024-01-11').toISOString()}
        unreadMessageCount="97"
      />
    </ul>
  );
}

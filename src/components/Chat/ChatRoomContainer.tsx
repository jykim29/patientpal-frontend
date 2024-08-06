import { createContext, useContext, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import { stompClient } from '@/api/stompClient';
import { SocketMessage, useChat } from '@/hooks/useChat';

import Input from '../common/Input';
import Button from '../common/Button';

interface MessageContextValues {
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (message: string) => void;
  messages: SocketMessage[];
}

const MessageContext = createContext<MessageContextValues | null>(null);

function useChatContext() {
  const values = useContext(MessageContext);
  if (!values)
    throw new Error('현재 컴포넌트는 MessageContext 내부에 포함되지 않습니다.');
  return values;
}

function MessageProvider({ children }: { children: React.ReactNode }) {
  const values = useChat(stompClient);

  const memoizeValues = useMemo(() => ({ ...values }), [values]);

  return (
    <MessageContext.Provider value={memoizeValues}>
      {children}
    </MessageContext.Provider>
  );
}

export default function ChatRoomContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MessageProvider>{children}</MessageProvider>;
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between">
      <h3 className="text-title-small">{children}</h3>
    </div>
  );
}

function MessengerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 flex w-full flex-col overflow-hidden rounded-md border border-gray-medium bg-white">
      {children}
    </div>
  );
}

function MessengerHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5 border-b border-gray-medium bg-gray-light px-5 py-3">
      {children}
    </div>
  );
}

function MessengerProfile() {
  return (
    <>
      <img
        className="h-14 w-14 rounded-full"
        src="/assets/default_profile_woman.png"
        alt="유저네임"
      />
      <span className="text-text-large font-semibold">김영희</span>
    </>
  );
}

function MessengerBody({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function ChatList() {
  const { messages } = useChatContext();
  console.log('ChatList rendering', messages);
  return (
    <ul className="flex max-h-[500px] flex-col items-center gap-7 overflow-y-auto px-6 py-8">
      {messages.map(({ content, createdAt, messageType }) => (
        <ChatListItem
          key={crypto.randomUUID()}
          isMe={true}
          data={{ content, messageType, createdAt }}
        />
      ))}
    </ul>
  );
}

function ChatListItem({
  isMe,
  data: { content, createdAt },
}: {
  isMe: boolean;
  data: SocketMessage;
}) {
  return (
    <li className={`chat-list-item ${isMe ? 'me' : 'other-person'}`}>
      <img
        className="profile-image"
        src="/assets/default_profile.jpg"
        alt="unknown"
      />
      <p className="chat-text">{content}</p>
      <time
        className="self-end text-text-small text-gray-medium-dark"
        dateTime={new Date(createdAt).toISOString()}
      >
        {format(createdAt, 'yyyy-MM-dd HH:mm')}
      </time>
    </li>
  );
}

function MessengerFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-t-gray-medium bg-gray-light px-6 py-2">
      {children}
    </div>
  );
}

function MessageForm() {
  const { sendMessage } = useChatContext();
  const { roomId } = useParams();
  const [message, setMessage] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const sendButtonClassName = twMerge(
    'px-2.5 py-3',
    message.trim() === ''
      ? 'bg-gray-medium cursor-not-allowed hover:brightness-1 active:brightness-1'
      : 'bg-primary'
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    sendMessage(message);
    setMessage('');
  };
  return (
    <form className="flex w-full items-center gap-3" onSubmit={handleSubmit}>
      <label
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-primary bg-white px-4 py-2.5 text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        htmlFor="attach"
      >
        <img src="/assets/clip.svg" title="이미지 첨부" alt="클립" />
      </label>
      <input
        className="sr-only"
        type="file"
        name="attach"
        id="attach"
        accept=".jpg, .png"
      />
      <div className="flex-1">
        <label className="sr-only" htmlFor="message">
          메세지
        </label>
        <Input
          id="message"
          className="w-full border-gray-light-medium py-2.5"
          type="text"
          name="message"
          placeholder="메세지 입력"
          value={message}
          onChange={onChange}
        />
      </div>
      <Button type="submit" className={sendButtonClassName}>
        <img src="/assets/send.svg" title="전송" alt="전송" />
      </Button>
      <Link
        to={`/mypage/contract/write/${roomId}`}
        className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-gold bg-orange px-2.5 py-2.5 text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
      >
        <img src="/assets/paper_pencil.svg" title="계약서 작성" alt="계약서" />
      </Link>
    </form>
  );
}

ChatRoomContainer.Title = Title;
ChatRoomContainer.Messenger = MessengerContainer;
ChatRoomContainer.Header = MessengerHeader;
ChatRoomContainer.Body = MessengerBody;
ChatRoomContainer.Footer = MessengerFooter;
ChatRoomContainer.Profile = MessengerProfile;
ChatRoomContainer.ChatList = ChatList;
ChatRoomContainer.MessageForm = MessageForm;

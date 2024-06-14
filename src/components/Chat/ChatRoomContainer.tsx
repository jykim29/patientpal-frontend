import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

import Input from '../common/Input';
import Button from '../common/Button';

interface DummyChatItem {
  id: number;
  userId: string;
  userType: string;
  username: string;
  profileImageUrl: string;
  messageType: string;
  message: string;
  createdDate: string;
}

const dummyChatData: DummyChatItem[] = [
  {
    id: 0,
    userId: 'chulsoo123',
    userType: 'USER',
    username: '이철수',
    profileImageUrl: '/assets/default_profile_man.png',
    messageType: 'text',
    message:
      '채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다.',
    createdDate: new Date().toISOString(),
  },
  {
    id: 1,
    userId: 'chulsoo123',
    userType: 'USER',
    username: '이철수',
    profileImageUrl: '/assets/default_profile_man.png',
    messageType: 'text',
    message:
      '채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다.',
    createdDate: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 'younghee456',
    userType: 'CAREGIVER',
    username: '김영희',
    profileImageUrl: '/assets/default_profile_woman.png',
    messageType: 'text',
    message:
      '채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다.',
    createdDate: new Date().toISOString(),
  },
  {
    id: 3,
    userId: 'younghee456',
    userType: 'CAREGIVER',
    username: '김영희',
    profileImageUrl: '/assets/default_profile_woman.png',
    messageType: 'text',
    message:
      '채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다. 채팅 메세지입니다.',
    createdDate: new Date().toISOString(),
  },
];
const tempMyId = 'chulsoo123';

export default function ChatRoomContainer({
  chatData = dummyChatData,
  children,
}: {
  chatData?: DummyChatItem[];
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
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
  console.log('ChatList 렌더링');
  return (
    <ul className="flex max-h-[500px] flex-col items-center gap-7 overflow-y-auto px-6 py-8">
      {dummyChatData.map(
        ({ id, username, userId, profileImageUrl, message, createdDate }) => (
          <MemoChatListItem
            key={id}
            isMe={userId === tempMyId}
            data={{ username, message, profileImageUrl, createdDate }}
          />
        )
      )}
    </ul>
  );
}

function ChatListItem({
  isMe,
  data: { username, profileImageUrl, message, createdDate },
}: {
  isMe: boolean;
  data: {
    username: string;
    profileImageUrl: string;
    message: string;
    createdDate: string;
  };
}) {
  return (
    <li className={`chat-list-item ${isMe ? 'me' : 'other-person'}`}>
      <img className="profile-image" src={profileImageUrl} alt={username} />
      <p className="chat-text">{message}</p>
      <time
        className="self-end text-text-small text-gray-medium-dark"
        dateTime={new Date(createdDate).toISOString()}
      >
        18:56
      </time>
    </li>
  );
}
const MemoChatListItem = memo(ChatListItem);

function MessengerFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-t-gray-medium bg-gray-light px-6 py-2">
      {children}
    </div>
  );
}

function MessageForm() {
  // const sendButtonClassName = twMerge(
  //   'px-2.5 py-3',
  //   message.trim() === ''
  //     ? 'bg-gray-medium cursor-not-allowed hover:brightness-1 active:brightness-1'
  //     : 'bg-primary'
  // );
  return (
    <form className="flex w-full items-center gap-3">
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
        <Input
          className="w-full border-gray-light-medium py-2.5"
          type="text"
          label="메세지"
          name="message"
          placeholder="메세지 입력"
          isHideLabel
        />
      </div>
      <Button type="submit" className="bg-primary px-2.5 py-3">
        <img src="/assets/send.svg" title="전송" alt="전송" />
      </Button>
      <Button type="button" className="border-2 border-gold bg-orange px-2.5">
        <img src="/assets/paper_pencil.svg" title="계약서 작성" alt="계약서" />
      </Button>
    </form>
  );
}

// 일단 전부 다 memo
ChatRoomContainer.Title = memo(Title);
ChatRoomContainer.Messenger = memo(MessengerContainer);
ChatRoomContainer.Header = memo(MessengerHeader);
ChatRoomContainer.Body = memo(MessengerBody);
ChatRoomContainer.Footer = memo(MessengerFooter);
ChatRoomContainer.Profile = memo(MessengerProfile);
ChatRoomContainer.ChatList = memo(ChatList);
ChatRoomContainer.MessageForm = memo(MessageForm);

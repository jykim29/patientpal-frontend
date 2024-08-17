import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { GetRoomDataResponse, MessageItem } from '@/types/api/chat';
import { useChat } from '@/hooks/useChat';
import { stompClient } from '@/api/stompClient';

interface ChatContextValues {
  isConnected: boolean;
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  roomListState: [
    GetRoomDataResponse[],
    React.Dispatch<React.SetStateAction<GetRoomDataResponse[]>>,
  ];
  currentRoomDataState: [
    GetRoomDataResponse | null,
    React.Dispatch<React.SetStateAction<GetRoomDataResponse | null>>,
  ];
  currentRoomMessagesState: [
    MessageItem[],
    React.Dispatch<React.SetStateAction<MessageItem[]>>,
  ];
  connect: (roomId: number) => void;
  disconnect: (roomId: number) => void;
  sendMessage: (roomId: number, message: string) => void;
  getMessages: (roomId: number, pageNumber?: number) => Promise<boolean>;
}

export const ChatContext = createContext<ChatContextValues | null>(null);

export default function ChatContextProvider() {
  const values = useChat(stompClient);
  return (
    <ChatContext.Provider value={values}>
      <Outlet />
    </ChatContext.Provider>
  );
}

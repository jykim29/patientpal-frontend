import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { GetRoomDataResponse } from '@/types/api/chat';
import { CurrentRoomMessagesState, useChat } from '@/hooks/useChat';
import { stompClient } from '@/api/stompClient';

interface ChatContextValues {
  isConnected: boolean;
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  roomListState: [
    GetRoomDataResponse[] | null,
    React.Dispatch<React.SetStateAction<GetRoomDataResponse[] | null>>,
  ];
  currentRoomDataState: [
    GetRoomDataResponse | null,
    React.Dispatch<React.SetStateAction<GetRoomDataResponse | null>>,
  ];
  currentRoomMessagesState: [
    CurrentRoomMessagesState,
    React.Dispatch<React.SetStateAction<CurrentRoomMessagesState>>,
  ];
  connect: (roomId: number) => void;
  disconnect: (roomId: number) => void;
  sendMessage: (roomId: number, message: string) => void;
  getMessages: (roomId: number, pageNumber?: number) => Promise<boolean>;
}

export const ChatContext = createContext<ChatContextValues | null>(null);

export function Component() {
  const values = useChat(stompClient);
  return (
    <ChatContext.Provider value={values}>
      <Outlet />
    </ChatContext.Provider>
  );
}

Component.displayName = 'ChatContextProvider';

import { useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import _ from 'lodash';
import { useAuthStore } from '@/store/useAuthStore';
import { chatService } from '@/services';
import { API_FAILED } from '@/constants/api';
import { GetRoomDataResponse, MessageItem } from '@/types/api/chat';
import { toLocaleISOString } from '@/utils/toLocaleISOString';
import { useModal } from './useModal';

export interface SocketMessage {
  memberId: number;
  userName?: string; // 필요없을 듯 하다.
  name: string;
  profileImageUrl: string;
  createdAt: string;
  content: string;
}

export function useChat(stompClient: Client) {
  const { alert } = useModal();
  const { user, accessToken } = useAuthStore();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const loadingState = useState<boolean>(false);
  const roomListState = useState<GetRoomDataResponse[]>([]);
  const currentRoomDataState = useState<GetRoomDataResponse | null>(null);
  const currentRoomMessagesState = useState<MessageItem[]>([]);
  const [, setCurrentRoomMessages] = currentRoomMessagesState;

  const connect = (roomId: number) => {
    stompClient.onConnect = (frame) => {
      console.log('연결됨', frame);
      joinRoom(roomId);
    };
    stompClient.activate();
  };
  const disconnect = () => {
    stompClient.onDisconnect = (frame) => {
      console.log('연결끊김', frame);
      setIsConnected(false);
    };
    stompClient.deactivate();
  };
  const handleSubscribe = (roomId: number, message: IMessage) => {
    console.log('메세지 수신', message);
    const { name, content, memberId, createdAt, profileImageUrl } = JSON.parse(
      message.body
    );
    const newMessage: MessageItem = {
      chatId: roomId,
      name,
      profileImageUrl,
      content,
      createdDate: createdAt,
      lastModifiedDate: createdAt,
      profilePublicTime: createdAt,
      id: _.random(99999),
      messageType: 'CHAT',
      senderId: memberId,
    };
    setCurrentRoomMessages((prev) => [...prev, newMessage]);
  };
  const joinRoom = (roomId: number) => {
    console.log('join room');
    stompClient.subscribe(
      `/topic/directChat/${roomId}`,
      (message) => handleSubscribe(roomId, message),
      {
        id: String(roomId),
      }
    );
  };
  // Unusable Function
  // const leaveRoom = (roomId: number) => {
  //   console.log('leave room');
  //   setCurrentRoomMessages([]);
  //   stompClient.unsubscribe(String(roomId));
  // };
  const sendMessage = (roomId: number, message: string) => {
    if (!user) return;
    if (!isConnected)
      return alert(
        'warning',
        '채팅 서버와 연결되지 않아 메세지를 보낼 수 없습니다.'
      );
    const publishBody: SocketMessage = {
      content: message,
      memberId: user.memberId,
      name: user.name,
      userName: user.name,
      profileImageUrl: user.image,
      createdAt: toLocaleISOString(new Date()),
    };
    console.log(publishBody);
    stompClient.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(publishBody),
    });
  };

  const getMessages = async (roomId: number, pageNumber: number = 0) => {
    const response = await chatService.getMessages(Number(roomId), pageNumber, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === API_FAILED) return false;
    const reverseContent = response.data.content.reverse();
    setCurrentRoomMessages((prev) => [...reverseContent, ...prev]);
    setIsConnected(true);
    return true;
  };

  return {
    isConnected,
    loadingState,
    roomListState,
    currentRoomDataState,
    currentRoomMessagesState,
    connect,
    disconnect,
    sendMessage,
    getMessages,
  };
}

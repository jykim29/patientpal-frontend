import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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

export interface CurrentRoomMessagesState {
  messages: MessageItem[];
  pageNumber: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export function useChat(stompClient: Client) {
  const { alert } = useModal();
  const { user, accessToken } = useAuthStore();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const loadingState = useState<boolean>(true);
  const roomListState = useState<GetRoomDataResponse[] | null>(null);
  const currentRoomDataState = useState<GetRoomDataResponse | null>(null);
  const currentRoomMessagesState = useState<CurrentRoomMessagesState>({
    messages: [],
    pageNumber: 0,
    totalPages: 0,
    first: true,
    last: true,
  });
  const { roomId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [, setCurrentRoomMessages] = currentRoomMessagesState;

  const connect = (roomId: number) => {
    stompClient.onConnect = () => {
      joinRoom(roomId);
    };
    stompClient.activate();
  };
  const disconnect = () => {
    stompClient.onDisconnect = () => {
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
    setCurrentRoomMessages((prev) => ({
      ...prev,
      messages: [newMessage, ...prev.messages],
    }));
  };
  const joinRoom = (roomId: number) => {
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

    setCurrentRoomMessages((prev) => ({
      messages: [...prev.messages, ...response.data.content],
      pageNumber: response.data.number,
      totalPages: response.data.totalPages,
      first: response.data.first,
      last: response.data.last,
    }));
    setIsConnected(true);
    return true;
  };

  const getRoomListData = async () => {
    if (!user || !accessToken) {
      await alert('warning', '접근 권한이 없습니다.');
      return null;
    }
    const getAllRoomDataResponse = await chatService.getAllRoomData(
      user.memberId,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (getAllRoomDataResponse.status === API_FAILED) {
      await alert('warning', getAllRoomDataResponse.data.message as string);
      return null;
    }
    return getAllRoomDataResponse.data;
  };
  const getCurrentRoomData = async (roomList: GetRoomDataResponse[]) => {
    const currentRoomData = roomList.find(
      (value) => value.chatId === Number(roomId)
    );
    if (!currentRoomData) {
      await alert('warning', '자신이 참여한 채팅방이 아닙니다.');
      return null;
    }
    return currentRoomData;
  };
  const initializeRoom = async (roomList: GetRoomDataResponse[]) => {
    const roomListData = roomListState[0] ? roomListState[0] : roomList;
    const currentRoomData = await getCurrentRoomData(roomListData);
    if (!currentRoomData) return navigate('/mypage/chat/lobby');
    connect(Number(roomId));
    const getMessagesResponse = await getMessages(Number(roomId), 0);
    if (!getMessagesResponse) {
      await alert('warning', '서버 오류로 메세지를 불러올 수 없습니다.');
      return navigate('/mypage/chat/lobby');
    }
    return currentRoomData;
  };
  const initialize = async () => {
    loadingState[1](true);
    const roomList = await getRoomListData();
    if (!roomList) return navigate('/');

    let currentRoomData = null;
    if (pathname.startsWith('/mypage/chat/room'))
      currentRoomData = await initializeRoom(roomList);

    roomListState[1](roomList);
    if (currentRoomData) currentRoomDataState[1](currentRoomData);
    loadingState[1](false);
  };

  useEffect(() => {
    if (roomListState[0] && pathname.startsWith('/mypage/chat/room')) {
      loadingState[1](true);
      initializeRoom(roomListState[0]).then((res) => {
        if (!res) return;
        currentRoomDataState[1](res);
        loadingState[1](false);
      });
    }
  }, [pathname]);

  useEffect(() => {
    initialize();
  }, []);

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

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';

export interface SocketMessage {
  content: string;
  createdAt: number;
  messageType: string;
}

export function useChat(stompClient: Client) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<SocketMessage[]>([]);
  const { roomId } = useParams();
  const chatRoomId = roomId as string;

  const joinRoom = (roomId: string) => {
    console.log('join room');
    stompClient.subscribe(
      `/topic/directChat/${roomId}`,
      (message) => {
        console.log('메세지', message);
        const body = JSON.parse(message.body);
        setMessages((prev) => [
          ...prev,
          {
            ...body,
            createdAt: Date.now(), // 임시 속성
            messageType: message.command, // 임시 속성
          },
        ]);
      },
      { id: roomId }
    );
  };
  const leaveRoom = (roomId: string) => {
    console.log('leave room');
    stompClient.unsubscribe(roomId);
  };
  const sendMessage = (message: string) => {
    stompClient.publish({
      destination: `/app/chat/${chatRoomId}`,
      body: JSON.stringify({ content: message }),
    });
  };

  useEffect(() => {
    stompClient.onConnect = (frame) => {
      console.log('연결됨', frame);
      joinRoom(chatRoomId);
      setIsConnected(true);
    };
    stompClient.onDisconnect = (frame) => {
      console.log('연결끊김', frame);
      leaveRoom(chatRoomId);
      setIsConnected(false);
    };
    stompClient.activate();
    return () => {
      console.log('unmounted');
      stompClient.deactivate().then(() => setIsConnected(false));
    };
  }, []);

  return { isConnected, joinRoom, leaveRoom, sendMessage, messages };
}

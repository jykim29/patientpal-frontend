import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

export function useChat(stompClient: Client) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);

  const createChatRoom = (roomId: string) => {
    const join = () => {
      stompClient.subscribe(
        `/topic/directChat/${roomId}`,
        (message) => {
          console.log(message);
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        },
        { id: roomId }
      );
    };
    const leave = () => {
      stompClient.unsubscribe(roomId);
    };
    const send = (message: string) => {
      stompClient.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({ content: message }),
      });
    };
    return { join, leave, send };
  };

  useEffect(() => {
    stompClient.onConnect = (frame) => {
      console.log('연결됨', frame);
      setIsConnected(true);
    };
    stompClient.activate();
    return () => {
      console.log('unmounted');
      stompClient.deactivate().then(() => setIsConnected(false));
    };
  }, []);

  return { isConnected, createChatRoom, messages };
}

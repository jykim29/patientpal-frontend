import { Client } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/api';

const socketUrl = BASE_URL.WEBSOCKET;

export const stompClient = new Client({
  webSocketFactory() {
    // @ts-expect-error: Unknown error
    return new SockJS(socketUrl);
  },
  onStompError(frame) {
    console.error('Stomp Error occured : ' + frame);
  },
  debug(str: string) {
    if (import.meta.env.MODE === 'development') console.log(str);
  },
  reconnectDelay: 5000,
});

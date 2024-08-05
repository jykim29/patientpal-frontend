import { Client } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/api';

const socketUrl = BASE_URL.WEBSOCKET;

export const stompClient = new Client({
  webSocketFactory() {
    // @ts-expect-error: Unknown error
    return new SockJS(socketUrl);
  },
  onConnect(frame) {
    console.log('connected', frame);
  },
  onDisconnect(frame) {
    console.log('disconnected', frame);
  },
  onStompError(frame) {
    console.error('에러가 발생했습니다.' + frame);
  },
  debug(str: string) {
    console.log(str);
  },
  onWebSocketClose() {
    console.log('웹소켓 닫힘');
  },
  onWebSocketError() {
    console.log('웹소켓 에러');
  },
  reconnectDelay: 5000,
});

import { EventSourcePolyfill } from 'event-source-polyfill';
import { AxiosRequestConfig } from 'axios';
import { HTTPClient } from '@/api/httpClient';
import {
  API_ENDPOINT,
  API_FAILED,
  API_SUCCESS,
  BASE_URL,
} from '@/constants/api';
import {
  NotificationItem,
  useNotificationStore,
} from '@/store/useNotificationStore';

export class NotificationService {
  private httpClient;
  private setList;
  private resetList;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
    this.setList = useNotificationStore.getState().setList;
    this.resetList = useNotificationStore.getState().resetList;
  }

  async createSSEConnection({
    targetRef,
    accessToken,
    heartbeatTimeout = 1000 * 60 * 60,
  }: {
    targetRef: React.MutableRefObject<EventSourcePolyfill | undefined>;
    accessToken: string;
    heartbeatTimeout?: number;
  }) {
    // 이미 연결중일 경우, 연결 해제
    if (targetRef.current) targetRef.current.close();
    // SSE 연결
    targetRef.current = new EventSourcePolyfill(
      `${BASE_URL.API}${API_ENDPOINT.NOTIFICATION.SUBSCRIBE}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
        heartbeatTimeout,
      }
    );
    // 이벤트 리스너
    targetRef.current.onerror = (event) => {
      console.log('Eventsource error :', event);
      if (targetRef.current) targetRef.current.close();
    };
    targetRef.current.onmessage = (event) => {
      const parsedData: NotificationItem = JSON.parse(event.data);
      const allowedTypeList: NotificationItem['type'][] = [
        'MATCH',
        'REVIEW',
        'CHAT',
      ];
      if (parsedData && allowedTypeList.includes(parsedData.type))
        this.setList(parsedData);
    };
  }

  async readAllNotification(config: AxiosRequestConfig = {}) {
    const { data, status } = await this.httpClient.POST(
      API_ENDPOINT.NOTIFICATION.READ,
      null,
      config
    );
    if (status === API_FAILED) return { data, status: API_FAILED };
    this.resetList();
    return { data, status: API_SUCCESS };
  }
}

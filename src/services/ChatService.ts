import axios, { AxiosRequestConfig } from 'axios';

import { HTTPClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import {
  CreateRoomRequestBody,
  GetJoinedRoomInfoResponse,
  GetMessagesResponse,
  GetRoomInfoResponse,
  MessageItem,
  PostMessageRequestBody,
  PostMessageResponse,
} from '@/types/api/chat';
import { FetchResult } from '@/types/api/common';

export default class ChatService {
  private httpClient;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getJoinedRoomInfo(
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<(MessageItem | undefined)[]>> {
    const response = await this.httpClient.GET<GetJoinedRoomInfoResponse>(
      API_ENDPOINT.CHATS,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    const chatIds = response.data.map((value) => value.chatId);
    const getFirstMessageRequest = chatIds.map((chatId) =>
      this.getMessages(chatId, 0, config).then((res) => {
        if (res.status === API_FAILED) return;
        return res.data.content[0];
      })
    );
    const lastMessageList = await axios.all(getFirstMessageRequest);

    return { data: lastMessageList, status: API_SUCCESS };
  }

  async getRoomInfo(
    roomId: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetRoomInfoResponse>> {
    const response = await this.httpClient.GET<GetRoomInfoResponse>(
      `${API_ENDPOINT.CHATS}/${roomId}`,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }

  async createRoom(
    memberIds: [number, number],
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetRoomInfoResponse>> {
    const sortedMemberIds = memberIds.sort((a, b) => a - b);
    const response = await this.httpClient.POST<
      CreateRoomRequestBody,
      GetRoomInfoResponse
    >(API_ENDPOINT.CHATS, { memberIds: sortedMemberIds }, config);
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }

  async deleteRoom(roomId: number, config: AxiosRequestConfig = {}) {
    const response = await this.httpClient.DELETE<null>(
      `${API_ENDPOINT.CHATS}/${roomId}`,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }

  async getMessages(
    chatId: number,
    page: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetMessagesResponse>> {
    const PAGE_SIZE = 10;
    const response = await this.httpClient.GET<GetMessagesResponse>(
      API_ENDPOINT.MESSAGES,
      {
        ...config,
        params: {
          chatId,
          page,
          size: PAGE_SIZE,
        },
      }
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }

  async postMessage(
    data: PostMessageRequestBody,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<PostMessageResponse>> {
    const response = await this.httpClient.POST<
      PostMessageRequestBody,
      PostMessageResponse
    >(API_ENDPOINT.MESSAGES, data, config);
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    return { data: response.data, status: API_SUCCESS };
  }
}

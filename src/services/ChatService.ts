import { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { HTTPClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import {
  CreateRoomRequestBody,
  GetMessagesResponse,
  GetRoomDataResponse,
  GetRoomInfoResponse,
  PostMessageRequestBody,
  PostMessageResponse,
} from '@/types/api/chat';
import { FetchResult } from '@/types/api/common';
import { GetMemberListResponse } from '@/types/api/member';

export default class ChatService {
  private httpClient;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getAllRoomData(
    myMemberId: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetRoomDataResponse[]>> {
    const response = await this.httpClient.GET<GetRoomInfoResponse[]>(
      API_ENDPOINT.CHATS,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    const partnerIds = response.data.flatMap((value) =>
      value.managerIds.filter((id) => myMemberId !== id)
    );
    const { data: getMemberListData, status: getMemberListStatus } =
      await this.httpClient.GET<GetMemberListResponse>('/member', {
        ...config,
        params: {
          memberIds: partnerIds,
        },
        paramsSerializer: (params) =>
          stringify(params, { arrayFormat: 'comma' }),
      });
    if (getMemberListStatus === API_FAILED)
      return { data: getMemberListData, status: API_FAILED };

    const combinedData = response.data.map((value) => {
      const partnerInfoData =
        getMemberListData.find((member) =>
          value.managerIds.includes(member.memberId)
        ) || null;
      if (!partnerInfoData)
        return {
          chatId: value.chatId,
          chatType: value.chatType,
          partnerInfo: null,
        };
      return {
        chatId: value.chatId,
        chatType: value.chatType,
        partnerInfo: {
          ...partnerInfoData,
          profileImageUrl:
            partnerInfoData?.profileImageUrl ??
            '/assets/images/default_profile.jpg',
        },
      };
    });
    return { data: combinedData, status: API_SUCCESS };
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

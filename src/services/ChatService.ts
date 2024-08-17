import { AxiosRequestConfig } from 'axios';

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
import { getCaregiverProfile, getPatientProfile } from '@/api/profile.api';
import { GetUserDataResponse } from '@/types/api/member';

export default class ChatService {
  private httpClient;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
  }

  async getAllRoomData(
    user: GetUserDataResponse,
    accessToken: string,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetRoomDataResponse[]>> {
    const myId = user.memberId;
    const myRole = user.role;
    const response = await this.httpClient.GET<GetRoomInfoResponse[]>(
      API_ENDPOINT.CHATS,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    const filteredData = response.data.map((value) => ({
      ...value,
      managerIds: value.managerIds.find((id) => myId !== id),
    }));
    const getProfile =
      myRole === 'USER' ? getPatientProfile : getCaregiverProfile;
    const addInfoData = await Promise.all(
      filteredData.map(async (value) => {
        const { data } = await getProfile(
          value.managerIds as number,
          accessToken as string
        );
        return {
          chatId: value.chatId,
          chatType: value.chatType,
          partnerInfo: {
            memberId: value.managerIds,
            name: (data as any).name,
            profileImageUrl:
              (data as any).image ?? '/assets/default_profile.jpg',
          },
        };
      })
    );
    return { data: addInfoData, status: API_SUCCESS };
  }

  async getRoomData(
    user: GetUserDataResponse,
    accessToken: string,
    roomId: number,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetRoomDataResponse>> {
    const myId = user.memberId;
    const myRole = user.role;
    const response = await this.httpClient.GET<GetRoomInfoResponse>(
      `${API_ENDPOINT.CHATS}/${roomId}`,
      config
    );
    if (response.status === API_FAILED) {
      return { data: response.data, status: API_FAILED };
    }
    if (!response.data.managerIds.includes(myId)) {
      return {
        data: {
          message: '자신이 참여한 채팅방이 아닙니다.',
        },
        status: API_FAILED,
      };
    }
    const partnerId = response.data.managerIds.find((value) => value !== myId);
    const getProfile =
      myRole === 'USER' ? getPatientProfile : getCaregiverProfile;
    const { data: partnerData } = await getProfile(
      partnerId as number,
      accessToken
    );
    const filteredData: GetRoomDataResponse = {
      chatId: response.data.chatId,
      chatType: response.data.chatType,
      partnerInfo: {
        memberId: (partnerData as any).memberId,
        name: (partnerData as any).name,
        profileImageUrl:
          (partnerData as any).image ?? '/assets/default_profile.jpg',
      },
    };
    return { data: filteredData, status: API_SUCCESS };
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

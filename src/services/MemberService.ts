import { AxiosRequestConfig } from 'axios';
import { Role } from '@/types/user';

import { HTTPClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import {
  GetRecommendUserDataResponse,
  GetUserDataResponse,
} from '@/types/api/member';
import { FetchResult } from '@/types/api/common';
import { decodeTokenPayload } from '@/utils/decodeTokenPayload';
import { useAuthStore } from './../store/useAuthStore';

export default class MemberService {
  private httpClient;
  private updateData;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
    this.updateData = useAuthStore.getState().update;
  }
  async getUserData(
    token: string,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetUserDataResponse>> {
    const { data, status } = await this.httpClient.GET<GetUserDataResponse>(
      API_ENDPOINT.MEMBER.INFORMATION,
      config
    );
    if (status === API_FAILED) return { data, status: API_FAILED };
    this.updateData({
      isLoggedIn: true,
      accessToken: token,
      lastLogin: new Date().toISOString(),
      user: {
        ...data,
        role: decodeTokenPayload(token).auth,
      },
    });
    return { data, status: API_SUCCESS };
  }

  async getRecommendUserData(
    myRole: Role,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<GetRecommendUserDataResponse>> {
    console.log(myRole);
    const endPoint =
      myRole === 'USER'
        ? API_ENDPOINT.PATIENT.RECOMMEND
        : API_ENDPOINT.CAREGIVER.RECOMMEND;
    const response = await this.httpClient.GET<GetRecommendUserDataResponse>(
      endPoint,
      config
    );
    if (response.status === API_FAILED)
      return { data: response.data, status: API_FAILED };
    return { data: response.data, status: API_SUCCESS };
  }

  async checkUsername(
    username: string,
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<boolean>> {
    const { data, status } = await this.httpClient.GET<boolean>(
      `${API_ENDPOINT.MEMBER.CHECK_USERNAME}?username=${username}`,
      config
    );
    if (status === API_FAILED) return { data, status: API_FAILED };
    return { data, status: API_SUCCESS };
  }
}

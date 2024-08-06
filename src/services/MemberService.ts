import { AxiosRequestConfig } from 'axios';

import { HTTPClient, httpClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import { GetUserDataResponse } from '@/types/api/member';
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

  async checkUsername(
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<boolean>> {
    const { data, status } = await this.httpClient.GET<boolean>(
      API_ENDPOINT.MEMBER.CHECK_USERNAME,
      config
    );
    if (status === API_FAILED) return { data, status: API_FAILED };
    return { data, status: API_SUCCESS };
  }
}

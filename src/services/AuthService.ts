import { AxiosRequestConfig } from 'axios';

import { HTTPClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import {
  RefreshTokenResponse,
  RequestBody,
  SignInResponse,
  SignOutResponse,
  SignUpResponse,
} from '@/types/api/auth';
import { FetchResult } from '@/types/api/common';
import { useAuthStore } from './../store/useAuthStore';

export default class AuthService {
  private httpClient;
  private resetData;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
    this.resetData = useAuthStore.getState().reset;
  }
  async signInWithIdPassword(
    formData: RequestBody['login'],
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<SignInResponse>> {
    // 로그인 API
    const { data, status } = await this.httpClient.POST<
      RequestBody['login'],
      SignInResponse
    >(API_ENDPOINT.AUTH.LOGIN, formData, config);
    if (status === API_FAILED) {
      return { data, status: API_FAILED };
    }
    return { data: data, status: API_SUCCESS };
  }

  async signUp(
    formData: RequestBody['register'],
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<SignUpResponse>> {
    const { data, status } = await this.httpClient.POST<
      RequestBody['register'],
      SignUpResponse
    >(API_ENDPOINT.AUTH.REGISTER, formData, config);
    if (status === API_FAILED) return { data, status: API_FAILED };

    return {
      data: {
        message: '회원가입이 완료되었습니다. 로그인페이지로 이동합니다.',
      },
      status: API_SUCCESS,
    };
  }

  async signOut(
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<SignOutResponse>> {
    const { data, status } = await this.httpClient.GET<null>(
      API_ENDPOINT.AUTH.LOGOUT,
      config
    );
    if (status === API_FAILED) return { data, status: API_FAILED };
    this.resetData();
    return {
      data: { message: '정상적으로 로그아웃되었습니다.' },
      status: API_SUCCESS,
    };
  }

  async refreshToken(
    config: AxiosRequestConfig = {}
  ): Promise<FetchResult<RefreshTokenResponse>> {
    const { data, status } = await this.httpClient.POST<
      null,
      RefreshTokenResponse
    >(API_ENDPOINT.AUTH.REFRESH, null, config);
    if (status === API_FAILED) {
      this.resetData();
      return { data, status: API_FAILED };
    }
    return { data, status: API_SUCCESS };
  }
}

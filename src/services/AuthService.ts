import { AxiosRequestConfig } from 'axios';

import { HTTPClient, httpClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import {
  RefreshTokenResponse,
  RequestBody,
  SignInResponse,
  SignUpResponse,
} from '@/types/api/auth';
import { useAuthStore } from './../store/useAuthStore';

class AuthService {
  private httpClient;
  private updateData;
  private resetData;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
    this.updateData = useAuthStore.getState().update;
    this.resetData = useAuthStore.getState().reset;
  }
  async signInWithIdPassword(
    formData: RequestBody['login'],
    config: AxiosRequestConfig = {}
  ) {
    const { data, status } = await this.httpClient.POST<
      RequestBody['login'],
      SignInResponse
    >(API_ENDPOINT.AUTH.LOGIN, formData, config);
    if (status === API_FAILED) {
      return { message: data.message as string, status: API_FAILED };
    }
    this.updateData({
      isLoggedIn: true,
      accessToken: data.access_token,
      lastLogin: new Date().toISOString(),
      user: {},
    });
    return { message: null, status: API_SUCCESS };
  }

  async signUp(
    formData: RequestBody['register'],
    config: AxiosRequestConfig = {}
  ) {
    const { data, status } = await this.httpClient.POST<
      RequestBody['register'],
      SignUpResponse
    >(API_ENDPOINT.AUTH.REGISTER, formData, config);
    if (status === API_FAILED) {
      return { message: data.message as string, status: API_FAILED };
    }
    return {
      message: '회원가입이 완료되었습니다. 로그인페이지로 이동합니다.',
      status: API_SUCCESS,
    };
  }

  async refreshToken(config: AxiosRequestConfig = {}) {
    const { data, status } = await this.httpClient.POST<
      null,
      RefreshTokenResponse
    >(API_ENDPOINT.AUTH.REFRESH, null, config);
    if (status === API_FAILED) {
      this.resetData();
      return { message: data.message as string, status: API_FAILED };
    }
    this.updateData({
      isLoggedIn: true,
      accessToken: data.access_token,
      lastLogin: new Date().toISOString(),
      user: {},
    });
    return { message: null, status: API_SUCCESS };
  }
}

export const authService = new AuthService(httpClient);

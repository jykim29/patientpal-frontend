import { HTTPClient, httpClient } from '@/api/httpClient';
import { API_ENDPOINT, API_FAILED, API_SUCCESS } from '@/constants/api';
import { useAccessTokenStore } from '@/store/useAccessTokenStore';
import {
  RefreshTokenResponse,
  RequestBody,
  SignInResponse,
  SignUpResponse,
} from '@/types/api/auth';

class AuthService {
  private httpClient;
  private setToken;
  constructor(httpClient: HTTPClient) {
    this.httpClient = httpClient;
    this.setToken = useAccessTokenStore.getState().set;
  }
  public async signInWithIdPassword(
    formData: RequestBody['login'],
    config = {}
  ) {
    const { data, status } = await this.httpClient.POST<
      RequestBody['login'],
      SignInResponse
    >(API_ENDPOINT.AUTH.LOGIN, formData, config);
    if (status === API_FAILED) {
      return { message: data.message as string, status: API_FAILED };
    }
    this.setToken(data.access_token);
    return { message: null, status: API_SUCCESS };
  }

  public async signUp(formData: RequestBody['register'], config = {}) {
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

  public async refreshToken(config = {}) {
    const { data, status } = await this.httpClient.POST<
      null,
      RefreshTokenResponse
    >(API_ENDPOINT.AUTH.REFRESH, null, config);
    if (status === API_FAILED) {
      return { message: data.message as string, status: API_FAILED };
    }
    this.setToken(data.access_token);
    return { message: null, status: API_SUCCESS };
  }
}

export const authService = new AuthService(httpClient);

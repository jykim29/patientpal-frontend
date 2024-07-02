import authApi from '@/api/auth/authApi';
import { FETCH_FAILED, FETCH_SUCCESS } from '@/constants/api';
import { useAccessTokenStore } from '@/store/useAccessTokenStore';
import { AuthApi, RequestBody } from '@/types/authApi.type';

class AuthService {
  private authApi: ReturnType<AuthApi>;
  private setToken;
  constructor(api: ReturnType<AuthApi>) {
    this.authApi = api;
    this.setToken = useAccessTokenStore.getState().set;
  }
  public async signInWithIdPassword(
    formData: RequestBody['login'],
    config = {}
  ) {
    const { data, status } = await this.authApi.login(formData, config);
    if (status === FETCH_FAILED) {
      return { message: data.message as string, status: FETCH_FAILED };
    }
    this.setToken(data.access_token);
    return { message: null, status: FETCH_SUCCESS };
  }

  public async signUp(formData: RequestBody['register'], config = {}) {
    const { data, status } = await this.authApi.register(formData, config);
    if (status === FETCH_FAILED) {
      return { message: data.message as string, status: FETCH_FAILED };
    }
    return {
      message: '회원가입이 완료되었습니다. 로그인페이지로 이동합니다.',
      status: FETCH_SUCCESS,
    };
  }

  public async refreshToken(config = {}) {
    const { data, status } = await this.authApi.refresh(config);
    if (status === FETCH_FAILED) {
      return { message: data.message as string, status: FETCH_FAILED };
    }
    this.setToken(data.access_token);
    return { message: null, status: FETCH_SUCCESS };
  }
}

export const authService = new AuthService(authApi);

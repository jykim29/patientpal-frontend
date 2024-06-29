import axios from 'axios';
import {
  AuthErrorResponseData,
  RefreshTokenResponse,
  RefreshTokenResponseData,
} from '@/types/authApi.type';
import { API_ENDPOINT } from '@/constants/api';
import { httpClient } from '../http';

export default async function reissueToken(): Promise<
  RefreshTokenResponseData | AuthErrorResponseData
> {
  try {
    const response: RefreshTokenResponse = await httpClient.post(
      API_ENDPOINT.AUTH.REFRESH,
      null
    );
    return {
      result: 'SUCCESS',
      data: { access_token: response.data.access_token },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      console.error(
        `Error Code [${response?.data.code}] : ${response?.data.message} `
      );
      return { result: 'FAIL', data: { message: response?.data.message } };
    }
    return { result: 'FAIL', data: { message: (error as Error).message } };
  }
}

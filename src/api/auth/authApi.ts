import { AxiosError } from 'axios';
import { API_ENDPOINT, FETCH_FAILED, FETCH_SUCCESS } from '@/constants/api';
import {
  AuthApi,
  ErrorResponse,
  Login,
  Refresh,
  Register,
  SignInResponse,
  SignUpResponse,
} from '@/types/authApi.type';
import { httpClient } from '../http';

const authApi: AuthApi = () => {
  const register: Register = async (formData, config = {}) => {
    try {
      const { data } = await httpClient.post<SignUpResponse>(
        API_ENDPOINT.AUTH.REGISTER,
        formData,
        { ...config }
      );
      return { data: data, status: FETCH_SUCCESS };
    } catch (error) {
      const { response } = error as AxiosError<SignUpResponse>;
      return { data: response!.data, status: FETCH_FAILED };
    }
  };

  const login: Login = async (formData, config = {}) => {
    try {
      const { data } = await httpClient.post<SignInResponse>(
        API_ENDPOINT.AUTH.LOGIN,
        formData,
        {
          ...config,
        }
      );
      return {
        data: { access_token: data.access_token },
        status: FETCH_SUCCESS,
      };
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;
      return { data: response!.data, status: FETCH_FAILED };
    }
  };

  const refresh: Refresh = async (config = {}) => {
    try {
      const { data } = await httpClient.post<SignInResponse>(
        API_ENDPOINT.AUTH.REFRESH,
        null,
        { ...config }
      );
      return {
        data: { access_token: data.access_token },
        status: FETCH_SUCCESS,
      };
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;
      return { data: response!.data, status: FETCH_FAILED };
    }
  };

  return { register, login, refresh };
};

export default authApi();

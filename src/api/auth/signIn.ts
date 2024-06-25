import axios from 'axios';
import { api } from '@/api/api';
import { SignInFormData } from '@/types/formData.interface';
import {
  AuthErrorResponse,
  AuthErrorResponseData,
  SignInResponse,
  SignInResponseData,
} from '@/types/authApi.type';

export default async function signIn(
  formData: Pick<SignInFormData, 'username' | 'password'>
): Promise<SignInResponseData | AuthErrorResponseData> {
  try {
    const response: SignInResponse = await api.post('/auth/login', formData, {
      withCredentials: true,
    });
    return {
      result: 'SUCCESS',
      data: { access_token: response.data.access_token },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response }: AuthErrorResponse = error;
      console.error(
        `Error Code [${response?.data.code}] : ${response?.data.message} `
      );
      return {
        result: 'FAIL',
        data: { message: response?.data.message },
      };
    }
    return { result: 'FAIL', data: { message: (error as Error).message } };
  }
}

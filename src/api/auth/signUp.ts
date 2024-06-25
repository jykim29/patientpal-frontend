import axios from 'axios';
import { api } from '@/api/api';
import { SignUpFormData } from '@/types/formData.interface';
import {
  AuthErrorResponse,
  AuthErrorResponseData,
  SignUpResponse,
  SignUpResponseData,
} from '@/types/authApi.type';

export default async function signUp(
  formData: SignUpFormData
): Promise<SignUpResponseData | AuthErrorResponseData> {
  const { role, username, password, passwordConfirm, contact } = formData;
  try {
    const response: SignUpResponse = await api.post('/auth/register', {
      username,
      password,
      passwordConfirm,
      contact,
      role,
    });
    return { result: 'SUCCESS', data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response }: AuthErrorResponse = error;
      console.error(
        `Error Code [${response?.data.code}] : ${response?.data.message} `
      );
      return { result: 'FAIL', data: { message: response?.data.message } };
    }
    return { result: 'FAIL', data: { message: (error as Error).message } };
  }
}

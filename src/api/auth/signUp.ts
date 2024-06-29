import axios from 'axios';
import { httpClient } from '@/api/http';
import { SignUpFormData } from '@/types/formData.interface';
import {
  AuthErrorResponse,
  AuthErrorResponseData,
  SignUpResponse,
  SignUpResponseData,
} from '@/types/authApi.type';
import { API_ENDPOINT } from '@/constants/api';

export default async function signUp(
  formData: SignUpFormData
): Promise<SignUpResponseData | AuthErrorResponseData> {
  const { role, username, password, passwordConfirm } = formData;
  try {
    const response: SignUpResponse = await httpClient.post(
      API_ENDPOINT.AUTH.REGISTER,
      {
        username,
        password,
        passwordConfirm,
        role,
      }
    );
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

import { AxiosError, AxiosResponse } from 'axios';

type AuthError = { code?: string; errors?: []; message?: string };
type AccessToken = string;

type ApiResponse<T> = AxiosResponse<T>;
type ApiResponseData<T> = {
  result: T extends AuthError ? 'FAIL' : 'SUCCESS';
  data: T;
};
export type AuthErrorResponse = AxiosError<AuthError>;
export type AuthErrorResponseData = ApiResponseData<AuthError>;

type SignUpData = any;
export type SignUpResponse = ApiResponse<SignUpData>;
export type SignUpResponseData = ApiResponseData<SignUpData>;

type SignInData = {
  access_token: AccessToken;
};
export type SignInResponse = ApiResponse<SignInData>;
export type SignInResponseData = ApiResponseData<SignInData>;

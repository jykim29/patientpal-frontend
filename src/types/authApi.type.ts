import { AxiosRequestConfig } from 'axios';
import { UserRole } from './user';

// Request Body Type
export interface RequestBody {
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
    role: UserRole;
  };
  login: {
    username: string;
    password: string;
  };
}

// Response Type
type Success = 'SUCCESS';
type Failed = 'FAILED';
export type ErrorResponse = { code?: string; errors?: []; message?: string };
export type SignUpResponse = any;
export type SignInResponse = {
  access_token: string;
};
export type RefreshTokenResponse = { access_token: string };

// API Function Return Type
type FetchSuccess<T> = { data: T; status: Success };
type FetchFailure = { data: ErrorResponse; status: Failed };
type FetchResult<T> = FetchSuccess<T> | FetchFailure;

// API Function Type
export type Register = (
  formData: RequestBody['register'],
  config?: AxiosRequestConfig
) => Promise<FetchResult<SignUpResponse>>;

export type Login = (
  formData: RequestBody['login'],
  config?: AxiosRequestConfig
) => Promise<FetchResult<SignInResponse>>;

export type Refresh = (
  config?: AxiosRequestConfig
) => Promise<FetchResult<RefreshTokenResponse>>;

export type AuthApi = () => {
  register: Register;
  login: Login;
  refresh: Refresh;
};

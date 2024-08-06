import { Role } from '../user';

// Request Body Type
export interface RequestBody {
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
    role: Role;
  };
  login: {
    username: string;
    password: string;
  };
}

// Response Type
export type ErrorResponse = { code?: string; errors?: []; message?: string };
export type SignUpResponse = any;
export type SignOutResponse = any;
export type SignInResponse = {
  access_token: string;
};
export type RefreshTokenResponse = { access_token: string };

import { UserRole } from './user';

export interface SignUpFormData {
  role: UserRole;
  username: string;
  password: string;
  passwordConfirm: string;
  contact: string;
  termOfUse: boolean;
  personalInformation: boolean;
}

export interface SignInFormData {
  username: string;
  password: string;
  isRememberId: boolean;
}

export interface BoardFormData {
  title: string;
  content: string;
}

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
  category: string;
  title: string;
  password: string;
  content: string;
}

export interface SearchFormData {
  city: string;
  city2: string;
  gender: string;
  age: number | string;
  career: number | string;
}

export interface SearchMapFormData {
  city: string;
  district: string;
}

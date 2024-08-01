import { Role } from './user';

export interface SignUpFormData {
  role: Role;
  username: string;
  password: string;
  passwordConfirm: string;
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

export interface ContractFormData {
  USER: {
    careStartDateTime: string;
    careEndDateTime: string;
    totalAmount: number;
    significant: string;
    realCarePlace: string;
    isNok: 'true' | 'false';
  };
  CAREGIVER: {
    careStartDateTime: string;
    careEndDateTime: string;
    totalAmount: number;
    significant: string;
  };
}

import { IAddress } from './api/profile';

export interface UserList {
  address: IAddress[];
  id: number;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  image: string;
  viewCounts: number;
  //미정
}

import { FetchResult } from './common';

// Board Type
export type BoardTypes = {
  NOTICE: 'NOTICE';
  BOARD: 'BOARD';
};
export type BoardType = BoardTypes[keyof BoardTypes];

// Request Body Type
export interface RequestBody {
  post: {
    title: string;
    content: string;
  };
}

// Response Type
export interface GetPostResponse {
  id: number;
  name: string;
  memberId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface GetListResponse
  extends Array<Omit<GetPostResponse, 'content'>> {
  // 추가할 타입
}
export interface WritePostResponse {
  id: number;
  name: string;
  title: string;
  content: string;
  createdDate: string;
  updatedDate: string;
}
export interface UpdatePostResponse {
  id: number;
  name: string;
  memberId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

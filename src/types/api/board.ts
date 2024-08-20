import { Pagination } from './common';

// Board Type
export type BoardTypes = {
  notice: 'notice';
  board: 'board';
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
export interface PostResponse {
  id: number;
  name: string;
  memberId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postType: 'FREE' | 'NOTICE';
  views: number;
}

export interface GetListResponse extends Pagination {
  content: Omit<PostResponse, 'content'>[];
}

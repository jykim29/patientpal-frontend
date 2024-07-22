// Board Type
export type BoardTypes = {
  NOTICE: 'NOTICE';
  FREE: 'FREE';
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
  postType: 'FREE';
}
export interface GetListResponse {
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  pageable: {
    paged: boolean;
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
  };
  size: number;
  content: Omit<PostResponse, 'content'>[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

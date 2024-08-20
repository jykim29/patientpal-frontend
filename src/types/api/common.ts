// Response Status Type
type Success = 'SUCCESS';
type Failed = 'FAILED';

// Error Response
export type ErrorResponse = { code?: string; errors?: []; message?: string };

// API Function Return Type
export type FetchSuccess<T> = { data: T; status: Success };
export type FetchFailure = { data: ErrorResponse; status: Failed };
export type FetchResult<T> = FetchSuccess<T> | FetchFailure;

// Pagination
type Sort = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};
type Pagable = {
  paged: boolean;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort;
};
export interface Pagination {
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  pageable: Pagable;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  empty: boolean;
}

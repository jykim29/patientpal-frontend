// Response Status Type
type Success = 'SUCCESS';
type Failed = 'FAILED';

// Error Response
export type ErrorResponse = { code?: string; errors?: []; message?: string };

// API Function Return Type
export type FetchSuccess<T> = { data: T; status: Success };
export type FetchFailure = { data: ErrorResponse; status: Failed };
export type FetchResult<T> = FetchSuccess<T> | FetchFailure;

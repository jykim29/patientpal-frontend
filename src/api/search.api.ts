import { httpClient } from './http';

interface FetchSearchParams {
  sort?: string | null;
}

interface FetchSearchResultResponse {}

const fetchSearchResult = async (params: FetchSearchParams) => {
  const response = await httpClient.get<FetchSearchResultResponse>('/search', {
    params: params,
  });

  return response.data;
};

export { fetchSearchResult };

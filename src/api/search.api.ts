import { API_ENDPOINT } from '@/constants/api';
import { httpClient } from './httpClient';

interface FetchSearchParams {
  sort?: string | null;
}

interface FetchSearchResultResponse {}

const getPatientSearchResult = async (
  token: string,
  searchParams = {},
  config = {}
) => {
  const { data, status } = await httpClient.GET(
    API_ENDPOINT.PATIENT.PROFILE.SEARCH,
    {
      ...config,
      params: searchParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

const getCaregiverSearchResult = async (
  token: string,
  searchParams = {},
  config = {}
) => {
  const { data, status } = await httpClient.GET(
    API_ENDPOINT.CAREGIVER.PROFILE.SEARCH,
    {
      ...config,
      params: searchParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

export { getPatientSearchResult, getCaregiverSearchResult };

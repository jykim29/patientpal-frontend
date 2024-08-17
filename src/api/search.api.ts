import { API_ENDPOINT } from '@/constants/api';
import { httpClient } from './httpClient';
import { UserList } from '@/types/searchResult.model';

interface PatientSearchResponse {
  data: {
    patientProfileList: Partial<UserList>[];
  };
  status: 'SUCCESS' | 'FAILED';
}

interface CaregiverSearchResponse {
  data: {
    caregiverProfileList: Partial<UserList>[];
  };
  status: 'SUCCESS' | 'FAILED';
}

const getPatientSearchResult = async (
  searchParams = {},
  config = {}
): Promise<CaregiverSearchResponse> => {
  const { data, status } = (await httpClient.GET<CaregiverSearchResponse>(
    API_ENDPOINT.PATIENT.PROFILE.SEARCH,
    {
      ...config,
      params: searchParams,
    }
  )) as CaregiverSearchResponse;

  return { data, status };
};

const getCaregiverSearchResult = async (
  searchParams = {},
  config = {}
): Promise<PatientSearchResponse> => {
  const { data, status } = (await httpClient.GET(
    API_ENDPOINT.CAREGIVER.PROFILE.SEARCH,
    {
      ...config,
      params: searchParams,
    }
  )) as PatientSearchResponse;

  return { data, status };
};

export { getPatientSearchResult, getCaregiverSearchResult };

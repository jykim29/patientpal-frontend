import {
  getCaregiverSearchResult,
  getPatientSearchResult,
} from '@/api/search.api';
import { SetStateAction } from 'react';

type SearchParams = {
  addr?: string;
  addrDetail: string;
  gender: string;
  name: string;
  experienceYearsGoe?: number;
  ageLoe?: number;
};

export const useSearch = (
  role: string | undefined,
  accessToken: string | null
) => {
  const fetchSearchResultByRole = async (
    searchParams: SearchParams,
    setSearchResult: React.Dispatch<SetStateAction<any[]>>
  ) => {
    try {
      let response;
      if (!accessToken || role === 'USER') {
        response = await getPatientSearchResult(searchParams);
        setSearchResult(response.data.caregiverProfileList);
      } else if (role === 'CAREGIVER') {
        response = await getCaregiverSearchResult(searchParams);
        setSearchResult(response.data.patientProfileList);
      }
    } catch (err) {
      console.error('검색 중 오류가 발생했습니다:', err);
    }
  };
  return {
    fetchSearchResultByRole,
  };
};

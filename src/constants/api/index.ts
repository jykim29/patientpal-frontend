// Base URL
export const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;
export const PROXY_BASE_URL = '/api/v1';
export const BASE_URL =
  import.meta.env.MODE === 'development' ? PROXY_BASE_URL : API_BASE_URL;

// 통신 상태
export const API_SUCCESS = 'SUCCESS';
export const API_FAILED = 'FAILED';

// 에러 상황
export const TIMEOUT_SECONDS = 10;
export const RETRY_COUNT = 3;

// API 엔드포인트
// TODO : 더 깔끔하게 정리필요
export const API_ENDPOINT = Object.freeze({
  AUTH: {
    REGISTER: '/auth/register', // 회원가입
    LOGIN: '/auth/login', // 로그인
    REFRESH: '/auth/refresh', // 토큰 재발급
  },
  MATCH: {
    CREATE: '/matches', // 매칭 생성
    CANCEL: (matchId: string) => `/matches/${matchId}/cancel`, // 매칭 취소
    ACCEPT: (matchId: string) => `/matches/${matchId}/accept`, // 매칭 수락
    REQUEST: (memberId: string) => `/matches/${memberId}/all/request`, // 요청 보낸 매칭 리스트 조회
    RECEIVED: (memberId: string) => `/matches/${memberId}/all/received`, // 요청 받은 매칭 리스트 조회
    INFO: (matchId: string) => `/matches/${matchId}`, // 매칭 정보 조회
  },
  CAREGIVER: {
    PROFILE: {
      CREATE: '/caregiver/profile', // 간병인 프로필 생성
      INFO: (memberId: string) => `/caregiver/profile/${memberId}`, // 간병인 프로필 조회/수정
      SEARCH: '/caregiver/search', // 간병인 프로필 검색
      UNREGISTER: (memberId: string) =>
        `/caregiver/profile/${memberId}/unregister/toMatchList`, // 간병인 프로필 매칭리스트에서 제거
      REGISTER: (memberId: string) =>
        `/caregiver/profile/${memberId}/register/toMatchList`, // 간병인 프로필 매칭리스트에 추가
    },
    GENERATE_S3_PRESIGNED_URL: '/caregiver/presigned',
  },
  PATIENT: {
    PROFILE: {
      CREATE: '/patient/profile', // 환자 프로필 생성
      INFO: (memberId: string) => `/patient/profile/${memberId}`, // 환자 프로필 조회/수정
      SEARCH: '/patient/search', // 환자 프로필 검색
      UNREGISTER: (memberId: string) =>
        `/patient/profile/${memberId}/unregister/toMatchList`, // 환자 프로필 매칭리스트에서 제거
      REGISTER: (memberId: string) =>
        `/patient/profile/${memberId}/register/toMatchList`, // 환자 프로필 매칭리스트에 추가
    },
    GENERATE_S3_PRESIGNED_URL: '/patient/presigned',
  },
  NOTICE: '/notice',
  FREE: '/board',
});

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
    LOGOUT: '/auth/logout', // 로그아웃
  },
  MEMBER: {
    INFORMATION: '/member/information',
    ISPROFILEPUBLIC: '/member/isProfilePublic',
    CHECK_USERNAME: '/member/check-username',
  },
  MATCH: {
    USER_INFO: '/matches', // 계약서 생성 위한 요청 정보 조회
    SEND: (role: string) => `/matches/${role}`, /// 계약서 전송
    ACCEPT: (matchId: number) => `/matches/${matchId}/accept`, // 받은 계약서 수락
    CANCEL: (matchId: number) => `/matches/${matchId}/cancel`, // 보낸 계약서 신청 취소
    REQUEST: (memberId: number) => `/matches/${memberId}/all/request`, // 요청 보낸 계약 리스트 요약 조회
    RECEIVED: (memberId: number) => `/matches/${memberId}/all/received`, // 요청 받은 계약 리스트 요약 조회
    INFO: (matchId: number) => `/matches/${matchId}`, // 계약서 정보 단일 조회
    PDF: (matchId: number) => `/matches/${matchId}/pdf`, // 받은 계약서 PDF 다운로드
  },
  CAREGIVER: {
    PROFILE: {
      CREATE: '/caregiver/profile', // 간병인 프로필 생성
      INFO: (memberId: number) => `/caregiver/profile/${memberId}`, // 간병인 프로필 조회/수정
      SEARCH: '/caregiver/search', // 간병인 프로필 검색
      UNREGISTER: (memberId: number) =>
        `/caregiver/profile/${memberId}/unregister/toMatchList`, // 간병인 프로필 매칭리스트에서 제거
      REGISTER: (memberId: number) =>
        `/caregiver/profile/${memberId}/register/toMatchList`, // 간병인 프로필 매칭리스트에 추가
    },
    GENERATE_S3_PRESIGNED_URL: '/caregiver/presigned',
  },
  PATIENT: {
    PROFILE: {
      CREATE: '/patient/profile', // 환자 프로필 생성
      INFO: (memberId: number) => `/patient/profile/${memberId}`, // 환자 프로필 조회/수정
      SEARCH: '/patient/search', // 환자 프로필 검색
      UNREGISTER: (memberId: number) =>
        `/patient/profile/${memberId}/unregister/toMatchList`, // 환자 프로필 매칭리스트에서 제거
      REGISTER: (memberId: number) =>
        `/patient/profile/${memberId}/register/toMatchList`, // 환자 프로필 매칭리스트에 추가
    },
    GENERATE_S3_PRESIGNED_URL: '/patient/presigned',
  },
  COMMUNITY: {
    NOTICE: '/notice',
    BOARD: '/board',
  },
});

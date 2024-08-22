import { Role } from '../user';

// 로그인 유저 정보 조회 응답
export type GetUserDataResponse = PatientInformation & CaregiverInformation;
export interface PatientInformation extends CommonInformation {
  careRequirements: string;
  isNok: boolean;
  nokContact: string;
  nokName: string;
  patientSignificant: string;
  realCarePlace: string;
}
export interface CaregiverInformation extends CommonInformation {
  caregiverSignificant: string;
  experienceYears: number;
  specialization: string;
  rating: number;
}

// 멤버 리스트 조회 응답
export type GetMemberListResponse = MemberListItem[];
export type MemberListItem = {
  memberId: number;
  username: string;
  name: string;
  profileImageUrl: string;
};

// 맞춤 추천 유저 조회 응답
export type GetRecommendUserDataResponse = {
  patient: RecommendPatientInformation[];
} & { caregiver: RecommendCaregiverInformation[] };
interface RecommendPatientInformation
  extends Pick<
    CommonInformation,
    'name' | 'age' | 'gender' | 'address' | 'image'
  > {
  id: number;
  viewCounts: number;
}
interface RecommendCaregiverInformation
  extends Pick<
    CommonInformation,
    'name' | 'age' | 'gender' | 'address' | 'image'
  > {
  id: number;
  viewCounts: number;
  rating: number;
  experienceYears: number;
  specialization: string;
}

// 유저 공통 정보
export type Gender = 'MALE' | 'FEMALE';
export type Address = {
  addr: string;
  addrDetail: string;
  zipCode: string;
};
interface CommonInformation {
  address: Address;
  age: number;
  contact: string;
  gender: Gender;
  image: string;
  isCompleteProfile: boolean;
  isProfilePublic: boolean;
  memberId: number;
  name: string;
  viewCount: number;
  wantCareStartDate: string;
  wantCareEndDate: string;
  role: Role;
}

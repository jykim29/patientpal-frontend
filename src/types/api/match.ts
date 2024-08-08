export interface SendRequestBody {
  USER: {
    careStartDateTime: string;
    careEndDateTime: string;
    totalAmount: number;
    significant: string;
    realCarePlace: string;
    isNok: boolean;
  };
  CAREGIVER: {
    careStartDateTime: string;
    careEndDateTime: string;
    totalAmount: number;
    significant: string;
  };
}

export interface GetMatchUserInfoResponse {
  patientName: string;
  patientAge: number;
  patientContact: string;
  patientAddress: {
    addr: string;
    addrDetail: string;
    zipCode: string;
  };
  patientSignificant: string;
  patientRealCarePlace: string;
  isNok: boolean;
  nokName: string;
  nokContact: string;
  caregiverName: string;
  caregiverAge: number;
  caregiverContact: string;
  caregiverAddress: {
    addr: string;
    addrDetail: string;
    zipCode: string;
  };
  caregiverSignificant: string;
  caregiverExperienceYears: number;
}

type MatchStatus =
  | 'PENDING'
  | 'CANCELED'
  | 'ACCEPTED'
  | 'IN_PROGRESS_CHAT'
  | 'IN_PROGRESS_CONTRACT'
  | 'COMPLETED';
type ReadStatus = 'READ' | 'UNREAD';
type FirstRequest = 'PATIENT_FIRST' | 'CAREGIVER_FIRST';

export interface SendContractResponse {
  id: number;
  requestMemberName: string;
  receivedMemberName: string;
  createdDate: string;
  matchStatus: MatchStatus;
  readStatus: ReadStatus;
  firstRequest: FirstRequest;
  careStartDateTime: string;
  careEndDateTime: string;
  totalAmount: number;
  requestMemberCurrentSignificant: string;
  isNok: boolean;
  nokName: string;
  nokContact: string;
}

export interface MatchItem {
  matchId: number;
  receivedMemberName?: string;
  requestMemberName?: string;
  createdDate: string;
  matchStatus: MatchStatus;
  readStatus?: ReadStatus;
  careStartDateTime: string;
  careEndDateTime: string;
  totalAmount: number;
  type: string;
}

export interface GetContractListResponse {
  matchList: MatchItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface GetContractDataResponse {
  careEndDateTime: string;
  careStartDateTime: string;
  createdDate: string;
  firstRequest: FirstRequest;
  id: number;
  isNok: boolean;
  matchStatus: MatchStatus;
  nokContact: string;
  nokName: string;
  readStatus: ReadStatus;
  realCarePlace: string;
  receivedMemberAddress: string;
  receivedMemberContact: string;
  receivedMemberName: string;
  requestMemberAddress: string;
  requestMemberContact: string;
  requestMemberCurrentSignificant: string;
  requestMemberName: string;
  totalAmount: number;
  type?: string; // 직접 만든 type = 'send' | 'receive'
}

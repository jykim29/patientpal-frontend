export interface SendRequestBody {
  USER: {
    careStartDateTime: string;
    careEndDateTime: string;
    totalAmount: number;
    significant: string;
    realCarePlace: string;
    nok: boolean;
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

export interface GetContractListResponse {
  matchList: {
    receivedMemberName: string;
    createdDate: string;
    matchStatus: MatchStatus;
    readStatus?: ReadStatus;
    careStartDateTime: string;
    careEndDateTime: string;
    totalAmount: number;
  }[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface GetContractDataResponse {
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

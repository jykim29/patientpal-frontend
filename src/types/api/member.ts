import { Role } from '../user';

export type GetUserDataResponse = PatientInformation & CaregiverInformation;

export type Gender = 'MALE' | 'FEMALE';
export type Address = {
  address: {
    addr: string;
    addrDetail: string;
    zipCode: string;
  };
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

export interface ProfileRequestBody {
  caregiver: {
    name: string;
    residentRegistrationNumber: string;
    contact: string;
    gender: string;
    address: {
      addr: string;
      addrDetail: string;
      zipCode: string;
    };
    rating: number;
    experienceYears: number;
    specialization: string;
    caregiverSignificant: string;
    wantCareStartDate: string;
    wantCareEndDate: string;
  };

  patient: {
    name: string;
    residentRegistrationNumber: string;
    gender: string;
    contact: string;
    address: {
      addr: string;
      addrDetail: string;
      zipCode: string;
    };
    patientSignificant: string;
    careRequirements: string;
    realCarePlace: string;
    isNok: true;
    nokName: string;
    nokContact: string;
    wantCareStartDate: string;
    wantCareEndDate: string;
  };
}

export type ProfileResponse = {
  caregiver: {
    memberId: number;
    name: string;
    residentRegistrationNumber: string;
    age: number;
    contact: string;
    gender: string;
    address: {
      addr: string;
      addrDetail: string;
      zipCode: string;
    };
    experienceYears: number;
    specialization: string;
    caregiverSignificant: string;
    isInMatchList: boolean;
    image: string;
  };

  patient: {
    memberId: number;
    name: string;
    residentRegistrationNumber: string;
    age: number;
    contact: string;
    gender: string;
    address: {
      addr: string;
      addrDetail: string;
      zipCode: string;
    };
    nokName: string;
    nokContact: string;
    patientSignificant: string;
    careRequirements: string;
    realCarePlace: string;
    isNok: boolean;
    isProfilePublic: boolean;
    wantCareStartDate: string;
    wantCareEndDate: string;
  };
};

export type ModifiedPatientData = Partial<ProfileRequestBody['patient']>;

export type ModifiedCaregiverData = Partial<ProfileResponse['caregiver']>;

//유저가 입력한 data type
export interface IAddress {
  addr: string;
  addrDetail: string;
  zipCode: string;
}

export interface ICommonData {
  name: string;
  age: number;
  contact: string;
  gender: string;
  address: IAddress;
  wantCareStartDate: string;
  wantCareEndDate: string;
}

export interface ICaregiverData extends ICommonData {
  experienceYears: number;
  specialization: string;
  caregiverSignificant: string;
}

export interface IPatientData extends ICommonData {
  patientSignificant: string;
  careRequirements: string;
  realCarePlace: string;
  isNok: boolean;
  nokName: string;
  nokContact: string;
}

export type IPatientEditData = Pick<
  IPatientData,
  | 'address'
  | 'patientSignificant'
  | 'careRequirements'
  | 'realCarePlace'
  | 'nokContact'
  | 'nokName'
  | 'isNok'
  | 'wantCareEndDate'
  | 'wantCareStartDate'
  | 'age'
>;

export type ICaregiverEditData = Pick<
  ICaregiverData,
  | 'address'
  | 'experienceYears'
  | 'specialization'
  | 'caregiverSignificant'
  | 'wantCareEndDate'
  | 'wantCareStartDate'
  | 'age'
>;

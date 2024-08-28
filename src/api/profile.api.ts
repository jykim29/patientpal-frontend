import {
  ICaregiverData,
  ICaregiverEditData,
  IPatientData,
  IPatientEditData,
  ProfileResponse,
} from '@/types/api/profile';
import { httpClient } from './httpClient';
import { API_ENDPOINT } from '@/constants/api';

export const getCaregiverProfile = async (
  memberId: number,
  token: string,
  config = {}
) => {
  const { data, status } = await httpClient.GET<ProfileResponse['caregiver']>(
    API_ENDPOINT.CAREGIVER.PROFILE.INFO(memberId),
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

export const createCaregiverProfile = async (
  userData: ICaregiverData,
  token: string,
  config = {}
) => {
  const { data, status } = await httpClient.POST<
    ICaregiverData,
    ProfileResponse['caregiver']
  >(API_ENDPOINT.CAREGIVER.PROFILE.CREATE, userData, {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { data, status };
};

export const modifyCaregiverProfile = async (
  memberId: number,
  token: string,
  modifiedData: ICaregiverEditData,
  config = {}
) => {
  const { data, status } = await httpClient.PATCH<ICaregiverEditData, any>(
    API_ENDPOINT.CAREGIVER.PROFILE.INFO(memberId),
    modifiedData,
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return { data, status };
};

export const getPatientProfile = async (
  memberId: number,
  token: string,
  config = {}
) => {
  const { data, status } = await httpClient.GET<ProfileResponse['patient']>(
    API_ENDPOINT.PATIENT.PROFILE.INFO(memberId),
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

export const modifyPatientProfile = async (
  memberId: number,
  token: string,
  modifiedData: IPatientEditData,
  config = {}
) => {
  const { data, status } = await httpClient.PATCH<IPatientEditData, any>(
    API_ENDPOINT.PATIENT.PROFILE.INFO(memberId),
    modifiedData,
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

export const addPatientToMatchList = async (
  memberId: number,
  token: string,
  payload = null,
  config = {}
) => {
  const { data, status } = await httpClient.POST(
    API_ENDPOINT.PATIENT.PROFILE.REGISTER(memberId),
    payload,
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

export const createPatientProfile = async (
  userData: IPatientData,
  token: string,
  config = {}
) => {
  //post에 제네릭이 필요한가?
  const { data, status } = await httpClient.POST<
    IPatientData,
    ProfileResponse['patient']
  >(API_ENDPOINT.PATIENT.PROFILE.CREATE, userData, {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { data, status };
};

export const addCaregiverToMatchList = async (
  memberId: number,
  token: string,
  payload = null,
  config = {}
) => {
  const { data, status } = await httpClient.POST(
    API_ENDPOINT.CAREGIVER.PROFILE.REGISTER(memberId),
    payload,
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

export const removePatientFromMatchList = async (
  memberId: number,
  token: string,
  payload = null,
  config = {}
) => {
  const { data, status } = await httpClient.POST(
    API_ENDPOINT.PATIENT.PROFILE.UNREGISTER(memberId),
    payload,
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

export const removeCaregiverFromMatchList = async (
  memberId: number,
  token: string,
  payload = null,
  config = {}
) => {
  const { data, status } = await httpClient.POST(
    API_ENDPOINT.CAREGIVER.PROFILE.UNREGISTER(memberId),
    payload,
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

export const createCaregiverPresignedURL = async (
  token?: string,
  payload = null,
  config = {}
) => {
  const { data, status } = await httpClient.POST(
    API_ENDPOINT.CAREGIVER.GENERATE_S3_PRESIGNED_URL,
    payload,
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return { data, status };
};

export const uploadCargiverProfileImg = async (
  token: string,
  presignedUrl: string,
  file,
  config = {}
) => {
  const { data, status } = await httpClient.PUT(presignedUrl, file, {
    ...config,
    headers: {
      'Content-Type': 'image/png',
    },
  });

  return { data, status };
};

export const uploadPatientProfileImg = async () => {};

import {
  ICaregiverData,
  IPatientData,
  ModifiedCaregiverData,
  ModifiedPatientData,
  ProfileRequestBody,
  ProfileResponse,
} from '@/types/api/profile';
import { httpClient } from './httpClient';
import { API_ENDPOINT } from '@/constants/api';

export const getCaregiverProfile = async (
  memberId: string,
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
  memberId: string,
  token: string,
  modifiedData: ModifiedCaregiverData,
  config = {}
) => {
  const { data, status } = await httpClient.PATCH(
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
  memberId: string,
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
  memberId: string,
  token: string,
  modifiedData: ModifiedPatientData,
  config = {}
) => {
  const { data, status } = await httpClient.PATCH<ModifiedPatientData, any>(
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
  memberId: string,
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
  memberId: string,
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
  memberId: string,
  token: string,
  config = {}
) => {
  const { data, status } = await httpClient.POST(
    API_ENDPOINT.PATIENT.PROFILE.UNREGISTER(memberId),
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
  memberId: string,
  token: string,
  config = {}
) => {
  const { data, status } = await httpClient.POST(
    API_ENDPOINT.CAREGIVER.PROFILE.UNREGISTER(memberId),
    {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return { data, status };
};

import {
  createCaregiverProfile,
  createPatientProfile,
  modifyCaregiverProfile,
  modifyPatientProfile,
} from '@/api/profile.api';
import { API_FAILED } from '@/constants/api';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ICaregiverData,
  ICaregiverEditData,
  IPatientData,
  IPatientEditData,
} from '@/types/api/profile';
import { useEffect, useState } from 'react';

// interface UseProfileReturn {
//   accessToken: string | null;
//   registerCaregiver: (userInputData: ICaregiverData) => Promise<any>;
//   registerPatient: (userInputData: IPatientData) => Promise<any>;
//   modifyCaregiverData: (
//     memberId: string,
//     modifiedData: ICaregiverData
//   ) => Promise<any>;
//   modifyPatientData: (
//     memberId: string,
//     modifiedData: IPatientData
//   ) => Promise<any>;
//   role: 'USER' | 'CAREGIVER' | undefined | 'ADMIN';
// }

export const useProfile = () => {
  const { accessToken, user } = useAuthStore();
  if (!accessToken) {
    return { message: '토큰이 없습니다', status: API_FAILED };
  }
  //현재 role은 임의로 설정 -> 추후 토큰에서 제공하는 role 가져올 예정
  const [role, setRole] = useState<'USER' | 'CAREGIVER' | 'ADMIN' | undefined>(
    undefined
  );

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, []);

  const registerCaregiver = async (userInputData: ICaregiverData) => {
    if (user?.memberId === null) return;
    const res = await createCaregiverProfile(userInputData, accessToken);

    return res;
  };

  const registerPatient = async (userInputData: IPatientData) => {
    if (user?.memberId === null) return;
    const res = await createPatientProfile(userInputData, accessToken);

    return res;
  };

  //데이터를 받아서 서버로 보내는 역할
  const modifyCaregiverData = async (
    memberId: number,
    modifiedData: ICaregiverEditData
  ) => {
    if (memberId === null) return;
    const res = await modifyCaregiverProfile(
      memberId,
      accessToken,
      modifiedData
    );
    return res;
  };

  const modifyPatientData = async (
    memberId: number,
    modifiedData: IPatientEditData
  ) => {
    if (memberId === null) return;
    const res = await modifyPatientProfile(memberId, accessToken, modifiedData);
    return res;
  };

  return {
    accessToken,
    registerCaregiver,
    registerPatient,
    modifyCaregiverData,
    modifyPatientData,
    role,
  };
};

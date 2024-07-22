import {
  createCaregiverProfile,
  createPatientProfile,
  modifyCaregiverProfile,
  modifyPatientProfile,
} from '@/api/profile.api';
import { API_FAILED } from '@/constants/api';
import { useAccessTokenStore } from '@/store/useAccessTokenStore';
import { ICaregiverData, IPatientData } from '@/types/api/profile';
import { useEffect, useState } from 'react';

export const useProfile = () => {
  const token = useAccessTokenStore.getState().access_token;
  if (!token) {
    return { message: '토큰이 없습니다', status: API_FAILED };
  }
  //role 가져오는
  const [role, setRole] = useState<'patient' | 'caregiver'>('patient');

  const registerCaregiver = async (userInputData: ICaregiverData) => {
    if (localStorage.getItem('memberId')) return;
    const res = await createCaregiverProfile(userInputData, token);

    if (res.status === 'SUCCESS') {
      localStorage.setItem('memberId', res.data['memberId']);
    }
    return res;
  };

  const registerPatient = async (userInputData: IPatientData) => {
    if (localStorage.getItem('memberId')) return;
    const res = await createPatientProfile(userInputData, token);

    if (res.status === 'SUCCESS') {
      localStorage.setItem('memberId', res.data['memberId']);
    }
    return res;
  };

  //데이터를 받아서 서버로 보내는 역할
  const modifyCaregiverData = async (memberId, modifiedData) => {
    if (memberId === '') return;
    const res = await modifyCaregiverProfile(memberId, token, modifiedData);
    return res;
  };

  const modifyPatientData = async (memberId, modifiedData) => {
    if (memberId === '') return;
    const res = modifyPatientProfile(memberId, token, modifiedData);
    return res;
  };

  return {
    token,
    registerCaregiver,
    registerPatient,
    modifyCaregiverData,
    modifyPatientData,
    role,
  };
};

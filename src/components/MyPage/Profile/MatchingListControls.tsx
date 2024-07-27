import React, { useState, useEffect } from 'react';
import {
  addCaregiverToMatchList,
  addPatientToMatchList,
  removeCaregiverFromMatchList,
  removePatientFromMatchList,
} from '@/api/profile.api';
import Button from '@/components/common/Button';
import { useAuthStore } from '@/store/useAuthStore';

function MatchingListControls() {
  const [isOnMatchList, setIsOnMatchList] = useState(false);

  const { accessToken } = useAuthStore();
  const role = 'caregiver';
  console.log(accessToken);
  const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    const onMatchList = localStorage.getItem('isOnMatchList');
    if (onMatchList !== null) setIsOnMatchList(JSON.parse(onMatchList));
  }, []);

  const handleAddClick = async () => {
    if (!memberId || !accessToken) {
      console.log('memberId 없음');
      return;
    }

    let response;
    if (role === 'caregiver') {
      response = await addCaregiverToMatchList(memberId, accessToken);
    } else {
      response = await addPatientToMatchList(memberId, accessToken);
    }

    if (response.status === 'SUCCESS') {
      alert('매칭리스트에 추가되었습니다.');
      setIsOnMatchList(true);
      localStorage.setItem('isOnMatchList', 'true');
    }
  };

  const handleRemoveClick = async () => {
    if (!memberId || !accessToken) {
      console.log('memberId 없음');
      return;
    }

    let response;
    if (role === 'caregiver') {
      response = await removeCaregiverFromMatchList(memberId, accessToken);
    } else {
      response = await removePatientFromMatchList(memberId, accessToken);
    }

    if (response.status === 'SUCCESS') {
      alert('매칭리스트에서 삭제되었습니다.');
      setIsOnMatchList(false);
      localStorage.setItem('isOnMatchList', 'false');
    }
  };

  return (
    <div className="flex justify-end gap-5">
      <Button
        onClick={handleAddClick}
        disabled={isOnMatchList}
        className={
          isOnMatchList ? 'cursor-not-allowed bg-gray-500' : 'bg-primary'
        }
      >
        매칭리스트에 등록
      </Button>
      <Button
        onClick={handleRemoveClick}
        disabled={!isOnMatchList}
        className={
          !isOnMatchList ? 'cursor-not-allowed bg-gray-500' : 'bg-red-500'
        }
      >
        매칭리스트에서 삭제
      </Button>
    </div>
  );
}

export default MatchingListControls;

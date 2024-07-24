import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { FaUserCircle } from 'react-icons/fa';
import ProfileForm from '@/components/MyPage/Profile/ProfileDetailForm';
import { profileService } from '@/services/ProfileService';
import { useAccessTokenStore } from '@/store/useAccessTokenStore';
import { ProfileRequestBody, profileResponse } from '@/types/api/profile';
import ProfileModifyForm from '@/components/MyPage/Profile/ProfileModifyForm';

function ProfilePage() {
  const token = useAccessTokenStore.getState().access_token;
  console.log(token);

  return (
    <>
      <h1 className="text-title-small">프로필 관리</h1>
      <ProfileModifyForm />
    </>
  );
}

export default ProfilePage;

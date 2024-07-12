import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { FaUser } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';

const userInfoList = [
  {
    lablel: '이름',
    key: 'name',
    value: '김간병',
  },
  {
    label: '주민등록번호',
    key: 'residentRegistrationNumber',
    value: '001201-',
  },
  {
    label: '주소',
    key: 'address',
    value: '완료',
  },
  {
    label: '경력',
    key: 'experienceYears',
    value: '10',
  },
  {
    label: '상세 주소',
    key: 'addressDetail',
    value: '202',
  },
  {
    label: '전화번호',
    key: 'contact',
    value: '010-1213-1212',
  },
  {
    label: '우편번호',
    key: 'zipCode',
    value: '66758',
  },
  {
    label: '성별',
    key: 'gender',
    value: '남',
  },
  {
    label: '등록증',
    key: 'caregiverSignificant',
    value: '1010020',
  },
  {
    label: '특이사항',
    key: 'specialization',
    value: '완료',
  },
];

function ModifyPage() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: userInfoList.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {}),
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    reset();
    setIsEditMode(false);
  };

  return (
    <>
      <h1 className="text-title-small">프로필 관리</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-[65px] rounded-lg border p-[52px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <FaUserCircle className="h-[90px] w-[90px] text-gray-medium" />
            <input
              className="text-text-large"
              {...register('name')}
              type="text"
            ></input>
          </div>
          <Button className="h-10 w-[90px]">수정</Button>
        </div>
        <div className="flex flex-wrap items-center gap-[15px] border-b-2">
          {userInfoList.map((item) => (
            <>
              {item.label === '이름' && ''}
              <dl key={item.key} className="flex w-[477px] flex-col gap-[19px]">
                <dt className="flex w-full text-text-medium">{item.label}</dt>
                <dd className="w-full flex-1 text-text-large">
                  <input
                    {...register(item.key)}
                    type="text"
                    disabled={!isEditMode}
                    className={`h-[48px] w-full rounded-[7px] border-b-2 bg-gray-light outline-none ${isEditMode ? 'border-black' : 'border-transparent'}`}
                  />
                </dd>
              </dl>
            </>
          ))}
        </div>
        <span className="mt-8 flex justify-end gap-4">
          {isEditMode ? (
            <>
              <Button
                className="w-[100px] bg-gray-medium"
                type="button"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button className="w-[100px] bg-red-500" type="submit">
                저장
              </Button>
            </>
          ) : (
            <Button className="w-[100px]" type="button" onClick={handleEdit}>
              수정
            </Button>
          )}
        </span>
      </form>
    </>
  );
}

export default ModifyPage;

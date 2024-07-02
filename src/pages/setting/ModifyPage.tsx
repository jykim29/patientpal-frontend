import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';

const userInfoList = [
  {
    label: '이름',
    icon: '',
    key: 'name',
    value: '김간병',
  },
  {
    label: '서명등록',
    key: 'signature',
    value: '완료',
  },
  {
    label: '전화번호',
    key: 'phone',
    value: '010-1234-1234',
  },
  {
    label: '보호자 이름',
    key: 'Nok',
    value: '김간병',
  },
  {
    label: '주소',
    key: 'address',
    value: '서울시 중구',
  },
  {
    label: '비상연락망',
    key: 'emergency-contact',
    value: '010-1234-1234',
  },
  {
    label: '등록증',
    key: 'register',
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
      <h1 className="text-title-small">개인정보수정</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-[20px] rounded-lg border px-[100px] py-8"
      >
        {userInfoList.map((item) => (
          <dl
            key={item.key}
            className="flex flex-wrap items-center border-b-2 px-[50px] py-6"
          >
            <dt className="flex w-[150px] text-text-medium">
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </dt>
            <dd className="w-[calc(100%-150px)] flex-1 text-text-large">
              <input
                {...register(item.key)}
                type="text"
                disabled={!isEditMode}
                className={`border-b-2 outline-none ${isEditMode ? 'border-black' : 'border-transparent'}`}
              />
            </dd>
          </dl>
        ))}
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

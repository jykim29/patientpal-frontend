import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  getCaregiverSearchResult,
  getPatientSearchResult,
} from '@/api/search.api';
import Button from '../common/Button';
import { useAuthStore } from '@/store/useAuthStore';
import SearchResult from './SearchResult';

type SearchFormData = {
  addr: string;
  gender: 'MALE' | 'FEMALE';
  name: string;
  experienceYearsGoe?: string;
  keyword: string;
  ageLoe: string;
};

const caregiverForm = [
  { index: '주소', key: 'addr', type: 'input' },
  { index: '성별', key: 'gender', array: ['MALE', 'FEMALE'], type: 'select' },
  { index: '이름', key: 'name', type: 'input' },
  { index: '키워드', key: 'keyword', type: 'input' },
  {
    index: '나이',
    key: 'ageLoe',
    array: [
      '10대이하',
      '20대이하',
      '30대이하',
      '40대이하',
      '50대이하',
      '60대이하',
    ],
    type: 'select',
  },
];

const patientForm = [
  { index: '주소', key: 'addr', type: 'input' },
  { index: '성별', key: 'gender', array: ['MALE', 'FEMALE'], type: 'select' },
  { index: '이름', key: 'name', type: 'input' },
  {
    index: '경력',
    key: 'experienceYearsGoe',
    array: ['1년이상', '3년이상', '5년이상', '10년이상'],
    type: 'select',
  },
  { index: '키워드', key: 'keyword', type: 'input' },
  {
    index: '나이',
    key: 'ageLoe',
    array: [
      '10대이하',
      '20대이하',
      '30대이하',
      '40대이하',
      '50대이하',
      '60대이하',
    ],
    type: 'select',
  },
];

const experienceYearsMapping = {
  '1년이상': 1,
  '3년이상': 3,
  '5년이상': 5,
  '10년이상': 10,
};

const ageMapping = {
  '10대이하': 10,
  '20대이하': 20,
  '30대이하': 30,
  '40대이하': 40,
  '50대이하': 50,
  '60대이하': 60,
};

function SearchForm() {
  const { register, handleSubmit, getValues } = useForm<SearchFormData>();
  const [role, setRole] = useState<string | null>('caregiver');
  const [formFields, setFormFields] = useState<
    typeof caregiverForm | typeof patientForm
  >(caregiverForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any>([]);
  const { accessToken } = useAuthStore();
  console.log(accessToken);

  // useEffect(() => {
  //   token에서 role 추출
  //   const decodedToken: any = jwt_decode(token);
  //   const userRole = decodedToken?.claim?.role;
  //   setRole(userRole);
  //   role에 따라 폼 필드 설정
  //   if (userRole === 'patient') {
  //     setFormFields(patientForm);
  //   } else {
  //     setFormFields(caregiverForm);
  //   }
  // }, [token]);

  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    if (!accessToken) {
      console.log('토큰이 없습니다');
      return;
    }

    try {
      const searchParams: any = {};

      if (data.addr) searchParams.addr = data.addr;
      if (data.gender) searchParams.gender = data.gender;
      if (data.name) searchParams.name = data.name;
      if (data.keyword) searchParams.keyword = data.keyword;

      if (data.experienceYearsGoe) {
        searchParams.experienceYearsGoe =
          experienceYearsMapping[
            data.experienceYearsGoe as keyof typeof experienceYearsMapping
          ];
      }

      if (data.ageLoe) {
        searchParams.ageLoe =
          ageMapping[data.ageLoe as keyof typeof ageMapping];
      }

      const response = await getCaregiverSearchResult(
        accessToken,
        searchParams
      );

      setIsModalOpen(true);
      setSearchResult(response.data.patientProfileList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className="flex w-[390px] flex-col items-center justify-center gap-5 rounded-r-[15px] bg-chathams-blue px-10 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFields.map((item, index) => (
          <fieldset
            key={index}
            className="flex w-full items-center justify-between gap-5 px-5"
          >
            <label className="w-full text-text-large text-white">
              {item.index}
            </label>
            {item.type === 'select' ? (
              <select
                {...register(item.key, {})}
                className="w-full rounded-lg px-4 py-[10px]"
              >
                {item.array!.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...register(item.key, {})}
                type="text"
                className="w-full rounded-lg px-4 py-[10px]"
              />
            )}
          </fieldset>
        ))}
        <Button type="submit" className="w-full">
          검색
        </Button>
      </form>
      {isModalOpen && (
        <SearchResult
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          searchResult={searchResult}
        />
      )}
    </>
  );
}

export default SearchForm;

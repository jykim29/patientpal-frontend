import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  getCaregiverSearchResult,
  getPatientSearchResult,
} from '@/api/search.api';
import Button from '../common/Button';
import { useAuthStore } from '@/store/useAuthStore';
import SearchResultModal from './SearchResultModal';

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
  { index: '성별', key: 'gender', array: ['모두', '남', '여'], type: 'select' },
  { index: '이름', key: 'name', type: 'input' },
  // { index: '키워드', key: 'keyword', type: 'input' },
  {
    index: '나이',
    key: 'ageLoe',
    array: [
      '모두',
      '10대이하',
      '20대이하',
      '30대이하',
      '40대이하',
      '50대이하',
      '60대이하',
      '70대이하',
      '80대이하',
      '90대이하',
    ],
    type: 'select',
  },
];

const patientForm = [
  { index: '주소', key: 'addr', type: 'input' },
  { index: '성별', key: 'gender', array: ['모두', '남', '여'], type: 'select' },
  { index: '이름', key: 'name', type: 'input' },
  {
    index: '경력',
    key: 'experienceYearsGoe',
    array: ['모두', '1년이상', '3년이상', '5년이상', '10년이상'],
    type: 'select',
  },
  // { index: '키워드', key: 'keyword', type: 'input' },
  {
    index: '나이',
    key: 'ageLoe',
    array: [
      '모두',
      '10대이하',
      '20대이하',
      '30대이하',
      '40대이하',
      '50대이하',
      '60대이하',
      '70대이하',
      '80대이하',
      '90대이하',
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
  '70대이하': 70,
  '80대이하': 80,
  '90대이하': 90,
};

function SearchForm() {
  const { register, handleSubmit } = useForm<SearchFormData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const { accessToken, user } = useAuthStore();
  const role = user?.role;

  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    if (!accessToken) {
      console.log('토큰이 없습니다');
      return;
    }

    try {
      const searchParams: any = {};

      if (data.addr) searchParams.addr = data.addr;
      if (data.gender && data.gender !== '모두')
        searchParams.gender = data.gender === '남' ? 'MALE' : 'FEMALE';
      if (data.name) searchParams.name = data.name;
      // if (data.keyword) searchParams.keyword = data.keyword;

      if (data.experienceYearsGoe && data.experienceYearsGoe !== '모두') {
        searchParams.experienceYearsGoe =
          experienceYearsMapping[
            data.experienceYearsGoe as keyof typeof experienceYearsMapping
          ];
      }

      if (data.ageLoe && data.ageLoe !== '모두') {
        searchParams.ageLoe =
          ageMapping[data.ageLoe as keyof typeof ageMapping];
      }

      let response;
      if (role === 'CAREGIVER') {
        response = await getCaregiverSearchResult(accessToken, searchParams);
        setSearchResult(response.data.patientProfileList);
      } else if (role === 'USER') {
        response = await getPatientSearchResult(accessToken, searchParams);
        setSearchResult(response.data.caregiverProfileList);
      }
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(true);
  };

  let formFields;
  role === 'CAREGIVER'
    ? (formFields = caregiverForm)
    : (formFields = patientForm);

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
            <label className="text-text-large text-white">{item.index}</label>
            {item.type === 'select' ? (
              <select
                {...register(item.key, {})}
                className="w-[150px] rounded-lg px-4 py-[10px]"
              >
                {item.array!.map((option, idx) => (
                  <option className="w-[150px]" key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...register(item.key, {})}
                type="text"
                className="w-[150px] rounded-lg px-4 py-[10px]"
              />
            )}
          </fieldset>
        ))}
        <Button type="submit" className="w-full">
          검색
        </Button>
      </form>
      {isModalOpen && (
        <SearchResultModal
          setIsModalOpen={setIsModalOpen}
          searchResult={searchResult}
        />
      )}
    </>
  );
}

export default SearchForm;

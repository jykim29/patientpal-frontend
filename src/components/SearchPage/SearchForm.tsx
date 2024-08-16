import { SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  getCaregiverSearchResult,
  getPatientSearchResult,
} from '@/api/search.api';
import Button from '../common/Button';
import { useAuthStore } from '@/store/useAuthStore';
import SearchResultModal from './SearchResultModal';
import { useModal } from '@/hooks/useModal';
import { useNavigate } from 'react-router-dom';

type SearchFormData = {
  addr: string;
  addrDetail: string;
  gender: '모두' | 'MALE' | 'FEMALE' | '남' | '여';
  name: string;
  experienceYearsGoe?: string;
  keyword: string;
  ageLoe: string;
};

type FormFieldType = {
  index: string;
  key: keyof SearchFormData;
  type: 'select' | 'input';
  array?: string[];
};

const caregiverForm: FormFieldType[] = [
  {
    index: '주소',
    key: 'addr',
    array: ['서울'],
    type: 'select',
  },
  {
    index: '세부 주소',
    key: 'addrDetail',
    array: [
      '모두',
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
    type: 'select',
  },
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

const patientForm: FormFieldType[] = [
  {
    index: '주소',
    key: 'addr',
    array: ['서울'],
    type: 'select',
  },
  {
    index: '세부 주소',
    key: 'addrDetail',
    array: [
      '모두',
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
    type: 'select',
  },
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

interface SearchFormProps {
  setCurrentLocation: React.Dispatch<SetStateAction<string>>;
}

function SearchForm({ setCurrentLocation }: SearchFormProps) {
  const { register, handleSubmit } = useForm<SearchFormData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const { accessToken, user } = useAuthStore();
  const role = user?.role;
  const { alert } = useModal();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    if (!accessToken) {
      await alert('warning', '로그인이 필요한 서비스입니다.');
      navigate('/auth');
      return;
    }

    try {
      const searchParams: any = {};
      console.log(data);
      if (data.addr && data.addrDetail) {
        searchParams.addr =
          data.addrDetail === '모두'
            ? data.addr
            : data.addr + ' ' + data.addrDetail;
        setCurrentLocation(searchParams.addr);
      }
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
            className="flex items-center justify-between w-full gap-5 px-5"
          >
            <label className="text-white text-text-large">{item.index}</label>
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

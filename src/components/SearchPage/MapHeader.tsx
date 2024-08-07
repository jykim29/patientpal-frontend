import Button from '../common/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchMapFormData } from '@/types/formData.interface';
import { useAuthStore } from '@/store/useAuthStore';
import {
  getCaregiverSearchResult,
  getPatientSearchResult,
} from '@/api/search.api';
import { SetStateAction } from 'react';
import { UserList } from '@/types/searchResult.model';
type MapFormField = {
  index: string;
  key: keyof SearchMapFormData;
  item: string[];
};

const mapIndex: MapFormField[] = [
  {
    index: '시/도',
    key: 'city',
    item: ['서울'],
  },
  {
    index: '시/군/구',
    key: 'district',
    item: [
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
  },
];

interface MapHeaderProps {
  setSearchResult: React.Dispatch<SetStateAction<Partial<UserList>[]>>;
}

function MapHeader({ setSearchResult }: MapHeaderProps) {
  const { register, handleSubmit } = useForm<SearchMapFormData>();

  const { accessToken, user } = useAuthStore();
  const role = user?.role;
  const onSubmit: SubmitHandler<SearchMapFormData> = async (data) => {
    if (!accessToken) {
      console.log('토큰이 없습니다');
      return;
    }

    try {
      const searchParams: any = {};

      if (data.district === '모두') {
        searchParams.addr = data.city;
      } else {
        searchParams.addr = data.city + ' ' + data.district;
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

    console.log(data);
  };

  return (
    <div className="flex h-[60px] rounded-tl-md rounded-tr-md bg-chathams-blue px-5 py-2">
      <form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
        {mapIndex.map((i, index) => (
          <fieldset
            key={index}
            className="flex items-center gap-5 px-5 text-text-large text-white"
          >
            <label>{i.index}</label>
            <select
              className="h-full w-[146px] items-center rounded-[8px] px-4 py-[10px] text-text-medium text-gray-medium"
              {...register(i.key, {
                required: true,
              })}
            >
              {i.item.map((item, index) => (
                <option key={index} className="text-text-medium">
                  {item}
                </option>
              ))}
            </select>
          </fieldset>
        ))}
        <Button type="submit" className="w-[100px] px-4 py-[10px]">
          검색
        </Button>
      </form>
    </div>
  );
}

export default MapHeader;

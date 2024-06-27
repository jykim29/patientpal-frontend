import React, { useState } from 'react';
import Button from '../common/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchMapFormData } from '@/types/formData.interface';
type MapFormField = {
  index: string;
  key: keyof SearchMapFormData;
  item: string[];
};

//받아온 데이터를 zustand로 넘겨주고 searchResult에서 렌더링
const mapIndex: MapFormField[] = [
  {
    index: '시/도',
    key: 'city',
    item: [
      '서울특별시',
      '대전광역시',
      '대구광역시',
      '부산광역시',
      '광주광역시',
    ],
  },
  {
    index: '시/군/구',
    key: 'district',
    item: ['관악구', '중구', '강남구', '동작구', '강서구', '마포구'],
  },
];
function MapHeader() {
  const { register, handleSubmit } = useForm<SearchMapFormData>();
  const onSubmit: SubmitHandler<SearchMapFormData> = (data) =>
    console.log(data);

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

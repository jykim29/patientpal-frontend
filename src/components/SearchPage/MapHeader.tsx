import React, { useState } from 'react';
import Button from '../common/Button';

function MapHeader() {
  const mapIndex = [
    {
      index: '시/도',
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
      item: ['관악구', '중구', '강남구', '동작구', '강서구', '마포구'],
    },
  ];

  const [selectedCity, setSelectedCity] = useState(mapIndex[0].item[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(mapIndex[1].item[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      city: selectedCity,
    };
  };

  return (
    <div className="flex h-[60px] rounded-tl-md rounded-tr-md bg-chathams-blue px-5 py-2">
      <form className="flex gap-3" onSubmit={handleSubmit}>
        {mapIndex.map((i, index) => (
          <fieldset
            key={index}
            className="flex items-center gap-5 px-5 text-text-large text-white"
          >
            {i.index}
            <select
              className="h-full w-[146px] items-center rounded-[8px] px-4 py-[10px] text-text-medium text-gray-medium"
              value={index === 0 ? selectedCity : selectedDistrict}
              onChange={(e) => {
                if (index === 0) {
                  setSelectedCity(e.target.value);
                } else {
                  setSelectedDistrict(e.target.value);
                }
              }}
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

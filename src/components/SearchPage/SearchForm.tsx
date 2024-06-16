import React, { useState } from 'react';
import Button from '../common/Button';

function SearchForm() {
  const userForm = [
    {
      index: '시/도',
      key: 'city',
      array: [
        '지역 무관',
        '서울특별시',
        '대전광역시',
        '대구광역시',
        '부산광역시',
        '인천광역시',
      ],
    },
    {
      index: '시/군/구',
      key: 'city2',
      array: ['지역 무관', '강남구', '동작구', '관악구', '중구', '동대문구'],
    },
    {
      index: '성별',
      key: 'gender',
      array: ['성별 무관', '남', '여'],
    },
    {
      index: '나이',
      key: 'age',
      array: ['나이 무관', '30대', '40대', '50대'],
    },
    {
      index: '경력',
      key: 'career',
      array: ['경력 무관', '1년', '3년', '5년', '10년'],
    },
  ];

  const [searchInput, setSearchInput] = useState({
    city: '',
    city2: '',
    gender: '',
    age: '',
    career: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 선택된 값을 처리하는 로직을 여기에 추가
    console.log('Submitted data:', searchInput);
  };

  return (
    <form
      className="flex w-[390px] flex-col items-center justify-center gap-5 rounded-r-[15px] bg-chathams-blue px-10 shadow-lg"
      onSubmit={handleSubmit}
    >
      {userForm.map((item, index) => (
        <fieldset
          key={index}
          className="flex w-full items-center justify-between gap-5 px-5"
        >
          <label className="w-full text-text-large text-white">
            {item.index}
          </label>
          <select
            name={item.key}
            value={searchInput[item.key]}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-[10px]"
          >
            {item.array.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </fieldset>
      ))}
      <Button type="submit" className="w-full">
        검색
      </Button>
    </form>
  );
}

export default SearchForm;

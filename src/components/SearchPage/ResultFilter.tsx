import React, { useState } from 'react';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';

const ResultFilter = () => {
  const filterVariant = [
    {
      index: '최신순',
      filter_id: 0,
      //filter 함수를 넣거나 백엔드에서 정렬 api 적용하기
    },
    {
      index: '거리순',
      filter_id: 1,
    },
    {
      index: '금액순',
      filter_id: 2,
    },
    {
      index: '평점순',
      filter_id: 3,
    },
  ];
  const [isClick, setIsClick] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  //params
  const handleFilter = (id) => {
    const newSearchParams = new URLSearchParams(searchParams);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex w-full items-center justify-start gap-5">
      {filterVariant.map((item, index) => (
        <button
          key={index}
          type="button"
          className={`cursor-pointer rounded-[30px] border border-gray-medium px-7 py-[10px] ${isClick === item.filter_id ? 'bg-primary text-white' : ' '}`}
          onClick={() => setIsClick(item.filter_id)}
        >
          {item.index}
        </button>
      ))}
    </div>
  );
};

export default ResultFilter;

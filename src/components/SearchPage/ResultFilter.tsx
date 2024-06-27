import React, { useState } from 'react';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';

function ResultFilter() {
  const filterVariant = [
    {
      index: '최신순',
      filter_id: 0,
      sort: 'recent',
      //filter 함수를 넣거나 백엔드에서 정렬 api 적용하기
    },
    {
      index: '거리순',
      filter_id: 1,
      sort: 'distance',
    },
    {
      index: '금액순',
      filter_id: 2,
      sort: 'price',
    },
    {
      index: '평점순',
      filter_id: 3,
      sort: 'ratings',
    },
  ];
  const [isClick, setIsClick] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  //params
  const handleFilter = (sort: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (sort === null) {
      newSearchParams.delete('sort');
    } else {
      newSearchParams.set('sort', sort);
    }
    setSearchParams(newSearchParams);
    setIsClick(sort);
  };

  return (
    <div className="flex w-full items-center justify-start gap-5">
      {filterVariant.map((item) => (
        <button
          key={item.filter_id}
          type="button"
          className={`cursor-pointer rounded-[30px] border border-gray-medium px-7 py-[10px] ${isClick === item.sort ? 'bg-primary text-white' : ' '}`}
          onClick={() => handleFilter(item.sort)}
        >
          {item.index}
        </button>
      ))}
    </div>
  );
}

export default ResultFilter;

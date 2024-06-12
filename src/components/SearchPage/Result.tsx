import React from 'react';
import Button from '../common/Button';
import ResultItem from './ResultItem';

const Result = () => {
  const user = [
    {
      user_id: 0,
      name: '김0순',
      rating: 4.8,
      address: '서울특별시 강남구',
      gender: '여성',
      age: '50세',
      career: '2년',
    },
    {
      user_id: 1,
      name: '김0순',
      rating: 4.8,
      address: '서울특별시 강남구',
      gender: '여성',
      age: '50세',
      career: '2년',
    },
    {
      user_id: 2,
      name: '김0순',
      rating: 4.8,
      address: '서울특별시 강남구',
      gender: '여성',
      age: '50세',
      career: '2년',
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {user.map((item) => (
        <ResultItem user={item} key={item.user_id} />
      ))}
    </div>
  );
};

export default Result;

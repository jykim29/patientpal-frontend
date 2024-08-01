import React from 'react';
import Button from '../common/Button';
import ResultItem from './ResultItem';
import { UserList } from '@/types/searchResult.model';

interface Props {
  searchResult: UserList[];
}

function Result({ searchResult }: Props) {
  console.log(searchResult);

  return (
    <div className="flex flex-col gap-3">
      {searchResult.map((item, index) => (
        <ResultItem user={item} key={index} />
      ))}
    </div>
  );
}

export default Result;

import React from 'react';
import MainTitleIndex from '../Home/MainTitleIndex';
import SearchForm from './SearchForm';

const SearchByCity = () => {
  return (
    <div className="">
      <MainTitleIndex size="small" text="지역별 찾기">
        <div className="flex h-[565px] w-full rounded-[15px] border-[1.5px] shadow-lg">
          <img src="/assets/map.png" className="w-[696px]" />
          <SearchForm></SearchForm>
        </div>
      </MainTitleIndex>
    </div>
  );
};

export default SearchByCity;

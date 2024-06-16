import React from 'react';
import MainTitleIndex from '../Home/MainTitleIndex';
import ResultFilter from './ResultFilter';
import Result from './Result';

function SearchResult() {
  return (
    <section>
      <MainTitleIndex size="small" text="검색결과">
        <div className="flex w-full flex-col gap-4 rounded-[15px] bg-gray-light px-8 py-8">
          <ResultFilter></ResultFilter>
          <Result></Result>
        </div>
      </MainTitleIndex>
    </section>
  );
}

export default SearchResult;

import React, { Dispatch, SetStateAction } from 'react';
import MainTitleIndex from '../Home/MainTitleIndex';
import ResultFilter from './ResultFilter';
import Result from './Result';
import Button from '../common/Button';
import { UserList } from '@/types/searchResult.model';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  searchResult: UserList[];
}

function SearchResult({ isModalOpen, setIsModalOpen, searchResult }: Props) {
  const handleModalClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="relative min-h-8 rounded-lg bg-white p-10 shadow-lg">
        <Button
          className="absolute right-10 top-10 z-10 h-8 w-8 text-white hover:text-white"
          onClick={handleModalClick}
        >
          X
        </Button>
        <section>
          <MainTitleIndex size="small" text="검색결과">
            <div className="mt-5 flex w-full flex-col gap-6 rounded-[15px] bg-gray-light px-8 py-8">
              <ResultFilter></ResultFilter>
              <Result searchResult={searchResult}></Result>
            </div>
          </MainTitleIndex>
        </section>
      </div>
    </div>
  );
}

export default SearchResult;

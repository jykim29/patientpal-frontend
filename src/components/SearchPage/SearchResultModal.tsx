import React, { Dispatch, SetStateAction } from 'react';
import SearchResultList from './SearchResultList';
import Button from '../common/Button';
import { UserList } from '@/types/searchResult.model';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  searchResult: UserList[];
}

function SearchResultModal({ setIsModalOpen, searchResult }: Props) {
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
        <SearchResultList searchResult={searchResult} />
      </div>
    </div>
  );
}

export default SearchResultModal;

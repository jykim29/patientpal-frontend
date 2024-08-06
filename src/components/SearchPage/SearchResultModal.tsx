import React, { Dispatch, SetStateAction, useEffect } from 'react';
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

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="fixed p-10 bg-white rounded-lg shadow-lg min-h-8">
        <Button
          className="absolute z-10 w-8 h-8 text-white right-10 top-10 hover:text-white"
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

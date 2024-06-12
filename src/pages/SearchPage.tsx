import React from 'react';
import MenuTitle from '../components/common/MenuTitle';
import SearchResult from '../components/SearchPage/SearchResult';
import SearchByCity from '../components/SearchPage/SearchByCity';
import SearchByMap from '../components/SearchPage/SearchByMap';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  return (
    <main className="flex flex-col justify-center gap-[52px] px-[52px] py-8">
      <MenuTitle title="간병인 찾기" />
      {location.pathname === '/search/city' && <SearchByCity />}
      {location.pathname === '/search/map' && <SearchByMap />}
      <SearchResult />
    </main>
  );
};

export default SearchPage;

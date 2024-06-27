import React from 'react';
import MenuTitle from '../components/common/MenuTitle';
import SearchResult from '../components/SearchPage/SearchResult';
import SearchByCity from '../components/SearchPage/SearchByCity';
import SearchByMap from '../components/SearchPage/SearchByMap';

type SearchType = 'map' | 'city';

interface Props {
  searchType: SearchType;
}

function SearchPage({ searchType }: Props) {
  //submit을 props로 전달하기 SearchByCity, SearchByMap에다가

  return (
    <main className="flex flex-col justify-center gap-[52px] px-[52px] py-8">
      <MenuTitle title="간병인 찾기" />
      {searchType === 'city' && <SearchByCity />}
      {searchType === 'map' && <SearchByMap />}
      <SearchResult />
    </main>
  );
}

export default SearchPage;

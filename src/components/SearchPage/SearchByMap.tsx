import { useState } from 'react';
import MainTitleIndex from '../Home/MainTitleIndex';
import MapHeader from './MapHeader';
import Map from './Map';
import SearchResultList from './SearchResultList';
import { UserList } from '@/types/searchResult.model';

function SearchByMap() {
  const [searchResult, setSearchResult] = useState<Partial<UserList>[]>([]);

  return (
    <div className="w-full">
      <MainTitleIndex size="small" text="지도로 찾기">
        <section className="flex h-[662px] flex-col rounded-[15px] shadow-sm">
          <MapHeader setSearchResult={setSearchResult} />
          <Map searchResult={searchResult} />
        </section>
        <SearchResultList searchResult={searchResult} />
      </MainTitleIndex>
    </div>
  );
}

export default SearchByMap;

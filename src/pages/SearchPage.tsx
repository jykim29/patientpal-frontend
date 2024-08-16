import { useState } from 'react';
import MenuTitle from '../components/common/MenuTitle';
import SearchByCity from '../components/SearchPage/SearchByCity';
import SearchByMap from '../components/SearchPage/SearchByMap';
import { useAuthStore } from '@/store/useAuthStore';

type SearchType = 'map' | 'city';

interface Props {
  searchType: SearchType;
}

function SearchPage({ searchType }: Props) {
  const { user } = useAuthStore();
  let menuTitle = '간병인 찾기';

  switch (user?.role) {
    case 'CAREGIVER':
      menuTitle = '환자 찾기';
      break;
    case 'USER':
      menuTitle = '간병인 찾기';
      break;
    default:
      menuTitle = '간병인 찾기';
      break;
  }

  return (
    <main className="flex flex-col justify-center gap-[52px] px-[52px] py-8">
      <MenuTitle title={menuTitle} />
      {searchType === 'city' && <SearchByCity />}
      {searchType === 'map' && <SearchByMap />}
    </main>
  );
}

export default SearchPage;

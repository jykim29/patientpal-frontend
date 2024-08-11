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

  return (
    <main className="flex flex-col justify-center gap-[52px] px-[52px] py-8">
      {user?.role === 'CAREGIVER' ? (
        <MenuTitle title="환자 찾기" />
      ) : (
        <MenuTitle title="간병인 찾기" />
      )}
      {searchType === 'city' && <SearchByCity />}
      {searchType === 'map' && <SearchByMap />}
    </main>
  );
}

export default SearchPage;

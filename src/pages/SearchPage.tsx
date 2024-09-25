import { useLocation } from 'react-router-dom';
import SearchByCity from '../components/SearchPage/SearchByCity';
import SearchByMap from '../components/SearchPage/SearchByMap';

export function Component() {
  const { pathname } = useLocation();
  const searchType = pathname.split('/').pop();

  return (
    <section className="flex flex-col justify-center gap-[52px]">
      {searchType === 'city' && <SearchByCity />}
      {searchType === 'map' && <SearchByMap />}
    </section>
  );
}

Component.displayName = 'SearchPage';

import MainTitleIndex from '../Home/MainTitleIndex';
import Result from './Result';
import { UserList } from '@/types/searchResult.model';

interface Props {
  searchResult: Partial<UserList>[];
}

function SearchResultList({ searchResult }: Props) {
  return (
    <section>
      <MainTitleIndex size="small" text="검색결과">
        {searchResult.length !== 0 ? (
          <div className="mt-5 flex min-h-[300px] w-[1100px] flex-col gap-6 rounded-[15px] bg-gray-light px-8 py-8">
            {/* <ResultFilter /> */}
            <Result searchResult={searchResult} />
          </div>
        ) : (
          <div className="mt-5 flex h-[300px] w-[1100px] flex-col items-center justify-center gap-6 rounded-[15px] bg-gray-light px-8 py-8">
            <p className="text-text-xlarge">검색 결과가 없습니다.</p>
          </div>
        )}
      </MainTitleIndex>
    </section>
  );
}

export default SearchResultList;

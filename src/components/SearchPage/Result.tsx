import ResultItem from './ResultItem';
import { UserList } from '@/types/searchResult.model';

interface Props {
  searchResult: Partial<UserList>[];
}

function Result({ searchResult }: Props) {
  console.log(searchResult);

  return (
    <div className="flex flex-col gap-3">
      {searchResult.map((item, index) => (
        <ResultItem searchResult={item} key={index} />
      ))}
    </div>
  );
}

export default Result;

import { Link, useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { twMerge } from 'tailwind-merge';

export default function BoardPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const [searchParams] = useSearchParams();
  const currentPageNumber = Number(searchParams.get('page')) || 0;
  const chunkSize = 5;
  const chunkedPageArray = _.chunk(_.range(0, 0 + totalPages), chunkSize);
  const currentPageArrayIndex = Math.floor(
    Number(currentPageNumber) / chunkSize
  );
  const currentPageArray = chunkedPageArray[currentPageArrayIndex];

  return (
    <div className="mt-3 flex items-center justify-center gap-5">
      <div className="flex items-center gap-0.5">
        <Link
          title="처음 페이지"
          className='block h-5 w-5 bg-[url("/assets/images/chevron_dobule_left.svg")] bg-center bg-no-repeat'
          to={'.?page=0'}
        ></Link>
        <Link
          title="이전 페이지"
          className='block h-5 w-5 bg-[url("/assets/images/chevron_left.svg")] bg-center bg-no-repeat'
          to={`.?page=${chunkedPageArray[currentPageArrayIndex - 1]?.[0] || 0}`}
        ></Link>
      </div>

      <div className="flex items-center gap-1">
        {currentPageArray ? (
          currentPageArray.map((number) => {
            const isActive = currentPageNumber === number;
            const className = twMerge(
              'block h-7 w-7 text-center text-text-large',
              isActive
                ? 'bg-secondary text-white'
                : 'bg-white hover:shadow-[0_0_0_1px_#D8D8D8]'
            );
            return (
              <Link
                key={number}
                className={className}
                to={`.?page=${number}`}
                title={`${number + 1}번째 페이지`}
              >
                {number + 1}
              </Link>
            );
          })
        ) : (
          <Link
            className="block h-7 w-7 bg-secondary text-center text-text-large text-white"
            to={'.?page=0'}
            title="1번째 페이지"
          >
            1
          </Link>
        )}
      </div>

      <div className="flex items-center gap-0.5">
        <Link
          title="다음 페이지"
          className='block h-5 w-5 bg-[url("/assets/images/chevron_right.svg")] bg-center bg-no-repeat'
          to={`.?page=${chunkedPageArray[currentPageArrayIndex + 1]?.[0] || totalPages - 1}`}
        ></Link>
        <Link
          title="마지막 페이지"
          className='block h-5 w-5 bg-[url("/assets/images/chevron_double_right.svg")] bg-center bg-no-repeat'
          to={`.?page=${totalPages - 1}`}
        ></Link>
      </div>
    </div>
  );
}

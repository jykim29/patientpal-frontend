import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { twMerge } from 'tailwind-merge';

import { GetListResponse } from '@/types/api/board';
import { convertDatetime } from '@/utils/convertDatetime';
import BoardSearchForm from './BoardSearchForm';

export default function BoardList({ title }: { title: string }) {
  const [searchParams] = useSearchParams();
  const loaderData = useLoaderData() as GetListResponse;
  const currentPageNumber = searchParams.get('page');
  const totalPageCount = loaderData.totalPages;
  const chunkSize = 5;
  const chunkedPageArray = _.chunk(_.range(0, 0 + totalPageCount), chunkSize);
  const currentPageArray =
    chunkedPageArray[Math.floor(Number(currentPageNumber) / chunkSize)];
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
        <BoardSearchForm categoryList={['제목', '작성자']} />
      </div>

      <ul className="board-container mt-3">
        <li className="board-item board-header">
          <span className="board-id">번호</span>
          <span className="board-subject">제목</span>
          <span className="board-author">작성자</span>
          <span className="board-date">날짜</span>
          <span className="board-views">조회수</span>
        </li>
        {loaderData.content.map((data) => {
          const convertedDate = convertDatetime(new Date(data.createdAt))[0];
          return (
            <li key={data.id} className="board-item board-body">
              <span className="board-id">{data.id}</span>
              <div className="board-subject">
                <Link to={`view/${data.id}`}>
                  <span>{data.title}</span>
                  {/* <span className="board-comments-count">[1]</span> */}
                </Link>
              </div>
              <span className="board-author">{data.name}</span>
              <span className="board-date">{convertedDate}</span>
              <span className="board-views">152</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 text-right">
        <Link
          to={'post'}
          className="inline-block rounded-md bg-primary px-4 py-1 text-text-medium text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        >
          글쓰기
        </Link>
      </div>

      <div className="mt-3 flex items-center justify-center gap-5">
        <div className="flex items-center gap-0.5">
          <Link
            title="처음 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_dobule_left.svg")] bg-center bg-no-repeat'
            to={'.?page=0'}
          >
            <span className="sr-only">처음 페이지</span>
          </Link>
          <Link
            title="이전 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_left.svg")] bg-center bg-no-repeat'
            to={`.`}
          >
            <span className="sr-only">이전 페이지</span>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          {currentPageArray &&
            currentPageArray.map((number) => {
              const isActive = Number(currentPageNumber) === number;
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
                >
                  {number + 1}
                </Link>
              );
            })}
        </div>

        <div className="flex items-center gap-0.5">
          <Link
            title="다음 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_right.svg")] bg-center bg-no-repeat'
            to={''}
          >
            <span className="sr-only">끝 페이지</span>
          </Link>
          <Link
            title="끝 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_double_right.svg")] bg-center bg-no-repeat'
            to={`.?page=${totalPageCount - 1}`}
          >
            <span className="sr-only">다음 페이지</span>
          </Link>
        </div>
      </div>
    </>
  );
}

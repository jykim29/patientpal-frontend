import { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '../common/Button';

function BoardArticle() {
  return (
    <>
      <div className="mt-3 flex w-full flex-col overflow-hidden rounded-md border border-gray-medium bg-white">
        <div className="border-b border-gray-medium bg-gray-light px-5 py-3">
          <h3 className="mb-2 text-text-large font-semibold">
            안녕하세요. 잘 부탁드립니다.
          </h3>
          <span className="relative pr-3 after:absolute after:-right-[2px] after:top-1/2 after:-translate-y-1/2 after:text-text-small after:text-gray-medium after:content-['|']">
            김간병
          </span>
          <span className="relative px-3 after:absolute after:-right-[2px] after:top-1/2 after:-translate-y-1/2 after:text-text-small after:text-gray-medium after:content-['|']">
            <span className="mr-2">작성일</span>
            <time
              className="text-gray-medium-dark"
              dateTime={new Date().toISOString()}
            >
              {new Date().toLocaleString()}
            </time>
          </span>
          <span className="relative px-3">
            <span className="mr-2">수정일</span>
            <time
              className="text-gray-medium-dark"
              dateTime={new Date().toISOString()}
            >
              {new Date().toLocaleString()}
            </time>
          </span>
        </div>

        <div className="px-7 py-10">안녕하세요. 잘부탁드립니다</div>
      </div>

      <div className="mt-3 text-right">
        <Button type="button" className="mr-2 h-8 bg-gray-medium px-4 py-1">
          수정
        </Button>
        <Button type="button" className="mr-2 h-8 bg-negative px-4 py-1">
          삭제
        </Button>
        <Link
          to={'../'}
          className="mr-2 inline-block h-8 rounded-md bg-primary px-4 py-1 align-top text-text-medium text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        >
          목록으로
        </Link>
      </div>
    </>
  );
}

export default memo(BoardArticle);

import { Link, useLoaderData } from 'react-router-dom';

import { PostResponse } from '@/types/api/board';
import { convertDatetime } from '@/utils/convertDatetime';
import Button from '../common/Button';

export default function BoardArticle() {
  const { title, content, name, id, createdAt, updatedAt, memberId, postType } =
    useLoaderData() as PostResponse;

  return (
    <>
      <div className="mt-3 flex w-full flex-col overflow-hidden rounded-md border border-gray-medium bg-white">
        <div className="border-b border-gray-medium bg-gray-light px-5 py-3">
          <h3 className="mb-2 text-text-large font-semibold">{title}</h3>
          <span className="relative pr-3 after:absolute after:-right-[2px] after:top-1/2 after:-translate-y-1/2 after:text-text-small after:text-gray-medium after:content-['|']">
            {name}
          </span>
          <span className="relative px-3 after:absolute after:-right-[2px] after:top-1/2 after:-translate-y-1/2 after:text-text-small after:text-gray-medium after:content-['|']">
            <span className="mr-2">작성일</span>
            <time className="text-gray-medium-dark" dateTime={createdAt}>
              {`${convertDatetime(new Date(createdAt))[0]} ${convertDatetime(new Date(createdAt))[1]}`}
            </time>
          </span>
          <span className="relative px-3">
            <span className="mr-2">수정일</span>
            <time className="text-gray-medium-dark" dateTime={updatedAt}>
              {`${convertDatetime(new Date(updatedAt))[0]} ${convertDatetime(new Date(updatedAt))[1]}`}
            </time>
          </span>
        </div>

        <div className="px-7 py-10">{content}</div>
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

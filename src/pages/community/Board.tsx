import { Link, useLoaderData } from 'react-router-dom';

import {
  BoardList,
  BoardPagination,
  BoardSearchForm,
} from '@/components/board';
import { useAuthStore } from '@/store/useAuthStore';
import { BoardType, GetListResponse } from '@/types/api/board';

export default function Board({
  title,
  boardType,
}: {
  title: string;
  boardType: BoardType;
}) {
  const { user } = useAuthStore();
  const loaderData = useLoaderData() as GetListResponse;
  const isShowWriteButton =
    (boardType === 'notice' && user?.role === 'ADMIN') || boardType === 'board';
  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
        <BoardSearchForm categoryList={['제목', '작성자']} />
      </div>

      <BoardList listData={loaderData.content} />

      <div className="mt-3 h-8 text-right">
        {isShowWriteButton && (
          <Link
            to={'post'}
            className="inline-block rounded-md bg-primary px-4 py-1 text-text-medium text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
          >
            글쓰기
          </Link>
        )}
      </div>

      <BoardPagination totalPages={loaderData.totalPages} />
    </section>
  );
}

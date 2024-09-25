import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import {
  BoardList,
  BoardPagination,
  BoardSearchForm,
} from '@/components/board';
import { useAuthStore } from '@/store/useAuthStore';
import { BoardType, GetListResponse } from '@/types/api/board';
import { boardService } from '@/services';
import { API_FAILED } from '@/constants/api';

export default function Board({
  title,
  boardType,
}: {
  title: string;
  boardType: BoardType;
}) {
  const { user, accessToken } = useAuthStore();
  const [searchParams] = useSearchParams();
  const [listData, setListData] = useState<GetListResponse | null>(null);
  const isAdmin = user?.role === 'ADMIN';
  const isUser = user?.role === 'CAREGIVER' || user?.role === 'USER';
  const isShowWriteButton =
    (boardType === 'notice' && isAdmin) || (boardType === 'board' && isUser);
  const pageNumber = Number(searchParams.get('page')) || 0;
  const contents = listData?.content || [];
  const totalPages = listData?.totalPages || 0;

  const getListData = async (boardType: BoardType) => {
    const response = await boardService.getList(boardType, pageNumber, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === API_FAILED) return setListData(null);
    return setListData(response.data);
  };

  useEffect(() => {
    getListData(boardType);
  }, [pageNumber]);

  return (
    <section>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
        <BoardSearchForm categoryList={['제목', '작성자']} />
      </div>

      <BoardList boardType={boardType} listData={contents} />

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

      <BoardPagination totalPages={totalPages} />
    </section>
  );
}

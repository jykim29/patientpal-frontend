import { Navigate, useLoaderData } from 'react-router-dom';

import { BoardType, PostResponse } from '@/types/api/board';
import { useAuthStore } from '@/store/useAuthStore';
import { BoardWriteForm } from '@/components/board';

export default function BoardModify({ boardType }: { boardType: BoardType }) {
  const { user } = useAuthStore();
  const loaderData = useLoaderData() as PostResponse;
  if (!loaderData) {
    window.alert('삭제됐거나 존재하지 않는 게시물입니다.');
    return <Navigate to=".." replace />;
  }
  const isMyPost = (user?.memberId as number) === loaderData.memberId;
  if (!isMyPost) {
    window.alert('권한이 없습니다.');
    return <Navigate to=".." replace />;
  }

  return (
    <section>
      <BoardWriteForm
        title="수정하기"
        mode="modify"
        boardType={boardType}
        loaderData={loaderData}
      />
    </section>
  );
}

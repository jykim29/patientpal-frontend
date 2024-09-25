import { Navigate, useLocation } from 'react-router-dom';
import { BoardWriteForm } from '@/components/board';
import { useAuthStore } from '@/store/useAuthStore';
import { BoardType } from '@/types/api/board';

export function Component() {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  const boardType = pathname.split('/').filter(Boolean)[0];
  if (boardType === 'notice' && user?.role !== 'ADMIN')
    return <Navigate to=".." replace />;
  return (
    <section>
      <BoardWriteForm
        title="글쓰기"
        mode="write"
        boardType={boardType as BoardType}
      />
    </section>
  );
}

Component.displayName = 'BoardWrite';

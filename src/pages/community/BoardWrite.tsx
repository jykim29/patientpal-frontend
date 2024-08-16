import { Navigate } from 'react-router-dom';
import { BoardWriteForm } from '@/components/board';
import { BoardType } from '@/types/api/board';
import { useAuthStore } from '@/store/useAuthStore';

export default function BoardWrite({ boardType }: { boardType: BoardType }) {
  const { user } = useAuthStore();
  if (boardType === 'notice' && user?.role !== 'ADMIN')
    return <Navigate to=".." replace />;
  return (
    <section>
      <BoardWriteForm title="글쓰기" mode="write" boardType={boardType} />
    </section>
  );
}

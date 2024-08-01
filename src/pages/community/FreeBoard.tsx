import { useLoaderData } from 'react-router-dom';
import { Board } from '@/components/board';
import { GetListResponse } from '@/types/api/board';

export default function FreeBoard() {
  const loaderData = useLoaderData() as GetListResponse;
  return (
    <>
      <Board boardType="board" title="자유게시판" loaderData={loaderData} />
    </>
  );
}

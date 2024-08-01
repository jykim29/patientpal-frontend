import { useLoaderData } from 'react-router-dom';
import { Board } from '@/components/board';
import { GetListResponse } from '@/types/api/board';

export default function NoticeBoard() {
  const loaderData = useLoaderData() as GetListResponse;
  return (
    <>
      <Board boardType="notice" title="공지사항" loaderData={loaderData} />
    </>
  );
}

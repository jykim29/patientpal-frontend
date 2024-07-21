import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { PostResponse } from '@/types/api/board';
import { convertDatetime } from '@/utils/convertDatetime';
import { boardService } from '@/services/BoardService';
import { useAuthStore } from '@/store/useAuthStore';
import { API_FAILED } from '@/constants/api';

import Button from '../common/Button';

export default function BoardArticle() {
  const { title, content, name, id, createdAt, updatedAt, memberId, postType } =
    useLoaderData() as PostResponse;
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const response = await boardService.deletePost('FREE', id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response?.status === API_FAILED) return alert('통신 실패');
    return navigate('../', { replace: true });
  };
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
              {`${convertDatetime(createdAt)[0]} ${convertDatetime(createdAt)[1]}`}
            </time>
          </span>
          <span className="relative px-3">
            <span className="mr-2">수정일</span>
            <time className="text-gray-medium-dark" dateTime={updatedAt}>
              {`${convertDatetime(updatedAt)[0]} ${convertDatetime(updatedAt)[1]}`}
            </time>
          </span>
        </div>

        <div
          className="break-all px-7 py-10"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></div>
      </div>

      <div className="mt-3 text-right">
        <Link
          to={`../modify/${id}`}
          className="mr-2 inline-block h-8 rounded-md bg-gray-medium px-4 py-1 align-top text-text-medium text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        >
          수정
        </Link>
        <Button
          type="button"
          className="mr-2 h-8 bg-negative px-4 py-1"
          onClick={handleDeletePost}
        >
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

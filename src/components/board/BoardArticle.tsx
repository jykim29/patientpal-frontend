import { Link, Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';

import { PostResponse } from '@/types/api/board';
import { boardService } from '@/services';
import { useAuthStore } from '@/store/useAuthStore';
import { useModal } from '@/hooks/useModal';
import { API_FAILED } from '@/constants/api';
import { toLocaleISOString } from '@/utils/toLocaleISOString';

import Button from '../common/Button';

export default function BoardArticle() {
  const loaderData = useLoaderData() as PostResponse;
  if (!loaderData) {
    window.alert('삭제됐거나 존재하지 않는 게시물입니다.');
    return <Navigate to=".." replace />;
  }
  const {
    title,
    content,
    name,
    id,
    createdAt,
    updatedAt,
    memberId,
    postType,
    views,
  } = loaderData;
  const { accessToken, user } = useAuthStore();
  const { confirm, alert } = useModal();
  const navigate = useNavigate();
  const boardType = postType === 'FREE' ? 'board' : 'notice';
  const boardName = postType === 'FREE' ? '자유게시판' : '공지사항';
  const myId = user && user.memberId;
  const isMyPost = myId === memberId;
  const authorName = postType === 'NOTICE' ? '관리자' : name;
  const createdDatetime = format(
    toLocaleISOString(new Date(createdAt)),
    'yyyy-MM-dd HH:mm'
  );
  const updatedDatetime = format(
    toLocaleISOString(new Date(updatedAt)),
    'yyyy-MM-dd HH:mm'
  );

  const handleDeletePost = async () => {
    if (!(await confirm('정말 삭제하시겠습니까?'))) return;
    if (!isMyPost) return;
    const response = await boardService.deletePost(boardType, id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response?.status === API_FAILED)
      return await alert(
        'warning',
        '서버와 통신이 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    return navigate('../', { replace: true });
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-1 text-title-small">{boardName}</h3>
      </div>
      <div className="article-container">
        <div className="article-header">
          <div className="flex items-center gap-3">
            <span className="article-title-label">제목</span>
            <h3 className="article-title">{title}</h3>
          </div>

          <div className="flex gap-2">
            <span>작성자</span>
            <span className="divider pr-3 text-gray-dark">{authorName}</span>
            <span className="divider px-3">
              <span className="mr-2">작성일</span>
              <time className="text-gray-dark" dateTime={createdAt}>
                {createdDatetime}
              </time>
            </span>
            <span className="relative px-3">
              <span className="mr-2">수정일</span>
              <time className="text-gray-dark" dateTime={updatedAt}>
                {updatedDatetime}
              </time>
            </span>
            <span className="ml-auto">조회수 {views}</span>
          </div>
        </div>

        <div
          className="break-all px-7 py-10"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></div>
      </div>

      <div className="article-button-container">
        {isMyPost && (
          <>
            <Link to={`../modify/${id}`} className="link-button bg-gray-medium">
              수정
            </Link>
            <Button
              type="button"
              className="mr-2 h-8 bg-negative px-4 py-1"
              onClick={handleDeletePost}
            >
              삭제
            </Button>
          </>
        )}
        <Link to={'../'} className="link-button bg-primary">
          목록으로
        </Link>
      </div>
    </>
  );
}

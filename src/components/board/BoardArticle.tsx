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
  const { accessToken, user } = useAuthStore();
  const navigate = useNavigate();
  const boardType = postType === 'FREE' ? 'board' : 'notice';
  const myId = user && user.memberId;
  const isMyPost = myId === memberId;

  const handleDeletePost = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    if (!isMyPost) return;
    const response = await boardService.deletePost(boardType, id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response?.status === API_FAILED) return alert('통신 실패');
    return navigate('../', { replace: true });
  };
  return (
    <>
      <div className="article-container">
        <div className="article-header">
          <h3 className="article-title">{title}</h3>
          <span className="divider pr-3">{name}</span>
          <span className="divider px-3">
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

import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { BoardType, PostResponse } from '@/types/api/board';
import { convertDatetime } from '@/utils/convertDatetime';

export default function BoardListItem({
  data,
  boardType,
}: {
  data: Omit<PostResponse, 'content'>;
  boardType: BoardType;
}) {
  const { id, title, name, views, postType } = data;
  const [createDate, createTime] = convertDatetime(data.createdAt);
  const [nowDate] = convertDatetime(Date.now());
  const convertedDate = createDate === nowDate ? createTime : createDate;
  const authorName = postType === 'NOTICE' ? '관리자' : name;

  return (
    <li
      className={twMerge(
        'board-item board-body',
        boardType === 'notice' && 'notice'
      )}
    >
      <span className="board-id">{boardType === 'notice' ? '공지' : id}</span>
      <div className="board-subject">
        <Link to={`view/${id}`}>
          <span
            className={twMerge(
              'board-subject-text',
              boardType === 'notice' && 'notice'
            )}
          >
            {title}
          </span>
        </Link>
      </div>
      <span className="board-author">{authorName}</span>
      <span className="board-date">{convertedDate}</span>
      <span className="board-views">{views}</span>
    </li>
  );
}

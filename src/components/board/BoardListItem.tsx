import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { differenceInCalendarDays, format } from 'date-fns';

import { BoardType, PostResponse } from '@/types/api/board';

export default function BoardListItem({
  data,
  boardType,
}: {
  data: Omit<PostResponse, 'content'>;
  boardType: BoardType;
}) {
  const { id, title, name, views, postType } = data;
  const [createdDate, createdTime] = format(
    data.createdAt,
    'yyyy-MM-dd HH:mm'
  ).split(' ');
  const convertedDate =
    differenceInCalendarDays(new Date(), createdDate) > 0
      ? createdDate
      : createdTime;
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

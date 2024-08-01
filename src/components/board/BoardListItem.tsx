import { Link } from 'react-router-dom';

import { PostResponse } from '@/types/api/board';
import { convertDatetime } from '@/utils/convertDatetime';

export default function BoardListItem({
  data,
}: {
  data: Omit<PostResponse, 'content'>;
}) {
  const { id, title, name, views } = data;
  const [createDate, createTime] = convertDatetime(data.createdAt);
  const [nowDate] = convertDatetime(Date.now());
  const convertedDate = createDate === nowDate ? createTime : createDate;

  return (
    <li className="board-item board-body">
      <span className="board-id">{id}</span>
      <div className="board-subject">
        <Link to={`view/${id}`}>
          <span>{title}</span>
          {/* <span className="board-comments-count">[1]</span> */}
        </Link>
      </div>
      <span className="board-author">{name}</span>
      <span className="board-date">{convertedDate}</span>
      <span className="board-views">{views}</span>
    </li>
  );
}

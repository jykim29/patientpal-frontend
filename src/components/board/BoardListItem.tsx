import { Link } from 'react-router-dom';

import { PostResponse } from '@/types/api/board';
import { convertDatetime } from '@/utils/convertDatetime';

export default function BoardListItem({
  data,
}: {
  data: Omit<PostResponse, 'content'>;
}) {
  let convertedDate = convertDatetime(data.createdAt)[0];
  if (convertDatetime(data.createdAt)[0] === convertDatetime(Date.now())[0])
    convertedDate = convertDatetime(data.createdAt)[1];
  return (
    <li key={data.id} className="board-item board-body">
      <span className="board-id">{data.id}</span>
      <div className="board-subject">
        <Link to={`view/${data.id}`}>
          <span>{data.title}</span>
          {/* <span className="board-comments-count">[1]</span> */}
        </Link>
      </div>
      <span className="board-author">{data.name}</span>
      <span className="board-date">{convertedDate}</span>
      <span className="board-views">152</span>
    </li>
  );
}

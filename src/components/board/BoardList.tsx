import { PostResponse } from '@/types/api/board';

import BoardListItem from './BoardListItem';

export default function BoardList({
  listData,
}: {
  listData: Omit<PostResponse, 'content'>[];
}) {
  return (
    <ul className="board-container mt-3">
      <li className="board-item board-header">
        <span className="board-id">번호</span>
        <span className="board-subject">제목</span>
        <span className="board-author">작성자</span>
        <span className="board-date">날짜</span>
        <span className="board-views">조회수</span>
      </li>
      {listData.map((data) => (
        <BoardListItem key={data.id} data={data} />
      ))}
    </ul>
  );
}

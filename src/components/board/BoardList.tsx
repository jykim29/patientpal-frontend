import { BoardType, PostResponse } from '@/types/api/board';

import BoardListItem from './BoardListItem';

export default function BoardList({
  listData,
  boardType,
}: {
  listData: Omit<PostResponse, 'content'>[];
  boardType: BoardType;
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
      {listData.length > 0 ? (
        listData.map((data) => (
          <BoardListItem key={data.id} boardType={boardType} data={data} />
        ))
      ) : (
        <li className="select-none py-2 text-center text-text-large">
          검색된 게시물이 없습니다.
        </li>
      )}
    </ul>
  );
}

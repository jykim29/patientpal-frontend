import { memo } from 'react';
import { Link } from 'react-router-dom';
import BoardSearchForm from './BoardSearchForm';

interface BoardListProps {
  title: string;
  searchCategoryList: string[];
}

const dummyBoardData = [
  {
    id: '0',
    subject: '안녕하세요 반갑습니다.',
    author: '김간병',
    createdDate: Date.now(),
    views: '152',
    comments: [
      {
        id: '0',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '1',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '2',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
    ],
  },
  {
    id: '1',
    subject: '안녕하세요 반갑습니다.',
    author: '김간병',
    createdDate: Date.now(),
    views: '152',
    comments: [
      {
        id: '0',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '1',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '2',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
    ],
  },
  {
    id: '2',
    subject: '안녕하세요 반갑습니다.',
    author: '김간병',
    createdDate: Date.now(),
    views: '152',
    comments: [
      {
        id: '0',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '1',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '2',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
    ],
  },
  {
    id: '3',
    subject: '안녕하세요 반갑습니다.',
    author: '김간병',
    createdDate: Date.now(),
    views: '152',
    comments: [
      {
        id: '0',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '1',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '2',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
    ],
  },
  {
    id: '4',
    subject: '안녕하세요 반갑습니다.',
    author: '김간병',
    createdDate: Date.now(),
    views: '152',
    comments: [
      {
        id: '0',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '1',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
      {
        id: '2',
        username: '박환자',
        content: '반갑습니다~',
        createdDate: Date.now(),
      },
    ],
  },
];

function BoardList({ title, searchCategoryList }: BoardListProps) {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
        <BoardSearchForm categoryList={searchCategoryList} />
      </div>

      <ul className="board-container mt-3">
        <li className="board-item board-header">
          <span className="board-id">번호</span>
          <span className="board-subject">제목</span>
          <span className="board-author">작성자</span>
          <span className="board-date">날짜</span>
          <span className="board-views">조회수</span>
        </li>
        {dummyBoardData.reverse().map((data) => {
          const convertedCreatedDate = new Date(data.createdDate)
            .toISOString()
            .slice(0, 10);
          return (
            <li key={data.id} className="board-item board-body">
              <span className="board-id">{data.id}</span>
              <div className="board-subject">
                <Link to={`view/${data.id}`}>
                  <span>{data.subject}</span>
                  <span className="board-comments-count">
                    [{data.comments.length}]
                  </span>
                </Link>
              </div>
              <span className="board-author">{data.author}</span>
              <span className="board-date">{convertedCreatedDate}</span>
              <span className="board-views">{data.views}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 text-right">
        <Link
          to={'post'}
          className="inline-block rounded-md bg-primary px-4 py-1 text-text-medium text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        >
          글쓰기
        </Link>
      </div>

      <div className="mt-3 flex items-center justify-center gap-5">
        <div className="flex items-center gap-0.5">
          <Link
            title="처음 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_dobule_left.svg")] bg-center bg-no-repeat'
            to={''}
          >
            <span className="sr-only">처음 페이지</span>
          </Link>
          <Link
            title="이전 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_left.svg")] bg-center bg-no-repeat'
            to={''}
          >
            <span className="sr-only">이전 페이지</span>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <Link
            className="block h-7 w-7 bg-secondary bg-center bg-no-repeat text-center text-text-large text-white"
            to={''}
          >
            1
          </Link>
          <Link
            className="block h-7 w-7 bg-white bg-center bg-no-repeat text-center text-text-large hover:shadow-[0_0_0_1px_#D8D8D8]"
            to={''}
          >
            2
          </Link>
          <Link
            className="block h-7 w-7 bg-white bg-center bg-no-repeat text-center text-text-large hover:shadow-[0_0_0_1px_#D8D8D8]"
            to={''}
          >
            3
          </Link>
          <Link
            className="block h-7 w-7 bg-white bg-center bg-no-repeat text-center text-text-large hover:shadow-[0_0_0_1px_#D8D8D8]"
            to={''}
          >
            4
          </Link>
        </div>

        <div className="flex items-center gap-0.5">
          <Link
            title="끝 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_right.svg")] bg-center bg-no-repeat'
            to={''}
          >
            <span className="sr-only">끝 페이지</span>
          </Link>
          <Link
            title="다음 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_double_right.svg")] bg-center bg-no-repeat'
            to={''}
          >
            <span className="sr-only">다음 페이지</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default memo(BoardList);

import { memo } from 'react';
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import _ from 'lodash';

import BoardSearchForm from './BoardSearchForm';

interface BoardListProps {
  title: string;
  searchCategoryList: string[];
}

interface placeholderResponse {
  id: number;
  UserId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  username?: string;
}

interface loaderResponse {
  items: placeholderResponse[];
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItemsCount: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

function BoardList({ title, searchCategoryList }: BoardListProps) {
  const {
    items: boardItems,
    currentPage,
    totalPages,
  } = useLoaderData() as loaderResponse;
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
        {boardItems.map((data) => {
          const convertedDate = data.createdAt.slice(0, 10);
          return (
            <li key={data.id} className="board-item board-body">
              <span className="board-id">{data.id}</span>
              <div className="board-subject">
                <Link to={`view/${data.id}`}>
                  <span>{data.title}</span>
                  <span className="board-comments-count">[12]</span>
                </Link>
              </div>
              <span className="board-author">{data.username}</span>
              <span className="board-date">{convertedDate}</span>
              <span className="board-views">152</span>
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
            to={'.?page=1'}
          >
            <span className="sr-only">처음 페이지</span>
          </Link>
          <Link
            title="이전 페이지"
            className='block h-5 w-5 bg-[url("/assets/chevron_left.svg")] bg-center bg-no-repeat'
            to={`.`}
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
            to={`.?page=${totalPages}`}
          >
            <span className="sr-only">다음 페이지</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default memo(BoardList);

export const loader: LoaderFunction<any> = async ({ request }) => {
  const userTable = [
    {
      id: 1,
      name: '이정도',
      username: 'jd1386',
      email: 'lee.jungdo@gmail.com',
      phone: '010-3192-2910',
      website: 'https://leejungdo.com',
      province: '경기도',
      city: '성남시',
      district: '분당구',
      street: '대왕판교로 160',
      zipcode: '13525',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 2,
      name: '김재완',
      username: 'lastrites2018',
      email: 'jaewan@gmail.com',
      phone: '02-879-5000',
      website: 'https://github.com/lastrites2018',
      province: '',
      city: '서울특별시',
      district: '관악구',
      street: '관악로 145',
      zipcode: '08832',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 3,
      name: '김성은',
      username: 'sunnysid3up',
      email: 'sunny@daum.net',
      phone: '010-4280-1991',
      website: 'https://github.com/sunnysid3up',
      province: '',
      city: '서울특별시',
      district: '강동구',
      street: '성내로 25',
      zipcode: '05397',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 4,
      name: '이주연',
      username: 'yyijoo',
      email: 'jooyeon@gmail.com',
      phone: '010-2940-1401',
      website: 'https://github.com/yyijoo',
      province: '경기도',
      city: '용인시',
      district: '수지구',
      street: '포은대로 435',
      zipcode: '16835',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 5,
      name: '구일모',
      username: 'johnnykoo84',
      email: 'johnny@gmail.com',
      phone: '010-8491-3982',
      website: 'https://github.com/johnnykoo84',
      province: '',
      city: '서울특별시',
      district: '강남구',
      street: '학동로 426',
      zipcode: '06090',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 6,
      name: '장원진',
      username: 'jangwj2931',
      email: 'jang@gmail.com',
      phone: '010-4811-0921',
      website: 'https://github.com/jangwj2931',
      province: '',
      city: '부산광역시',
      district: '부산진구',
      street: '시민공원로 30',
      zipcode: '47193',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 7,
      name: '최윤우',
      username: 'yoonooyoonoo',
      email: 'yoonooyoonoo@naver.com',
      phone: '010-3910-9849',
      website: 'https://blog.naver.com/yoonooyoonoo',
      province: '',
      city: '대전광역시',
      district: '유성구',
      street: '대덕대로 480',
      zipcode: '34126',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 8,
      name: '이강인',
      username: 'kanginlee',
      email: 'kanginlee@hanmail.net',
      phone: '010-9311-9411',
      website: 'https://twitter.com/@kanginlee',
      province: '전라북도',
      city: '전주시',
      district: '완산구',
      street: '풍남동3가 64-1',
      zipcode: '55041',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 9,
      name: '박동민',
      username: 'dongpark',
      email: 'dongpark@naver.com',
      phone: '010-4941-5092',
      website: 'https://dongpark.com',
      province: '전라남도',
      city: '광주광역시',
      district: '서구',
      street: '내방로 111',
      zipcode: '61945',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
    {
      id: 10,
      name: '정지수',
      username: 'jisoocity',
      email: 'jisoocity@naver.com',
      phone: '010-8591-4011',
      website: 'https://instagram.com/jisoocity',
      province: '',
      city: '대구광역시',
      district: '중구',
      street: '공평로 88',
      zipcode: '41911',
      createdAt: '2019-02-24T16:17:47.000Z',
      updatedAt: '2019-02-24T16:17:47.000Z',
    },
  ];
  const searchParams = new URL(request.url).searchParams;
  const response = await fetch('https://koreanjson.com/posts');
  const data: placeholderResponse[] = await response.json();
  const sortedData = data
    .toSorted(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map((data) => {
      return { ...data, username: userTable[data.UserId - 1].name };
    });
  const perPage = Number(searchParams.get('perPage')) || 10;
  const groupData = _.chunk(sortedData, Number(perPage));
  const totalItemCount = data.length;
  const totalPages = Math.ceil(totalItemCount / perPage);
  const pageParam = Number(searchParams.get('page'));
  const currentPage = pageParam > 0 && pageParam <= totalPages ? pageParam : 1;
  return {
    // totalItem: groupData,
    items: groupData[currentPage - 1],
    perPage,
    currentPage,
    totalPages,
    totalItemsCount: data.length,
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
};

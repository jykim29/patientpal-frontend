import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const reviews = [
  {
    name: '홍길동',
    comment: '좋아요',
    rating: 5,
    date: '2023-07-01',
  },
  {
    name: '홍길동',
    comment: '괜찮네요',
    rating: 4,
    date: '2023-07-02',
  },
  {
    name: '홍길동',
    comment: '별로에요',
    rating: 2,
    date: '2023-07-03',
  },
  {
    name: '홍길동',
    comment: '너무 좋아요!',
    rating: 5,
    date: '2023-07-04',
  },
];

export function Component() {
  const [filter, setFilter] = useState('all');
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  // 필터링 함수
  const handleFilterChange = (option: string) => {
    setFilter(option);
    switch (option) {
      case 'all':
        setFilteredReviews(reviews);
        break;
      case 'rating':
        setFilteredReviews([...reviews].sort((a, b) => b.rating - a.rating));
        break;
      case 'latest':
        setFilteredReviews(
          [...reviews].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        break;
      default:
        setFilteredReviews(reviews);
        break;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<AiFillStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<AiFillStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-title-small">내가 받은 후기</h1>

        <select
          id="filter"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="w-[150px] rounded border px-2 py-[10px]"
        >
          <option value="all">전체</option>
          <option value="latest">최신순</option>
          <option value="rating">별점순</option>
        </select>
      </div>

      <section className="flex flex-col gap-8 rounded-[16px] border px-10 py-5">
        <div className="flex items-center justify-between text-title-small">
          <span>평점</span>
          <span>4.5</span>
        </div>
        {filteredReviews.map((item, index) => (
          <div
            key={index}
            className="flex h-[112px] items-center justify-between rounded-[12px] border p-4"
          >
            <div className="flex gap-2">
              <div className="h-[80px] w-[64px] rounded-l-lg bg-primary"></div>
              <div className="flex flex-col justify-center gap-2">
                <span className="text-title-small">{item.name}</span>
                <p className="text-text-medium">{item.comment}</p>
              </div>
            </div>
            <div className="flex items-center">{renderStars(item.rating)}</div>
          </div>
        ))}
      </section>
    </>
  );
}

Component.displayName = 'ReviewPage';

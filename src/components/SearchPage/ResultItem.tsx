import React from 'react';
import { FaCakeCandles, FaCircleUser } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import Button from '../common/Button';
import { FaRegFileLines } from 'react-icons/fa6';
import { UserList } from '@/types/searchResult.model';
import { formatGenderToKR } from '@/utils/format';
import { useAuthStore } from '@/store/useAuthStore';
interface Props {
  searchResult: UserList;
}

const Star = (props: Pick<UserList, 'rating'>) => {
  return (
    <span className="flex items-center pr-[8px]">
      {Array.from({ length: props.rating + 1 }).map((item, index) => (
        <FaStar className="h-[17px] w-[17px]" color="F6C002" />
      ))}
    </span>
  );
};

function ResultItem({ searchResult }: Props) {
  //신청버튼
  const handleApply = () => {};
  const { name, address, gender, age, experienceYears, rating } = searchResult;
  const { user } = useAuthStore();
  return (
    <div className="flex items-center justify-between gap-2 rounded-[10px] bg-white px-5 py-3 shadow-sm">
      <div className="flex items-center gap-4">
        <FaCircleUser className="h-10 w-10" color="gray" />
        <p className="text-text-large">{name}</p>
        <ul className="flex items-center gap-5">
          <li className="flex items-center gap-1">
            <p className="font-semibold">{address.addr}</p>
          </li>
          <li className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-medium">
              <BsGenderAmbiguous color="gray-dark" />
              <p>성별</p>
            </div>
            <p className="font-semibold">{formatGenderToKR(gender)}</p>
          </li>
          <li className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-medium">
              <FaCakeCandles color="gray-dark" />
              <p>나이</p>
            </div>
            <p className="font-semibold">{age}</p>
          </li>
          {user?.role === 'USER' ? (
            <li className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gray-medium">
                <FaRegFileLines color="gray-dark" />
                <p>경력</p>
              </div>
              <p className="font-semibold">{experienceYears}년</p>
            </li>
          ) : (
            <></>
          )}
          <Star rating={rating} />
        </ul>
      </div>
      <Button type="submit" className="w-[80px]" onClick={handleApply}>
        신청
      </Button>
    </div>
  );
}

export default ResultItem;

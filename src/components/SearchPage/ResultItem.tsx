import React from 'react';
import { FaCakeCandles, FaCircleUser } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import Button from '../common/Button';
import { FaRegFileLines } from 'react-icons/fa6';
const ResultItem = ({ user }) => {
  const { name, rating, address, gender, age, career } = user;

  //신청버튼
  const handleApply = () => {};

  return (
    <div className="flex items-center justify-between gap-2 rounded-[10px] bg-white px-5 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <FaCircleUser className="h-10 w-10" color="gray" />
        <p className="text-text-large">{name}</p>
        <ul className="flex items-center gap-4 text-gray-medium">
          <li className="flex items-center gap-1">
            <FaStar className="h-[17px] w-[17px]" color="F6C002" />
            <p>{rating}</p>
          </li>
          <li>{address}</li>
          <li className="flex items-center gap-3 text-gray-dark">
            <div className="flex items-center gap-1">
              <BsGenderAmbiguous color="gray-dark" />
              <p>성별</p>
            </div>
            <p>{gender}</p>
          </li>
          <li className="flex items-center gap-3 text-gray-dark">
            <div className="flex items-center gap-1">
              <FaCakeCandles color="gray-dark" />
              <p>나이</p>
            </div>
            <p>{age}</p>
          </li>
          <li className="flex items-center gap-3 text-gray-dark">
            <div className="flex items-center gap-1">
              <FaRegFileLines color="gray-dark" />
              <p>경력</p>
            </div>
            <p>{career}</p>
          </li>
        </ul>
      </div>
      <Button type="submit" className="w-[80px]" onClick={handleApply}>
        신청
      </Button>
    </div>
  );
};

export default ResultItem;

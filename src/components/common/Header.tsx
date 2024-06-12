import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa6';
import { FaCircleUser } from 'react-icons/fa6';
import { FaCircle } from 'react-icons/fa6';

const Header = () => {
  const navigate = useNavigate();
  const moveToHome = () => {
    navigate('/');
  };
  const moveToMyPage = () => {
    navigate('/mypage');
  };

  //zustand로 옮겨서 관리하기
  const [newNotice, setNewNotice] = useState(true);
  const [userName, setUserName] = useState('김간병');

  const checkNotice = () => {
    setNewNotice(false);
    //모달창 나오게
  };

  return (
    <div className="flex justify-center">
      <header className="flex h-[80px] w-full min-w-[1440px] items-center justify-between border-b-[2px] px-[36px] py-[20px]">
        <button onClick={moveToHome}>
          <img className="h-[50px]" src="/assets/logo-main.png"></img>
        </button>
        <div className="flex h-full items-center gap-[52px]">
          <button className="relative cursor-pointer" onClick={checkNotice}>
            <FaBell className="h-[30px] w-[30px]" color="#4166F5" />
            {newNotice && (
              <FaCircle
                className="absolute right-0 top-0 h-[15px] w-[15px]"
                color="red"
              />
            )}
          </button>
          <div className="flex w-full items-center gap-[10px]">
            <button onClick={moveToMyPage}>
              <FaCircleUser className="h-[30px] w-[30px]" color="#4166F5" />
            </button>
            <p className="text-text-medium">{userName}님 안녕하세요</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

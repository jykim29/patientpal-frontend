import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBell } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";

const Header = () => {
  const navigate = useNavigate();
  const moveToHome = () => {
    navigate('/')
  }
  const moveToMyPage = () => {
    navigate('/mypage')
  }

  //zustand로 옮겨서 관리하기
  const [newNotice, setNewNotice] = useState(true);
  const [userName, setUserName] = useState('김간병')

  
  const checkNotice = () => {
    setNewNotice(false);
    //모달창 나오게
  }

  
 
  return (
    <div className='flex justify-center'>
      <header className='w-full h-[80px] justify-between flex items-center border-b-[2px] py-[20px] px-[36px] min-w-[1440px]'>
      <button onClick={moveToHome}>
        <img className='h-[50px]' src='public/assets/logo-main.png'></img>
      </button>
      <div className='flex items-center h-full gap-[52px]'>
        <button className='relative cursor-pointer' onClick={checkNotice}>
          <FaBell className='w-[30px] h-[30px]' color='#4166F5'/>
          {
            newNotice &&  <FaCircle className='absolute w-[15px] h-[15px] top-0 right-0' color='red'/>
          }
        </button>
        <div className='flex gap-[10px]  w-full items-center'>
          <button onClick={moveToMyPage}>
            <FaCircleUser className='w-[30px] h-[30px]' color='#4166F5' />
          </button>
          <p className='text-text-medium'>{userName}님 안녕하세요</p>
        </div>
      </div>
      </header>
    </div>
    
  )
}

export default Header

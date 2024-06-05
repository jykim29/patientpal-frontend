import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center'>
      <footer className='min-w-[1440px] w-full h-[305px] px-[100px] py-[36px] flex flex-col bg-gray-dark gap-7'>
        <div className='flex justify-between'>
          <div className='flex gap-5 text-white text-text-medium'>
            <div className='flex flex-col gap-2'>
              <p>검색</p>
              <p className='text-text-small text-gray-medium'>간병인 찾기</p>
              <p className='text-text-small text-gray-medium'>환자 찾기</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p>커뮤니티</p>
              <p className='text-text-small text-gray-medium'>공지사항</p>
              <p className='text-text-small text-gray-medium'>자유게시판</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p>나의 계약</p>
              <p className='text-text-small text-gray-medium'>계약 현황</p>
              <p className='text-text-small text-gray-medium'>계약서 관리</p>
              <p className='text-text-small text-gray-medium'>계약 내역/결제내역</p>
            </div>
          </div>
        </div>
        <div className='flex w-full gap-6 pt-5 border-t-[0.5px]'>
          <img src='assets/logo-footer.png' color='white'></img>
          <div className='flex flex-col gap-2 text-gray-medium text-text-small'>
            <p>프로젝트명 : 간병매칭서비스 patientpal</p>
            <p>제작자 : (BE)김도현, 이정혜, 이후성 (FE)김종연, 노현호</p>
          </div>
        </div>
        <p className='text-center text-gray-medium text-text-small'>ⓒ 2024. Team PatientPal All rights reserved.</p>
      </footer>
    </div>
    
  )
}

export default Footer

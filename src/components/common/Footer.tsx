import React from 'react';

function Footer() {
  return (
    <div className="flex justify-center">
      <footer className="flex h-[305px] w-full min-w-[1440px] flex-col gap-7 bg-gray-dark px-[100px] py-[36px]">
        <div className="flex justify-between">
          <div className="flex gap-5 text-text-medium text-white">
            <div className="flex flex-col gap-2">
              <p>검색</p>
              <p className="text-text-small text-gray-medium">간병인 찾기</p>
              <p className="text-text-small text-gray-medium">환자 찾기</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>커뮤니티</p>
              <p className="text-text-small text-gray-medium">공지사항</p>
              <p className="text-text-small text-gray-medium">자유게시판</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>나의 계약</p>
              <p className="text-text-small text-gray-medium">계약 현황</p>
              <p className="text-text-small text-gray-medium">계약서 관리</p>
              <p className="text-text-small text-gray-medium">
                계약 내역/결제내역
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-6 border-t-[0.5px] pt-5">
          <img src="assets/logo-footer.png" color="white"></img>
          <div className="flex flex-col gap-2 text-text-small text-gray-medium">
            <p>프로젝트명 : 간병매칭서비스 patientpal</p>
            <p>제작자 : (BE)김도현, 이정혜, 이후성 (FE)김종연, 노현호</p>
          </div>
        </div>
        <p className="text-center text-text-small text-gray-medium">
          ⓒ 2024. Team PatientPal All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;

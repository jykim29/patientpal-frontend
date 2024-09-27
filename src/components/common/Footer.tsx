import { Link } from 'react-router-dom';

const FooterMenu = [
  {
    title: '홈',
    path: '/',
  },
  {
    title: '검색',
    path: '/search',
    submenu: [
      {
        name: '지역별 찾기',
        path: '/search/city',
      },
      {
        name: '지도로 찾기',
        path: '/search/map',
      },
    ],
  },
  {
    title: '커뮤니티',
    path: '/community',
    submenu: [
      {
        name: '공지사항',
        path: '/community/notice',
      },
      {
        name: '자유게시판',
        path: '/community/forum',
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="min-w-[1440px] bg-footer px-[100px] py-[36px]">
      <div className="mx-auto w-[1280px]">
        <div className="flex w-full gap-8 text-text-medium text-black">
          {FooterMenu.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Link to={item.path}>{item.title}</Link>
              {item.submenu?.map((sub, index) => (
                <Link
                  to={sub.path}
                  key={index}
                  className="text-text-small text-gray-dark"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex w-full items-center gap-6 border-t-[0.5px] pt-5">
          <img src="/assets/images/logo-main.png" className="text-black"></img>
          <div className="flex flex-col gap-2 text-text-small text-gray-dark">
            <p>프로젝트명 : 간병매칭서비스 patientpal</p>
            <p>제작자 : (BE)이정혜, 이후성, 장치훈 (FE)김종연, 노현호</p>
          </div>
        </div>
        <p className="text-center text-text-small text-gray-medium">
          ⓒ 2024. Team PatientPal All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

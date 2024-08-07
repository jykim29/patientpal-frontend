import { FaMagnifyingGlass, FaUsers, FaUser } from 'react-icons/fa6';
import SideBarItems from './SideBarItems';

function SideBar() {
  const sideBarMenus = [
    {
      name: '검색',
      path: '/search/city',
      icon: <FaMagnifyingGlass className="h-5 w-5" />,
      subMenu: [
        { name: '지역별 찾기', path: '/search/city' },
        { name: '지도로 찾기', path: '/search/map' },
      ],
    },
    {
      name: '커뮤니티',
      path: '/community/notice',
      icon: <FaUsers className="h-5 w-5" />,
      subMenu: [
        {
          name: '공지사항',
          path: '/community/notice',
          path2: '/community/notice/view',
        },
        {
          name: '자유게시판',
          path: '/community/forum',
          path2: '/community/forum/view',
        },
      ],
    },
    {
      name: '마이페이지',
      path: '/mypage',
      icon: <FaUser />,
      subMenu: [
        {
          name: '프로필 관리',
          path: '/mypage/profile',
        },
        {
          name: '채팅',
          path: '/mypage/chat/lobby',
          path2: '/mypage/chat/room',
        },
        {
          name: '매칭 기록',
          path: '/mypage/match-record',
        },
        {
          name: '후기 관리',
          path: '/mypage/review',
        },
      ],
    },
  ];

  return (
    <div className="w-[250px] border-r-2">
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-[12px] px-8">
        {sideBarMenus.map((item, index) => (
          <SideBarItems
            path={item.path}
            key={index}
            itemName={item.name}
            icon={item.icon}
            subMenu={item.subMenu}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;

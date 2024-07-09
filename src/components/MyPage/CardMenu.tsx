import { FaRegAddressCard } from 'react-icons/fa';
import { MdOutlineRateReview } from 'react-icons/md';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { LuFileSignature } from 'react-icons/lu';
import { FaRegFile } from 'react-icons/fa6';
import { LuFileEdit } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Category = [
  {
    title: '프로필 관리',
    icon: <FaRegAddressCard className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/mypage/profile',
  },
  {
    title: '채팅',
    icon: <IoChatboxEllipsesOutline className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/mypage/chat',
  },
  {
    title: '계약',
    icon: <LuFileSignature className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/community/notice',
  },
  {
    title: '매칭 기록',
    icon: <FaRegFile className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/mypage/match-record',
  },

  {
    title: '후기 관리',
    icon: <MdOutlineRateReview className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/mypage/review',
  },
];

function CardMenu() {
  return (
    <>
      {Category.map((item, index) => (
        <Link
          to={item.link}
          className="flex h-[156px] max-h-[156px] w-[328px] max-w-[328px] cursor-pointer flex-col items-start gap-7 rounded-lg p-4 shadow-lg"
        >
          <span className="h-8 w-8">{item.icon}</span>
          <div className="flex flex-col flex-wrap gap-1 text-text-medium font-semibold">
            {item.title}
            <span className="text-black-600 text-[14px] font-normal">
              {item.description}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
}

export default CardMenu;

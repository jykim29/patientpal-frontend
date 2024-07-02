import { FaRegAddressCard } from 'react-icons/fa';
import { FaFileSignature } from 'react-icons/fa6';
import { BsMegaphone } from 'react-icons/bs';
import { FaRegFile } from 'react-icons/fa6';
import { LuFileEdit } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Category = [
  {
    title: '개인정보 수정',
    icon: <FaRegAddressCard className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/settings/modify-info',
  },
  {
    title: '매칭 기록',
    icon: <FaRegFile className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/settings/match-record',
  },
  {
    title: '공지사항',
    icon: <BsMegaphone className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/community/notice',
  },
  {
    title: '후기 관리',
    icon: <LuFileEdit className="h-full w-full" />,
    description: 'Provide personal details and how we can reach you',
    link: '/settings/review',
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

import SideBarItems from './SideBarItems';
import { FaHouse } from 'react-icons/fa6';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa6';
import { FaCommentDots } from 'react-icons/fa6';
import { FaFileSignature } from 'react-icons/fa6';
import { FaGear } from 'react-icons/fa6';
const SideBar = () => {
  return (
    <div className="w-[250px] border-r-2">
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-[12px] px-8">
        <div className="relative w-full">
          <span className="absolute left-[-32px] h-[54px] w-[6px] rounded-br-lg rounded-tr-lg bg-primary" />
          <SideBarItems itemName="홈">
            <FaHouse className="h-5 w-5 text-primary" />
          </SideBarItems>
        </div>
        <div className="relative w-full">
          <span className="absolute left-[-32px] h-[54px] w-[6px] rounded-br-lg rounded-tr-lg bg-primary" />
          <SideBarItems itemName="검색">
            <FaMagnifyingGlass className="h-5 w-5 text-primary" />
          </SideBarItems>
        </div>
        <div className="relative w-full">
          <span className="absolute left-[-32px] h-[54px] w-[6px] rounded-br-lg rounded-tr-lg bg-primary" />
          <SideBarItems itemName="커뮤니티">
            <FaUsers className="h-5 w-5 text-primary" />
          </SideBarItems>
        </div>
        <div className="relative w-full">
          <span className="absolute left-[-32px] h-[54px] w-[6px] rounded-br-lg rounded-tr-lg bg-primary" />
          <SideBarItems itemName="채팅">
            <FaCommentDots className="h-5 w-5 text-primary" />
          </SideBarItems>
        </div>
        <div className="relative w-full">
          <span className="absolute left-[-32px] h-[54px] w-[6px] rounded-br-lg rounded-tr-lg bg-primary" />
          <SideBarItems itemName="나의 계약">
            <FaFileSignature className="h-5 w-5 text-primary" />
          </SideBarItems>
        </div>
        <div className="relative w-full">
          <span className="absolute left-[-32px] h-[54px] w-[6px] rounded-br-lg rounded-tr-lg bg-primary" />
          <SideBarItems itemName="설정">
            <FaGear className="h-5 w-5 text-primary" />
          </SideBarItems>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

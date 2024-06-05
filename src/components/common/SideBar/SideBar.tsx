import SideBarItems from "./SideBarItems"
import { FaHouse } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa6";
import { FaFileSignature } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
const SideBar = () => {
  
  
  return (
    <div className='w-[250px] border-r-2'>
      <div className='flex flex-col w-full mt-8 gap-[12px] px-8 justify-center items-center'>
        <div className="relative w-full">
          <span className="w-[6px] rounded-tr-lg rounded-br-lg bg-primary absolute left-[-32px] h-[54px]"/>
          <SideBarItems itemName='홈'>
            <FaHouse className='w-5 h-5 text-primary'/>
          </SideBarItems> 
        </div>
        <div className="relative w-full">
          <span className="w-[6px] rounded-tr-lg rounded-br-lg bg-primary absolute left-[-32px] h-[54px]"/>
          <SideBarItems itemName='검색'>
            <FaMagnifyingGlass className='w-5 h-5 text-primary'/>
          </SideBarItems>
        </div>
        <div className="relative w-full">
          <span className="w-[6px] rounded-tr-lg rounded-br-lg bg-primary absolute left-[-32px] h-[54px]"/>
          <SideBarItems itemName='커뮤니티'>
            <FaUsers className='w-5 h-5 text-primary'/>
          </SideBarItems>
        </div>
        <div className="relative w-full">
          <span className="w-[6px] rounded-tr-lg rounded-br-lg bg-primary absolute left-[-32px] h-[54px]"/>
          <SideBarItems itemName='채팅'>
            <FaCommentDots className='w-5 h-5 text-primary'/>
          </SideBarItems>  
        </div>
        <div className="relative w-full">
          <span className="w-[6px] rounded-tr-lg rounded-br-lg bg-primary absolute left-[-32px] h-[54px]"/>
          <SideBarItems itemName='나의 계약'>
            <FaFileSignature className='w-5 h-5 text-primary'/>
          </SideBarItems>  
        </div>
        <div className="relative w-full">
          <span className="w-[6px] rounded-tr-lg rounded-br-lg bg-primary absolute left-[-32px] h-[54px]"/>
          <SideBarItems itemName='설정'>
            <FaGear className='w-5 h-5 text-primary'/>
          </SideBarItems>  
        </div>
      </div>
    </div>
  )
}

export default SideBar

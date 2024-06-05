import { FaHouse } from "react-icons/fa6";


const SideBarItems = ({children, itemName}) => {
  return (
    <div className='w-full h-[54px] flex gap-8 items-center'>
       
        {children}
        <span className='text-text-large text-primary'>
            {itemName}
        </span>
    </div>
  )
}

export default SideBarItems

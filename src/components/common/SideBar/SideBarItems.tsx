import { FaHouse } from 'react-icons/fa6';

const SideBarItems = ({ children, itemName }) => {
  return (
    <div className="flex h-[54px] w-full items-center gap-8">
      {children}
      <span className="text-text-large text-primary">{itemName}</span>
    </div>
  );
};

export default SideBarItems;

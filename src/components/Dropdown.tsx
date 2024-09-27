import { memo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface DropDownProps {
  className?: string;
  list: string[];
  currentCategory: string;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  [key: string]: any;
}

function Dropdown({
  className = '',
  list,
  currentCategory,
  onClick: handleClick,
  ...restProps
}: DropDownProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const combinedDropdownClassName = twMerge(
    'bg-[center_right_5px] bg-no-repeat py-0.5 pl-2 pr-10',
    'rounded-lg border border-black shadow-[0_0_0_0.5px_#000] outline-none focus-visible:border-secondary focus-visible:shadow-[0_0_0_0.5px_#6495ED]',
    isExpanded
      ? "bg-[url('/assets/images/chevron_up.svg')]"
      : "bg-[url('/assets/images/chevron_down.svg')]",
    className
  );

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="relative rounded-lg bg-white">
      <button
        className={combinedDropdownClassName}
        type="button"
        onClick={handleToggle}
        {...restProps}
      >
        {currentCategory}
      </button>
      {isExpanded && (
        <motion.ul
          initial={{ height: '0' }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.1 }}
          className="absolute left-0 mt-0.5 w-full overflow-hidden rounded-lg border border-gray-light-medium bg-white py-1 shadow-lg"
        >
          {list.map((value: string, index) => (
            <li
              key={index}
              className="cursor-pointer px-2 py-1 hover:bg-gray-light-medium"
              onClick={(e) => {
                handleClick(e);
                handleToggle();
              }}
            >
              {value}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default memo(Dropdown);

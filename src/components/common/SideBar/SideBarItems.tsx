import { Link, useLocation } from 'react-router-dom';

interface Props {
  itemName: string;
  icon: React.ReactNode;
  path: string;
  subMenu?: { name: string; path: string; path2?: string }[];
}

function SideBarItems({ itemName, path, icon, subMenu }: Props) {
  const { pathname } = useLocation();

  const getBasePath = (path: string) => {
    const parts = path.split('/');
    return parts.slice(0, -1).join('/');
  };

  const isActive =
    pathname === path ||
    (subMenu &&
      subMenu.some((sub) => {
        if (!sub.path2) return pathname === sub.path;
        const basePath = getBasePath(sub.path2);

        return pathname === sub.path || pathname.startsWith(basePath);
      }));

  return (
    <nav className="relative flex w-full flex-col">
      {isActive ? (
        <span className="absolute left-[-32px] h-[54px] w-[6px] rounded-br-lg rounded-tr-lg bg-primary" />
      ) : (
        ''
      )}
      <Link to={path} className="flex h-[54px] w-full items-center gap-8">
        <span className={`${isActive ? 'text-primary' : 'text-gray-medium'}`}>
          {icon}
        </span>
        <span
          className={`${isActive ? 'text-text-large text-primary' : 'text-text-large text-gray-medium'}`}
        >
          {itemName}
        </span>
      </Link>
      <nav className="flex flex-col gap-3 pl-[52px]">
        {isActive
          ? subMenu?.map((item, index) => {
              if (item.path2)
                return (
                  <Link
                    to={item.path}
                    key={index}
                    className={`${pathname.startsWith(getBasePath(item.path2)) ? 'text-text-medium text-primary' : 'text-text-medium text-gray-medium'}`}
                  >
                    {item.name}
                  </Link>
                );
              else
                return (
                  <Link
                    to={item.path}
                    key={index}
                    className={`${pathname === item.path ? 'text-text-medium text-primary' : 'text-text-medium text-gray-medium'}`}
                  >
                    {item.name}
                  </Link>
                );
            })
          : ''}
      </nav>
    </nav>
  );
}

export default SideBarItems;

import { Outlet } from 'react-router-dom';
import MenuTitle from '../common/MenuTitle';

function MyPageLayout() {
  return (
    <div className="w-[1190px]">
      <main className="flex min-h-[1080px] flex-col gap-[52px] px-[52px] py-8">
        <MenuTitle title="마이페이지" />
        <Outlet />
      </main>
    </div>
  );
}

export default MyPageLayout;

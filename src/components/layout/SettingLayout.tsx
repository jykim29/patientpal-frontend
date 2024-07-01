import { Outlet } from 'react-router-dom';
import MenuTitle from '../common/MenuTitle';
import Header from '../common/Header';
import SideBar from '../common/SideBar/SideBar';
import Footer from '../common/Footer';

function SettingLayout() {
  return (
    <div className="flex w-full min-w-[1440px] flex-col items-center justify-center">
      <Header />
      <div className="flex">
        <SideBar />
        <div className="w-[1190px]">
          <main className="flex min-h-[1080px] flex-col gap-[52px] px-[52px] py-8">
            <MenuTitle title="설정" />
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SettingLayout;

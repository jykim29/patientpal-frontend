import { Outlet } from 'react-router-dom';

import Header from '../common/Header';
import Footer from '../common/Footer';
import SideBar from '../common/SideBar/SideBar';
import ScrollToTop from '../common/ScrollToTop';

export function Component() {
  return (
    <ScrollToTop>
      <div className="mx-auto flex w-[1440px] flex-col items-center justify-center">
        <Header />
        <div className="flex">
          <SideBar />
          <div className="min-h-[900px] w-[1190px]">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </ScrollToTop>
  );
}

Component.displayName = 'Layout';

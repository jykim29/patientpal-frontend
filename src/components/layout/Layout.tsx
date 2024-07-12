import React, { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../common/SideBar/SideBar';
import Home from '../../pages/Home';
import ScrollToTop from '../common/ScrollToTop';

function Layout() {
  return (
    <ScrollToTop>
      <div className="flex w-full min-w-[1440px] flex-col items-center justify-center">
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

export default Layout;

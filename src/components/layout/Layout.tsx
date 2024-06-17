import React, { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../common/SideBar/SideBar';
import Home from '../../pages/Home';

function Layout() {
  return (
    <div className="flex w-full min-w-[1440px] flex-col items-center justify-center">
      <Header />
      <div className="flex">
        <SideBar />
        <div className="w-[1190px]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

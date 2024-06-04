import React, { ReactNode } from 'react'
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../common/SideBar/SideBar';
import Home from '../../pages/Home';


const Layout = () => {
  return (
    <div className='min-w-[1440px] flex justify-center flex-col items-center'>
      <Header/>
      <div className='flex'> 
        <SideBar/>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout

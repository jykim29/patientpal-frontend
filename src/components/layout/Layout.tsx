import React, { ReactNode } from 'react'
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout

import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import Dashboard from '@/containers/Dashboard';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
const Home = () => {


  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default Home;

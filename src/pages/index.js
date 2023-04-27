import React, { useState, useEffect } from 'react';
import Dashboard from '@/containers/Dashboard';
import Layout from '@/components/layout';
const Home = () => {


  return (
    <div className='flex flex-col min-h-screen'>
      <Layout />
      <Dashboard />
    </div>
  );
};

export default Home;

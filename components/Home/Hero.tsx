'use client';
import React from 'react';
import Navbar from './Navbar';
import Heading from './Heading';
import Search from './Search';
import CategoryNavbar from './CategoryNavbar'

const Hero = () => {
  return (
    <div className='flex flex-col gap-y-6 px-0 shadow-inner'>
        <Navbar />
        <Heading />
    </div>
  );
};

export default Hero;

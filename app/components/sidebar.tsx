'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Form2 from './form2/form2';
import { MdDehaze, MdHome, MdSearch, MdClose } from 'react-icons/md';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed top-0 z-[51] flex h-[100vh] w-80 flex-col gap-2 rounded-r-xl bg-[#303030] p-2 shadow-outer2 transition-transform duration-[300ms] ease-[cubic-bezier(0.2,0.0,0,1.0)]
        ${sidebarOpen ? null : '-translate-x-full'}`}
      >
        <div className='flex items-center'>
          <button
            className='ml-auto flex items-center justify-center rounded-full p-2 hover:bg-[#202124]'
            onClick={toggleSidebar}
          >
            <MdClose size={30} />
          </button>
        </div>
        <Form2 sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </div>

      <div className='fixed z-50 flex h-[100vh] w-20 flex-col gap-2 bg-surface p-2 text-sm shadow-outer2'>
        <div className='flex flex-col items-center'>
          <button
            className='flex justify-center rounded-full p-1 px-3 hover:bg-[#303030]'
            onClick={toggleSidebar}
          >
            <MdDehaze size={30} />
          </button>
        </div>

        <div className='flex flex-col items-center'>
          <button
            className='flex justify-center rounded-full p-1 px-3 hover:bg-[#303030]'
            onClick={toggleSidebar}
          >
            <MdSearch size={30} />
          </button>
          <p>Home</p>
        </div>

        <div className='flex flex-col items-center'>
          <Link
            href='/'
            className='flex justify-center rounded-full p-1 px-3 hover:bg-[#303030]'
          >
            <MdHome size={30} />
          </Link>
          <p>Search</p>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useEffect } from 'react';

import {
  LogOut,
  Moon,
  Sun,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  toggleDarkMode,
  toggleMobileMenu,
} from '@/features/toggle';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';

import Timer from './Timer';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.toggle.darkMode);
  const menuOpen = useAppSelector((state) => state.toggle.mobileMenuOpen);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0';
    router.push('/login');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Project Learner</Link>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => dispatch(toggleMobileMenu())}>☰</button>
        </div>

        {/* Menu Items */}
        <div className={`flex-col md:flex md:flex-row md:items-center ${menuOpen ? 'flex' : 'hidden'} md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0`}>

          <Link href="/portfolio" className="hover:underline">Portfolio</Link>

          {/* Theme Toggle */}
          <button onClick={() => dispatch(toggleDarkMode())} className="flex items-center gap-1">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />} Theme
          </button>

          {/* Settings Dropdown */}
          <div className="relative inline-block group">
            <button className="flex items-center gap-1 focus:outline-none">Settings ▾</button>
            <div className="opacity-0 invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow rounded w-40 z-10">
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                <User size={16} /> Profile
              </Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {/* Live Timer */}
          <div className="text-sm font-mono"><Timer /></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

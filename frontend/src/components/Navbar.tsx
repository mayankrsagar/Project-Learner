'use client';

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

import { useLogout } from '../hooks/useAuth';
import { useAuth } from './AuthProvider';
import Timer from './Timer';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.toggle.darkMode);
  const menuOpen = useAppSelector((state) => state.toggle.mobileMenuOpen);
  const { user } = useAuth();
  const { logoutUser } = useLogout();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-800 dark:text-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition">
          Project Learner
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => dispatch(toggleMobileMenu())}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Main Menu */}
        <div className={`flex-col md:flex md:flex-row md:items-center ${menuOpen ? 'flex' : 'hidden'} md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0 text-base`}>
          <Link href="/portfolio" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Portfolio</Link>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />} Theme
          </button>

          {/* Auth Settings */}
          {user && (
            <div className="relative group">
              <button className="flex items-center gap-2 font-medium focus:outline-none">
                Hello, {user.fullName} ▾
              </button>
              <div className="absolute right-0 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-opacity opacity-0 invisible group-hover:opacity-100 group-hover:visible z-20">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <User size={16} /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}

          {/* Live Timer */}
          <div className="text-sm font-mono">
            <Timer />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { Provider } from 'react-redux';

import { store } from '@/store/store';
import { AuthProvider } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';

interface LayoutWrapperProps {
  children: ReactNode;
}

const NavbarWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const hideNavbarPaths = ['/login', '/register'];
  
  return (
    <>
      {!hideNavbarPaths.includes(pathname) && <Navbar />}
      <main className="flex-grow">{children}</main>
    </>
  );
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Provider store={store}>
        <AuthProvider>
          <NavbarWrapper>{children}</NavbarWrapper>
        </AuthProvider>
      </Provider>
    </div>
  );
};

export default LayoutWrapper;

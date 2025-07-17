"use client";
import React, {
  ReactNode,
  useEffect,
} from 'react';

import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';

import { AuthProvider } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import { store } from '@/store/store';

interface LayoutWrapperProps {
  children: ReactNode;
}

const NavbarWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const hideNavbarPaths = ['/login', '/register'];
  
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
}, []);

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

"use client";
import React, { ReactNode } from 'react';

import { Provider } from 'react-redux';

import Navbar from '@/components/Navbar';
import { store } from '@/store/store';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
         <Provider store={store} >
<Navbar/>
<main className="flex-grow">{children}</main>
      </Provider>
      
    </div>
  );
};

export default LayoutWrapper;

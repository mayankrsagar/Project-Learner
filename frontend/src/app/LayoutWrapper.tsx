"use client";
import React, { ReactNode } from 'react';

import { Provider } from 'react-redux';

import { store } from '@/store/store';
import { AuthProvider } from '@/components/AuthProvider';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Provider store={store}>
        <AuthProvider>
          <main className="flex-grow">{children}</main>
        </AuthProvider>
      </Provider>
    </div>
  );
};

export default LayoutWrapper;

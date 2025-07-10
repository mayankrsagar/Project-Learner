'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { UserProfile } from '@/types'; // Ensure correct path

import { useUser } from '../hooks/useUser';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  error: unknown;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoading, isError } = useUser(); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      setIsAuthenticated(Boolean(user) && !isError);
    }
  }, [user, isLoading, isError]);

  const value: AuthContextType = {
    user: user ?? null,
    isLoading,
    error: isError,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

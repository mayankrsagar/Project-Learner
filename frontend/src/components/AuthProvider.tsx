'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useUser } from '../hooks/useUser';

interface AuthContextType {
  user: unknown | null;  
  isLoading: boolean;
  isError: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoading, isError } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading) {
      if (user) {
        setIsAuthenticated(true);
      } else {
        // Check if error is due to unauthorized access
        if (isError && (isError.message?.includes('401') || isError.message?.includes('Unauthorized'))) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(false);
        }
      }
    }
  }, [user, isLoading, isError]);

  const value = {
    user,
    isLoading,
    isError,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

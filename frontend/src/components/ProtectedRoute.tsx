'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = <div className="min-h-screen flex items-center justify-center">Loading...</div>,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && user === null) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router, user]);

  // Show loading while checking authentication
  if (isLoading) {
    return <>{fallback}</>;
  }

  // If not authenticated, don't render children (we're redirecting)
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated: render children
  return <>{children}</>;
};

export default ProtectedRoute;


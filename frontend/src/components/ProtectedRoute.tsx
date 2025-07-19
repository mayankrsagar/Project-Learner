// src/components/ProtectedRoute.tsx
'use client';

import React, {
  useEffect,
  useState,
} from 'react';

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
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  // Ensure this component only runs redirect logic after client mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [hasMounted, isLoading, isAuthenticated, router]);

  // Show loading while checking authentication
  if (isLoading || !hasMounted) {
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

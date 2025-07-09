import React from 'react';
import Link from 'next/link';

import { RegisterForm } from '@/components/Auth';
import PublicRoute from '@/components/PublicRoute';

const page = () => {
  return (
    <PublicRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <RegisterForm/>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </PublicRoute>
  )
}

export default page

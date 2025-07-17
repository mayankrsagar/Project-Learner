// src/app/home/page.tsx
'use client';

import React from 'react';

import Link from 'next/link';

import { useAuth } from '@/components/AuthProvider';
import ProtectedRoute from '@/components/ProtectedRoute';
import RazorpayButton from '@/components/RazorpayButton';
import { useCourses } from '@/hooks/useCourses';

export default function HomePage() {
  const { courses, isLoading } = useCourses();
  const { user, isAuthenticated } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Welcome to Project Learner
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore our courses and start building your skills today.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Available Courses
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <p className="text-gray-500">Loading courses...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses?.map(course => {
                const purchased = isAuthenticated && user?.coursesEnrolled?.includes(course._id);
                return (
                  <div key={course._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                      {course.description}
                    </p>

                    {purchased ? (
                      <Link
                        href={`/courses/${course._id}`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Go to Course
                      </Link>
                    ) : (
                      <RazorpayButton courseId={course._id} amount={course.price} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

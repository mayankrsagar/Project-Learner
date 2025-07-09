'use client';

import Link from 'next/link';

import ProtectedRoute from '../components/ProtectedRoute';
import { useCourses } from '../hooks/useCourses';

export default function HomePage() {
  const { courses, isLoading: coursesLoading } = useCourses();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="container mx-auto p-6">
          <section className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to Project Learner</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Choose from our available courses to start your learning journey.</p>
            
            <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
            {coursesLoading ? (
              <div className="flex justify-center items-center p-8">
                <p className="text-gray-500">Loading courses...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course: unknown) => {
                  const c = course as { _id: string; title: string; description?: string };
                  return (
                    <Link key={c._id} href={`/courses/${c._id}`}>
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{c.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}

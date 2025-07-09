'use client';

import Link from 'next/link';

import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../components/AuthProvider';
import { useLogout } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';

export default function HomePage() {
  const { user } = useAuth();
  const { courses, isLoading: coursesLoading } = useCourses();
  const { logoutUser } = useLogout();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <header className="p-6 bg-white dark:bg-gray-800 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Project Learner</h1>
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <Link href="/profile" className="hover:underline">
                    Hello, {user.fullName}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 hover:underline"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto p-6">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
            {coursesLoading ? (
              <p>Loading courses...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course: unknown) => {
                  const c = course as { _id: string; title: string; description?: string };
                  return (
                    <Link key={c._id} href={`/courses/${c._id}`}>
                      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-md transition">
                        <h3 className="font-semibold text-lg">{c.title}</h3>
                        <p className="text-sm mt-2 line-clamp-2">{c.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

'use client';

import Link from 'next/link';

import { useCourses } from '../hooks/useCourses';
import { useUser } from '../hooks/useUser';

export default function HomePage() {
  const { user, isLoading: userLoading } = useUser();
  const { courses, isLoading: coursesLoading } = useCourses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="p-6 bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Project Learner</h1>
          {userLoading ? (
            <p>Loading...</p>
          ) : user ? (
            <Link href="/profile" className="hover:underline">
              Hello, {user.fullName}
            </Link>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
          {coursesLoading ? (
            <p>Loading courses...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses?.map((course: any) => (
                <Link key={course._id} href={`/courses/${course._id}`}>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-md transition">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm mt-2 line-clamp-2">{course.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

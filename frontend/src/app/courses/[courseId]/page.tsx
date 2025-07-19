// 'use client';
// import React from 'react';

// import { useParams } from 'next/navigation';

// import SprintManager from '../../../components/SprintManager';

// const CoursePage = () => {
//   const params = useParams();
//   const courseId = params.courseId as string;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Course Dashboard</h1>
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <SprintManager courseId={courseId} />
//       </div>
//     </div>
//   );
// };

// export default CoursePage;

// src/app/courses/[id]/page.tsx
'use client';

import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useAuth } from '@/components/AuthProvider';
import { useCourse } from '@/hooks/useCourse';

export default function CourseDetail() {
  const params = useParams();
  let courseId = params?.courseId;
  if (Array.isArray(courseId)) {
    courseId = courseId[0];
  }

  const { course, isLoading } = useCourse(courseId ?? "");
  const { user } = useAuth();
  const enrolled = user?.coursesEnrolled?.includes(courseId??"");

  if (isLoading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-700">{course.description}</p>
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">Price: ₹{course.price}</span>
        {enrolled ? (
          <Link
            href={`/courses/${course._id}/learn`}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Continue Learning
          </Link>
        ) : (
          <a
            href="https://rzp.io/rzp/lywPCxYJ"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enroll Now
          </a>
        )}
      </div>
    </div>
  );
}



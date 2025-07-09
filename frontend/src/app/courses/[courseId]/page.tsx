'use client';
import React from 'react';

import { useParams } from 'next/navigation';

import SprintManager from '../../../components/SprintManager';

const CoursePage = () => {
  const params = useParams();
  const courseId = params.courseId as string;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Course Dashboard</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <SprintManager courseId={courseId} />
      </div>
    </div>
  );
};

export default CoursePage;

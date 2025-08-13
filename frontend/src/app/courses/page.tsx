"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import CourseManager from "../../components/CourseManager";

const CoursesPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Courses Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <CourseManager />
      </div>
    </div>
  );
};

export default CoursesPage;

"use client";
import React from "react";

import { useParams } from "next/navigation";

import SprintManager from "@/components/SprintManager";

const CoursePage = () => {
  const params = useParams();
  const courseId = params.courseId as string;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-900">
      <div className="h-full w-full p-10">
        <div className="h-full w-full bg-[url('/wood-bg.png')] sm:bg-[url('/wood-bg-sm.png')] bg-cover bg-center bg-no-repeat rounded-xl shadow-2xl">
          <div className="p-8 backdrop-blur-lg bg-white/85 dark:bg-neutral-900/80 h-full w-full border border-brown-300 dark:border-neutral-700 rounded-xl">
            <h1 className="text-4xl font-bold mb-6 text-brown-800 dark:text-amber-300 tracking-tight">
              🪵 Course Dashboard
            </h1>
            <SprintManager courseId={courseId} />
            ``
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

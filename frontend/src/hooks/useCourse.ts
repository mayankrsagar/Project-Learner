// src/hooks/useCourse.ts
import useSWR from 'swr';

import { Course } from '@/types';

import { fetchCourse } from '../api/courseApi';

interface CourseResponse {
  course: Course;
  message?: string;
}

export const useCourse = (id: string | null) => {
  const shouldFetch = Boolean(id);
  const { data, error } = useSWR<CourseResponse>(
    shouldFetch ? `course/${id}` : null,
    () => fetchCourse(id as string) as Promise<CourseResponse>
  );

  return {
    course: data?.course ?? null,
    isLoading: shouldFetch && !error && !data,
    isError: error,
  };
};

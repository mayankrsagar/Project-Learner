import useSWR from 'swr';

import { fetchCourses } from '../api/courseApi';

export const useCourses = () => {
  const { data, error } = useSWR('courses', fetchCourses);
  return {
    courses: data?.courses,
    isLoading: !error && !data,
    isError: error,
  };
};
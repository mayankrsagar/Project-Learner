import useSWR from 'swr';

import { fetchCourse } from '../api/courseApi';

export const useCourse = (id: string) => {
  const { data, error } = useSWR(id ? `course/${id}` : null, () => fetchCourse(id));
  return {
    course: data?.course,
    isLoading: !error && !data,
    isError: error,
  };
};
import fetchClient from './fetchClient';

export const fetchCourses = async () => {
  const data = await fetchClient.get('/api/courses');
  return data;
};

export const fetchCourse = async (id: string) => {
  const data = await fetchClient.get(`/api/courses/${id}`);
  return data;
};

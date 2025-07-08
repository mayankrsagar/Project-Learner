import axiosClient from './axiosClient';

export const fetchCourses = async () => {
  const { data } = await axiosClient.get('/api/courses');
  return data;
};

export const fetchCourse = async (id: string) => {
  const { data } = await axiosClient.get(`/api/courses/${id}`);
  return data;
};
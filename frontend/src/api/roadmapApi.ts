import axiosClient from './axiosClient';

export const fetchSprints = async (courseId: string) => {
  const { data } = await axiosClient.get(`/api/courses/${courseId}/sprints`);
  return data;
};

export const fetchSessions = async (courseId: string, sprintId: string) => {
  const { data } = await axiosClient.get(
    `/api/courses/${courseId}/sprints/${sprintId}/sessions`
  );
  return data;
};
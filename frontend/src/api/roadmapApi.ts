import fetchClient from './fetchClient';

export const fetchSprints = async (courseId: string) => {
  const data = await fetchClient.get(`/api/courses/${courseId}/sprints`);
  return data;
};

export const fetchSessions = async (courseId: string, sprintId: string) => {
  const data = await fetchClient.get(
    `/api/courses/${courseId}/sprints/${sprintId}/sessions`
  );
  return data;
};

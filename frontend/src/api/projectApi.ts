import fetchClient from './fetchClient';

export const fetchMyProjects = async () => {
  const data = await fetchClient.get('/api/projects/my');
  return data;
};

export const createProject = async (projectData: unknown) => {
  const data = await fetchClient.post('/api/projects', projectData);
  return data;
};

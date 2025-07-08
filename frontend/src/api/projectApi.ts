import axiosClient from './axiosClient';

export const fetchMyProjects = async () => {
  const { data } = await axiosClient.get('/api/projects/my');
  return data;
};

export const createProject = async (projectData: unknown) => {
  const { data } = await axiosClient.post('/api/projects', projectData);
  return data;
};
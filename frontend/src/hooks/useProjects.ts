import useSWR from 'swr';

import { fetchMyProjects } from '../api/projectApi';

export const useProjects = () => {
  const { data, error } = useSWR('projects', fetchMyProjects);
  return {
    projects: data?.projects,
    isLoading: !error && !data,
    isError: error,
  };
};
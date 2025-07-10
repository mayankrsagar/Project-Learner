// src/hooks/useProjects.ts
import useSWR from 'swr';

import { Project } from '@/types';

import { fetchMyProjects } from '../api/projectApi';

interface ProjectsResponse {
  projects: Project[];
}

/**
 * Hook to fetch the current user's projects
 */
export const useProjects = () => {
  const { data, error } = useSWR<ProjectsResponse>(
    'projects',
    () => fetchMyProjects() as Promise<ProjectsResponse>
  );

  return {
    projects: data?.projects ?? [],
    isLoading: !error && !data,
    isError: error,
  };
};

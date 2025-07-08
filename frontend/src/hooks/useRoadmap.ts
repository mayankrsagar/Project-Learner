import useSWR from 'swr';

import {
  fetchSessions,
  fetchSprints,
} from '../api/roadmapApi';

export const useSprints = (courseId: string) => {
  const { data, error } = useSWR(
    courseId ? `sprints/${courseId}` : null,
    () => fetchSprints(courseId)
  );
  return {
    sprints: data?.sprints,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSessions = (courseId: string, sprintId: string) => {
  const { data, error } = useSWR(
    sprintId ? `sessions/${courseId}/${sprintId}` : null,
    () => fetchSessions(courseId, sprintId)
  );
  return {
    sessions: data?.sessions,
    isLoading: !error && !data,
    isError: error,
  };
};

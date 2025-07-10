// // src/hooks/useRoadmap.ts
// import useSWR from 'swr';

// import {
//   Session,
//   Sprint,
// } from '@/types';

// import {
//   fetchSessions,
//   fetchSprints,
// } from '../api/roadmapApi';

// interface SprintsResponse {
//   sprints: Sprint[];
// }

// interface SessionsResponse {
//   sessions: Session[];
// }

// export const useSprints = (courseId: string) => {
//   const { data, error } = useSWR<SprintsResponse>(
//     courseId ? `sprints/${courseId}` : null,
//     () => fetchSprints(courseId) as Promise<SprintsResponse>
//   );

//   return {
//     sprints: data?.sprints ?? [],
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// export const useSessions = (courseId: string, sprintId: string) => {
//   const { data, error } = useSWR<SessionsResponse>(
//     sprintId ? `sessions/${courseId}/${sprintId}` : null,
//     () => fetchSessions(courseId, sprintId) as Promise<SessionsResponse>
//   );

//   return {
//     sessions: data?.sessions ?? [],
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

// src/hooks/useRoadmap.ts
import useSWR from 'swr';

import {
  Session,
  Sprint,
} from '@/types';

import {
  fetchSessions,
  fetchSprints,
} from '../api/roadmapApi';

interface SprintResponse {
  sprints: Sprint[];
}

interface SessionResponse {
  sessions: Session[];
}

export const useSprints = (courseId: string) => {
  const { data, error } = useSWR<SprintResponse>(
    courseId ? `sprints/${courseId}` : null,
    async () => await fetchSprints(courseId) as SprintResponse
  );

  return {
    sprints: data?.sprints || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSessions = (courseId: string, sprintId: string) => {
  const { data, error } = useSWR<SessionResponse>(
    sprintId ? `sessions/${courseId}/${sprintId}` : null,
    async (): Promise<SessionResponse> => await fetchSessions(courseId, sprintId) as SessionResponse
  );

  return {
    sessions: data?.sessions || [],
    isLoading: !error && !data,
    isError: error,
  };
};

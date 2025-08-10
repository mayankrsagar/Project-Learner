import {
  Session,
  SessionCreate,
  SessionUpdate,
} from '@/types';

import fetchClient from './fetchClient';

/** GET all sessions for a given sprint */
export async function fetchSessions(courseId: string, sprintId: string): Promise<Session[] | []> {
  if (!courseId || !sprintId) return [];
  const data = (await fetchClient.get(
    `/api/courses/${courseId}/sprints/${sprintId}/sessions`
  )) as { sessions: Session[] | [] };
  return data.sessions;
}

/** GET a single session by ID */
export async function getSession(
  courseId: string,
  sprintId: string,
  sessionId: string
): Promise<Session> {
  const data = (await fetchClient.get(
    `/api/courses/${courseId}/sprints/${sprintId}/sessions/${sessionId}`
  )) as { session: Session };
  return data.session;
}

/** CREATE a new session */
export async function createSession(
  courseId: string,
  sprintId: string,
  payload: SessionCreate
): Promise<Session> {
  const data = (await fetchClient.post(
    `/api/courses/${courseId}/sprints/${sprintId}/sessions`,
    payload
  )) as { session: Session };
  return data.session;
}

/** UPDATE an existing session */
export async function updateSession(
  courseId: string,
  sprintId: string,
  sessionId: string,
  payload: SessionUpdate
): Promise<Session> {
  const data = (await fetchClient.put(
    `/api/courses/${courseId}/sprints/${sprintId}/sessions/${sessionId}`,
    payload
  )) as { session: Session };
  console.log("Updated session:", data.session);
  return data.session;
}

/** DELETE a session */
export async function deleteSession(
  courseId: string,
  sprintId: string,
  sessionId: string
): Promise<void> {
  await fetchClient.delete(
    `/api/courses/${courseId}/sprints/${sprintId}/sessions/${sessionId}`
  );
}

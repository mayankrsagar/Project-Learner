import fetchClient from './fetchClient';

// Types for Sprint
export interface Sprint {
  _id: string;
  course: string;
  code: string;
  title: string;
  order: number;
  status: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSprintData {
  course: string;
  code: string;
  title: string;
  order: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface UpdateSprintData {
  code?: string;
  title?: string;
  order?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// CRUD operations for sprints
export const fetchSprintsForCourse = async (courseId: string) => {
  const data = await fetchClient.get(`/api/courses/${courseId}/sprints`);
  return data;
};

export const fetchSprint = async (courseId: string, sprintId: string) => {
  const data = await fetchClient.get(`/api/courses/${courseId}/sprints/${sprintId}`);
  return data;
};

export const createSprint = async (courseId: string, sprintData: CreateSprintData) => {
  const data = await fetchClient.post(`/api/courses/${courseId}/sprints`, sprintData);
  return data;
};

export const updateSprint = async (courseId: string, sprintId: string, sprintData: UpdateSprintData) => {
  const data = await fetchClient.put(`/api/courses/${courseId}/sprints/${sprintId}`, sprintData);
  return data;
};

export const deleteSprint = async (courseId: string, sprintId: string) => {
  const data = await fetchClient.delete(`/api/courses/${courseId}/sprints/${sprintId}`);
  return data;
};

export const updateSprintStatus = async (courseId: string, sprintId: string, status: string) => {
  const data = await fetchClient.patch(`/api/courses/${courseId}/sprints/${sprintId}/status`, { status });
  return data;
};

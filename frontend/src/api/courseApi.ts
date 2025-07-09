import fetchClient from './fetchClient';

// Types for Course
export interface Course {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  techStack?: string[];
  createdBy?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseData {
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  techStack?: string[];
  publishedAt?: string;
}

export interface UpdateCourseData {
  title?: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  techStack?: string[];
  publishedAt?: string;
}

// CRUD operations for courses
export const fetchCourses = async () => {
  const data = await fetchClient.get('/api/courses');
  return data;
};

export const fetchCourse = async (id: string) => {
  const data = await fetchClient.get(`/api/courses/${id}`);
  return data;
};

export const fetchCourseBySlug = async (slug: string) => {
  const data = await fetchClient.get(`/api/courses/slug/${slug}`);
  return data;
};

export const createCourse = async (courseData: CreateCourseData) => {
  const data = await fetchClient.post('/api/courses', courseData);
  return data;
};

export const updateCourse = async (id: string, courseData: UpdateCourseData) => {
  const data = await fetchClient.put(`/api/courses/${id}`, courseData);
  return data;
};

export const deleteCourse = async (id: string) => {
  const data = await fetchClient.delete(`/api/courses/${id}`);
  return data;
};

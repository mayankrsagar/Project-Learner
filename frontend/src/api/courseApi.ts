import {
  Course,
  CreateCourseData,
  UpdateCourseData,
} from '@/types';

// src/api/courseApi.ts
import fetchClient from './fetchClient';

// Response interfaces
type CoursesResponse = { courses: Course[] };
type CourseResponse = { course: Course };

/**
 * Fetch all courses
 */
export const fetchCourses = async (): Promise<CoursesResponse> => {
  const data = (await fetchClient.get('/api/courses')) as CoursesResponse;
  return data;
};

/**
 * Fetch a single course by ID
 */
export const fetchCourse = async (id: string): Promise<CourseResponse> => {
  const data = (await fetchClient.get(`/api/courses/${id}`)) as CourseResponse;
  return data;
};

/**
 * Fetch a single course by slug
 */
export const fetchCourseBySlug = async (slug: string): Promise<CourseResponse> => {
  const data = (await fetchClient.get(`/api/courses/slug/${slug}`)) as CourseResponse;
  return data;
};

/**
 * Create a new course
 */
export const createCourse = async (courseData: CreateCourseData): Promise<CourseResponse> => {
  const data = (await fetchClient.post('/api/courses', courseData)) as CourseResponse;
  return data;
};

/**
 * Update an existing course
 */
export const updateCourse = async (
  id: string,
  courseData: UpdateCourseData
): Promise<CourseResponse> => {
  const data = (await fetchClient.put(`/api/courses/${id}`, courseData)) as CourseResponse;
  return data;
};

/**
 * Delete a course
 */
export const deleteCourse = async (id: string): Promise<{ message: string }> => {
  const data = (await fetchClient.delete(`/api/courses/${id}`)) as { message: string };
  return data;
};

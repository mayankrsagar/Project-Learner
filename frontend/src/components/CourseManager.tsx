// src/components/CourseManager.tsx
'use client';

import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import { Course } from '@/types';

import {
  createCourse,
  deleteCourse,
  fetchCourses,
  updateCourse,
} from '../api/courseApi';

export default function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Pick<Course, 'title' | 'slug'>>({ title: '', slug: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  // const loadCourses = async () => {
  //   try {
  //     const data = (await fetchCourses()) as { courses: Course[] };
  //     setCourses(data.courses || []);
  //   } catch (err) {
  //     console.error('Failed to fetch courses', err);
  //     setError('Could not load courses');
  //   }
  // };

const loadCourses = async () => {
  try {
    const { courses: fetchedCourses } = (await fetchCourses()) as { courses: Course[] };
    setCourses(fetchedCourses);
  } catch (err) {
    console.error('Failed to fetch courses', err);
    setError('Could not load courses');
  }
};


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingId) {
        await updateCourse(editingId, form);
      } else {
        await createCourse(form);
      }
      setForm({ title: '', slug: '' });
      setEditingId(null);
      await loadCourses();
    } catch (err) {
      console.error('Failed to save course', err);
      setError('Save operation failed');
    }
  };

  const handleEdit = (course: Course) => {
    setForm({ title: course.title, slug: course.slug });
    setEditingId(course._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id);
      await loadCourses();
    } catch (err) {
      console.error('Failed to delete course', err);
      setError('Delete operation failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Course Manager</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 space-x-2">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
          required
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      <ul className="space-y-2">
        {courses.map(course => (
          <li key={course._id} className="flex justify-between items-center">
            <span>{course.title} ({course.slug})</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(course)}
                className="text-yellow-600 hover:underline"
              >Edit</button>
              <button
                onClick={() => handleDelete(course._id)}
                className="text-red-600 hover:underline"
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

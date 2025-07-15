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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { courses: fetchedCourses } = (await fetchCourses()) as { courses: Course[] };
      setCourses(fetchedCourses);
    } catch (err) {
      console.error('Failed to fetch courses', err);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and Slug are required');
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await updateCourse(editingId, form);
      } else {
        await createCourse(form);
      }
      resetForm();
      await loadCourses();
    } catch (err) {
      console.error('Failed to save course', err);
      setError('Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course: Course) => {
    setForm({ title: course.title, slug: course.slug });
    setEditingId(course._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      setLoading(true);
      await deleteCourse(id);
      await loadCourses();
      resetForm();
    } catch (err) {
      console.error('Failed to delete course', err);
      setError('Delete operation failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: '', slug: '' });
    setEditingId(null);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Course Manager</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Course Title"
          value={form.title}
          onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Course Slug"
          value={form.slug}
          onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex space-x-2">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId ? 'Update Course' : 'Add Course'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading && <p>Loading...</p>}

      <ul className="space-y-2">
        {courses.map(course => (
          <li key={course._id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
            <span>{course.title} <span className="text-gray-500">({course.slug})</span></span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(course)} className="text-yellow-600 hover:underline">
                Edit
              </button>
              <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

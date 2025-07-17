'use client';

import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  createCourse,
  deleteCourse,
  fetchCourses,
  updateCourse,
} from '@/api/courseApi';
import { Course } from '@/types';

export default function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Pick<Course, 'title' | 'slug'>>({ title: '', slug: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadCourses(); }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { courses: fetchedCourses } = (await fetchCourses()) as { courses: Course[] };
      setCourses(fetchedCourses);
    } catch (err) {
      console.error(err);
      setError('Could not load courses');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: '', slug: '' });
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug are required');
      return;
    }
    try {
      setLoading(true);
      if (editingId) {
        await updateCourse(editingId, form);
      } else {
        await createCourse(form);
      }
      await loadCourses();
      resetForm();
    } catch { setError('Failed to save course'); }
    finally { setLoading(false); }
  };

  const handleEdit = (course: Course) => {
    setForm({ title: course.title, slug: course.slug });
    setEditingId(course._id);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    try {
      setLoading(true);
      await deleteCourse(id);
      await loadCourses();
      if (editingId === id) resetForm();
    } catch { setError('Delete failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Course Manager</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <input
          className="col-span-2 px-3 py-2 border rounded focus:outline-none focus:ring"
          type="text"
          placeholder="Course Title"
          value={form.title}
          onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
        />
        <input
          className="px-3 py-2 border rounded focus:outline-none focus:ring"
          type="text"
          placeholder="Course Slug"
          value={form.slug}
          onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
        />
        <div className="col-span-full flex space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >Cancel</button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {courses.map(c => (
            <li
              key={c._id}
              className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded"
            >
              <span>{c.title} <span className="text-sm text-gray-500">({c.slug})</span></span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-yellow-500 hover:text-yellow-600"
                >Edit</button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-500 hover:text-red-600"
                >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../api/courseApi';

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', slug: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateCourse(editingId, form);
      } else {
        await createCourse(form);
      }
      setForm({ title: '', slug: '' });
      setEditingId(null);
      loadCourses();
    } catch (error) {
      console.error('Failed to save course', error);
    }
  };

  const handleEdit = (course) => {
    setForm({ title: course.title, slug: course.slug });
    setEditingId(course._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      loadCourses();
    } catch (error) {
      console.error('Failed to delete course', error);
    }
  };

  return (
    <div>
      <h2>Course Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.title} ({course.slug})
            <button onClick={() => handleEdit(course)}>Edit</button>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManager;


import {
  createCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  getCourseBySlug,
  updateCourseById,
} from '../services/courseServices.js';

export const create = async (req, res) => {
  try {
    const course = await createCourse({
      ...req.body,
      createdBy: req.user._id,
      publishedAt: req.body.publishedAt || Date.now(),
    });
    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    res.status(400).json({ message: 'Error creating course', error: err.message });
  }
};

export const list = async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.status(200).json({ message: 'Courses fetched', courses });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course fetched', course });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const course = await getCourseBySlug(req.params.slug);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course fetched', course });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await updateCourseById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course updated', course: updated });
  } catch (err) {
    res.status(400).json({ message: 'Error updating course', error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await deleteCourseById(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted', course: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
};
import Course from '../models/Course.js';

export const createCourse = (courseData) => {
  const course = new Course(courseData);
  return course.save();
};

export const getAllCourses = (filter = {}) => {
  return Course.find(filter).populate('createdBy', 'fullName email').exec();
};

export const getCourseById = (id) => {
  return Course.findById(id).populate('createdBy', 'fullName email').exec();
};

export const getCourseBySlug = (slug) => {
  return Course.findOne({ slug }).populate('createdBy', 'fullName email').exec();
};

export const updateCourseById = (id, updateData) => {
  return Course.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
};

export const deleteCourseById = (id) => {
  return Course.findByIdAndDelete(id).exec();
};
import Sprint from '../models/Sprint.js';

// Create a new sprint
export const createSprint = (data) => new Sprint(data).save();

// Get all sprints for a course
export const listSprints = (courseId) => Sprint.find({ course: courseId }).sort('order').populate('course', 'title slug').exec();

// Get all sprints (admin function)
export const getAllSprints = () => Sprint.find().sort('order').populate('course', 'title slug').exec();

// Get a single sprint by ID
export const getSprintById = (id) => Sprint.findById(id).populate('course', 'title slug').exec();

// Update sprint
export const updateSprint = (id, data) => Sprint.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('course', 'title slug').exec();

// Delete sprint
export const deleteSprint = (id) => Sprint.findByIdAndDelete(id).exec();

// Get sprints by status
export const getSprintsByStatus = (courseId, status) => Sprint.find({ course: courseId, status }).sort('order').populate('course', 'title slug').exec();

// Update sprint status
export const updateSprintStatus = (id, status) => Sprint.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).populate('course', 'title slug').exec();

// Get next sprint in sequence
export const getNextSprint = (courseId, currentOrder) => Sprint.findOne({ course: courseId, order: { $gt: currentOrder } }).sort('order').populate('course', 'title slug').exec();

// Get previous sprint in sequence
export const getPreviousSprint = (courseId, currentOrder) => Sprint.findOne({ course: courseId, order: { $lt: currentOrder } }).sort('-order').populate('course', 'title slug').exec();


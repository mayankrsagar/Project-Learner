import Project from '../models/Project.js';

export const createProject = (data) => {
  // data must include createdBy: req.user._id
  const project = new Project(data);
  return project.save();
};

export const getAllProjects = (filter = {}) => {
  return Project.find(filter).exec();
};

export const getProjectById = (id) => {
  return Project.findById(id).exec();
};

export const updateProjectById = (id, updateData) => {
  return Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).exec();
};

export const deleteProjectById = (id) => {
  return Project.findByIdAndDelete(id).exec();
};

export const getProjectsByUser = (userId) => {
  return Project.find({ createdBy: userId })
    .populate('createdBy', 'fullName email')
    .exec();
};
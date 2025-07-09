import {
  createProject,
  deleteProjectById,
  getAllProjects,
  getProjectById,
  getProjectsByUser,
  updateProjectById,
} from '../services/projectServices.js';

export const create = async (req, res) => {
  try {
    const project = await createProject({
      ...req.body,
      createdBy: req.user._id,  // req.user set by your protect middleware
    });
    res.status(201).json({ project });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listByUser = async (req, res) => {
  const projects = await getProjectsByUser(req.user._id);
  res.json({ projects });
};

export const list = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json({ message: 'Projects fetched', projects });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project fetched', project });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await updateProjectById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project updated', project: updated });
  } catch (err) {
    res.status(400).json({ message: 'Error updating project', error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await deleteProjectById(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted', project: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};

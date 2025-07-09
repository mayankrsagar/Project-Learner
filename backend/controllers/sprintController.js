import * as svc from '../services/sprintServices.js';

export const listForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const sprints = await svc.listSprints(courseId);
    res.json({ message: 'Sprints fetched', sprints });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sprints', error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { courseId } = req.params;
    const sprint = await svc.createSprint({ ...req.body, course: courseId });
    res.status(201).json({ message: 'Sprint created', sprint });
  } catch (err) {
    res.status(400).json({ message: 'Error creating sprint', error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const sprint = await svc.updateSprint(req.params.id, req.body);
    if (!sprint) return res.status(404).json({ message: 'Sprint not found' });
    res.json({ message: 'Sprint updated', sprint });
  } catch (err) {
    res.status(400).json({ message: 'Error updating sprint', error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await svc.deleteSprint(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Sprint not found' });
    res.json({ message: 'Sprint deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting sprint', error: err.message });
  }
};

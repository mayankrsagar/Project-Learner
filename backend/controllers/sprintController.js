import * as svc from '../services/sprintServices.js';

// Get all sprints for a course
export const listForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { status } = req.query;
    
    let sprints;
    if (status) {
      sprints = await svc.getSprintsByStatus(courseId, status);
    } else {
      sprints = await svc.listSprints(courseId);
    }
    
    res.json({ message: 'Sprints fetched', sprints });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sprints', error: err.message });
  }
};

// Get all sprints (admin only)
export const listAll = async (req, res) => {
  try {
    const sprints = await svc.getAllSprints();
    res.json({ message: 'All sprints fetched', sprints });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all sprints', error: err.message });
  }
};

// Get a single sprint by ID
export const getById = async (req, res) => {
  try {
    const sprint = await svc.getSprintById(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint not found' });
    res.json({ message: 'Sprint fetched', sprint });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sprint', error: err.message });
  }
};

// Create a new sprint
export const create = async (req, res) => {
  try {
    const { courseId } = req.params;
    const sprint = await svc.createSprint({ ...req.body, course: courseId });
    res.status(201).json({ message: 'Sprint created', sprint });
  } catch (err) {
    res.status(400).json({ message: 'Error creating sprint', error: err.message });
  }
};

// Update a sprint
export const update = async (req, res) => {
  try {
    const sprint = await svc.updateSprint(req.params.id, req.body);
    if (!sprint) return res.status(404).json({ message: 'Sprint not found' });
    res.json({ message: 'Sprint updated', sprint });
  } catch (err) {
    res.status(400).json({ message: 'Error updating sprint', error: err.message });
  }
};

// Update sprint status only
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const sprint = await svc.updateSprintStatus(req.params.id, status);
    if (!sprint) return res.status(404).json({ message: 'Sprint not found' });
    res.json({ message: 'Sprint status updated', sprint });
  } catch (err) {
    res.status(400).json({ message: 'Error updating sprint status', error: err.message });
  }
};

// Delete a sprint
export const remove = async (req, res) => {
  try {
    const deleted = await svc.deleteSprint(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Sprint not found' });
    res.json({ message: 'Sprint deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting sprint', error: err.message });
  }
};

// Get next sprint in sequence
export const getNext = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { order } = req.query;
    
    if (!order) {
      return res.status(400).json({ message: 'Order parameter is required' });
    }
    
    const nextSprint = await svc.getNextSprint(courseId, parseInt(order));
    if (!nextSprint) {
      return res.status(404).json({ message: 'No next sprint found' });
    }
    
    res.json({ message: 'Next sprint fetched', sprint: nextSprint });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching next sprint', error: err.message });
  }
};

// Get previous sprint in sequence
export const getPrevious = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { order } = req.query;
    
    if (!order) {
      return res.status(400).json({ message: 'Order parameter is required' });
    }
    
    const previousSprint = await svc.getPreviousSprint(courseId, parseInt(order));
    if (!previousSprint) {
      return res.status(404).json({ message: 'No previous sprint found' });
    }
    
    res.json({ message: 'Previous sprint fetched', sprint: previousSprint });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching previous sprint', error: err.message });
  }
};

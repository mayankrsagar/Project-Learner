import * as svc from '../services/sprintServices.js';

export const listForCourse = async (req, res) => {
  const { courseId } = req.params;
  const sprints = await svc.listSprints(courseId);
  res.json({ sprints });
};
export const create        = async (req, res) => {
  const { courseId } = req.params;
  const sprint = await svc.createSprint({ ...req.body, course: courseId });
  res.status(201).json({ sprint });
};
export const update        = async (req, res) => {
  const sprint = await svc.updateSprint(req.params.id, req.body);
  res.json({ sprint });
};
export const remove        = async (req, res) => {
  await svc.deleteSprint(req.params.id);
  res.json({ message: 'Sprint deleted' });
};
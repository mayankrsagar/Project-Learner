import * as svc from '../services/sessionServices.js';

export const listForSprint = async (req, res) => {
  const { sprintId } = req.params;
  const sessions = await svc.listSessions(sprintId);
  res.json({ sessions });
};
export const create      = async (req, res) => {
  const { sprintId } = req.params;
  const session = await svc.createSession({ ...req.body, sprint: sprintId });
  res.status(201).json({ session });
};
export const update      = async (req, res) => {
  const session = await svc.updateSession(req.params.id, req.body);
  res.json({ session });
};
export const remove      = async (req, res) => {
  await svc.deleteSession(req.params.id);
  res.json({ message: 'Session deleted' });
};
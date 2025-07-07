import Session from '../models/Session.js';

export const createSession     = (data) => new Session(data).save();
export const listSessions     = (sprintId) => Session.find({ sprint: sprintId }).sort('title').exec();
export const updateSession    = (id, data) => Session.findByIdAndUpdate(id, data, { new: true }).exec();
export const deleteSession    = (id) => Session.findByIdAndDelete(id).exec();
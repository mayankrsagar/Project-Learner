import Sprint from '../models/Sprint.js';

export const createSprint      = (data) => new Sprint(data).save();
export const listSprints      = (courseId) => Sprint.find({ course: courseId }).sort('order').exec();
export const updateSprint     = (id, data) => Sprint.findByIdAndUpdate(id, data, { new: true }).exec();
export const deleteSprint     = (id) => Sprint.findByIdAndDelete(id).exec();


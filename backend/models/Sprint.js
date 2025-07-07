import mongoose from 'mongoose';

const sprintSchema = new mongoose.Schema({
  course:    { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  code:      { type: String, required: true },         // e.g. "JS-101"
  title:     { type: String, required: true },
  order:     { type: Number, required: true },         // sequence order
  status:    { type: String, enum: ['Locked','InProgress','Completed','FellShort'], default: 'Locked' },
  shareLink: { type: String },                         // optional achievement link
  startDate: { type: Date },
  endDate:   { type: Date },
}, { timestamps: true });

export default mongoose.models.Sprint || mongoose.model('Sprint', sprintSchema);
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sprint:          { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint', required: true },
  title:           { type: String, required: true },   // e.g. "Session 1"
  recordingUrl:    { type: String },                   // video link
  durationMinutes: { type: Number },                   // length in minutes
  watchedPercent:  { type: Number, default: 0 },       // 0-100
  slidesUrl:       { type: String },                   // optional slides
  agendaUrl:       { type: String },                   // optional agenda
  tasks: [{
    description:   { type: String, required: true },   // task text
    type:          { type: String, enum: ['Activity','Quiz','Project'], default: 'Activity' },
    completed:     { type: Boolean, default: false },
    link:          { type: String },                   // link to exercise
  }],
}, { timestamps: true });

export default mongoose.models.Session || mongoose.model('Session', sessionSchema);
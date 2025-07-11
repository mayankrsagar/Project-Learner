import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  liveUrl:     { type: String },
  repoUrl:     { type: String },
  thumbnail:   { type: String },
  stack:       [String],

  // Link back to the learner who created it
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);

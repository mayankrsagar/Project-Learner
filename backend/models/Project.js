const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  liveUrl:     { type: String },
  repoUrl:     { type: String },
  thumbnail:   { type: String },
  stack:       [String],
  createdAt:   { type: Date, default: Date.now },
}, { timestamps: false });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);

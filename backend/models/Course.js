import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  slug:         { type: String, required: true, unique: true },
  description:  { type: String },
  coverImage:   { type: String },
  techStack:    [String],     // e.g. ['React', 'Node.js', 'MongoDB']
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Mentor/Admin who created it
  publishedAt:  { type: Date },
}, { timestamps: true });

const Course= mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;
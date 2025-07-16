import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  description: { type: String },
  coverImage:  { type: String },
  techStack:   [String],
//new fields
  level:       { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  duration:    { type: String, required: true }, // e.g., '3 months'
  prerequisites: { type: String }, // e.g., 'Basic programming knowledge'
  lessons:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  students:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublished: { type: Boolean, default: false },
  price:       { type: Number, required: true, default: 0 },     
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publishedAt: { type: Date },
}, { timestamps: true });

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;


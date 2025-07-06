import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // username:           { type: String, required: true, unique: true, trim: true },
  email:              { type: String, required: true, unique: true, lowercase: true },
  password:           { type: String, required: true },
  role:               { type: String, enum: ['Admin', 'Learner', 'Mentor'], default: 'Learner' },

  // Personal Details
  fullName:           { type: String, required: true, trim: true },
  gender:             { type: String, enum: ['Male', 'Female', 'Other'] },
  dateOfBirth:        { type: Date },
  location:           { type: String, trim: true },
  phone:              { type: String, trim: true },
  fatherName:         { type: String, trim: true },
  avatarUrl:          { type: String, trim: true },
  bio:                { type: String, maxlength: 300 },

  // Education Details
  education: [{
    level:            { type: String, required: true }, // e.g. "10th", "12th", "Undergraduate"
    institution:      { type: String, required: true },
    board:            { type: String, trim: true },
    score:            { type: String, trim: true },
    yearOfCompletion: { type: Number },
    degree:           { type: String, trim: true }, // for higher education
    branch:           { type: String, trim: true },
  }],

  // Professional Details
  currentProfession:     { type: String, trim: true },
  preferredJobLocation:  { type: String, trim: true },

  // Resumes
  resumes: [{
    variant:          { type: String, enum: ['original', 'masked'], default: 'original' },
    fileUrl:          { type: String, required: true, trim: true },
    uploadedAt:       { type: Date, default: Date.now },
  }],

  // Progress Tracking
  progress: [{
    course:            { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    completedSections: [String],
    percentageComplete:{ type: Number, default: 0 },
  }],
  badges: [{ name: String, awardedAt: Date }],

  // Verification & Workflow
  isVerified:           { type: Boolean, default: false },
  verificationToken:    { type: String },
  resetPasswordToken:   { type: String },
  resetPasswordExpires: { type: Date },

  // Activity
  lastLoginAt:          { type: Date },
  coursesEnrolled:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

  // Social Links
  social: {
    linkedIn:          { type: String, trim: true },
    github:            { type: String, trim: true },
  },

  // Mentor-specific expertise
  areaOfExpertise:      { type: String, trim: true },
}, { timestamps: true });

// Hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

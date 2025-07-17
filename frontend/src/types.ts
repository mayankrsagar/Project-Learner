// src/types.ts

/** * User model */
export interface EducationItem {
  level: string;
  institution: string;
  board?: string;
  score?: string;
  yearOfCompletion?: number;
  degree?: string;
  branch?: string;
}

export interface Resume {
  variant: 'original' | 'masked';
  fileUrl: string;
  uploadedAt: string;
}

export interface ProgressItem {
  course: string;
  completedSections: string[];
  percentageComplete: number;
}

export interface Badge {
  name: string;
  awardedAt: string;
}

export interface SocialData {
  linkedIn?: string;
  github?: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  role: 'Admin' | 'Learner' | 'Mentor';

  fullName: string;
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  location?: string;
  phone?: string;
  fatherName?: string;
  avatarUrl?: string;
  bio?: string;

  education: EducationItem[];
  currentProfession?: string;
  preferredJobLocation?: string;
  resumes: Resume[];

  progress: ProgressItem[];
  badges: Badge[];

  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;

  lastLoginAt?: string;
  coursesEnrolled: string[];

  social: SocialData;
  areaOfExpertise?: string;

  createdAt: string;
  updatedAt: string;
}

/** * Course model */
export interface Course {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  techStack?: string[];

  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  prerequisites?: string;
  lessons?: string[];
  students?: string[];
  isPublished: boolean;
  price: number;
  createdBy?: string;
  publishedAt?: string;

  createdAt: string;
  updatedAt: string;
}

/** * Payment model */
export interface Payment {
  _id: string;
  user: string;
  course: string;
  orderId: string;
  transactionId?: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

/** * Sprint and Session models (unchanged) */
export interface Sprint {
  _id: string;
  course: string;
  code: string;
  title: string;
  order: number;
  status: 'Locked' | 'InProgress' | 'Completed' | 'FellShort';
  shareLink?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  description: string;
  type: 'Activity' | 'Quiz' | 'Project';
  completed: boolean;
  link?: string;
}

export interface Session {
  _id: string;
  sprint: string;
  title: string;
  recordingUrl?: string;
  durationMinutes?: number;
  watchedPercent: number;
  slidesUrl?: string;
  agendaUrl?: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

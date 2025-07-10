// src/types.ts
export interface EducationItem {
  level: string;
  institution: string;
  board: string;
  score: string;
  yearOfCompletion: number;
  degree: string;
  branch: string;
}

export interface SocialData {
  linkedIn: string;
  github: string;
}

export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  gender: string;
  dateOfBirth: string;
  location: string;
  phone: string;
  fatherName: string;
  bio: string;
  currentProfession: string;
  preferredJobLocation: string;
  areaOfExpertise: string;
  education: EducationItem[];
  social: SocialData;
  resumes: { variant: string; fileUrl: string; uploadedAt: string }[];
}

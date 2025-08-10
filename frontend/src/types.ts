// src/types.ts
export interface EducationItem {
  level: string;                // e.g. "10th", "Undergraduate"
  institution: string;
  board?: string;
  score?: string;
  yearOfCompletion?: number;
  degree?: string;
  branch?: string;
}



export interface SocialData {
  linkedIn: string;
  github: string;
}
export interface Course {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  techStack?: string[];

  // new fields:
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;             // e.g. "3 months"
  prerequisites?: string;
  lessons?: string[];           // Lesson IDs
  students?: string[];          // User IDs of enrolled learners
  isPublished: boolean;
  price: number;

  createdBy?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
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
  areaOfExpertise?: string;
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

  createdAt: string;
  updatedAt: string;
}


export interface Resume {
  variant: 'original' | 'masked';
  fileUrl: string;
  uploadedAt: string;
}

/**
 * Progress record for a user in a given course
 */
export interface ProgressItem {
  course: string;               // Course _id
  completedSections: string[];
  percentageComplete: number;
}

/**
 * Badges awarded to a user
 */
export interface Badge {
  name: string;
  awardedAt: string;
}

export interface Payment{
  _id: string;
  user: string;
  course: string;
  orderId: string;
  transactionId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}
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

export interface CreateCourseData {
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  techStack?: string[];
}

export interface UpdateCourseData {
  title?: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  techStack?: string[];
  publishedAt?: string;
}
export interface CreateSprintData {
  course: string;
  code: string;
  title: string;
  order: number;
  status?: 'Locked' | 'InProgress' | 'Completed' | 'FellShort';
  shareLink?: string;
  startDate?: string;
  endDate?: string;
}
export interface UpdateSprintData {
  code?: string;
  title?: string;
  order?: number;
  status?: 'Locked' | 'InProgress' | 'Completed' | 'FellShort';
  shareLink?: string;
  startDate?: string;
  endDate?: string;
}
export interface CourseResponse {
  course: Course;
  message?: string;
}
export interface CoursesResponse {
  courses: Course[];
  message?: string;
}
export interface SprintResponse {
  sprint: Sprint;
  message?: string;
}
export interface SprintsResponse {
  sprints: Sprint[];
  message?: string;
}
export interface UserProfileResponse {
  userProfile: UserProfile;
  message?: string;
}
export interface UserProfileUpdateData {
  fullName?: string;
  email?: string;
  role?: string;
  gender?: string;
  dateOfBirth?: string;
  location?: string;
  phone?: string;
  fatherName?: string;
  bio?: string;
  currentProfession?: string;
  preferredJobLocation?: string;
  areaOfExpertise?: string;
  education?: EducationItem[];
  social?: SocialData;
  resumes?: Resume[];
}
export interface UserProfileUpdateResponse {
  userProfile: UserProfile;
  message?: string;
}
export interface CreateResumeData {
  variant: string;
  fileUrl: string;
}
export interface CreateResumeResponse {
  resume: Resume;
  message?: string;
}
export interface DeleteResumeResponse {
  message: string;
}
export interface DeleteCourseResponse {
  message: string;
}
export interface DeleteSprintResponse {
  message: string;
}
export interface CreateSprintResponse {
  sprint: Sprint;
  message?: string;
}
export interface UpdateSprintResponse {
  sprint: Sprint;
  message?: string;
}
export interface UpdateCourseResponse {
  course: Course;
  message?: string;
}
export interface FetchError {
  message: string;
  status?: number;
}
export interface FetchResponse<T> {
  data: T;
  error?: FetchError;
}
export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}
export interface FetchClient {
  get: <T>(url: string, options?: FetchOptions) => Promise<T>;
  post: <T>(url: string, body: Record<string, unknown>, options?: FetchOptions) => Promise<T>;
  put: <T>(url: string, body: Record<string, unknown>, options?: FetchOptions) => Promise<T>;
  delete: <T>(url: string, options?: FetchOptions) => Promise<T>;
} 
export interface FetchClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}
export interface FetchClientInstance {
  get: <T>(url: string, options?: FetchOptions) => Promise<T>;
  post: <T>(url: string, body: Record<string, unknown>, options?: FetchOptions) => Promise<T>;
  put: <T>(url: string, body: Record<string, unknown>, options?: FetchOptions) => Promise<T>;
  delete: <T>(url: string, options?: FetchOptions) => Promise<T>;
}
export interface FetchClientConstructor {
  new (config: FetchClientConfig): FetchClientInstance;
}
export interface FetchClientConstructorOptions {
  baseUrl: string;
  headers?: Record<string, string>;
}
export interface FetchClientError {
  message: string;
  status?: number;
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export interface FetchClientResponse<T> {
  data: T;
  error?: FetchClientError;
}
export interface FetchClientResponseError {
  message: string;
  status?: number;
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export interface FetchClientResponseSuccess<T> {
  data: T;
  error?: never;
}
export interface FetchClientResponse<T> {
  data: T;
  error?: FetchClientResponseError;
}
// export interface FetchClient {
//   get: <T>(url: string, options?: FetchOptions) => Promise<FetchClientResponse<T>>;
//   post: <T>(url: string, body: Record<string, unknown>, options?: FetchOptions) => Promise<FetchClientResponse<T>>;
//   put: <T>(url: string, body: Record<string, unknown>, options?: FetchOptions) => Promise<FetchClientResponse<T>>;
//   delete: <T>(url: string, options?: FetchOptions) => Promise<FetchClientResponse<T>>;
// }

export interface FetchClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}
// export interface FetchClientInstance {
//   get: <T>(url: string, options?: FetchOptions) => Promise<FetchClientResponse<T>>;
//   post: <T>(url: string, body: Record<string, unknown>, options?: FetchOptions) => Promise<FetchClientResponse<T>>;
//   put: <T>(url: string, body: Record<string, unknown>, options?: FetchOptions) => Promise<FetchClientResponse<T>>;
//   delete: <T>(url: string, options?: FetchOptions) => Promise<FetchClientResponse<T>>;
// }
export interface FetchClientConstructor {
  new (config: FetchClientConfig): FetchClientInstance;
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  liveUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  stack?: string[];
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}



export interface Task {
  description: string;
  type: 'Activity' | 'Quiz' | 'Project';
  completed: boolean;
  link?: string;
}

// src/types/index.ts

/**
 * Full Session model returned from the API
 */
export interface Session {
  _id: string;
  sprint: string;            // Sprint ObjectId
  title: string;
  recordingUrl?: string;
  durationMinutes?: number;
  watchedPercent: number;
  slidesUrl?: string;
  agendaUrl?: string;
  tasks: SessionTask[];
  createdAt: string;
  updatedAt: string;
}

export interface SessionTask {
  description: string;
  type: 'Activity' | 'Quiz' | 'Project';
  completed: boolean;
  link?: string;
}

/**
 * Payload to create a new Session
 */
export interface SessionCreate {
  title: string;
  recordingUrl?: string;
  durationMinutes?: number;
  slidesUrl?: string;
  agendaUrl?: string;
  tasks?: SessionTask[];
}

/**
 * Payload to update an existing Session
 * All fields are optional so you can do partial updates
 */
export interface SessionUpdate {
  title?: string;
  recordingUrl?: string;
  durationMinutes?: number;
  watchedPercent?: number;
  slidesUrl?: string;
  agendaUrl?: string;
  tasks?: SessionTask[];
}



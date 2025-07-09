// app/profile/page.tsx
"use client";

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Download,
  Github,
  Linkedin,
  Pencil,
  Upload,
  User,
} from 'lucide-react';
import Image from 'next/image';

import { updateProfile } from '@/api/userApi';
import { useAuth } from '@/components/AuthProvider';
import EditEducationModal from '@/components/EditEducationModal';
import EditPersonalModal from '@/components/EditPersonalModal';
import EditProfessionalModal from '@/components/EditProfessionalModal';
import EditSocialModal from '@/components/EditSocialModal';
import ProtectedRoute from '@/components/ProtectedRoute';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  gender?: string;
  dateOfBirth?: string;
  location?: string;
  phone?: string;
  fatherName?: string;
  bio?: string;
  avatarUrl?: string;
  currentProfession?: string;
  preferredJobLocation?: string;
  areaOfExpertise?: string;
  education?: Array<{
    level: string;
    institution: string;
    board?: string;
    score?: string;
    yearOfCompletion?: number;
    degree?: string;
    branch?: string;
  }>;
  social?: {
    linkedIn?: string;
    github?: string;
  };
  resumes?: Array<{
    variant: string;
    fileUrl: string;
    uploadedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

const SectionCard = ({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
      {onEdit && (
        <button onClick={onEdit} className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <Pencil size={16} />
          <span className="ml-1">Edit</span>
        </button>
      )}
    </div>
    <div className="space-y-2 text-gray-700 dark:text-gray-200">
      {children}
    </div>
  </div>
);

const KeyValue = ({ label, value, date }: { label: string; value: string; date?: string }) => (
  <div className="flex justify-between">
    <span className="font-medium">{label}</span>
    <div className="text-right">
      <span>{value}</span>
      {date && <div className="text-xs text-gray-500 dark:text-gray-400">{date}</div>}
    </div>
  </div>
);

export default function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const { user } = useAuth();
  const [isPersonalModalOpen, setPersonalModalOpen] = useState(false);
  const [isEducationModalOpen, setEducationModalOpen] = useState(false);
  const [isProfessionalModalOpen, setProfessionalModalOpen] = useState(false);
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserData(user as User);
      setIsLoading(false);
    }
  }, [user]);

  const handlePersonalSave = async (data: any) => {
    try {
      await updateProfile(data);
      setUserData(prev => ({ ...prev, ...data } as User));
    } catch (error) {
      console.error('Failed to save personal data:', error);
    }
  };

  const handleEducationSave = async (data: any) => {
    try {
      await updateProfile({ education: data });
      setUserData(prev => ({ ...prev, education: data } as User));
    } catch (error) {
      console.error('Failed to save education data:', error);
    }
  };

  const handleProfessionalSave = async (data: any) => {
    try {
      await updateProfile(data);
      setUserData(prev => ({ ...prev, ...data } as User));
    } catch (error) {
      console.error('Failed to save professional data:', error);
    }
  };

  const handleSocialSave = async (data: any) => {
    try {
      await updateProfile({ social: data });
      setUserData(prev => ({ ...prev, social: data } as User));
    } catch (error) {
      console.error('Failed to save social data:', error);
    }
  };

  const calculateProfileCompleteness = () => {
    if (!userData) return 0;
    let completedFields = 0;
    const totalFields = 5;
    
    // Personal details
    if (userData.fullName && userData.gender && userData.phone) completedFields++;
    // Education
    if (userData.education && userData.education.length > 0) completedFields++;
    // Professional
    if (userData.currentProfession) completedFields++;
    // Social
    if (userData.social && (userData.social.linkedIn || userData.social.github)) completedFields++;
    // Resume
    if (userData.resumes && userData.resumes.length > 0) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading profile...</div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!userData) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Failed to load profile</div>
        </div>
      </ProtectedRoute>
    );
  }

  const profileCompleteness = calculateProfileCompleteness();
  
  return (
    <ProtectedRoute>
      <div className="space-y-8 p-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative bg-blue-100 dark:bg-gray-700 rounded-lg h-40 overflow-hidden">
          <Image
            src="/Learners Profile.png"
            alt="Banner"
            fill
            className="object-cover md:object-center"
            priority
          />
          <div className="absolute inset-0 bg-blue-50 dark:bg-gray-900 mix-blend-overlay" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Avatar"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{userData.fullName}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{userData.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{userData.role}</p>
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="font-medium text-gray-800 dark:text-gray-100 mb-2">Your profile is {profileCompleteness}% complete</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-2" style={{ width: `${profileCompleteness}%` }} />
          </div>
        </div>

        {/* Personal Details Section */}
        <SectionCard title="Personal Details" onEdit={() => setPersonalModalOpen(true)}>
          <KeyValue label="Full Name" value={userData.fullName || 'N/A'} />
          <KeyValue label="Email" value={userData.email} />
          <KeyValue label="Gender" value={userData.gender || 'N/A'} />
          <KeyValue label="Phone" value={userData.phone || 'N/A'} />
          <KeyValue label="Date of Birth" value={userData.dateOfBirth || 'N/A'} />
          <KeyValue label="Location" value={userData.location || 'N/A'} />
          <KeyValue label="Father's Name" value={userData.fatherName || 'N/A'} />
          <KeyValue label="Bio" value={userData.bio || 'N/A'} />
        </SectionCard>

        {/* Education Details Section */}
        <SectionCard title="Education Details" onEdit={() => setEducationModalOpen(true)}>
          {userData.education?.length ? (
            userData.education.map((edu, index) => (
              <div key={index} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <KeyValue label="Level" value={edu.level} />
                <KeyValue label="Institution" value={edu.institution} />
                <KeyValue label="Board" value={edu.board || 'N/A'} />
                <KeyValue label="Score" value={edu.score || 'N/A'} />
                <KeyValue label="Year" value={edu.yearOfCompletion?.toString() || 'N/A'} />
                {edu.degree && <KeyValue label="Degree" value={edu.degree} />}
                {edu.branch && <KeyValue label="Branch" value={edu.branch} />}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No education details available.</p>
          )}
        </SectionCard>

        {/* Professional Status Section */}
        <SectionCard title="Professional Status" onEdit={() => setProfessionalModalOpen(true)}>
          <KeyValue label="Current Profession" value={userData.currentProfession || 'N/A'} />
          <KeyValue label="Preferred Job Location" value={userData.preferredJobLocation || 'N/A'} />
          <KeyValue label="Area of Expertise" value={userData.areaOfExpertise || 'N/A'} />
        </SectionCard>

        {/* Social Details Section */}
        <SectionCard title="Social Details" onEdit={() => setSocialModalOpen(true)}>
          <div className="space-y-3">
            {userData.social?.linkedIn && (
              <div className="flex items-center space-x-2">
                <Linkedin size={16} className="text-blue-600" />
                <a href={userData.social.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            )}
            {userData.social?.github && (
              <div className="flex items-center space-x-2">
                <Github size={16} className="text-gray-800 dark:text-gray-200" />
                <a href={userData.social.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GitHub Profile
                </a>
              </div>
            )}
            {!userData.social?.linkedIn && !userData.social?.github && (
              <p className="text-gray-500 dark:text-gray-400">No social links available.</p>
            )}
          </div>
        </SectionCard>

        {/* Resume Section */}
        <SectionCard title="Resume">
          {userData.resumes?.length ? (
            userData.resumes.map((resume, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <p className="font-medium">{resume.variant} Resume</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No resume uploaded yet.</p>
              <button className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => alert('Upload functionality not implemented yet')}>
                <Upload size={16} />
                <span>Upload Resume</span>
              </button>
            </div>
          )}
        </SectionCard>

        {/* Modals */}
        <EditPersonalModal
          isOpen={isPersonalModalOpen}
          onClose={() => setPersonalModalOpen(false)}
          onSave={handlePersonalSave}
          initialData={{
            fullName: userData.fullName || '',
            gender: userData.gender || '',
            dateOfBirth: userData.dateOfBirth || '',
            location: userData.location || '',
            phone: userData.phone || '',
            fatherName: userData.fatherName || '',
            bio: userData.bio || '',
          }}
        />

        <EditEducationModal
          isOpen={isEducationModalOpen}
          onClose={() => setEducationModalOpen(false)}
          onSave={handleEducationSave}
          initialData={userData.education || []}
        />

        <EditProfessionalModal
          isOpen={isProfessionalModalOpen}
          onClose={() => setProfessionalModalOpen(false)}
          onSave={handleProfessionalSave}
          initialData={{
            currentProfession: userData.currentProfession || '',
            preferredJobLocation: userData.preferredJobLocation || '',
            areaOfExpertise: userData.areaOfExpertise || '',
          }}
        />

        <EditSocialModal
          isOpen={isSocialModalOpen}
          onClose={() => setSocialModalOpen(false)}
          onSave={handleSocialSave}
          initialData={userData.social || { linkedIn: '', github: '' }}
        />
      </div>
    </ProtectedRoute>
  );
}

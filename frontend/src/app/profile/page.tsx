"use client";

import React, {
  ReactNode,
  useEffect,
  useState,
} from 'react';

import {
  Download,
  Pencil,
} from 'lucide-react';
import Image from 'next/image';

import { updateProfile } from '@/api/userApi';
import { useAuth } from '@/components/AuthProvider';
import EditEducationModal from '@/components/EditEducationModal';
import EditPersonalModal from '@/components/EditPersonalModal';
import EditProfessionalModal from '@/components/EditProfessionalModal';
import EditSocialModal from '@/components/EditSocialModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  EducationItem,
  SocialData,
  UserProfile,
} from '@/types';

// UI helpers
interface SectionCardProps { title: string; onEdit?: () => void; children: ReactNode; }
const SectionCard: React.FC<SectionCardProps> = ({ title, onEdit, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
      {onEdit && (
        <button onClick={onEdit} className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400">
          <Pencil size={16} /><span className="ml-1">Edit</span>
        </button>
      )}
    </div>
    <div className="space-y-2 text-gray-700 dark:text-gray-200">{children}</div>
  </div>
);
const KeyValue: React.FC<{ label: string; value: string; date?: string }> = ({ label, value, date }) => (
  <div className="flex justify-between">
    <span className="font-medium">{label}</span>
    <div className="text-right">
      <span>{value}</span>
      {date && <div className="text-xs text-gray-500 dark:text-gray-400">{date}</div>}
    </div>
  </div>
);

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [personalOpen, setPersonalOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [profOpen, setProfOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  useEffect(() => {
    if (user) setUserData(user as UserProfile);
  }, [user]);

  if (!userData) {
    return <ProtectedRoute><div>Loading...</div></ProtectedRoute>;
  }

  // Provide defaults so inputs are always controlled
  const social: SocialData = userData.social ?? { linkedIn: '', github: '' };
  const educationItems: EducationItem[] = userData.education.map(e => ({
    level: e.level,
    institution: e.institution,
    board: e.board ?? '',
    score: e.score ?? '',
    yearOfCompletion: e.yearOfCompletion,
    degree: e.degree ?? '',
    branch: e.branch ?? ''
  }));

  const updateField = async (data: Partial<UserProfile>) => {
    const updated: UserProfile = { ...userData, ...data };
    await updateProfile(updated);
    setUserData(updated);
  };

  const completeness = Math.round(
    ((userData.fullName && userData.gender && userData.phone ? 1 : 0) +
     (educationItems.length ? 1 : 0) +
     (userData.currentProfession ? 1 : 0) +
     ((social.linkedIn || social.github) ? 1 : 0) +
     (userData.resumes?.length ? 1 : 0)) / 5 * 100
  );

  return (
    <ProtectedRoute>
      <div className="space-y-8 p-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative bg-blue-100 dark:bg-gray-700 h-40 rounded-lg overflow-hidden">
          <Image src="/Learners Profile.png" alt="Banner" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-blue-50 dark:bg-gray-900 mix-blend-overlay" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden relative">
              <Image src="/logo.png" alt="Avatar" fill className="object-cover" sizes="96px" />
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
          <p className="mb-2">Profile {completeness}% complete</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-2" style={{ width: `${completeness}%` }} />
          </div>
        </div>

        {/* Sections */}
        <SectionCard title="Personal Details" onEdit={() => setPersonalOpen(true)}>
          <KeyValue label="Full Name" value={userData.fullName} />
          <KeyValue label="Gender" value={userData.gender ?? ''} />
          <KeyValue label="Phone" value={userData.phone ?? ''} />
          <KeyValue label="DOB" value={userData.dateOfBirth ?? ''} />
          <KeyValue label="Location" value={userData.location ?? ''} />
        </SectionCard>

        <SectionCard title="Education Details" onEdit={() => setEduOpen(true)}>
          {educationItems.map((e, i) => (
            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded mb-2">
              <KeyValue label="Level" value={e.level} />
              <KeyValue label="Institution" value={e.institution} />
              <KeyValue label="Board" value={e.board} />
              <KeyValue label="Score" value={e.score} />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Professional Status" onEdit={() => setProfOpen(true)}>
          <KeyValue label="Profession" value={userData.currentProfession ?? ''} />
          <KeyValue label="Preferred Location" value={userData.preferredJobLocation ?? ''} />
        </SectionCard>

        <SectionCard title="Social Details" onEdit={() => setSocialOpen(true)}>
          <KeyValue label="LinkedIn" value={social.linkedIn} />
          <KeyValue label="GitHub" value={social.github} />
        </SectionCard>

        <SectionCard title="Resume">
          {userData.resumes?.map((r, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded mb-2">
              <div>
                <p>{r.variant} Resume</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(r.uploadedAt).toLocaleDateString()}</p>
              </div>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <Download size={16} /><span>Download</span>
              </button>
            </div>
          ))}
        </SectionCard>

        {/* Modals */}
        <EditPersonalModal
          isOpen={personalOpen}
          onClose={() => setPersonalOpen(false)}
          onSave={data => updateField(data as Partial<UserProfile>)}
          initialData={{
            fullName:      userData.fullName,
            gender:        userData.gender ?? '',
            dateOfBirth:   userData.dateOfBirth ?? '',
            location:      userData.location ?? '',
            phone:         userData.phone ?? '',
            fatherName:    userData.fatherName ?? '',
            bio:           userData.bio ?? '',
          }}
        />

        <EditEducationModal
          isOpen={eduOpen}
          onClose={() => setEduOpen(false)}
          onSave={data => updateField({ education: data as EducationItem[] })}
          initialData={educationItems}
        />

        <EditProfessionalModal
          isOpen={profOpen}
          onClose={() => setProfOpen(false)}
          onSave={data => updateField(data as Partial<UserProfile>)}
          initialData={{
            currentProfession:    userData.currentProfession ?? '',
            preferredJobLocation: userData.preferredJobLocation ?? '',
            areaOfExpertise:      userData.areaOfExpertise ?? '',
          }}
        />

        <EditSocialModal
          isOpen={socialOpen}
          onClose={() => setSocialOpen(false)}
          onSave={data => updateField({ social: data as SocialData })}
          initialData={{
            linkedIn: social.linkedIn,
            github:   social.github,
          }}
        />
      </div>
    </ProtectedRoute>
  );
}

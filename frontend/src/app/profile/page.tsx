// app/profile/page.tsx
"use client";

import React from 'react';

import { Pencil } from 'lucide-react';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';

// Dummy data - replace with real props or fetch
const user = {
  name: 'Mayank Rambirsingh Sagar',
  subtitle: 'Crio Fellowship Program in Software Development | Fellowship in Software Development (React + NodeJS)',
  avatar: '/path/to/avatar.jpg',
  // banner: "Learners Profile.png",
  progress: 100,
  sections: [
    { title: 'Personal Details', complete: true },
    { title: 'Education Details', complete: true },
    { title: 'Professional Status', complete: true },
    { title: 'Social Details', complete: true },
    { title: 'Resume', complete: true },
  ],
  personal: [
    { label: 'Full name as on Aadhar', value: 'Mayank Rambirsingh Sagar' },
    { label: 'Gender', value: 'Male' },
    { label: 'Crio Registered Email Id', value: 'mayanksagar@gmail.com' },
    { label: 'Primary contact number', value: '+91 83902-26312' },
    { label: 'Whatsapp Number', value: '+91 83902-26312' },
    { label: "Father's Name", value: 'Rambirsingh' },
  ],
  education: [
    { label: '10th standard school name', value: 'Chandresh Lodha Memorial School' },
    { label: '10th standard board affiliation', value: 'Maharashtra state board of secondary and higher education' },
    { label: '10th standard score (Percent)', value: '57.27%' },
    { label: '12th standard school', value: 'Kapol' },
    { label: '12th standard board affiliation', value: 'Maharashtra state board of secondary and higher education' },
    { label: '12th standard score (Percent)', value: '46.77%' },
    { label: 'Highest Education Qualification', value: 'Under Graduation' },
    { label: 'Degree', value: 'B.Sc' },
    { label: 'Year of Graduation', value: '2020' },
    { label: 'Branch', value: 'IT' },
    { label: 'College/University Name', value: 'Viva' },
    { label: 'CGPA or Percentage', value: '46.60%' },
    { label: 'Additional Certifications', value: '-' },
  ],
  professional: [
    { label: 'Current Profession', value: 'Fresher' },
    { label: 'Current Location', value: 'Maharashtra' },
    { label: 'Preferred Location for Job', value: 'Anywhere in India' },
  ],
  social: [
    { label: 'GitHub Email ID', value: 'mayanksagar@gmail.com' },
    { label: 'GitHub Profile', value: 'https://github.com/mayanksagar' },
    { label: 'LinkedIn Profile URL', value: 'https://www.linkedin.com/in/mayank-s-ba4588a' },
    { label: 'Additional tech stack that you know', value: '-' },
  ],
  resume: [
    { label: 'Resume', value: 'mayank_sagar_vines.pdf', date: 'Last Uploaded at Jun 25, 2025, 1:31 AM' },
    { label: 'Masked Resume', value: 'Masked_mayank_sagar_vines.pdf', date: 'Last Uploaded at Apr 3, 2025, 1:20 AM' },
  ],
};

const SectionCard = ({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
      {onEdit && (
        <button onClick={onEdit} className="flex items-center text-blue-600 hover:text-blue-800">
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{user.subtitle}</p>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="font-medium text-gray-800 dark:text-gray-100 mb-2">Your profile is {user.progress}% complete</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div className="bg-green-500 h-2" style={{ width: `${user.progress}%` }} />
        </div>
        <div className="flex mt-4 justify-between text-sm text-gray-600 dark:text-gray-400">
          {user.sections.map((sec) => (
            <span key={sec.title} className={sec.complete ? 'text-green-600' : ''}>{sec.title}</span>
          ))}
        </div>
      </div>

      {/* Sections */}
      <SectionCard title="Personal Details" onEdit={() => console.log('edit personal')}>
        {user.personal.map((item) => (
          <KeyValue key={item.label} label={item.label} value={item.value} />
        ))}
      </SectionCard>

      <SectionCard title="Education Details" onEdit={() => console.log('edit education')}>
        {user.education.map((item) => (
          <KeyValue key={item.label} label={item.label} value={item.value} />
        ))}
      </SectionCard>

      <SectionCard title="Professional Status" onEdit={() => console.log('edit professional')}>
        {user.professional.map((item) => (
          <KeyValue key={item.label} label={item.label} value={item.value} />
        ))}
      </SectionCard>

      <SectionCard title="Social Details" onEdit={() => console.log('edit social')}>
        {user.social.map((item) => (
          <KeyValue key={item.label} label={item.label} value={item.value} />
        ))}
      </SectionCard>

      <SectionCard title="Resume" onEdit={() => console.log('edit resume')}>
        {user.resume.map((item) => (
          <KeyValue key={item.label} label={item.label} value={item.value} date={item.date} />
        ))}
      </SectionCard>
      </div>
    </ProtectedRoute>
  );
}

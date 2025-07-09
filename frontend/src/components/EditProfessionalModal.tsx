'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ProfessionalData {
  currentProfession: string;
  preferredJobLocation: string;
  areaOfExpertise: string;
}

interface EditProfessionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfessionalData) => void;
  initialData: ProfessionalData;
}

const EditProfessionalModal: React.FC<EditProfessionalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<ProfessionalData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Edit Professional Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Profession
            </label>
            <select
              name="currentProfession"
              value={formData.currentProfession}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Current Status</option>
              <option value="Fresher">Fresher</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Career Break">Career Break</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preferred Job Location
            </label>
            <input
              type="text"
              name="preferredJobLocation"
              value={formData.preferredJobLocation}
              onChange={handleChange}
              placeholder="e.g., Anywhere in India, Remote, Bangalore, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Area of Expertise
            </label>
            <textarea
              name="areaOfExpertise"
              value={formData.areaOfExpertise}
              onChange={handleChange}
              rows={3}
              placeholder="e.g., Frontend Development, Backend Development, Full Stack, Data Science, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfessionalModal;

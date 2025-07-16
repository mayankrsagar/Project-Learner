'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import { X } from 'lucide-react';

import { useAddress } from '@/hooks/useAddress';

interface PersonalData {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  location: string;
  phone: string;
  fatherName: string;
  bio: string;
}

interface EditPersonalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PersonalData) => void;
  initialData: PersonalData;
}

const EditPersonalModal: React.FC<EditPersonalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<PersonalData>(initialData);
  const currentLocation = useAddress();

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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

  const handleGetLocation = () => {
    if (!currentLocation) {
      alert('Unable to fetch your location. Please enter it manually.');
      return;
    }
    setFormData(prev => ({ ...prev, location: currentLocation }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Edit Personal Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="input">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="input" />
            <button type="button" onClick={handleGetLocation} className="text-sm text-blue-600 hover:underline mt-1">
              Get your location
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Father&apos;s Name</label>
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} maxLength={300} className="input" placeholder="Tell us about yourself..." />
            <div className="text-xs text-gray-500 mt-1">{formData.bio.length}/300 characters</div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalModal;

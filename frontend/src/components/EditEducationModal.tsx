'use client';

import React, { useState } from 'react';

import {
  Plus,
  Trash2,
  X,
} from 'lucide-react';

import { EducationItem } from '@/types';

interface EditEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (education: EducationItem[]) => void;
  initialData: EducationItem[];
}

const EditEducationModal: React.FC<EditEducationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [educationItems, setEducationItems] = useState<EducationItem[]>(
    initialData.length > 0 ? initialData : [
      {
        level: '',
        institution: '',
        board: '',
        score: '',
        yearOfCompletion: new Date().getFullYear(),
        degree: '',
        branch: '',
      }
    ]
  );

  const addEducationItem = () => {
    setEducationItems([...educationItems, {
      level: '',
      institution: '',
      board: '',
      score: '',
      yearOfCompletion: new Date().getFullYear(),
      degree: '',
      branch: '',
    }]);
  };

  const removeEducationItem = (index: number) => {
    setEducationItems(educationItems.filter((_, i) => i !== index));
  };

  const updateEducationItem = (index: number, field: string, value: string | number) => {
    const updated = educationItems.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setEducationItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(educationItems.filter(item => item.level && item.institution));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Edit Education Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {educationItems.map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  Education {index + 1}
                </h3>
                {educationItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducationItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Level *
                  </label>
                  <select
                    value={item.level}
                    onChange={(e) => updateEducationItem(index, 'level', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="10th">10th Standard</option>
                    <option value="12th">12th Standard</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => updateEducationItem(index, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Board/University
                  </label>
                  <input
                    type="text"
                    value={item.board}
                    onChange={(e) => updateEducationItem(index, 'board', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Score/Percentage
                  </label>
                  <input
                    type="text"
                    value={item.score}
                    onChange={(e) => updateEducationItem(index, 'score', e.target.value)}
                    placeholder="85% or 8.5 CGPA"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year of Completion
                  </label>
                  <input
                    type="number"
                    value={item.yearOfCompletion}
                    onChange={(e) => updateEducationItem(index, 'yearOfCompletion', parseInt(e.target.value))}
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {(item.level === 'Undergraduate' || item.level === 'Postgraduate' || item.level === 'PhD') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={item.degree}
                        onChange={(e) => updateEducationItem(index, 'degree', e.target.value)}
                        placeholder="B.Tech, M.Tech, etc."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Branch/Specialization
                      </label>
                      <input
                        type="text"
                        value={item.branch}
                        onChange={(e) => updateEducationItem(index, 'branch', e.target.value)}
                        placeholder="Computer Science, IT, etc."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEducationItem}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus size={16} />
            <span>Add Education</span>
          </button>

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

export default EditEducationModal;

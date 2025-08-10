import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import {
  Sprint,
  UserProfile,
} from '@/types';

import {
  createSprint,
  deleteSprint,
  fetchSprintsForCourse,
  updateSprint,
  updateSprintStatus,
} from '../api/sprintApi';
import { useAuth } from './AuthProvider';
import SprintFormModal from './SprintFormModal';

const SprintManager = ({ courseId }: { courseId: string }) => {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [form, setForm] = useState({ code: '', title: '', order: 1, status: 'Locked' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingSprint, setAddingSprint] = useState<boolean>(false);

  const { user }: { user: UserProfile | null } = useAuth();
  const isUserAdmin = user?.role === 'Admin';
  const router = useRouter();

  const loadSprints = useCallback(async () => {
    try {
      const data = await fetchSprintsForCourse(courseId) as { sprints: Sprint[] };
      setSprints(data.sprints || []);
    } catch (error) {
      console.error('Failed to fetch sprints', error);
    }
  }, [courseId]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    loadSprints();
  }, [courseId, loadSprints]);

  const reset = (): void => {
    setForm({ code: '', title: '', order: 1, status: 'Locked' });
    setEditingId(null);
    setAddingSprint(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateSprint(courseId, editingId, form);
      } else {
        await createSprint(courseId, { ...form, course: courseId });
      }
      reset();
      loadSprints();
    } catch (error) {
      console.error('Failed to save sprint', error);
    }
  };

  const handleEdit = (sprint: Sprint): void => {
    setForm({
      code: sprint.code,
      title: sprint.title,
      order: sprint.order,
      status: sprint.status,
    });
    setEditingId(sprint._id);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteSprint(courseId, id);
      reset();
      loadSprints();
    } catch (error) {
      console.error('Failed to delete sprint', error);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string): Promise<void> => {
    try {
      await updateSprintStatus(courseId, id, newStatus);
      loadSprints();
    } catch (error) {
      console.error('Failed to update sprint status', error);
    }
  };

  return (
    <div className="h-full w-full p-4 sm:p-6">
      <h2 className="text-4xl font-bold mb-6 text-brown-900 dark:text-amber-200 tracking-tight">
        🚀 Sprint Manager
      </h2>

      <div className="flex justify-start items-center mb-6">
        {isUserAdmin && (
          <button
            onClick={() => setAddingSprint(true)}
            className="fixed bottom-6 right-6 z-50 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 backdrop-blur-sm"
          >
            + Add Sprint
          </button>
        )}
      </div>

      {(addingSprint || editingId) && (
        <SprintFormModal
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          editingId={editingId}
          reset={reset}
        />
      )}

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {sprints.map((sprint) => (
          <li
            key={sprint._id}
            className="bg-white/90 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition"
          >
            <div className="mb-3">
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                {sprint.code} - {sprint.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                🧭 Order: {sprint.order} | 📌 Status: {sprint.status}
              </p>
            </div>

            {isUserAdmin ? (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleEdit(sprint)}
                  className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(sprint._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
                >
                  🗑️ Delete
                </button>
                <select
                  value={sprint.status}
                  onChange={(e) => handleStatusUpdate(sprint._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value="Locked">Locked</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="FellShort">Fell Short</option>
                </select>
                <button type='button' onClick={() => router.push(`/courses/${courseId}/${sprint._id}`)}>Go to Sessions</button>
              </div>
            ) : (
              <button type='button' onClick={() => router.push(`/courses/${courseId}/${sprint._id}`)}>Go to Sessions</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SprintManager;

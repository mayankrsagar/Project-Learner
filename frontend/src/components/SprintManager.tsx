import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Sprint } from '@/types';

import {
  createSprint,
  deleteSprint,
  fetchSprintsForCourse,
  updateSprint,
  updateSprintStatus,
} from '../api/sprintApi';

// interface Sprint {
//   _id: string;
//   code: string;
//   title: string;
//   order: number;
//   status: string;
// }

const SprintManager = ({ courseId }: { courseId: string }) => {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [form, setForm] = useState({ code: '', title: '', order: 1, status: 'Locked' });
  const [editingId, setEditingId] = useState<string | null>(null);

const loadSprints = useCallback(async () => {
    try {
      const data = await fetchSprintsForCourse(courseId) as { sprints: Sprint[] };
      setSprints(data.sprints || []);
    } catch (error) {
      console.error('Failed to fetch sprints', error);
    }
  }, [courseId]);


  useEffect(() => {
    loadSprints();
  }, [courseId, loadSprints]);

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateSprint(courseId, editingId, form);
      } else {
        await createSprint(courseId, { ...form, course: courseId });
      }
      setForm({ code: '', title: '', order: 1, status: 'Locked' });
      setEditingId(null);
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
      status: sprint.status
    });
    setEditingId(sprint._id);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteSprint(courseId, id);
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
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sprint Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Code</label>
    <input
      type="text"
      placeholder="Code"
      value={form.code}
      onChange={(e) => setForm({ ...form, code: e.target.value })}
      required
      className="w-full border rounded px-3 py-2 mt-1"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Title</label>
    <input
      type="text"
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      required
      className="w-full border rounded px-3 py-2 mt-1"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Order</label>
    <input
      type="number"
      placeholder="Order"
      value={form.order}
      onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })}
      required
      className="w-full border rounded px-3 py-2 mt-1"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Status</label>
    <select
      value={form.status}
      onChange={(e) => setForm({ ...form, status: e.target.value })}
      className="w-full border rounded px-3 py-2 mt-1"
    >
      <option value="Locked">Locked</option>
      <option value="InProgress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="FellShort">Fell Short</option>
    </select>
  </div>

  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    {editingId ? 'Update' : 'Create'}
  </button>
      </form>

      <ul className="mt-6 space-y-4">
  {sprints.map((sprint) => (
    <li
      key={sprint._id}
      className="border rounded px-4 py-3 bg-gray-50 shadow-sm flex justify-between items-center"
    >
      <div>
        <p className="font-medium text-gray-900">{sprint.code} - {sprint.title}</p>
        <p className="text-sm text-gray-600">
          Order: {sprint.order}, Status: {sprint.status}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleEdit(sprint)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(sprint._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        <select
          value={sprint.status}
          onChange={(e) => handleStatusUpdate(sprint._id, e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="Locked">Locked</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="FellShort">Fell Short</option>
        </select>
      </div>
    </li>
  ))}
      </ul>

    </div>
  );
};

export default SprintManager;

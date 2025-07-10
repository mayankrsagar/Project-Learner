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
    <div>
      <h2>Sprint Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Order"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Locked">Locked</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="FellShort">Fell Short</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {sprints.map((sprint) => (
          <li key={sprint._id}>
            {sprint.code} - {sprint.title} (Order: {sprint.order}, Status: {sprint.status})
            <button onClick={() => handleEdit(sprint)}>Edit</button>
            <button onClick={() => handleDelete(sprint._id)}>Delete</button>
            <select
              value={sprint.status}
              onChange={(e) => handleStatusUpdate(sprint._id, e.target.value)}
            >
              <option value="Locked">Locked</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="FellShort">Fell Short</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SprintManager;

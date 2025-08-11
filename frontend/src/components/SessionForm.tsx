"use client";

import React from "react";

import { Session, SessionCreate, SessionTask } from "@/types";

interface SessionFormModalProps {
  initial?: SessionCreate | Session;
  onCancel: () => void;
  onSubmit: (data: SessionCreate) => Promise<void>;
}

const defaultValues: SessionCreate = {
  title: "",
  recordingUrl: "",
  durationMinutes: 0,
  slidesUrl: "",
  agendaUrl: "",
  tasks: [],
};

const toSessionCreate = (init?: SessionCreate | Session): SessionCreate => {
  if (!init) return { ...defaultValues };

  // treat incoming object as SessionCreate-like; Session includes compatible fields
  const src = init as SessionCreate;

  return {
    title: src.title ?? "",
    recordingUrl: src.recordingUrl ?? "",
    durationMinutes: src.durationMinutes ?? 0,
    slidesUrl: src.slidesUrl ?? "",
    agendaUrl: src.agendaUrl ?? "",
    tasks: Array.isArray(src.tasks)
      ? src.tasks.map((t) => ({
          description: t.description ?? "",
          type: t.type ?? "Activity",
          completed: Boolean(t.completed),
          link: t.link,
        }))
      : [],
  };
};

const SessionFormModal: React.FC<SessionFormModalProps> = ({
  initial,
  onCancel,
  onSubmit,
}) => {
  const [form, setForm] = React.useState<SessionCreate>(() =>
    toSessionCreate(initial)
  );

  React.useEffect(() => {
    setForm(toSessionCreate(initial));
  }, [initial]);

  const handleChange =
    (k: keyof SessionCreate) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value =
        e.target.type === "number" ? Number(e.target.value) : e.target.value;
      setForm((prev) => ({ ...prev, [k]: value as unknown }));
    };

  const handleTaskChange = (
    idx: number,
    key: keyof SessionTask,
    value: string | boolean
  ) => {
    const tasks = [...(form.tasks ?? [])];
    const existing = tasks[idx] ?? {
      description: "",
      type: "Activity" as SessionTask["type"],
      completed: false,
    };

    const t: SessionTask = { ...existing };

    // Narrow the assignment based on key so we don't need `any`
    switch (key) {
      case "completed":
        t.completed = Boolean(value);
        break;
      case "type":
        // ensure value fits allowed types
        t.type = value as SessionTask["type"];
        break;
      case "link":
        t.link = String(value) || undefined;
        break;
      case "description":
      default:
        t.description = String(value);
        break;
    }

    tasks[idx] = t;
    setForm((prev) => ({ ...prev, tasks }));
  };

  const addTask = () => {
    setForm((prev) => ({
      ...prev,
      tasks: [
        ...(prev.tasks ?? []),
        { description: "", type: "Activity", completed: false } as SessionTask,
      ],
    }));
  };

  const removeTask = (idx: number) => {
    const tasks = [...(form.tasks ?? [])];
    tasks.splice(idx, 1);
    setForm((prev) => ({ ...prev, tasks }));
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    // sanitize numeric fields
    const payload: SessionCreate = {
      ...form,
      durationMinutes: Number(form.durationMinutes) || 0,
      tasks: (form.tasks ?? []).map((t) => ({
        description: t.description || "",
        type: t.type,
        completed: Boolean(t.completed),
        link: t.link || undefined,
      })),
    };
    await onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 w-full max-w-2xl space-y-4 shadow-lg"
      >
        <h2 className="text-xl font-semibold">Session Details</h2>

        <div>
          <label className="block text-sm">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={handleChange("title")}
            required
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Recording URL</label>
            <input
              type="url"
              value={form.recordingUrl}
              onChange={handleChange("recordingUrl")}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm">Duration (minutes)</label>
            <input
              type="number"
              min={0}
              value={form.durationMinutes ?? 0}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  durationMinutes: Number(e.target.value) || 0,
                }))
              }
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Slides URL</label>
            <input
              type="url"
              value={form.slidesUrl}
              onChange={handleChange("slidesUrl")}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm">Agenda URL</label>
            <input
              type="url"
              value={form.agendaUrl}
              onChange={handleChange("agendaUrl")}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Tasks</h3>
            <button
              type="button"
              onClick={addTask}
              className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
            >
              + Add Task
            </button>
          </div>

          {(form.tasks ?? []).length === 0 ? (
            <p className="text-sm text-gray-500 mt-2">No tasks added.</p>
          ) : (
            <div className="space-y-3 mt-2">
              {(form.tasks ?? []).map((t, idx) => (
                <div
                  key={idx}
                  className="border rounded p-3 grid grid-cols-1 md:grid-cols-6 gap-2 items-center"
                >
                  <div className="md:col-span-3">
                    <label className="block text-xs">Description</label>
                    <input
                      type="text"
                      value={t.description}
                      onChange={(e) =>
                        handleTaskChange(idx, "description", e.target.value)
                      }
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs">Type</label>
                    <select
                      value={t.type}
                      onChange={(e) =>
                        handleTaskChange(idx, "type", e.target.value)
                      }
                      className="w-full border rounded px-2 py-1 mt-1"
                    >
                      <option value="Activity">Activity</option>
                      <option value="Quiz">Quiz</option>
                      <option value="Project">Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs">Link</label>
                    <input
                      type="url"
                      value={t.link ?? ""}
                      onChange={(e) =>
                        handleTaskChange(idx, "link", e.target.value)
                      }
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs">Done</label>
                    <input
                      type="checkbox"
                      checked={Boolean(t.completed)}
                      onChange={(e) =>
                        handleTaskChange(idx, "completed", e.target.checked)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeTask(idx)}
                      className="px-2 py-1 rounded border hover:bg-red-50 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionFormModal;

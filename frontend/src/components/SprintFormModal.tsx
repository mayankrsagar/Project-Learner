"use client";

import React from "react";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

interface SprintFormModel {
  code: string;
  title: string;
  order: number;
  status: string;
}

interface SprintFormModalProps {
  form: SprintFormModel;
  setForm: React.Dispatch<React.SetStateAction<SprintFormModel>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  editingId: string | null;
  reset: () => void;
}

/**
 * Modern Sprint form modal using shared UI primitives.
 * - Controlled by parent `form` + `setForm`
 * - Calls parent's `handleSubmit` on submit
 * - Calls `reset()` to close/clear
 */
const SprintFormModal: React.FC<SprintFormModalProps> = ({
  form,
  setForm,
  handleSubmit,
  editingId,
  reset,
}) => {
  // Simple client-side validation state
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // convert `order` to number
    if (name === "order") {
      const num = value === "" ? 0 : Number(value);
      setForm((prev) => ({ ...prev, order: Number.isNaN(num) ? 0 : num }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true);
    // Basic validation: require code + title
    if (!form.code.trim() || !form.title.trim()) return;
    await handleSubmit(e);
    setSubmitted(false);
  };

  const onClose = () => {
    reset();
  };

  const codeError = submitted && !form.code.trim();
  const titleError = submitted && !form.title.trim();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <Card className="relative w-full max-w-xl z-10">
        <form onSubmit={onSubmit}>
          <CardHeader className="flex items-start justify-between gap-4 p-4">
            <div>
              <CardTitle className="text-lg">
                {editingId ? "Edit Sprint" : "Create Sprint"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure sprint code, order and status
              </p>
            </div>

            {/* Close X */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded p-1 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700 dark:text-gray-200"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586L15.293 3.293a1 1 0 011.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707A1 1 0 014.707 3.293L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </CardHeader>

          <CardContent className="grid gap-4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium">Code</span>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring ${
                    codeError ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="e.g. SPRINT-01"
                  required
                />
                {codeError && (
                  <span className="mt-1 text-xs text-red-500">
                    Code is required
                  </span>
                )}
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium">Title</span>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring ${
                    titleError ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Sprint title"
                  required
                />
                {titleError && (
                  <span className="mt-1 text-xs text-red-500">
                    Title is required
                  </span>
                )}
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <label className="flex flex-col">
                <span className="text-sm font-medium">Order</span>
                <input
                  name="order"
                  type="number"
                  value={form.order}
                  onChange={handleChange}
                  min={0}
                  className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring border-gray-200"
                />
                <span className="mt-1 text-xs text-muted-foreground">
                  Lower numbers appear first
                </span>
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium">Status</span>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring border-gray-200"
                >
                  <option value="Locked">Locked</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="FellShort">Fell Short</option>
                </select>
              </label>
            </div>

            {/* action row */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  reset();
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={
                  submitted && (!form.code.trim() || !form.title.trim())
                }
              >
                {editingId ? "Update Sprint" : "Create Sprint"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default SprintFormModal;

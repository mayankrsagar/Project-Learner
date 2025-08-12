//session page
"use client";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  createSession,
  deleteSession,
  fetchSessions,
  updateSession,
} from "@/api/sessionApi";
import { useAuth } from "@/components/AuthProvider";
import SessionFormModal from "@/components/SessionForm";
import SessionList from "@/components/SessionList";
import { Session, SessionCreate } from "@/types";
import { Button } from "@/ui/button";

const SessionsPage: React.FC = () => {
  const { courseId, sprintId } = useParams() as {
    courseId: string;
    sprintId: string;
  };
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";

  const [sessions, setSessions] = useState<Session[]>([]);
  const [editing, setEditing] = useState<Session | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchSessions(courseId, sprintId);
      setSessions(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) router.push("/login");
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, courseId, sprintId]);

  const handleEdit = (s: Session) => {
    setEditing(s);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this session?")) return;
    await deleteSession(courseId, sprintId, id);
    load();
  };

  const handleSubmit = async (form: SessionCreate) => {
    if (editing) {
      await updateSession(courseId, sprintId, editing._id, form);
    } else {
      await createSession(courseId, sprintId, form);
    }
    setShowForm(false);
    setEditing(null);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Sessions</h1>
        {isAdmin && (
          <Button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Add Session
          </Button>
        )}
      </div>

      {showForm && (
        <SessionFormModal
          initial={editing ?? undefined}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <SessionList
          sessions={sessions}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SessionsPage;

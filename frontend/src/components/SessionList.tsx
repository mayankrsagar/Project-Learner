"use client";

import React from 'react';

import { Session } from '@/types';

interface Props {
  sessions: Session[];
  isAdmin?: boolean;
  onEdit: (s: Session) => void;
  onDelete: (id: string) => void;
}

const SessionList: React.FC<Props> = ({ sessions, isAdmin = false, onEdit, onDelete }) => {
  return (
    <div className="space-y-3">
      {sessions.map((s) => (
        <div key={s._id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-medium">{s.title}</h3>
            <p className="text-sm text-gray-500">Duration: {s.durationMinutes ?? 0} min • Watched: {s.watchedPercent ?? 0}%</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              {s.recordingUrl && (
                <a href={s.recordingUrl} target="_blank" rel="noreferrer" className="underline">Recording</a>
              )}
              {s.slidesUrl && (
                <a href={s.slidesUrl} target="_blank" rel="noreferrer" className="underline">Slides</a>
              )}
              {s.agendaUrl && (
                <a href={s.agendaUrl} target="_blank" rel="noreferrer" className="underline">Agenda</a>
              )}
              <span className="text-gray-400">•</span>
              <span>{s.tasks?.length ?? 0} task(s)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                <button
                  onClick={() => onEdit(s)}
                  className="px-3 py-1 rounded border hover:bg-gray-50 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(s._id)}
                  className="px-3 py-1 rounded border hover:bg-red-50 text-sm"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;

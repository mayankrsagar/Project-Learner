"use client";
import { useState } from "react";

import { BookOpen, Filter, Users } from "lucide-react";

import { Sprint } from "@/types";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

import { SessionCard } from "./SessionCard";
import { SessionDetail } from "./SessionDetail";

interface Task {
  _id: string;
  description: string;
  type: "Activity" | "Quiz" | "Project";
  completed: boolean;
  link?: string;
}

interface Session {
  _id: string;
  sprint: Sprint;
  title: string;
  recordingUrl?: string;
  durationMinutes?: number;
  watchedPercent: number;
  slidesUrl?: string;
  agendaUrl?: string;
  tasks: Task[];
  createdAt: string;
}

interface SessionManagerProps {
  courseId: string;
  sessionId: string;
  sessions?: Session[];
  sprints?: Sprint[];
  selectedSprints?: string[]; // ✅ Use string[] instead of Sprint[]
  onSprintSelectionChange?: (sprintIds: string[]) => void;
}

export function SessionManager({
  courseId,
  sessions,
  sessionId,
  sprints,
  selectedSprints,
  onSprintSelectionChange,
}: SessionManagerProps) {
  // silence unused-var lint errors if you don't need these yet
  void courseId;
  void sessionId;

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredSessions =
    sessions?.filter((session) =>
      selectedSprints?.includes(session.sprint._id)
    ) ?? [];

  const handleSprintToggle = (sprintId: string) => {
    if (!selectedSprints || !onSprintSelectionChange) return;

    const updated = selectedSprints.includes(sprintId)
      ? selectedSprints.filter((id) => id !== sprintId)
      : [...selectedSprints, sprintId];

    onSprintSelectionChange(updated);
  };

  const totalSessions = filteredSessions.length;
  const completedSessions = filteredSessions.filter(
    (s) => s.watchedPercent >= 90
  ).length;
  const totalTasks = filteredSessions.reduce(
    (acc, s) => acc + s.tasks.length,
    0
  );
  const completedTasks = filteredSessions.reduce(
    (acc, s) => acc + s.tasks.filter((t) => t.completed).length,
    0
  );

  if (selectedSession) {
    return (
      <SessionDetail
        session={{
          ...selectedSession,
          sprint: {
            _id: selectedSession.sprint._id,
            name: selectedSession.sprint.title, // Map 'title' to 'name'
          },
        }}
        onBack={() => setSelectedSession(null)}
        onUpdateSession={(updatedSession) => {
          setSelectedSession({
            ...updatedSession,
            sprint: {
              ...selectedSession.sprint,
              title: updatedSession.sprint.name, // Map 'name' back to 'title' if needed
            },
          });
        }}
      />
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Learning Sessions</h1>
          <p className="text-muted-foreground">
            Manage and track your sprint sessions and tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-semibold">
                  {completedSessions}/{totalSessions}
                </p>
                <p className="text-sm text-muted-foreground">
                  Sessions Completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-semibold">
                  {completedTasks}/{totalTasks}
                </p>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-2xl font-semibold">
                {selectedSprints?.length ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">Active Sprints</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-2xl font-semibold">
                {Math.round(
                  (filteredSessions.reduce(
                    (acc, s) => acc + s.watchedPercent,
                    0
                  ) /
                    Math.max(filteredSessions.length, 1)) *
                    1
                )}
                %
              </p>
              <p className="text-sm text-muted-foreground">
                Avg. Watch Progress
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="sprints">Sprint Filter</TabsTrigger>
        </TabsList>

        <TabsContent value="sprints">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Sprints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(sprints ?? []).map((sprint) => (
                  <div key={sprint._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={sprint._id}
                      checked={selectedSprints?.includes(sprint._id)}
                      onCheckedChange={() => handleSprintToggle(sprint._id)}
                    />
                    <label htmlFor={sprint._id} className="cursor-pointer">
                      {sprint?.title}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          {filteredSessions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="mb-2">No Sessions Found</h3>
                <p className="text-muted-foreground">
                  Select some sprints to view their sessions.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredSessions.map((session) => (
                <SessionCard
                  key={session._id}
                  session={{
                    ...session,
                    sprint: {
                      _id: session.sprint._id,
                      name: session.sprint.title, // Map 'title' to 'name'
                    },
                  }}
                  viewMode={viewMode}
                  onClick={() => setSelectedSession(session)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

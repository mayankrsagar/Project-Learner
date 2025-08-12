import { useState } from "react";

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  Play,
  Target,
} from "lucide-react";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Progress } from "@/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

interface Task {
  _id: string;
  description: string;
  type: "Activity" | "Quiz" | "Project";
  completed: boolean;
  link?: string;
}

interface Session {
  _id: string;
  sprint: { _id: string; name: string };
  title: string;
  recordingUrl?: string;
  durationMinutes?: number;
  watchedPercent: number;
  slidesUrl?: string;
  agendaUrl?: string;
  tasks: Task[];
  createdAt: string;
}

interface SessionDetailProps {
  session: Session;
  onBack: () => void;
  onUpdateSession: (session: Session) => void;
}

const getTaskTypeColor = (type: string) => {
  switch (type) {
    case "Quiz":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Project":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }
};

export function SessionDetail({
  session,
  onBack,
  onUpdateSession,
}: SessionDetailProps) {
  const [localSession, setLocalSession] = useState(session);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleTaskToggle = (taskId: string) => {
    const updatedSession = {
      ...localSession,
      tasks: localSession.tasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };
    setLocalSession(updatedSession);
    onUpdateSession(updatedSession);
  };

  const handleProgressUpdate = (newProgress: number) => {
    const updatedSession = {
      ...localSession,
      watchedPercent: newProgress,
    };
    setLocalSession(updatedSession);
    onUpdateSession(updatedSession);
  };

  const completedTasks = localSession.tasks.filter(
    (task) => task.completed
  ).length;
  const completionRate =
    localSession.tasks.length > 0
      ? Math.round((completedTasks / localSession.tasks.length) * 100)
      : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex-shrink-0"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="mb-1 line-clamp-2">{localSession.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{localSession.sprint.name}</Badge>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {formatDate(localSession.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Play className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {localSession.watchedPercent}%
                </p>
                <p className="text-sm text-muted-foreground">Watch Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {completedTasks}/{localSession.tasks.length}
                </p>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {localSession.durationMinutes || "—"}
                  {localSession.durationMinutes && "m"}
                </p>
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Video Player Section */}
          {localSession.recordingUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Session Recording
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Video player would be embedded here
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      URL: {localSession.recordingUrl}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Watch Progress</span>
                    <span>{localSession.watchedPercent}%</span>
                  </div>
                  <Progress
                    value={localSession.watchedPercent}
                    className="h-2"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleProgressUpdate(
                          Math.min(100, localSession.watchedPercent + 10)
                        )
                      }
                    >
                      Simulate +10% Progress
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleProgressUpdate(100)}
                    >
                      Mark as Watched
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Video Progress
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={localSession.watchedPercent}
                      className="flex-1 h-2"
                    />
                    <span className="text-sm font-medium">
                      {localSession.watchedPercent}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Task Completion
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress value={completionRate} className="flex-1 h-2" />
                    <span className="text-sm font-medium">
                      {completionRate}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Session Tasks
                <Badge variant="outline" className="ml-auto">
                  {completedTasks}/{localSession.tasks.length} completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {localSession.tasks.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No tasks assigned to this session
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {localSession.tasks.map((task) => (
                    <div
                      key={task._id}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task._id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className={`font-medium ${
                              task.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {task.description}
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getTaskTypeColor(task.type)}`}
                          >
                            {task.type}
                          </Badge>
                        </div>
                        {task.link && (
                          <a
                            href={task.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Open Resource
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4">
            {/* Slides */}
            {localSession.slidesUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Session Slides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Access the presentation slides for this session
                    </p>
                    <Button asChild>
                      <a
                        href={localSession.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open Slides
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Agenda */}
            {localSession.agendaUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Session Agenda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      View the detailed agenda and learning objectives
                    </p>
                    <Button asChild variant="outline">
                      <a
                        href={localSession.agendaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open Agenda
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!localSession.slidesUrl && !localSession.agendaUrl && (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No additional resources available
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

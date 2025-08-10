import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  Play, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Circle,
  ExternalLink 
} from 'lucide-react';

interface Task {
  _id: string;
  description: string;
  type: 'Activity' | 'Quiz' | 'Project';
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

interface SessionCardProps {
  session: Session;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const getTaskTypeColor = (type: string) => {
  switch (type) {
    case 'Quiz': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Project': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  }
};

export function SessionCard({ session, viewMode, onClick }: SessionCardProps) {
  const completedTasks = session.tasks.filter(task => task.completed).length;
  const isWatched = session.watchedPercent >= 90;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (viewMode === 'list') {
    return (
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  {isWatched ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <h3 className="truncate">{session.title}</h3>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {session.sprint.name}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(session.createdAt)}
                </div>
                {session.durationMinutes && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {session.durationMinutes}m
                  </div>
                )}
                <div>
                  Tasks: {completedTasks}/{session.tasks.length}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <div className="text-center min-w-0">
                <div className="text-sm text-muted-foreground mb-1">Progress</div>
                <div className="w-24">
                  <Progress value={session.watchedPercent} className="h-2" />
                  <div className="text-xs text-center mt-1">{session.watchedPercent}%</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {session.recordingUrl && (
                  <Button size="sm" variant="outline">
                    <Play className="h-3 w-3" />
                  </Button>
                )}
                {session.slidesUrl && (
                  <Button size="sm" variant="outline">
                    <FileText className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight mb-2 line-clamp-2">
              {session.title}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {session.sprint.name}
            </Badge>
          </div>
          {isWatched && (
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 ml-2" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Watch Progress</span>
            <span>{session.watchedPercent}%</span>
          </div>
          <Progress value={session.watchedPercent} className="h-2" />
        </div>

        {/* Session Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(session.createdAt)}
          </div>
          {session.durationMinutes && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {session.durationMinutes}m
            </div>
          )}
        </div>

        {/* Tasks Summary */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Tasks</span>
            <span className="text-sm text-muted-foreground">
              {completedTasks}/{session.tasks.length} completed
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {session.tasks.map((task) => (
              <Badge 
                key={task._id}
                variant="outline"
                className={`text-xs ${getTaskTypeColor(task.type)}`}
              >
                {task.type}
                {task.completed && <CheckCircle className="h-3 w-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {session.recordingUrl && (
            <Button size="sm" className="flex-1">
              <Play className="h-3 w-3 mr-1" />
              Watch
            </Button>
          )}
          {session.slidesUrl && (
            <Button size="sm" variant="outline">
              <FileText className="h-3 w-3" />
            </Button>
          )}
          {session.agendaUrl && (
            <Button size="sm" variant="outline">
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}